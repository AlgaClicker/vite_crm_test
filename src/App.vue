<script setup>

</script>

<template>
  <div class="menu">
    <div class="col overflow-auto">
      <nav class="navbar navbar-light bg-light navbar-expand-sm justify-content-between px-3">
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item" v-show="isAuth">
          <router-link  class="nav-link" active-class="active" to="/cms">ЦМС</router-link>
        </li>
        <li class="nav-item" v-show="!isAuth" active-class="active">
          <router-link  class="nav-link" active-class="active" to="/login">Вход</router-link> 
        </li>
        <li class="nav-item" v-if="isAuth">
          <a href="#" class="nav-link" v-on:click="logout">Выход</a> 
        </li>

        <li class="nav-item" v-if="isAuth">
          
        </li>
      </ul>
      
      <form class="form-inline my-2 my-lg-0 " v-if="company && account">
        <button class="btn btn-outline-secondary my-2 mx-3 my-sm-0">
          <font-awesome-icon :icon="['fas', 'house-laptop']" />
          {{ company.name }}
        </button>  
      <button class="btn btn-outline-dark my-2 my-sm-0">
        <font-awesome-icon :icon="['fas', 'user-tie']" />
        {{ account.username }}
      </button>
      
      </form>
    </nav>

    </div>
  </div>
  <div class="layout">
    <div class="col h-100 overflow-auto"> 
      <router-view></router-view>
    </div>

  </div>
  <div class="fixed-bottom footer" v-if="getErrorStatus">
      Error status: <span v-if="getErrorStatus">{{ getErrorMessage }}</span>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from './store';
export default {
  computed: {
    ...mapGetters({
        isAuth: 'isAuthenticated',
        account: 'StateAccount',
        company: 'getCompany',
        getErrorStatus: 'getErrorStatus',
        getErrorMessage: 'getErrorMessage',
        role: 'getRole'
    })
  },
  mounted(){
    //console.log("APP mounted",this.company)
    
    this.$store.dispatch('loadActiveSpecificationList')
  },
  methods: {
    ...mapActions(["loadActiveSpecificationList"]),
    async logout (){
        this.$store.dispatch('logout')
        this.$router.push('/')
    }
  }
}
</script>
<style >


.footer {
  background-color: brown;
  width: 100%;
  color: aliceblue;
  text-align: center;
}


.layout {
  min-height: calc(100% - 50px) !important; 
  padding-bottom: 20px;
  height: 100%;
}
.menu {
  min-height: 50px !important;
  height: 50px;
}
</style>
