import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import CustomerList from './views/customer/CustomerList.vue'
import EmployeeList from './views/employee/employeeList.vue'
import ReportList from './views/report/ReportList.vue'

Vue.config.productionTip = false
// Đăng kí một directive tùy biến cấp toàn cục với tên là `v-focus`
Vue.directive('focus', {
  // Khi phần tử liên quan được thêm vào DOM...
  inserted: function (el) {
    // Ta gán focus vào phần tử đó
    el.focus()
  }
})
//1. Định nghĩa các path:
const routes = [
  { path: '/customer', component: CustomerList },
  { path: '/employee', component: EmployeeList },
  { path: '/report', component: ReportList }
]
//2. Khởi tạo router:
const router = new VueRouter({
  routes // short for `routes: routes`
})

//3. Khai báo sử dụng Vue-Router:
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
