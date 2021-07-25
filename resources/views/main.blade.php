@extends('layouts.app')
@section('content')

   <?php
   //ここでログインしているデータを拾う
   $data = Auth::user();
   ?>

    <div id="app">
        <div id="nav">
          <router-link to="/home">Home</router-link>
          <router-link to="/universitySearch">検索</router-link>
          <router-link to="/favorite">favorite</router-link>
        </div>
        <router-view/>
        </div>
    </div>
 
 
@endsection

<script>
    window.Laravel = {!! json_encode(['data' => $data ?? null]) !!};
</script>