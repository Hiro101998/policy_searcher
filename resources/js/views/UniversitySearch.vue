<template>
 <div>
   <v-form>
	<v-container>
     <v-row>
	  <!-- //キーワード検索  -->
      <v-col
        cols="12"
        sm="6"
      >
		<v-card
    	 max-width="auto"
		>
		 <v-card-title>大学名検索</v-card-title>
         <v-text-field 
           label="大学名"
           prepend-icon="mdi-map-marker"
		   v-model="keyWord"
         ></v-text-field>
		</v-card>
      </v-col>
	  <!-- //学びたい分野検索 -->
	  <v-col
        cols="12"
        sm="6"
      >
	    <v-card
    	 max-width="auto"
	    >
		 <v-card-title>学びたい分野で検索</v-card-title>
         <v-select
		   item-text="field_name"
		   item-value="field_id"
		   :items= this.fields
		   v-model="keyField"
           attach
           chips
           label="分野"
		   prepend-icon="mdi-map-marker"
           multiple
         >
		 </v-select>
	    </v-card>
      </v-col>
     </v-row>

	<!-- 所在地検索 -->
	  <v-row>
		<v-col
          cols="12"
          sm="6"
        >
		 <v-card
    	  max-width="auto"
		 >
		  <v-card-title>大学の所在地で検索</v-card-title>
		  <v-select
		  	item-text="region"
			item-value="region_id"
			:items= this.regions
			v-model="keyRegion"
            attach
            chips
            label="地方"
			prepend-icon="mdi-map-marker"
            multiple
          >
		  </v-select>

		   <v-select
		   	item-text="prefecture"
			item-value="prefecture_id"
		  	:items= this.prefectures
			v-model="keyPrefecture"
            attach
            chips
            label="都道府県"
			prepend-icon="mdi-map-marker"
            multiple
          >
		  </v-select>
		 </v-card>
	    </v-col>

		<!-- 区分検索 -->
		<v-col
         cols="12"
         sm="6"
        >
		 <v-card
    	  max-width="auto"
		 >
		  <v-card-title>国公立or私立で絞り込み</v-card-title>
		  <v-select
		 	item-text="operator"
			item-value="operator_id"
		  	:items= this.operators
			v-model="keyOperator"
            attach
            chips
            label="国公立or私立(私立は現在対応していません。)"
			prepend-icon="mdi-map-marker"
            multiple
          >
		  </v-select>
		 </v-card>
		</v-col>
	  </v-row>
	</v-container>
	  
	<v-container>
	 <!-- ボタン -->
		<v-flex text-center my-5>
         <v-btn
			width="50%"
            x-large
            color="success"
            dark
			@click="search_universities()">
            検索
         </v-btn>
		</v-flex> 
	</v-container>
  </v-form>
 </div>
</template>

<script>

export default {
		data(){
			return{
				universities:[],
  				searchResults:[],
                keyWord:'',
				regions:[],
				prefectures:[],
				fields:[],
				operators:[],
				keyField:[],
				keyRegion:[],
				keyPrefecture:[],
				keyOperator:[],
						 }
				},
		created(){
			 let regions = this.regions;
			 let prefectures = this.prefectures;
			 let fields = this.fields;
			 let operators = this.operators;

			axios.get('/api/universitySearch')
				.then(response => {
					//大学のデータ取得
					this.universities = response.data.universities;
					//地方のデータを取得
					this.regions = response.data.regions;
					for( let i =0;i<response.data.regions.length;i++){
						regions.push(response.data.regions[i]);
					}
					//都道府県のデータを取得
					this.prefectures = response.data.prefectures;
					for( let i =0;i<response.data.prefectures.length;i++){
						prefectures.push(response.data.prefectures[i]);
					}
					//分野のデータを取得
					this.fields = response.data.fields;
					for( let i =0;i<response.data.prefectures.fields;i++){
						fields.push(response.data.fields[i]);
					}
					//国公立or私立のデータを取得
					this.operators = response.data.operators;
					for( let i =0;i<response.data.operators.operators;i++){
						operators.push(response.data.operators[i]);
					}
				})
				.catch(error => {
					console.log(error)
				});
		},
		methods: {
		//大学名検索でヒットしたもののみ配列に追加
    	search_universities(){
			const university = this.universities
			//<--大学名検索-->
			let searchWord = this.keyWord
			let wordFilter = university.filter(function(get){
			return get.university_name.includes(searchWord)
			})
			let searchProcess = wordFilter
			//<--大学名検索ここまで-->
			
			//<--分野検索-->
			if(this.keyField.length>0){
				let searchField = this.keyField
				let field_1_Filter = searchProcess.filter(x =>searchField.includes(x.field_id_1)) 
				let field_2_Filter = searchProcess.filter(x =>searchField.includes(x.field_id_2))
				let field_3_Filter = searchProcess.filter(x =>searchField.includes(x.field_id_3))
				let field_4_Filter = searchProcess.filter(x =>searchField.includes(x.field_id_4))
				//concatで結合する
				let join = field_1_Filter.concat(field_2_Filter,field_3_Filter,field_4_Filter)
				//subject_idの昇順に並び替える
				let fieldFilter= join.sort(function(a,b){
    				if(a.subject_id < b.subject_id) return -1;
    				if(a.subject_id > b.subject_id) return 1;
    				return 0;
					});
				searchProcess = fieldFilter
			}
			//<--分野検索ここまで-->

			//<--地方検索-->
			if(this.keyRegion.length>0){
				let searchRegion = this.keyRegion
				let regionFilter = searchProcess.filter(x =>searchRegion.includes(x.region_id))
				searchProcess = regionFilter
			}
			//<--地方検索ここまで-->

			//<--県名検索-->
			if(this.keyPrefecture.length>0){
				let searchPrefecture = this.keyPrefecture
				let prefectureFilter  = searchProcess.filter(x =>searchPrefecture.includes(x.prefecture_id))
				searchProcess = prefectureFilter
			}
			//<--県名検索ここまで-->

			//<--国公立私立検索-->
			if(this.keyOperator.length>0){
				let searchOperator = this.keyOperator
				let operatorFilter  = searchProcess.filter(x =>searchOperator.includes(x.operator_id))
				searchProcess = operatorFilter
			}
			//<--国公立私立検索ここまで-->
			this.searchResults = searchProcess
			
		//検索結果をsearchResult.vueに送る
		this.$router.push({name: 'searchResult', params:{searchResults:this.searchResults}})
    　},
　}
}

</script>
