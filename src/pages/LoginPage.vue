<template>
    <div class="position-relative hv-100">
        <div class="position-absolute top-50 start-50">
            isAuth: {{ isAuth }}
            <div class="card px-5 py-5" id="form1">
                <div class="form-data" v-if="!submitted">
                    <div class="forms-inputs mb-4"> <span>Имя пользователя</span> <input autocomplete="off" type="text" v-model="username">
                        <div class="invalid-feedback">A valid email is required!</div>
                    </div>
                    <div class="forms-inputs mb-4"> <span>Пароль</span> <input autocomplete="off" type="password" v-model="password" >
                        <div class="invalid-feedback">Password must be 8 character!</div>
                    </div>
                    <div class="mb-3"> <button v-on:click.stop.prevent="submit" class="btn btn-dark w-100">Login</button> </div>
                </div>
                <div class="success-data" v-else>
                    <div class="text-center d-flex flex-column"> <i class='bx bxs-badge-check'></i> 
                        <span class="text-center fs-1">You have been logged in <br> Successfully</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions  } from 'vuex'
import router from '@/router'
export default {

    data() {
        return {
        username : "",
        emailBlured : false,
        valid : false,
        submitted : false,
        password: null,
        passwordBlured:false,
        auth: false
        }
    },
    computed: {

        ...mapGetters({
            getErrorStatus: 'getErrorStatus',
            getErrorMessage: 'getErrorMessage',
            isAuth: 'isAuthenticated'
        })
    },
    created() {


    },
    mounted() {
        console.log(this.isAuth)
        if (!this.isAuth) {
            this.logout()
        }
    },
    methods: {
        ...mapActions({
            logout: 'logout',
            login: 'LogIn'
        }),
        submit : async function(e) {
            console.log("subm"),
            await this.login({
                username: this.username,
                password: this.password
            })
        }
    }
}
</script>