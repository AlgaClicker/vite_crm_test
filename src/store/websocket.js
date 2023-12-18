//import * from '@/modules/websocket.js'
import Echo from 'laravel-echo';
import { isProxy, toRaw, ref } from 'vue';

const state = {
    channels: [],
    company_id: null,
    account_id: null,
    accountsOnline: [],
    notifications: []
};

const getters = {
    accountsOnline_ws: state  =>  state.accountsOnline, 
    listNotifications: state => state.notifications
};

const actions = {
    async ws_init({commit}) {
        console.log("init WS")
        
        if (typeof window.Echo === 'undefined') {
            commit('clearState')    
            console.log("Create socket client ",import.meta.env)
            
            let authHostSll = import.meta.env.VITE_APP_WS_SSL == "true" ? 'https' : 'http'
            console.log(" socket client authHostSll",authHostSll)
            window.Echo = new Echo({
                broadcaster: 'socket.io',
                host: authHostSll +'://'+import.meta.env.VITE_APP_WS_HOST+':'+import.meta.env.VITE_APP_WS_PORT,
                wsHost: import.meta.env.VITE_APP_WS_HOST,
                wsPort: import.meta.env.VITE_APP_WS_PORT,
                disableStats: import.meta.env.VITE_APP_WS_SSL == "true" ? true : false,
                forceTLS: import.meta.env.VITE_APP_WS_SSL == "true" ? true : false,
                token: this.getters.getToken,
                transports: ['websocket'],
                auth:
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.getters.getToken
                    }
                }
            });

            window.Echo.connector.socket.on("connect", function () {
                console.log("socket_client:CONNECTED");
            });
              
            window.Echo.connector.socket.on("reconnecting", function () {
                console.log("socket_client:CONNECTING");
            });
              
            window.Echo.connector.socket.on("disconnect", function () {
                console.log("socket_client:DISCONNECTED");
            });

            console.log("Compiled socket client ")

            return window.Echo
        } 
        
        return window.Echo
    },
    ws_close({commit}){
        if (typeof window.Echo != 'undefined') {
            window.Echo.leaveAllChannels()
        }
        
    },
    async leaveChannel({commit},channel) {
        window.Echo.leaveAllChannels()
    },
    joinNotification({commit},id) {
        //this.ws_init({commit});
        console.log("joinNotification: join");
        
        window.Echo.join('notifications.'+id)
            .here((users) => {
                console.log("joinNotification:here users:",users);
            })
            .error((error) => {
                console.log("joinNotification: error:",error);
            })
            .listen('.newNotification', (notification) => {
                console.log("listen: newNotification:",notification);
                console.log("newNotification: presence-notifications:",notification);
                commit('addNotification',notification.notification)
            })
            
            window.Echo.private('newNotification').listen('.presence-notifications.'+id, (e)=>{
                //console.log("newNotification: presence-notifications:",e);
                //commit('addNotification',e.notification)
            })
    },

    joinChatCompnay_ws({commit},id) {
        console.log("joinOnlineAccount_ws: join");
        const joinChannel = window.Echo.join('online.'+id)
        .here((accounts) => {
                console.log("joinOnlineAccount_ws:here")
                console.log(accounts)
                commit('setAccountsOnline', toRaw(accounts))
                
        }).joining(function (account)  {
            console.log("joinOnlineAccount_ws:joining")
            console.log(account)
            commit('joinAccount', account)

        }).leaving(function (account){
            console.log("joinOnlineAccount_ws:leaving")
            console.log(account)
            commit('leavingAccount', account)
        }).listen('user.online', (account) => {
            console.log("lister")
            console.log(account)
            

        }).error((error) => {
            console.log("joinOnlineAccount_ws: error");
            console.error(error);
        });

        console.log('joinChatCompnay_ws:',joinChannel);
    },

    async userConnect_ws({commit},account) {
        console.log("userConnect_ws: join");
        console.log('account Id:'+account.id);
        window.Echo.join('accounts.online.'+account.id)
        .here(function (messages) {
                console.log("joinChatChannel:here")
         
                console.log(messages)
        }).joining(function (account)  {
            console.log("joinChatChannel:joining")
           
            console.log(account)
        }).leaving(function (account){
            console.log("joinChatChannel:leaving")
            console.log(account)
            
        }) 
    }
};

const mutations = {
    clearState(state){
        state.channels = [],
        state.company_id = null,
        state.account_id = null,
        state.accountsOnline = []
    },
    setAccountsOnline(state, accounts){
        console.log("setAccountsOnline",accounts)
        if (isProxy(accounts)){
            state.accountsOnline = toRaw(accounts)
        } else {
            state.accountsOnline = accounts
        }
       
    },
    addNotification(state,not) {
        if (state.notifications.length > 5) {
            state.notifications =  state.notifications.slice(1,state.notifications.length)
        }
        state.notifications.push(not)
    },
    joinAccount(state, account){
        //state.accountsOnline = state.accountsOnline.push(account)
        console.log("mutations:joinAccount")
        console.log(state.accountsOnline)
        console.log(account);
        state.accountsOnline = state.accountsOnline.map((ele)=>ele)
        state.accountsOnline.push(account)
        //state.accountsOnline = [account,state.accountsOnline ]
        //state.accountsOnline = state.accountsOnline.push(account)

    },

    leavingAccount(state, account){
        console.log("mutations:leavingAccount")
        
        let data = state.accountsOnline.filter((ele)=>{
            console.log("account",account.account)
            if (ele.account.id !== account.account.id) {
                console.log("element:",ele.account)
                return ele
            }
            
        })
        state.accountsOnline = data
        console.log("data");
        console.log(data);
        
    },

};



export default {
  state,
  getters,
  actions,
  mutations
};