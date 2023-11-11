import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    mesagges: [],
    message: {
      id: "",
      message: "",
      room:"",
      chat_messages:"",
      autor: ""
    }
};
const getters = {
  getMessages_chat: state  => state.mesagges, 
};

const actions = {
    async sendMessage_chat({commit},message) {
      console.log("message.length",message.text)
      if (!message.text) {
        return null
      }
      let dataSend= {
        message: message.text
      }
      console.log("sendMessage_chat",dataSend)
      
      await instance.post('api/v1/chat/send', dataSend).then((response) => {
        let data = response.data.data
        console.log("sendMessage_chat",data)
      })
    },

    async getListMessages({commit}) {
      let dataSend = ""
      await instance.post('api/v1/chat', dataSend).then((response) => {
        let data = response.data.data
        commit('setListMesagges',data)
        console.log("ListMessage_chat",data)
      })
    },

    async ws_chat_init({commit}) {

      if (typeof window.Echo !== 'undefined') {
        let company =  await this.getters.getCompany
        console.log("ws_chat_init", company)

        await window.Echo.private('chat.'+company.id)
        .listen(".newMessage", message => {
          console.log("newMessage:chat.new_message",message)
          commit('addMessage_chatlist',message.messageBody)
        })
        .listen(".newPrivateMessage", message => {
          console.log("newMessage:chat.newPrivateMessage",message)
          commit('addMessage_chatlist',message.messageBody)
        });
      }
    }
};

const mutations = {
  addMessage_chatlist(state,message) {
    
    console.log('addMessage_chatlist',message)
    let listMessages = state.mesagges.map((elem)=> toRaw(elem))
    //listMessages = listMessages.push(message)
    let newList = []
    newList.push(message)
    newList= listMessages.concat(newList)
    console.log(newList)
    state.mesagges = newList
    //state.mesagges = state.mesagges.push(JSON.stringify(message))
  },
  setListMesagges(state, messages){
    
    let listMessages = messages.map((elem)=>toRaw(elem))
    state.mesagges = listMessages.reverse()
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};