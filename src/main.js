// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import 'vuetify/dist/vuetify.min.css'
import EditNoteModal from './components/editNoteModal.vue'
import DeleteNote from './components/deleteNote.vue'
import Footer from './components/footer.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('edit-note', EditNoteModal)
Vue.component('delete-note', DeleteNote)
Vue.component('site-footer', Footer)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyBRt3LAvhViKFV9sjx-rhWXF8aov5iKkC4',
      authDomain: 'keep-clone-93d2e.firebaseapp.com',
      databaseURL: 'https://keep-clone-93d2e.firebaseio.com',
      projectId: 'keep-clone-93d2e',
      storageBucket: 'keep-clone-93d2e.appspot.com'
    });
    this.$store.dispatch('loadNotes')
  }
})
