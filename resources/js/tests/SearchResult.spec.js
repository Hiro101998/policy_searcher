require("jsdom-global");
import { shallowMount,createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import SearchResult from "../views/SearchResult.vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

Vue.use(Vuetify);

describe("ファイル中でvuetifyを読み込む処理", () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    describe("検索結果の有無による分岐が機能しているか",() =>{
        it("検索結果がない時はerrorMessageがtureになる", () => {
            const wrapper = shallowMount(SearchResult, {
                // //searchResultの中身が空の時
                propsData: {
                    searchResults: []
                }
            });
            //errorMessageが出る
            expect(wrapper.vm.errorMessage).toBe(true);
        });
    
        it("検索結果がある時はerrorMessageがfalseのまま", () => {
            const wrapper = shallowMount(SearchResult, {
                localVue,
                vuetify,
                propsData: {
                    searchResults: {
                        0: {
                            //ダミーデータを作成
                            created_at: "2021-07-15 20:00:00",
                            department_id: 1,
                            department_name: "ダミー学部",
                            field_id_1: 1,
                            field_id_2: 2,
                            field_id_3: 3,
                            field_id_4: 4,
                            is_deleted: 0,
                            major_id: 1,
                            operator_id: 1,
                            prefecture_id: 1,
                            region_id: 1,
                            subject_id: 6,
                            subject_name: "ダミー学科",
                            university_id: 6,
                            university_name: "ダミー大学",
                            updated_at: "2021-07-15 20:00:00"
                        }
                    }
                }
            });
            //検索結果が存在するため、エラーメッセージは出ない。
            expect(wrapper.vm.errorMessage).toBe(false);
        });
    })
    
    describe("お気に入り追加ボタンを押した時の処理が正常に機能するか",() =>{
        //共通で使うダミーデータの設定
        const wrapper = shallowMount(SearchResult, {
            localVue,
            vuetify,
            propsData: {
                searchResults: {
                    0: {
                        //ダミーデータを作成
                        created_at: "2021-07-15 20:00:00",
                        department_id: 1,
                        department_name: "ダミー学部",
                        field_id_1: 1,
                        field_id_2: 2,
                        field_id_3: 3,
                        field_id_4: 4,
                        is_deleted: 0,
                        major_id: 1,
                        operator_id: 1,
                        prefecture_id: 1,
                        region_id: 1,
                        subject_id: 1,
                        subject_name: "ダミー学科",
                        university_id: 1,
                        university_name: "ダミー大学",
                        updated_at: "2021-07-15 20:00:00"
                    }
                }
            }
        });
        // it("ゲストユーザを判定してお気に入り機能を制限できるか",async() =>{
        //     global.window = Object.create(window);
        //  Object.defineProperty(window, "Laravel", {
        //      value:1,
        //      configurable: true
        //  });
        //     console.log(window.Laravel)
        //     await wrapper.vm.addFavorite();
        //     expect(wrapper.vm.checkAuthority).toBe('')
        //    })
       
        describe("お気に入り追加時の重複チェックが機能するか",()=>{
            //ログインユーザのidを1以外にする。
         global.window = Object.create(window);
         Object.defineProperty(window, "Laravel", {
             value:6,
             configurable: true
         });
         //window.alertのモック化
         window.alert = jest.fn();
         //axios.getをモック化
         let mockAxios = new MockAdapter(axios);
         mockAxios.onGet("api/favorite/6").reply(200, {
             favorites: {
                 favorite_id: 1,
                 user_id: 6,
                 subject_id: 6
             }
         });
         //axios.postのモック化
         mockAxios.onPost("api/store").reply(200, {
             newFavorite: {
                 subject_id: 6,
                 user_id: 6
             }
         });
         axios
             .get("api/favorite/6")
             .then(function(response) {})
             .catch(err => {
                 console.log(err);
             });

             it("お気に入り重複がない時にお気に入りに追加されるか", async () => {
                await wrapper.setData({
                    clickId: 6,
                    newFavorite: {
                        subject_id: 6,
                        user_id: 6
                    },
                    registeredSubject_id: [1],
                });
                await wrapper.vm.addFavorite();
                expect(wrapper.vm.addFavoriteResult).toBe(true);
            });
        
            it("お気に入り重複時にはじかれること", async () => {
                await wrapper.setData({
                    clickId: 6,
                    newFavorite: {
                        subject_id: 6,
                        user_id: 6
                    },
                    registeredSubject_id: [6]
                });
                await wrapper.vm.addFavorite();
                expect(wrapper.vm.addFavoriteResult).toBe(false);
            });
        })   
  
    })
    
});

