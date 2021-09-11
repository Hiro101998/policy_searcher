@extends('layouts.app')
@section('content')

<?php
//ここでログインしているデータを拾う
$data = Auth::id();
?>

<div id="app">
    <router-view />
</div>



@endsection

<script>
    window.Laravel = @json($data);
</script>