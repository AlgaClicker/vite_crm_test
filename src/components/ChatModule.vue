<script setup>
import { mapGetters, mapState, mapActions  } from 'vuex'
import moment from 'moment'
import store from '../store'
</script>
<template>
    <div class="card bg-light d-flex h-100">
        <div class="card-header">
            <div v-for="acc in accountsOnline_ws" class="btn-circle btn btn-info" v-bind:title="acc.username" >
                {{ acc.username.slice(0,2) }}
            </div>
        </div>
        <div class="card-body overflow-auto" id="bodyText">
            <div  v-for="msg in getMessages_chat">
                <div class="alert alert-primary text-end shadow rounded  my-4 " role="alert" v-if="msg.autor && msg.autor.id == account.id ">
                    <b>Я:</b> {{ moment(msg.created_at).format('H:mm:ss DD/MM') }}
                    <div class="p-1 text-bg-light">
                            {{ msg.message }} 
                    </div>
                </div>

                <div class="alert alert-success my-4 shadow" role="alert" v-if="msg.autor && msg.autor.id != account.id ">
                    <b>{{ msg.autor.username }}</b> {{ moment(msg.created_at).format('H:mm:ss DD/MM') }}
                    <div class="text-bg-light p-1 ">
                        {{ msg.message }}  
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">{{ account.username }}</span>
                </div>        
                <input type="text" :readonly="sendMessageFlag" class="form-control" id="messageTextInput"  @keyup.enter="onPressEnter"  placeholder="Сообщение" v-model="new_message.text" aria-label="Имя получателя" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="sendMessage">Отправить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listAccount: [],
            mesagges:[],
            sendMessageFlag: false,
            new_message: {
                text: '',
                autor: '',
            }
        }
    },
    updated() {
        console.log("updated")
        var container = document.getElementById("bodyText");
        container.scrollTop = container.offsetHeight+container.offsetTop;
        this.sendMessageFlag = false
        //bodyText
    },
    mounted() {
        store.dispatch('getListMessages')
        store.dispatch('ws_chat_init')
        
    },
    computed: {
        ...mapGetters({
        isAuth: 'isAuthenticated',
        account: 'StateAccount',
        accountsOnline_ws: 'accountsOnline_ws',
        sendMessage_chat: "sendMessage_chat",
        getMessages_chat: "getMessages_chat"
        }),
    },
    methods: {
        onPressEnter() {
            this.sendMessage()
        },
        async sendMessage() {
            //messageTextInput
            var container = document.getElementById("messageTextInput");
            this.sendMessageFlag = true
            console.log(this.new_message)
            let message = {
                text: this.new_message.text,
                autor: this.new_message.autor,
            }
            store.dispatch('sendMessage_chat',message)
            //this.mesagges = this.mesagges.map((ele)=>ele)
            this.mesagges.push(message); 
            console.log(this.mesagges)
               
        }
    }

}
</script>
<style>
.btn-circle {
    width: 48px;
    height: 48px;
    border-radius: 60%;
    text-align: center;
    margin-left: 5px;
    padding-left: 0;
    padding-right: 0;
    font-weight: 1050;
    font-size: 14px;
}
</style>