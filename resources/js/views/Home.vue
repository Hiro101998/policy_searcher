<template>
	<div>トップページの予定</div>
</template>

<script>
let data = window.Laravel.data;
console.log(data)
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>