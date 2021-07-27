import Router from 'vue-router'
import Home from './views/Home.vue'
import UniversitySearch from './views/UniversitySearch.vue'
import SearchResult from './views/searchResult.vue'
import Favorite from './views/Favorite.vue'

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/universitySearch',
      name: 'universitySearch',
      component: UniversitySearch,
      props:true
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult,
      props:true
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      props:true
    },
  
  ]
});