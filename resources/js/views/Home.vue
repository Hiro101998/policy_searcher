<template>
	<div>
    <h2>★更新情報</h2>
    <v-card class="mb-2">
      <v-card-title>大学ポリシー検索ツールをリリースしました。</v-card-title>
      <v-card-subtitle>20xx年●月●日</v-card-subtitle>
    </v-card>
    <v-card class="mb-2">
      <v-card-title>●●大学のポリシーを修正しました。</v-card-title>
      <v-card-subtitle>20xx年●月●日</v-card-subtitle>
    </v-card>
  </div>
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