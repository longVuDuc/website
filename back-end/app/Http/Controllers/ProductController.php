<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    function addProduct( Request $request)
    {
        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->file_path =  $request->file('file')->store('products');
        $product->save();
        return $product;
    }
    function List(  )
    {
        return Product::all();
    }
    function delete( $id ){
        $result = Product::where('id', $id)->delete();
        if( $result ){
            return ['result'=> 'Delete success'] ;
        }else{
            return ['result'=> 'Delete fail'] ;
        }
       
    }
}
