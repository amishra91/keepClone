import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedNotes: [],
    loading: false
  },
  mutations: {
    setLoadedNotes (state, payload) {
      state.loadedNotes = payload
    },
    createNote (state, payload) {
      state.loadedNotes.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadNotes ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('notes').once('value').then((data) => {
        const notes = []
        const obj = data.val()
        for (let key in obj) {
          notes.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description
          })
        }
        commit('setLoading', false)
        commit('setLoadedNotes', notes)
      }).catch((error) => {
        console.log(error)
        commit('setLoading', true)
      })
    },
    createNote ({commit}, payload) {
      commit('setLoading', true)
      const note = {
        title: payload.title,
        description: payload.description
      }
      firebase.database().ref('notes').push(note).then((data) => {
        commit('setLoading', false)
        const key = data.key
        commit('createNote', {
          ...note,
          id: key
        })
      }).catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    loadedNotes (state) {
      return state.loadedNotes
    },
    loadedNote (state) {
      return (noteId) => {
        return state.loadedNotes.find((note) => {
          return note.id === noteId
        })
      }
    },
    loading (state) {
      return state.loading
    }
  }
})