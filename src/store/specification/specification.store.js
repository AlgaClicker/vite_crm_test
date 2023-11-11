import { httpRequest } from '@/modules/webclient.js'

const mutations = {
    SPECIFICATION_ERROR(state, error){
        Vue.notify({
            group: 'foo',
            title: 'Ошибка',
            type: 'error',
            text: error.message
        })      
        state.specificationError = error
    },  
    SPECIFICATION_GET_LIST(state, data){
        state.specificationError = ''
        state.specificationList = data
    },
    SPECIFICATION_SET_LIST_IZM(state, data){
        state.specificationListIZM = data
    },
    SPECIFICATION_GET(state, data){
        state.errorSpecification = ''
        state.specification = data
    },
    SPECIFICATION_SET_FIXED(state, flag){
        state.specification.fixed = flag
    },
    SPECIFICATION_SET_LIST(state, data){
        state.errorSpecification = ''
        state.specificationList.push(data)
    },
    SPECIFICATION_LOADING(state){
        state.specificationLoading = !state.specificationLoading
    },
}

const actions = {
    async specificationGetListActions( { commit }, id ) {
        const data = await httpRequest('crm/specification/', 'post', { objectId: id })  
        if(data.status == 406){
            commit("SPECIFICATION_GET_LIST", [])
        }
        if(data.code == 200){
            commit("SPECIFICATION_GET_LIST", data.data || [])
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationAddActions( { commit }, form){
        const data = await httpRequest('crm/specification/add', 'post', form )
        if(data.code == 200){
            commit('SPECIFICATION_SET_LIST', data.data)
        }
        else if(data.status == 422){
            commit("SPECIFICATION_ERROR", 'Заполните все поля')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationGetByIdActions( { commit }, form){
        const data = await httpRequest('crm/specification/', 'post', form)
        if(data.code == 200){
            commit('SPECIFICATION_GET', data.data)
        } else if(data.status == 422){
            commit("SPECIFICATION_ERROR", 'Заполните все поля')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationAddIZMActions( { commit, getters }, params ){

        const data = await httpRequest('crm/specification/change/add', 'post', {
            id: getters.specificationGetter.id,
            name: params.form.name,
            description: params.form.description,
        } )

        if(data.code == 200){
            commit('SPECIFICATION_GET', data.data)

            Vue.notify({
                group: 'foo',
                title: 'Успех',
                type: 'success',
                text: 'Изменение созданно'
            })

        }
        else if(data.status == 422){
            commit("SPECIFICATION_ERROR", 'Заполните все поля')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationFixedActions( { commit, getters }){
        
        const data = await httpRequest('crm/specification/fixed', 'post', { id: getters.specificationGetter.id})

        if(data.code == 200){
            commit('SPECIFICATION_SET_FIXED', true)
        }
        else if(data.status == 422){
            commit("SPECIFICATION_ERROR", 'Заполните все поля')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationUnFixedActions( { commit, getters }){

        const data = await httpRequest('crm/specification/unfixed', 'post', { id: getters.specificationGetter.id})

        if(data.code == 200){
            commit('SPECIFICATION_SET_FIXED', false)
        }
        else if(data.status == 422){
            commit("SPECIFICATION_ERROR", 'Заполните все поля')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationSetListIZMActions( { commit } ,form){
        
        let listIZM = []

        const data = await httpRequest('crm/specification/', 'post', form)
        
        if(data.code == 200){

            listIZM.push( {
                id: data.data.id,
                name: data.data.name,
                idx: data.data.idx,
                created_at: data.data.created_at
            })

            if(typeof data.data.children != 'undefined' && data.data.children != []){
                for(var i = 0; i < data.data.children .length; i++){
                    listIZM.push({
                        id: data.data.children [i].id,
                        name: data.data.children [i].name,
                        idx: data.data.children [i].idx,
                        created_at: data.data.children [i].created_at
                    })
                }
            }

            commit('SPECIFICATION_SET_LIST_IZM', listIZM)
        }
        else if(data.status == 500){
            commit("SPECIFICATION_ERROR", 'Ошибка на сервере')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    },
    async specificationDeleteActions( { commit }, id){

        const data = await httpRequest('crm/specification/', 'delete', { id: id})

        if(data.code == 200){
            Vue.notify({
                group: 'foo',
                title: 'Успех',
                type: 'success',
                text: 'Спецификация удалена'
            })
        }
        if(data.code == 500){
            commit("SPECIFICATION_ERROR", 'Ошибка на сервере')
        }
        else{
            commit("SPECIFICATION_ERROR", data.data)
        }
    }
}

const getters = {
    specificationListGetter: (state) => state.specificationList,
    specificationListIZMGetter: (state) => state.specificationListIZM,
    specificationGetter: (state) => state.specification,
    specificationIsFixedGetter: (state) => state.specification.fixed,
    specificationErrorGetter: (state) => state.specificationError,
    specificationLoadingGetter: (state) => state.specificationLoading,
}

const state = () => ({
    specification: {},
    specificationList: [],
    specificationListIZM: [],
    specificationError: '',
    specificationLoading: false,
})

export default {
    mutations,
    getters,
    actions,
    state,
}

