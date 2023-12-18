<template>

    <div class="row">
        <button class=" col-2 btn btn-info my-2">Togle</button>
    </div>
    
    <transition>
    <div v-show="listNotifications" class="position-absolute bottom-0 end-0 mx-4 z-2">
        <div class="card card-sm" style="width: 18rem;">
            <ul class="list-group list-group-flush  overflow-auto">
                <li class="list-group-item" v-for="not in listNotifications">
                    <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">{{ not.title }}</h6>
                            <small class="text-muted">{{ not.from_account.username }}</small>
                    </div>
                    <p class="mb-1">{{ not.message }}</p>
                    <small class="text-muted">{{ dateFormatter(not.created_at) }}</small>
                </li>
            </ul>
        </div>
    </div>
    </transition>

    <div class="row h-100" >
        <div class="col-2 leftNavBar">
            <ul class="nav flex-column ">
                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0">
                    <router-link  class="nav-link " active-class="active" exact-active-class="exact-active" to="/cms/object">
                        <font-awesome-icon :icon="['fas', 'vector-square']" size="lg" /> Объекты
                    </router-link> 
                </li>
                <li class="nav-item">
                    <router-link  class="nav-link" active-class="active" exact-active-class="exact-active" to="/cms/chat">
                        <font-awesome-icon :icon="['fas', 'comments']" size="lg" />  Чат
                    </router-link> 
                </li>
                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0">
                    <router-link  class="nav-link" active-class="active" exact-active-class="exact-active" to="/cms/tabel">
                        <font-awesome-icon :icon="['fas', 'calendar-days']" size="lg" />
                        Табель
                    </router-link> 
                </li>

                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0 || getRole.service.indexOf('kadry') == 0">
                    
                    <a class="nav-link"  role="button"  @click="showKadry">
                        <font-awesome-icon :icon="['fas', 'people-robbery']" size="lg" /> 
                        Кадры
                    </a >
                </li>

                <transition>
                    <li class="nav-item" v-if="showMenuKadry && getRole.service.indexOf('upravlenie') == 0 || getRole.service.indexOf('kadry') == 0">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/kadry/payments/brigade">
                        <font-awesome-icon :icon="['fas', 'list-check']" />
                        Выплаты 
                    </router-link> 
                </li>                     
                </transition>




                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0 || getRole.service.indexOf('buxgalteriia') == 0">
                    
                    <a class="nav-link"  role="button"  @click="showBuh">
                        <font-awesome-icon size="lg" :icon="['fasr', 'calculator']" /> Бухгалтерия
                    </a >
                </li>
                <transition>
                <li class="nav-item " v-if="showMenuBuh && getRole.service.indexOf('upravlenie') == 0 || getRole.service.indexOf('buxgalteriia') == 0">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/buh/invoice">
                        <font-awesome-icon :icon="['fas', 'file-invoice']" />
                        Поступления
                    </router-link> 
                </li>         
                </transition>   
                <transition>
                <li class="nav-item" v-if="showMenuBuh && getRole.service.indexOf('upravlenie') == 0 || getRole.service.indexOf('buxgalteriia') == 0">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/buh/">
                        <font-awesome-icon :icon="['fas', 'receipt']" />
                        Списания
                    </router-link> 
                </li>         
                </transition>   
                


                <li class="nav-item" >
                 <a class="nav-link"  role="button"  @click="showDirs">
                    <font-awesome-icon :icon="['fas', 'rectangle-list']" size="lg"/> Справочники
                </a >
                </li>
                <transition>
                <li class="nav-item" v-if="showmenudirs && getRole.service.indexOf('upravlenie') == 0 || showmenudirs && getRole.service.indexOf('master') == 0">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/brigade">
                        <font-awesome-icon :icon="['fas', 'people-group']" />
                        Бригады
                    </router-link> 
                </li>         
                </transition>   

                <transition>
                <li class="nav-item " v-if="showmenudirs && getRole.service.indexOf('upravlenie') == 0">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/accounts">
                        <font-awesome-icon :icon="['fas', 'users']" />
                        Аккаунты
                    </router-link> 
                </li>
                </transition>

                <transition>
                <li class="nav-item " v-if="getRole.service.indexOf('upravlenie') == 0 && showmenudirs">
                    <router-link  class="nav-link sub-menu" active-class="active" exact-active-class="exact-active" to="/cms/partners">
                        <font-awesome-icon :icon="['fas', 'handshake-simple']" />
                        Контрагенты
                    </router-link> 
                </li>
                </transition>

                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0">
                    <router-link  class="nav-link" active-class="active" exact-active-class="exact-active" to="/cms/document">
                        <font-awesome-icon :icon="['fas', 'folder-open']" size="lg"/>
                        Документы
                    </router-link> 
                </li>

                <li class="nav-item" v-if="getRole.service.indexOf('upravlenie') == 0">
                    <router-link  class="nav-link" active-class="active" exact-active-class="exact-active" to="/cms/reports">
                        <font-awesome-icon :icon="['fas', 'folder-open']" size="lg"/>
                        Отчеты
                    </router-link> 
                </li>

            </ul>
        </div>
        <div class="col-8 overflow-auto py-3">
            <router-view></router-view>
        </div>
        <div class="col-2 overflow-auto bar-online" >
           
           <div class="accordion accordion-flush" id="accordionFlushExample" v-if="accountsOnline_ws">
            <p class="text-center">онлайн пользовтаели</p>
            <div class="accordion-item list-accounts" v-for="(onlineAcc, idx) in accountsOnline_ws">
                <h2 class="accordion-header" v-if="onlineAcc">
                <button class=" accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapseOne'+idx" aria-expanded="false" aria-controls="flush-collapseOne">
                    {{ onlineAcc.username }}
                </button>
                </h2>
                <div :id="'flush-collapseOne'+idx" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
	                    {{ onlineAcc.data}}
	                </div>
                </div>
            </div>
           </div>

        </div>
    
    </div>

</template>

<script>
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '../store'
export default {
    data() {
        return {
            username : "",
            showmenudirs: false,
            showMenuBuh: false,
            showMenuKadry: false,
            newNotification: false,
        }
    },
    computed: {
        ...mapGetters({
        isAuth: 'isAuthenticated',
        account: 'StateAccount',
        accountsOnline_ws: 'accountsOnline_ws',
        getRole: "getRole",
        listNotifications: "listNotifications"
        }),
         company: async () => {
            console.log("computed:company"+this.account)
        }
    },
    created() {
       
    },
    mounted() {
        console.log('mounted')
        
        store.dispatch("ws_init")
        store.dispatch("loadAccountsCompnay")
        
        //this.loadAccountsCompnay()
        //this.ws_join_notification()
        this.username = this.getMe
        
        console.log(this.account.company)
        store.dispatch('joinChatCompnay_ws',this.account.company.id)
        store.dispatch("joinNotification",this.account.id)
        //joinChatCompnay_ws
        //store.dispatch('userConnect_ws',this.account)
    },
    methods: {
        ...mapActions({
            login: 'LogIn',
            ws_init: 'ws_init',
            ws_join_notification: 'joinNotification',
            getMe: 'getMe',
            getAuth: 'getAuth',
            loadAccountsCompnay: 'loadAccountsCompnay'
            
        }),
        submit : async function(e) {
            console.log("subm"),
            await this.login({
                username: this.username,
                password: this.password
            })
        },
        showDirs() {
            console.log(this.showmenudirs)
            this.showmenudirs = !this.showmenudirs
            this.showMenuBuh = false
            this.showMenuKadry  = false
        },
        showBuh() {
            this.showMenuBuh = !this.showMenuBuh
            this.showmenudirs = false
            this.showMenuKadry  = false
        },
        showKadry() {
            this.showMenuKadry = !this.showMenuKadry
            this.showmenudirs = false
            this.showMenuBuh = false

        },
        dateFormatter(date) {
            
            if (typeof date == "string") {
                var d = new Date(date)
            } else {
                var d = new Date(date*1000)
            }
                
            
            return  d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+' '+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        }
    }
}
</script>
<style>
.accordion-button {
    background-color: #9cbcff !important;
    border-radius: 10px 0px 0px 0px !important;
    border: 0 !important;
    border-top: 2px solid #000000;
    padding: 5px 0 5px 0 !important;

}

.list-accounts > button > .accordion-header {
    padding: 0 0 0 0 !important;
    margin: 0 0 0 0 !important;
}

.button > .accordion-header  > button {
    padding: 0 0 0 0 !important;
}
.bar-online {
    padding-right: 0px !important;
}
.leftNavBar {
    min-width: 200px !important;
    
    

}
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>