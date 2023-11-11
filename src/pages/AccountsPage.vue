<script setup>
    import { toRaw } from 'vue';
    import TableComponent from '../components/TableComponent.vue';
</script>
<template>

    <TableComponent v-bind:table="tbComponent" :deleteRecord="deleteRecord" paggiante="" :editRecord="editRecord" :addRecord="addRecord" v-bind:dataTable="dataTable" />
<!--
master: {
    label: "Мастер",
    input: true,
    dataList: this.masterList,
    value: (data) =>  {
        if (data) {
            return data.username
        } else {
            return "нет"
        }
    }
},
workpeople: {
    label: "Работники",
    input: false,
    value: (data) => {
        //console.log(data)
        return data.length
    }
}
-->    
</template>

<script>
import store from '../store';
import { mapGetters, mapState, mapActions  } from 'vuex'
import { toRaw, toValue,ref } from 'vue';
export default {
     data() {
        return {
            isNewRecord: false,
            isEditRecord: false,
            
            tbComponent: {
                header: {
                    title: "Список аккаунтов компании",
                },
                cols: {
                    id: {
                        label: "айди",
                        show: false,
                        input: false,
                        readonly: true,
                    },
                    
                    username: {
                        label: "Имя пользователя",
                        sort: true,
                        input: true,
                        readonly: true
                    },
                    email: {
                        label: "E-Mail",
                        sort: false,
                        show: false,
                        input: true,
                        readonly: true
                    },
                    email_confirmation: {
                        label: "Подтвердите E-Mail",
                        sort: false,
                        show: false,
                        input: true,
                        readonly: true
                    },

                    roles: {
                        label: "Роль",
                        sort: false,
                        input: true,
                        type: "select",
                        dataList: this.getRoles,
                        value: (data) => {
                            return data.name
                        }
                    },

                    password: {
                        label: "Пароль",
                        show: false,
                        input: true,
                    },
                    password_confirmation: {
                        label: "Подтвердите пароль",
                        show: false,
                        input: true,
                    },


                },
            }
        }
    },
    
    mounted() {
        this.getAccountsList()
        this.getRolesList()
        //store.dispatch("getAccountsList")
        console.log('mounted')
        this.tbComponent.cols.roles.dataList = this.getRoles
    },
    computed: {
        ...mapGetters({
            dataTable: "getAccounts",
            getRoles: "getRoles",
            getAccountsRole: "getAccountsRole",
            getErrorStatus: 'getErrorStatus',
            getErrorMessage: 'getErrorMessage',
        }),

    },
    methods: {
        ...mapActions({
            getAccountsList: "getAccountsList",
            getRolesList: "getRolesList",
            updateAccount: "updateAccount",
            addAccountRecord: "addAccount"
        }),
        editRecord: data => {
            var dataSend = {}
            dataSend.id = data.id
            dataSend.roles = data.roles

            if (data.password) {
                dataSend.password = data.password
                dataSend.password_confirmation = data.password_confirmation

            }
            
            store.dispatch("updateAccount",dataSend)
            
            console.log(data)
        },
        addRecord: data => {
            var dataSend = {}
            dataSend.username = data.username
            dataSend.password = data.password
            dataSend.password_confirmation = data.password_confirmation
            dataSend.email_confirmation = data.email_confirmation
            dataSend.email = data.email
            dataSend.roles = data.roles
            console.log(dataSend)
            //addAccountRecord(dataSend)
            
            store.dispatch("addAccount",dataSend) ;
            //console.log("addRecord",data,dataSend)
        },
        deleteRecord: id => {
            console.log("deleteRecord id:",id)
        }
    }
}
</script>
