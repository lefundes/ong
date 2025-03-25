<!-- resources/views/map/index.blade.php -->
@extends('layouts.app')

@section('content')
<div class="row g-0">
    <!-- Sidebar de filtros -->
    <div class="col-md-3 bg-light p-3">
        <h4 class="mb-4">Filtrar Serviços</h4>
        
        <div class="mb-3">
            <label class="form-label">Categorias</label>
            @foreach($categories as $category)
            <div class="form-check">
                <input class="form-check-input category-filter" type="checkbox" 
                       value="{{ $category->id }}" id="category-{{ $category->id }}" checked>
                <label class="form-check-label" for="category-{{ $category->id }}">
                    <i class="fas {{ $category->icon }} me-2" style="color: {{ $category->color }}"></i>
                    {{ $category->name }}
                </label>
            </div>
            @endforeach
        </div>
        
        <button id="filter-btn" class="btn btn-primary w-100">Aplicar Filtros</button>
    </div>
    
    <!-- Mapa -->
    <div class="col-md-9">
    <div id="map" 
        style="height: 100vh; width: 100%;"
        data-lat="{{ $defaultLocation['lat'] }}"
        data-lng="{{ $defaultLocation['lng'] }}"
        data-zoom="{{ $defaultLocation['zoom'] }}">
    </div>
    </div>
</div>
<script>
    window.defaultLocation = @json($defaultLocation);
</script>
@endsection