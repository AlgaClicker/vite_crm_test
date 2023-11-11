import axios from 'axios';
import { instance } from '@/modules/webclient.js'
import router from '../router'
const state = {
    account: {
        id:'',
        username:'',
        role: {
            name: '',
            service: ''
        },
        company: {
            name: '',
            id: ''
        },
    },
    company: {
        name: ''
    },
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
};

const getters = {
    isAuthenticated: state  => !!state.account.id, 
    StateAccount: state => state.account,
    getRole: state => state.role,
    getCompany: state => state.company,
    getToken: state => state.token,
    getAuth: state => state.account,
};

const actions = {
    async logout({commit}) {
        console.log("logout({commit})") 
        commit('LogOut')
    },
    async getMe({commit}) {
        if (!getters.getToken) {
            this.dispatch('LogOut')
            return null
        }
        console.log()
        const  response = await instance.post('auth/me')
        commit('setAccount', response.data.data)
        commit('setRole', response.data.data.roles)
        
        commit('setCompany', response.data.data.company)
        this.dispatch('ws_init')
        //console.log('response')
        //console.log()
    },

    async LogIn({commit}, account) {
        localStorage.setItem('token',null)
        localStorage.removeItem('vuex')
        instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        await instance.post('auth/login', account).then((response) => {
            let data = response.data.data
            
            commit('setToken', data.token)
            commit('setCompany', data.company)
            commit('setAccount', data.account)
        })
        
        
        router.push('/cms')
      },
};

const mutations = {
    setRole(state, role){
        state.role = role
    },
    setCompany(state, company){
        state.company = company
    },
    setToken(state, token){
        state.token = token
        localStorage.setItem('token',token)
    },
    setAccount(state, account){
        state.account = account
    },
    LogOut(state){
        console.log("mutations LogOut(state)")
        this.dispatch('ws_close')
        state.account = {
            id:""
        }
        state.token = null
        state.company = null
        this.dispatch("clearError")
        
        localStorage.removeItem('token')
        localStorage.removeItem('vuex')
    },
};

export default {
  state,
  getters,
  actions,
  mutations
};