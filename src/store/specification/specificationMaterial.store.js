import { httpRequest } from '@/modules/webclient.js'
//import _ from 'lodash'
import Vue from 'vue'

const mutations = {
    SPECIFICATION_MATERIAL_ERROR(state, error){     
        state.specificationMaterialError = error
    },  
    SPECIFICATION_MATERIAL_ADD_ROW(state){
        var rowKey = String(Math.random())
        var index = state.specificationMaterialList.length == 0 
            ? 0
            : state.specificationMaterialList[state.specificationMaterialList.length - 1].index + 1

        state.specificationMaterialList.push({
            id: '',
            index: index,
            saveIs: true,
            deleteIs: true,
            position: state.specificationMaterialList.length + 1,
            fullname: '',
            type: '',
            description: '',
            code: '',
            rowKey: rowKey,
            unit: '',
            quantity: 0,
            vendor: '',
            material: '',
        })
    },
    SPECIFICATION_MATERIAL_GET_LIST( state, data){

        let material = []
        state.specificationMaterialError = ''
        if(data.length != 0) {
            material = data.map( (item) => {
                return { ...item, unit: item.unit.title, saveIs: true, rowKey: String(Math.random()) }
            })
        }

        for(let i = 0; i < material.length; i++){
            state.specificationMaterialList.splice(
                state.specificationMaterialList.indexOf(state.specificationMaterialList.filter( item => item.position == material[i].position)[0]),
                1,
                material[i]
            )
        }   

        state.specificationMaterialList = state.specificationMaterialList.sort( (a, b) => Number(a.position) - Number(b.position) )
    },
    SPECIFICATION_MATERIAL_GET_HISTORY_LIST(state, data){
        state.specificationMaterialError = ''
        state.specificationMaterialHistoryList = data
    },
    SPECIFICATION_MATERIAL_EDIT(state, material){

        let index
        index = state.specificationMaterialList.indexOf(state.specificationMaterialList.filter( item => item.rowKey == material.rowKey)[0])

        Vue.set(state.specificationMaterialList, index, { 
            ...material,
            saveIs: false
        })

        state.specificationMaterialSaveIs = false
    },
    SPECIFICATION_MATERIAL_COPY(state, params){

        var indexs
        var endIndex 
        var startIndex

        startIndex = state.specificationMaterialList.filter(item => item.rowKey == params.rangeKeys.startRowKey)[0].index
        endIndex = state.specificationMaterialList.filter(item => item.rowKey == params.rangeKeys.endRowKey)[0].index
        indexs = Array.from({ length: endIndex + 1 - startIndex }, (_, i ) => i += startIndex );

        for( var i = 0; i <= indexs.length; i++){
            
            if(state.specificationMaterialList[i].id != ''){
                console.log({
                    ...state.specificationMaterialList[i],
                    ...params.data[i],
                    position: state.specificationMaterialList[i].position,
                    saveIs: false
                })
                state.specificationMaterialList[i] = {
                    ...state.specificationMaterialList[i],
                    ...params.data[i],
                    position: state.specificationMaterialList[i].position,
                    saveIs: false
                }
            }else{
                state.specificationMaterialList[i].saveIs = false
            }
        } 

        state.specificationMaterialSaveIs = false
    },
    SPECIFICATION_MATERIAL_AUTOFILE(state, params){
        var indexs = []

        for(let i = 0; i < params.targetSelectionData.length; i++) {
            indexs.push( state.specificationMaterialList.indexOf(state.specificationMaterialList.filter( item => item.rowKey == params.targetSelectionData[i].rowKey)[0]))
        }
 
        for (let i = 0; i < indexs.length; i++) {
            state.specificationMaterialList.splice(indexs[i], 1, {
                ...params.sourceSelectionData[(i + indexs.length) % params.sourceSelectionData.length],
                ...state.specificationMaterialList[indexs[i]],
                saveIs: false
            })
        }

        state.specificationMaterialSaveIs = false
    },
    SPECIFICATION_MATERIAL_ADD_ABOVE(state, params){

        console.log(params.rowIndex)
        let beforeList = state.specificationMaterialList.slice(0, params.rowIndex + 1).map( item => item = {
            ...item,
            saveIs: false
        })

        beforeList[beforeList.length - 1] = {
            id: '',
            index: Number(beforeList[beforeList.length - 1].index),
            saveIs: true,
            deleteIs: true,
            position: Number(beforeList[beforeList.length - 2].position) + 1,
            fullname: '',
            type: '',
            description: '',
            code: '',
            rowKey: String(Math.random()),
            unit: '',
            quantity: 0,
            vendor: '',
            material: '',
        }

        let afterList = state.specificationMaterialList.slice(params.rowIndex , state.specificationMaterialList.length).map( item => item = {
            ...item,
            position: Number(item.position) + 1,
            index: item.index + 1,
            saveIs: false
        })

        state.specificationMaterialList = beforeList.concat(afterList)
        state.specificationMaterialSaveIs = false
    },
    SPECIFICATION_MATERIAL_ADD_BELOW(state, params){
        
        let beforeList = state.specificationMaterialList.slice(0, params.rowIndex + 1)
        
        let afterList = state.specificationMaterialList.slice(params.rowIndex + 1, state.specificationMaterialList.length).map( item => item = {
            ...item,
            position: Number(item.position) + 1,
            index: item.index + 1,
            saveIs: false
        })

        beforeList.push({
            id: '',
            index: Number(afterList[0].index) - 1,
            saveIs: true,
            deleteIs: true,
            position: Number(afterList[0].position) - 1,
            fullname: '',
            type: '',
            description: '',
            code: '',
            rowKey: String(Math.random()),
            unit: '',
            quantity: 0,
            vendor: '',
            material: '',
        })

        state.specificationMaterialList = beforeList.concat(afterList)
        state.specificationMaterialSaveIs = false
    },
    SPECIFICATION_MATERIAL_CLEAR(state){
        state.specificationMaterialError = ''
        state.specificationMaterialList = []
    },
    SPECIFICATION_MATERIAL_SET_MATERIAL(state, form){
        let index = 0
        index = state.specificationMaterialList.findIndex(item => item.id == form.id)

        state.specificationMaterialList.splice(index, 1, {
            ...state.specificationMaterialList[index],
            material: form.material
        })
    },
    SPECIFICATION_MATERIAL_LOADING(state){
        state.specificationMaterialLoading = !state.specificationMaterialLoading
    },
    SPECIFICATION_MATERIAL_ADD_SEARCH(state, data){
        state.specificationMaterialDirectoryList = []
        state.specificationMaterialDirectoryList = data
    },
    SPECIFICATION_MATERIAL_SAVE(state){
        state.specificationMaterialSaveIs = true 
    },
    SPECIFICATION_MATERIAL_DELETE_ROWS(state, materials){

        let afterList
        let beforeList

        state.specificationMaterialDeleteList.push( ...materials.filter(item => item.id != ''))

        if(Number(materials[0].position) == 1){

            beforeList = state.specificationMaterialList
            .slice(Number(materials[materials.length - 1].position), state.specificationMaterialList.length)
            .map( item => item = {
                ...item,
                position: Number(item.position) - materials.length,
                index:  Number(item.index) - materials.length,
                saveIs: false
            })
            state.specificationMaterialList = beforeList

        }else{
            afterList = state.specificationMaterialList.slice(0, Number(materials[0].position - 1))
            beforeList = state.specificationMaterialList
                .slice(Number(materials[materials.length - 1].position), state.specificationMaterialList.length)
                .map( item => item = {
                    ...item,
                    position: Number(item.position) - materials.length,
                    index:  Number(item.index) - materials.length,
                    saveIs: false
                })
            state.specificationMaterialList = afterList.concat(beforeList)
        }
      
        state.specificationMaterialSaveIs = false
    }
}

const actions = {
    specificationMaterialAddRowActions( { commit } ){
        commit('SPECIFICATION_MATERIAL_ADD_ROW')
    },
    async specificationMaterialGetListActions( { commit }, id ){
        commit('SPECIFICATION_MATERIAL_LOADING')
        const data = await httpRequest('crm/specification/material/', 'post', { specificationId: id })
        commit('SPECIFICATION_MATERIAL_LOADING')
        if(data.code == 200){
            if(data?.data === null){
                commit('SPECIFICATION_MATERIAL_CLEAR')
                for(var i = 0; i < 20; i++){
                    commit('SPECIFICATION_MATERIAL_ADD_ROW')
                }
            }else{
                for(i = 0; i < 20 + data.data.length; i++){
                    commit('SPECIFICATION_MATERIAL_ADD_ROW')
                }

                commit('SPECIFICATION_MATERIAL_GET_LIST', data.data)
            }
        }
        else{
            commit('SPECIFICATION_MATERIAL_ERROR', data?.data)
        }
    },
    async specificationMaterialAddRowAboveActions( { commit }, params ){
        commit('SPECIFICATION_MATERIAL_ADD_ABOVE', params)
    },
    async specificationMaterialAddRowBelowActions({ commit }, params){
        commit('SPECIFICATION_MATERIAL_ADD_BELOW', params)
    },
    async specificationMaterialGetHistoryListActions( { commit }, id ){

        console.log(commit)
        console.log(id)

    },
    async specificationMaterialEditActions( { commit }, form){
        console.log(form)
        commit('SPECIFICATION_MATERIAL_EDIT', form)
    },
    async specificationMaterialCopyRowActions({ commit }, { data, specificationId, selectionRangeKeys }){

        var param = {
            data: data,
            rangeKeys: selectionRangeKeys,
            specificationId: specificationId
        }

        commit('SPECIFICATION_MATERIAL_COPY', param)
    },
    async specificationMaterialSetMaterialActions( { commit, getters }, params){

        var form = getters.specificationMaterialListGetter.filter( item => item.id == params.specificationMaterialId)[0]
        var code = getters.materialsUnitsListGetter.filter( item => item.title == form.unit )[0]?.code || '006' 

        if(params.specificationMaterialId != ''){
            const formEdit = {
                specificationId: params.specificationId,
                specificationMaterialId: form.id,
                position: form.position,
                fullname: form.fullname,
                description: form.description,
                quantity: form.quantity,
                unit_code: code,
                material:  typeof params.material.id === 'undefined' ? '' : params.material.id   
            }
            
            console.log(formEdit)
            
            const data = await httpRequest('crm/specification/material/', 'patch', formEdit)
      
            if(data.status == 500){
                commit('SPECIFICATION_MATERIAL_ERROR', 'Ошибка на сервере')
            }
            else if(data.code == 200){
                console.log(data.data)
                commit('SPECIFICATION_MATERIAL_SET_MATERIAL', data.data)
            }else{
                commit('SPECIFICATION_MATERIAL_ERROR', data.data)
            }
        }else{
            Vue.notify({
                group: 'foo',
                title: 'Important message',
                text:  'Сохраните материал'
              })
        }

    },
    async specificationMaterialAoutofileActions( { commit }, { sourceSelectionData, targetSelectionData }){

        var params = {
            sourceSelectionData: sourceSelectionData,
            targetSelectionData: targetSelectionData
        }
        
        commit('SPECIFICATION_MATERIAL_AUTOFILE', params)
    },
    async specificationMaterialAddActions( { commit, getters }, specificationId){

        console.log(commit)
        console.log(getters)
        console.log(specificationId)
    },
    async specificationMaterialDeleteRowActions( { commit, getters }, params ){
        let materials
        materials = getters.specificationMaterialListGetter.filter( item => item.rowKey == params.key)
        commit('SPECIFICATION_MATERIAL_DELETE_ROWS', materials)

    },
    async specificationMaterialDeleteRowsActions( {commit, getters }, params){
        let materials
        materials = getters.specificationMaterialListGetter.slice(params.start, params.end + 1)
        commit('SPECIFICATION_MATERIAL_DELETE_ROWS', materials)
    },
    async specificationMaterialSaveActions( { commit, getters }, params){
        var materialListAdd = []
        var materialListEdit = []

        materialListAdd = getters.specificationMaterialListGetter
            .filter(item => item.id == '')
            .filter(item => item.fullname != '' && item.unit != '')

        materialListEdit = getters.specificationMaterialListGetter.filter(item => item.id != '' && item.saveIs == false)
        
        for(let i = 0; i < materialListAdd.length; i++){
            console.log('add')
            let data = await httpRequest('crm/specification/material/add', 'post', {
                unit_code: getters.materialsUnitsListGetter.filter( item => item.title == materialListAdd[i].unit )[0]?.code || '006',
                ...materialListAdd[i],
                specificationId: params
            })
            
            if(data.status == 500){
                commit('SPECIFICATION_MATERIAL_ERROR', 'Ошибка на сервере')
            }
            else if(data.code == 200){
                commit('SPECIFICATION_MATERIAL_ERROR', data.data)
            }

        }

        getters.specificationMaterialDeleteListGetter.map( item => httpRequest('crm/specification/material/', 'delete', { 
                specificationId: params,
                specificationMaterialId: item.id
            }).catch( (error) => console.log(error) )
        )
        
        console.log(materialListEdit)
        console.log(materialListAdd)

        for(let i = 0; i < materialListEdit.length; i++){
            console.log(materialListEdit[i])
            let data = await httpRequest('crm/specification/material/', 'patch', {
                position: materialListEdit[i].position,
                fullname: materialListEdit[i].fullname,
                type: materialListEdit[i].type,
                description: materialListEdit[i].description,
                quantity: materialListEdit[i].quantity,
                code: materialListEdit[i].code,
                vendor: materialListEdit[i].vendor,
                specificationId: params,
                specificationMaterialId: materialListEdit[i].id, 
                unit_code: getters.materialsUnitsListGetter.filter( item => item.title == materialListEdit[i].unit )[0]?.code || '006',
                material: typeof materialListEdit[i].material === 'undefined' ? '' : materialListEdit[i].material.id
            })
            console.log(data)
            if(data.code == 500){
                commit('SPECIFICATION_MATERIAL_ERROR', 'Ошибка на сервере')
            } 
        }

        commit('SPECIFICATION_MATERIAL_SAVE')
    }
}

const getters = {
    specificationMaterialListGetter: (state) => state.specificationMaterialList,
    specificationMaterialByKeyGetter: (state) => (key) => state.specificationMaterialList.filter( item => item.rowKey == key),
    specificationMaterialHistoryListGetter: (state) => state.specificationMaterialHistoryList,
    specificationMaterialErrorGetter: (state) => state.specificationMaterialError,
    specificationMaterialDirectoryListGetter: (state) => state.specificationMaterialDirectoryList,
    specificationMaterialLoadingGetter: (state) => state.specificationMaterialLoading,
    specificationMaterialDeleteListGetter: (state) => state.specificationMaterialDeleteList,
    specificationMaterialSaveIsGetter: (state) => state.specificationMaterialSaveIs,
}

const state = () => ({
    specificationMaterialList: [],
    specificationMaterialHistoryList: [],
    specificationMaterialDirectoryList: [],
    specificationMaterialError: '',
    specificationMaterialLoading: false,
    specificationMaterialDeleteList: [],
    specificationMaterialSaveIs: true,
})

export default {
    mutations,
    getters,
    actions,
    state,
}

// 1) insert above
// 2) file list
// 3) fix selection
// 4) serach directory
// 5) directory pagginate
// 6) delete spec
// 7) icon papka
// 8) layout avatar edit
// 9) sockets