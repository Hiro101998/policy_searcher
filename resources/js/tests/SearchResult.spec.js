require('jsdom-global');
import { shallowMount,mount,createLocalVue } from '@vue/test-utils';
import Vue from "vue";
import Vuetify from "vuetify";
import SearchResult from '../views/SearchResult.vue';
import flushPromises from "flush-promises"

Vue.use(Vuetify)

describe("methodsのテスト", () => {
  const localVue = createLocalVue();
  let vuetify;
  
  beforeEach(() => {
    vuetify = new Vuetify();
  })

  it('addFavoriteが発火できること',async() => {
    // jest.mock("axios", () => ({
    //   get: jest.fn(() => Promise.resolve({ data: 
    //         {user_id:1,favorite_id:1},
    //   }))
    // })
    // );

    const wrapper = mount(SearchResult, {
      localVue,
      vuetify,
      setData:{
            newFavorite:{
              subject_id:1,
              user_id:1
          }
          }
    })
    console.log(jest.spyOn(SearchResult.methods,'addFavorite'))
    await wrapper.find('div').trigger('click')

    expect(spyAddFavorite).toHaveBeenCalledTimes(1)

    // // // ボタンのクリックをシミュレート
    // button.trigger('click')
    // await flushPromises()
    // // // モックイベントが呼び出されたことを確認
    // expect(spyAddFavorite).toHaveBeenCalledTimes(1)
  })
})

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






