<template>
    list Object 
    {{ getObjectsList }}
</template>

<script>
import { mapGetters, mapState, mapActions  } from 'vuex'

export default {
    data ()  {
        return {

        }
    },
    mounted() {
        console.log("ListObjects.vue: mounted")
        //store.dispatch('listObjects')
        this.initListobject
    },
    computed: {
        ...mapGetters({
            getObjectsList: 'getObjectsList'
        })
    },
    methods: {
        ...mapActions({
            initListobject: 'listObjects',
            getMe: 'getMe',
            
        }),
    }
    
}
</script>