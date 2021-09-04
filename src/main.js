import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faEye, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import App from './App'

library.add(faAngleUp, faEye, faComment)

Vue.component('fa', FontAwesomeIcon)
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
