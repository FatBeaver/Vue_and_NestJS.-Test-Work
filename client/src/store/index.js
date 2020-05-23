import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contacts: [],
        loading: false
    },
    mutations: {
        updateContacts(state, contacts) {
            state.contacts = contacts
        },
        isLoading(state) {
            state.loading = true
        },
        isNotLoading(state) {
            state.loading = false
        }
    },
    actions: {
        fetchContacts(context, query = '') {
            context.commit('isLoading')
            axios.get(`http://localhost:3000/contact/${query}`)
            .then(response => {
                if (response.data.issetContacts === false) {
                    context.commit('isNotLoading')
                    context.commit('updateContacts', [])
                }
                context.commit('updateContacts', response.data)
                context.commit('isNotLoading')
            })
        }
    },
    getters: {
        allContacts(state) {
            return state.contacts
        },
        loading(state) {
            return state.loading
        }
    },
    modules: {
    }
})
