<template>
    <v-app>
         <div v-if="errorMessage">
            <v-alert colored-border type="warning" elevation="2">
                条件に合致するデータがありません。条件を変更して再検索してください。
            </v-alert>
        </div>
        <div v-else>
            <v-row>
                <v-col
                    v-for="searchResult in searchResults"
                    :key="searchResult.index"
                    cols="12"
                    sm="4"
                >
                    <v-hover v-slot:default="{ hover }">
                        <v-card>
                            <v-card-text>
                                <h2>
                                    {{ searchResult.university_name }}
                                </h2>
                                <h3>{{ searchResult.department_name }}</h3>
                                <p>{{ searchResult.subject_name }}</p>
                            </v-card-text>

                            <v-fade-transition>
                                <v-overlay
                                    v-if="hover"
                                    absolute
                                    color="#036358"
                                >
                                    <v-btn
                                        @click="
                                            moreInfo(searchResult.subject_id)
                                        "
                                    >
                                        See more info
                                    </v-btn>
                                </v-overlay>
                            </v-fade-transition>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <!-- ここからダイアログ -->
            <v-row v-for="display in displays" :key="display.index">
                <v-col justify="center">
                    <v-dialog v-model="dialog" width="800px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">３ポリシー</span>
                            </v-card-title>
                            <v-card-text>
                                <h2>ディプロマポリシー</h2>
                                <a
                                    v-bind:href="`${display.dp_url}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >ディプロマポリシーのリンク</a
                                >
                                <p style="white-space:pre-line;">
                                    {{ display.diploma_policy }}
                                </p>
                                <h2>カリキュラムポリシー</h2>
                                <a
                                    v-bind:href="`${display.cp_url}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >カリキュラムポリシーのリンク</a
                                >
                                <p style="white-space:pre-line;">
                                    {{ display.curriculum_policy }}
                                </p>
                                <h2>アドミッションポリシー</h2>
                                <a
                                    v-bind:href="`${display.ap_url}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >アドミッションポリシーのリンク</a
                                >
                                <p style="white-space:pre-line;">
                                    {{ display.admission_policy }}
                                </p>
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
                </v-col>
            </v-row>
        </div>
       
    </v-app>
</template>

<script>
//  window.location.href = 'main#/universitySearch'
import axios from 'axios'
export default {
    props: ["searchResults"],
    data() {
        return {
            errorMessage:false,
            clickId: "",
            dialog: false,
            displays: [],
            favorites: [],
            favoriteSubject_id: [],
            registeredSubject_id: [],
            checkAuthority:true,
            addFavoriteResult:'',
            newFavorite: {
                user_id: "",
                subject_id: ""
            }
        };
    },
    mounted(){
        if(this.searchResults.length <1){
            this.errorMessage = true
        }
    },
    methods: {
        moreInfo(getSubjectId) {
            this.clickId = getSubjectId;
            const getPolicyUrl = "/api/policy/" + getSubjectId;
            axios
                .get(getPolicyUrl)
                .then(response => {
                    this.displays = response.data.policies;
                })
                .catch(error => {
                    console.log(error);
                });
            this.dialog = true;
        },
        reset() {
            (this.clickId = ""), (this.displays = "");
            this.dialog = false;
        },

        //お気に入りに追加する
        async addFavorite() {
            //ゲストユーザーはお気に入り登録できない
            const user_id = window.Laravel
             if (user_id == 1) {
                alert("ゲストユーザーはお気に入り機能を利用できません");
                this.checkAuthority = false
            } else {
                this.newFavorite.subject_id = this.clickId;
                this.newFavorite.user_id = user_id;
                //重複チェック
                const getFavoriteUrl = "/api/favorite/" + window.Laravel;
                await axios
                    .get(getFavoriteUrl)
                    .then(response => {
                        //お気に入りデータの取得
                        let favorites = response.data.favorites;
                        for (let i = 0; i < favorites.length; i++) {
                            this.registeredSubject_id.push(
                                favorites[i].subject_id
                            );
                        }
                        if (
                            this.registeredSubject_id.includes(
                                this.newFavorite.subject_id
                            )
                        ) {
                            alert("お気に入りに登録済です。");
                            this.addFavoriteResult =false;
                        } else {
                            let favorite = this.newFavorite;
                            axios.post("/api/store", favorite).then(res => {
                                // favoite関係のデータをリセットする。
                                this.favorites = [];
                                this.registeredSubject_id = [];
                            });
                            alert("お気に入りに追加しました。");
                            this.dialog = false;
                            this.addFavoriteResult =true
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
        
    }
};
</script>