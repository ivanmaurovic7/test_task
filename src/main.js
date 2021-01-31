import Vue from 'vue'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit)
library.add(faTrash)
library.add(faCheck)
library.add(faCheck)
library.add(faTimes)

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
