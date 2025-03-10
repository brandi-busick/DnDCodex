import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MonstersView from '@/views/MonstersView.vue'
import ItemsView from '@/views/ItemsView.vue'
import SpellsView from '@/views/SpellsView.vue'
import SpellPage from '@/views/SpellPage.vue'
import MonsterPage from '@/views/MonsterPage.vue'
import ItemPage from '@/views/ItemPage.vue'
import CreateNewView from '@/views/CreateNewView.vue'
import SourcesListView from '@/views/SourcesListView.vue'
import SourcePage from '@/views/SourcePage.vue'
import MonsterBuilder from '@/views/MonsterBuilder.vue'
import LazyGMResourcePage from '@/views/LazyGMResourcePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/monsters',
      name: 'monsters',
      component: MonstersView
    },
    {
      path: '/monsters/:id',
      component: MonsterPage
    },
    {
      path: '/magic-items',
      name: 'magic-items',
      component: ItemsView
    },
    {
      path: '/magic-items/:id',
      name: 'magic-item',
      component: ItemPage
    },
    {
      path: '/spells',
      name: 'spells',
      component: SpellsView
    },
    {
      path: '/spells/:id',
      name: 'spell',
      component: SpellPage
    },
    {
      path: '/create/monster',
      component: CreateNewView
    },
    {
      path: '/source/:type/:id',
      component: SourcePage
    },
    {
      path: '/sources',
      component: SourcesListView
    },
    {
      path: '/monsterBuilder',
      component: MonsterBuilder
    },
    {
      path: '/lazygmresource',
      component: LazyGMResourcePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
