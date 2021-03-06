import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Calendar from '@/components/CalendarPage'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/calendar/:nickname',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
