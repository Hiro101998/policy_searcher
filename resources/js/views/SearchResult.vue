<template>
<div>
    <div class="text-center">
    <v-progress-circular
    v-if="loading ===false"
    :size="100"
    color="primary"
    indeterminate
    ></v-progress-circular>
    </div>
         
      <v-row>
        <v-col v-for="(searchResult) in searchResults" :key="searchResult.index"
            cols="12"
            sm="4">
          <v-hover v-slot:default="{ hover }">
          <v-card
          v-if="loading===true"
          >
            <v-card-text>
              <h2 class="text-h6 primary--text">
                {{searchResult.university_name}}
              </h2>
              <h3>{{searchResult.department_name}}</h3>
              <p>{{searchResult.subject_name}}</p>
            </v-card-text>

            <v-fade-transition>
              <v-overlay
                v-if="hover"
                absolute
                color="#036358"
              >
                <v-btn
                @click="moreInfo(searchResult.subject_id)">
                See more info
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>

    <!-- ここからダイアログ -->
      <v-app v-for="display in displays" :key="display.index">
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
           <a v-bind:href="`${display.dp_url}`" target="_blank" rel="noopener noreferrer">ディプロマポリシーのリンク</a>
          <p style="white-space:pre-wrap;">{{display.diploma_policy}}</p>
          <h2>カリキュラムポリシー</h2>
           <a v-bind:href="`${display.cp_url}`" target="_blank" rel="noopener noreferrer">カリキュラムポリシーのリンク</a>
          <p style="white-space:pre-wrap;">{{display.curriculum_policy}}</p>
          <h2>アドミッションポリシー</h2>
           <a v-bind:href="`${display.ap_url}`" target="_blank" rel="noopener noreferrer">アドミッションポリシーのリンク</a>
          <p style="white-space:pre-wrap;">{{display.admission_policy}}</p>
          
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
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            @click="addFavorite"
          >
          <v-icon dark>
            mdi-heart
          </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
</div>
</template>

<script>
//main.blade.phpから,authで取得したデータを持ってくる
const loginUserId = window.Laravel
export default {
  props: ["searchResults"],
  data(){
    return{
      loading:false,
      clickId:'',
      policies:[],
      dialog: false,
      displays:[],
      favorites:[],
      registeredSubject_id:[],
      registeredUser_id:[],

      newFavorite:{
        user_id:'',
        subject_id:'',
      }
      
    }
  },
  		created(){
      setTimeout(() => {
      this.loading = true
      }, 7000)
			axios.get('/api/searchResult')
				.then(response => {
					//ポリシーのデータを取得
					this.policies = response.data.policies;
          //お気に入りデータの取得
          this.favorites = response.data.favorites;
				})
				.catch(error => {
					console.log(error)
				});
		},
      methods: {
        moreInfo(getId) {
        this.clickId = getId
				let getPolicy = this.policies.filter(policy=>policy.subject_id == getId)
        this.displays = getPolicy
				this.dialog =true
    },
        reset(){
          this.clickId ='',
          this.displays =''
          this.dialog = false
        },

        //お気に入りに追加する
        addFavorite(){
          this.newFavorite.subject_id = this.clickId
          let checkSubject_id = this.clickId
          this.newFavorite.user_id = loginUserId
          //重複チェック
          axios.get('/api/searchResult')
          .then(response => {
          //お気に入りデータの取得
          this.favorites = response.data.favorites;
          })
          .catch(error => {
          console.log(error)
          });
          for( let i =0;i<this.favorites.length;i++){
						this.registeredSubject_id.push(this.favorites[i].subject_id);
            this.registeredUser_id.push(this.favorites[i].user_id);
			        }
          if(this.registeredSubject_id.includes(checkSubject_id) && this.registeredUser_id.includes(loginUserId)){
                alert("登録済です");
              }
          else{
            let favorite = this.newFavorite
          axios.post('/api/store',favorite)
            .then(res => {
              // favoite関係のデータをリセットする。
              this.favorites = []
              this. registeredSubject_id =[]
              this.registeredUser_id = []
            })   
             alert("お気に入りに追加しました");
              this.dialog =false
          }        
        }
  },
}
</script>