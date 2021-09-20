require("jsdom-global");
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import SearchResult from "../views/SearchResult.vue";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from "flush-promises";

Vue.use(Vuetify);

describe("methodsのテスト", () => {
    const localVue = createLocalVue();
    let vuetify;
  
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    //apiでgetする値のモック化
    it("addFavoriteが機能するか", async () => {
        const wrapper = mount(SearchResult, {
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
        //window.alertのモック化
        window.alert = jest.fn();
        //axios.getをモック化
        let mockAxios = new MockAdapter(axios);
        mockAxios.onGet('api/favorite/6').reply(200, {
         favorite_id: 1,
         user_id:6,
         subject_id:1,
         });

         //axios.postのモック化
         mockAxios.onPost('api/store').reply(200, {
            newFavorite: {
                subject_id: 1,
                user_id: 6
            },
            });
 
         axios.get("api/favorite/6").then(function (response) {
             console.log(response.data);
           })
           .catch(err => {
             console.log(err);
         });

        await wrapper.setData({
            user_id :6,
            newFavorite: {
                subject_id: 1,
                user_id: 6
            },
            registeredSubject_id: [1,2,3]
        });

         expect(wrapper.vm.newFavorite.subject_id).toBe(1);
         expect(wrapper.vm.newFavorite.user_id).toBe(6);

    await wrapper.vm.addFavorite();
    expect(wrapper.vm.addFavoriteResult).toBe(false);
     })
    });

// it('検索結果がない時はエラーが表示される', () => {
//   const wrapper = shallowMount(SearchResult,{
//   // //searchResultの中身が空の時
//   propsData:{
//     searchResults:Array[0]
//   }
//   })
//   // //エラーが描画される
//   expect(wrapper.text()).toBe('条件に合致するデータがありません。条件を変更して再検索してください。')
//   })

// it('検索結果がある時はエラーが表示されない', () => {
//   const wrapper = shallowMount(SearchResult,{
//   propsData:{
//     searchResults:{
//     0:{
//     //ダミーデータを作成
//     created_at:"2021-07-15 20:00:00",
//       department_id:280,
//       department_name:"外国語学部",
//       field_id_1:2,
//       field_id_2:6,
//       field_id_3:0,
//       field_id_4:0,
//       is_deleted:0,
//       major_id:696,
//       operator_id:1,
//       prefecture_id:23,
//       region_id:3,
//       subject_id:696,
//       subject_name:"ヨーロッパ学科",
//       university_id:97,
//       university_name:"愛知県立大学",
//       updated_at:"2021-07-15 20:00:00"
//     }
//     }
//     }
//   })
//   //エラーが描画されない
//   expect(wrapper.text().toBe(''))
//   })

//メソッドのテスト
// it('addfavorieの検証', async () =>{
//   jest.mock("axios", () => ({
//     get: jest.fn(() => Promise.resolve({ data:
//           {user_id:1,favorite_id:1},
//     }))
//   })
//   );
//   const wrapper = shallowMount(SearchResult,{
//   setData:{
//     newFavorite:{
//       subject_id:1,
//       user_id:1
//   }
//   }
//   })
//   // await wrapper.vm.addFavorite();
//   const addFavorite = wrapper.find('div')
//   console.log(addFavorite)
// })
