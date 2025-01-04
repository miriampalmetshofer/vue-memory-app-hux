import StartScreen from '../components/screens/StartScreen.vue'
import ConfigScreen from '../components/screens/ConfigScreen.vue'
import GameScreen from '../components/screens/GameScreen.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '', component: StartScreen},
  { path: '/config', component: ConfigScreen },
  { path: '/game', component: GameScreen },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }