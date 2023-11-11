<template>

<div v-for="spec in specificationListGetter">
   Спецификация:  {{ spec.name }}
    
</div>
</template>

<script>
import { mapGetters, mapState, mapActions  } from 'vuex'
import store from '../store'
export default {
    async mounted() {
        console.log("SpecificationPage.vue: mounted")
        console.log(this.$route.params.id)
        await this.specificationGetList(this.$route.params.id)
        //store.dispatch('specificationGetListActions',this.$route.params.id)
    },
    computed: {
        ...mapGetters({
            getObjectsList: 'getObjectsList',
            spec: 'specificationGetter',
            specificationListGetter: 'specificationListGetter',
        }),
    },
    methods: {
        ...mapActions({
            initListobject: 'listObjects',
            getMe: 'getMe',
            specificationGetList: "specificationGetListActions"
        }),
        objectOpen(e) {
            console.log(e)
        }
    }
}
</script>