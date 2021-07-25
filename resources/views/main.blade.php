@extends('layouts.app')
@section('content')

   <?php
   //ここでログインしているデータを拾う
   $data = Auth::user();
   ?>

    <div id="app">
        <router-view/>
    </div>
 
 
@endsection

<script>
    window.Laravel = {!! json_encode(['data' => $data ?? null]) !!};
</script>