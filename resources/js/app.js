import './bootstrap';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import axios from 'axios';



document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o elemento do mapa existe
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Elemento #map não encontrado no DOM');
        return;
    }
    
    // Obtém as coordenadas dos data attributes
    const defaultLat = parseFloat(mapElement.dataset.lat);
    const defaultLng = parseFloat(mapElement.dataset.lng);
    const defaultZoom = parseInt(mapElement.dataset.zoom);

    // Verifica se as coordenadas são válidas
    if (isNaN(defaultLat) || isNaN(defaultLng) || isNaN(defaultZoom)) {
        console.error('Coordenadas padrão inválidas:', {defaultLat, defaultLng, defaultZoom});
        return;
    }

    // Inicializa o mapa
    const map = L.map('map').setView([defaultLat, defaultLng], defaultZoom);
    console.log('Mapa inicializado com sucesso');
    
    // Define os limites para Salvador
    map.setMaxBounds([
        [-13.0, -38.6], // sudoeste
        [-12.8, -38.3]  // nordeste
    ]);
    //map.options.minZoom = 11; // Zoom mínimo para não sair da cidade

    // Adiciona o tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Dados de <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18,
    }).addTo(map);
    
    // Marcadores agrupados
    const markers = L.markerClusterGroup();
    
    // Carrega os serviços inicialmente
    loadServices();
    
    // Filtro de serviços
    document.getElementById('filter-btn')?.addEventListener('click', function() {
        const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
            .map(el => el.value);
        
        loadServices(selectedCategories);
    });
    
    /**
     * Carrega os serviços no mapa
     * @param {Array|null} categories - Array de IDs de categorias para filtrar
     */
    function loadServices(categories = null) {
        console.log('Carregando serviços...', categories ? `Filtro: ${categories.join(',')}` : 'Sem filtro');
        
        // Fecha todos os popups existentes antes de carregar novos
        map.closePopup();
        markers.clearLayers();
        
        // Configura a URL baseada nas categorias selecionadas
        const config = {
            params: {}
        };
        
        if (categories && categories.length > 0) {
            // Envia os IDs das categorias como array (melhor para o backend)
            config.params.category_id = categories;
        }
        
        axios.get('/api/services/filter', config)
            .then(response => {
                console.log('Dados recebidos da API:', response.data);
                
                if (!response.data || response.data.length === 0) {
                    showPopup('Nenhum serviço encontrado para os filtros selecionados', 'info');
                    return;
                }
                
                let markersAdded = 0;
                
                response.data.forEach(service => {
                    if (!service.institution || 
                        isNaN(service.institution.latitude) || 
                        isNaN(service.institution.longitude)) {
                        console.warn('Serviço sem coordenadas válidas:', service.institution?.name);
                        return;
                    }
    
                    const marker = L.marker([
                        parseFloat(service.institution.latitude), 
                        parseFloat(service.institution.longitude)
                    ], {
                        icon: L.divIcon({
                            html: `<i class="fas ${service.category?.icon || 'fa-map-marker-alt'}" 
                                      style="color: ${service.category?.color || '#3490dc'}; 
                                      font-size: 24px;"></i>`,
                            className: 'custom-icon',
                            iconSize: [24, 24],
                            iconAnchor: [12, 24]
                        })
                    }).bindPopup(`
                        <h5>${service.name}</h5>
                        <p><strong>Instituição:</strong> ${service.institution.name}</p>
                        <p><strong>Endereço:</strong> ${service.institution.address}</p>
                        <p><strong>Telefone:</strong> ${service.institution.phone || 'Não informado'}</p>
                        <p><strong>Horário:</strong> ${service.schedule || 'Não informado'}</p>
                    `);
    
                    markers.addLayer(marker);
                    markersAdded++;
                });
    
                if (markersAdded > 0) {
                    map.addLayer(markers);
                    console.log(`${markersAdded} marcadores adicionados ao mapa`);
                } else {
                    showPopup('Nenhum serviço com localização válida encontrado', 'warning');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar serviços:', error);
                
                if (error.response) {
                    // Erros de validação (categorias inválidas)
                    if (error.response.status === 422) {
                        showPopup('Selecione categorias válidas para filtrar', 'error');
                    } 
                    // Nenhum resultado encontrado
                    else if (error.response.status === 404) {
                        showPopup('Nenhum serviço encontrado para os filtros aplicados', 'info');
                    } else {
                        showPopup('Erro ao carregar serviços. Código: ' + error.response.status, 'error');
                    }
                } else {
                    // Erros de conexão
                    showPopup('Erro de conexão ao carregar serviços', 'error');
                }
            });
    }
    
    // Função auxiliar para mostrar popups
    function showPopup(message, type = 'info') {
        // Fecha popups existentes
        map.closePopup();
        
        // Define classes CSS baseadas no tipo
        const alertClasses = {
            info: 'alert alert-info',
            warning: 'alert alert-warning',
            error: 'alert alert-danger'
        };
        
        // Cria e abre o novo popup
        L.popup()
            .setLatLng(map.getCenter())
            .setContent(`
                <div class="${alertClasses[type]} p-2 mb-0">
                    ${message}
                </div>
            `)
            .openOn(map);
    }
});