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
        $product->file_path1 =  $request->file('file1')->store('products');
        $product->file_path2 =  $request->file('file2')->store('products');
        $product->file_path3 =  $request->file('file3')->store('products');
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
    function getProduct( $id ){
        return Product::find($id);
    }
    public function update(Request $request, $id){
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

            if ($request->has('name')) $product->name = $request->name;
            if ($request->has('price')) $product->price = $request->price;
            if ($request->has('description')) $product->description = $request->description;
            if ($request->hasFile('file')) {
                $product->file_path = $request->file('file')->store('products');
            }
            if ($request->hasFile('file1')) {
                $product->file_path1 = $request->file('file1')->store('products');
            }
            if ($request->hasFile('file2')) {
                $product->file_path2 = $request->file('file2')->store('products');
            }
            if ($request->hasFile('file3')) {
                $product->file_path3 = $request->file('file3')->store('products');
            }
            $product->save();

            return "update success" ;
        }
}
