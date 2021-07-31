<template>
	<div>
    <h2>★更新情報</h2>
    <p>更新情報をお知らせしています。不具合報告やご意見・ご要望は以下のリンクからお寄せください。※外部ページに飛びます<br>
    <a href ="https://form.run/@asameshi--1627693875" target="_blank" rel="noopener">不具合報告・ご意見送信フォーム</a></p>

    <v-card class="mb-2">
      <v-card-title>大学ポリシー検索ツールをリリースしました。</v-card-title>
      <v-card-subtitle>20xx年●月●日</v-card-subtitle>
    </v-card>
    <v-card class="mb-2">
      <v-card-title>不具合報告・ご意見送信フォームを設置しました</v-card-title>
      <v-card-subtitle>20xx年●月●日</v-card-subtitle>
      <v-card-text></v-card-text>
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