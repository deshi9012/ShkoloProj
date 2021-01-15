<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    private $data = [
        [   'id' => 1,
            'title' => 'Item 1',
            'description' => 'Item 1 description'
        ],
        [
            'id' => 2,
            'title' => 'Item 2',
            'description' => 'Item 2 description'
        ],
        [
            'id' => 3,
            'title' => 'Item 3',
            'description' => 'Item 3 description'
        ],
    ];
    //
    public function index()
    {
        return response()->json($this->data);
    }

    public function show($id)
    {
        $arrKey = array_search($id, array_column($this->data, 'id'));
        return response()->json($this->data[$arrKey]);

    }
}
