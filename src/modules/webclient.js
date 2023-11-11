import { toRaw,reactive, toValue, toRef } from 'vue';
import axios from 'axios';
import store from '@/store';
import router from '@/router'
export const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
});

instance.defaults.timeout = 8500;
instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
 

instance.interceptors.request.use( config  => {
  store.dispatch('setErrorStatus',false)
    if (store.getters.isAuthenticated) {
        console.log("set Token")
        const token = store.getters.getToken;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
    
    }
    return config;
});


instance.interceptors.response.use(undefined, function (error) {
    if (error) {
      console.log('error webclient')
      store.dispatch('setErrorMessage',error.response.data.message)
      
      const originalRequest = error.config;
      if (error.response.status === 400) {
        
        store.dispatch('logout')
        return router.push('/login')
      }

      if (error.response.status === 401) {
            console.log('error 401')
            
          originalRequest._retry = true;
          store.dispatch('logout')
          return router.push('/login')
      }
    }
    
  })

instance.interceptors.response.use((response) => {
    return response;
})

export async function api(endpoint,method,data) {
 
  if (method == "post") {
    let options = {
      pagginate: store.getters.getPagginate,
      filter: store.getters.getFilterRequest,
      orderBy: Object.assign({},store.getters.getOrderBy),
    }
    var newData = {}
    newData['data']=toRaw(data)
    console.log('options:',options)
    
      newData['options'] = options
    
    //newData['options'] = options 
    console.log('newData:',toRaw(newData))
    
    return await instance.post('api/v1/'+endpoint, newData).then((response) => {
        return response.data
    })
    

  } else if (method == "get") {
    return await instance.get('api/v1/'+endpoint, data).then((response) => {
      return response.data
    })  
  } else if (method == "update") {
  
  } else if (method == "all") {
    console.log("method:all, data:",data)
    data['options'] = {
      pagginate: {
        limit: 100
      }
    }
    return await instance.post('api/v1/'+endpoint, data).then((response) => {
      //console.log(response)
      return toRaw(response.data.data)
    })  
  } else if (method == "create") {
    await instance.post('api/v1/'+endpoint, data).then((response) => {
      //console.log(response)
      return response.data.data
    })
  }
  return null
}


export default instance