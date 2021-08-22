<template>
    <div v-if="favoriteflg">
      <v-row>
        <v-col v-for="(yourFavorite,index) in yourFavorites" :key="yourFavorite.index"
            cols="12"
            sm="4">
          <v-hover v-slot:default="{ hover }">
          <v-card
          >
            <v-card-text>
              <h2 class="text-h6 primary--text">
                {{yourFavorite.university_name}}
              </h2>
              <h3>{{yourFavorite.department_name}}</h3>
              <p>{{yourFavorite.subject_name}}</p>
            </v-card-text>

            <v-fade-transition>
              <v-overlay
                v-if="hover"
                absolute
                color="#036358"
              >
                <v-btn
                @click="moreInfo(index)">
                See more info
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>

    <!-- ここからダイアログ -->
      <v-app>
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">３ポリシー</span>
        </v-card-title>
        <v-card-text>
          <h2>ディプロマポリシー</h2>
           <a v-bind:href="`${this.favoriteDetail.favoriteDP_URL}`" target="_blank" rel="noopener noreferrer">ディプロマポリシーのリンク</a> 
          <p style="white-space:pre-wrap;">{{this.favoriteDetail.favoriteDP}}</p>
          <h2>カリキュラムポリシー</h2>
           <a v-bind:href="`${this.favoriteDetail.favoriteCP_URL}`" target="_blank" rel="noopener noreferrer">カリキュラムポリシーのリンク</a>
          <p style="white-space:pre-wrap;">{{this.favoriteDetail.favoriteCP}}</p>
          <h2>アドミッションポリシー</h2>
           <a v-bind:href="`${this.favoriteDetail.favoriteAP_URL}`" target="_blank" rel="noopener noreferrer">アドミッションポリシーのリンク</a>
          <p style="white-space:pre-wrap;">{{this.favoriteDetail.favoriteAP}}</p> 
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="reset()"
          >
            閉じる
          </v-btn>
            <v-btn color="error"
            class="mx-2"
            @click="deleteFavorite">
            お気に入りから削除
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
</div>

</template>

<script>
const user_id = window.Laravel;

  export default {
    data () {
      return {
        favoriteflg:false,
        yourFavorites:[],
        dialog: false,
        favoriteIndex:'',
          
        favoriteDetail:{
          favoriteDP:[],
          favoriteDP_URL:'',
          favoriteCP:'',
          favoriteDP_URL:'',
          favoriteAP:'',
          favoriteAP_URL:'',
          favorite_id:'',
          }
      }
    },
    mounted(){
      const url = "/api/favorite/" + user_id
	    axios.get(url)
		  .then(response => {
        this. yourFavorites = response.data.favorites;
        //favoriteが０の時は表示させない
        if(this.yourFavorites.length > 0){
        this.favoriteflg = true
        }
			})
		  .catch(error => {
		  console.log(error)
			});
              },
        methods: {
        moreInfo(getIndex) {
          this.favoriteIndex = getIndex
          console.log(this.favoriteIndex)
          this.favoriteDetail.favoriteDP =this.yourFavorites[this.favoriteIndex].diploma_policy
          this.favoriteDetail.favoriteDP_URL =this.yourFavorites[this.favoriteIndex].dp_url
          this.favoriteDetail.favoriteCP =this.yourFavorites[this.favoriteIndex].curriculum_policy
          this.favoriteDetail.favoriteCP_URL =this.yourFavorites[this.favoriteIndex].cp_url
          this.favoriteDetail.favoriteAP =this.yourFavorites[this.favoriteIndex].admission_policy
          this.favoriteDetail.favoriteAP_URL =this.yourFavorites[this.favoriteIndex].ap_url
          this.favoriteDetail.favorite_id = this.yourFavorites[this.favoriteIndex].favorite_id
          this.dialog =true
        },
        reset(){
          this.dialog = false
          this.favoriteIndex=''
        },
        deleteFavorite(){
          let sendFavorite = this.favoriteDetail
          axios.post('/api/delete',sendFavorite)
          .then(res => {
          alert("お気に入りから削除しました");
          //一旦yourFavoritesを空にする。
          this.yourFavorites = []
          //データベースから再度データを持ってくる。
          const url = "/api/favorite/" + user_id
	        axios.get(url)
		      .then(response => {
          this. yourFavorites = response.data.favorites;
          //favoriteが０の時は表示させない
          if(this.yourFavorites.length > 0){
          this.favoriteflg = true
          }
			    })
		      .catch(error => {
		      console.log(error)
			    });
          })
          this.dialog = false
          this.$forceUpdate()
        }
     }
  }
</script>