<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::with(['category', 'institution'])->get();
    }

    public function filter(Request $request)
    {
        // Se não receber category_id, retorna todos os serviços
        if (!$request->has('category_id')) {
            return Service::with(['category', 'institution'])->get();
        }
        
        // Validação se category_id foi enviado mas está vazio
        if (empty($request->category_id)) {
            return response()->json(['message' => 'Nenhuma categoria selecionada'], 400);
        }
        
        // Filtra por categorias específicas
        return Service::with(['category', 'institution'])
            ->whereIn('category_id', $request->category_id)
            ->get();
    }
}