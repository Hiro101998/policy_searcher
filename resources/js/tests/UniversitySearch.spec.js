require("jsdom-global");
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import UniversitySearch from "../views/UniversitySearch.vue";
import VueRouter from 'vue-router'
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

Vue.use(Vuetify);

describe("共通の準備",()=>{
    const localVue = createLocalVue();
    let vuetify;
    localVue.use(VueRouter)
    const router = new VueRouter();

        beforeEach(() => {
        vuetify = new Vuetify();
    });
it("検索機能が機能しているか",async()=>{
    let mockAxios = new MockAdapter(axios);
                mockAxios.onGet("api/universitySearch").reply(200, {
                universities:{
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
                university_name: "北海道大学",
                updated_at: "2021-07-15 20:00:00"
                },
                regions:{
                    region: "北海道・東北地方",
                    region_id: 1,
                },
                prefectures:{
                    prefecture:"北海道",
                    prefecture_id:1,
                },
                fields:{
                    created_at: "2021-06-09 20:00:00",
                    field_id: 1,
                    field_name: "文学",
                    updated_at: "2021-06-09 20:00:00",
                },
                operators:{
                    operator_id:1,
                    operator:"国公立"
                }
                });

                await axios
                    .get("api/universitySearch")
                    .then(function(response) {})
                    .catch(err => {
                        console.log(err);
                    });
    const wrapper = shallowMount(UniversitySearch, {
        stubs: ['router-link', 'router-view'],
       
        localVue,
        vuetify,
        router,
        propsData:{
            items:Array
        },
        setData:{
            keyWord:'北',
            keyField: [1],
            keyRegion: [1],
            keyPrefecture: [1],
            keyOperator: [1],
            universities:{
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
                university_name: "北海道大学",
                updated_at: "2021-07-15 20:00:00"
            }
        },
})
// wrapper.vm.searchUniversity();
console.log(wrapper.vm.searchResults)

});
})