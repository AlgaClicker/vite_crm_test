import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
  orderBy: {},

};
const getters = {
     getSorted:(state)=>state.orderBy,

     getOrderBy(state){
      console.log('getOrderBy',state.orderBy)
      return state.orderBy
     }
};

const actions = {
    async setSort({commit},col) {
      console.log('setSort',col)
      commit('setSort',col)
      
    },

    async setOrderBy({commit},orderBy){
      if (!orderBy) {
        orderBy = {
          "name": "ASC",
          "createdAt": "DESC"
        }
      }
      commit('setOrderBy',orderBy)
      console.log('orderBy',orderBy)
    }
};

const mutations = {
  setOrderBy(state,orderBy) {
    state.orderBy = orderBy
  },

  setSort(state,col) {
    let sort = []

    if (state.orderBy.hasOwnProperty(col)) {
        console.log("setSort _1:",state.orderBy)
        if (state.orderBy[col] != "ASC") {
          sort[col] = "ASC"
        } else {
          sort[col] = "DESC"
        }
    } else {
      sort[col] = "DESC"
    }
    state.orderBy = sort

    console.log(state.orderBy[col])
    console.log('mutations setSort',state.orderBy)
    
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};