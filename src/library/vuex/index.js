import Vue from 'vue'
import Vuex from 'vuex'
  
Vue.use(Vuex)
    
//暂无内容，需要再加
const store = new Vuex.Store({
    state: {
        isLogin: false,
        userinfo: {}

    },  
    actions: {

    },
    mutations: {
        login(state,flag){
            sessionStorage.setItem("isLogin", flag); 
            state.isLogin = flag;
        },
        setUser(state,u){
            state.userinfo = u;
            sessionStorage.setItem("userinfo", u); 
        },
      	logout(state,flag){
            state.isLogin = flag ;
            state.userinfo = '';
            sessionStorage.clear();
      	}
    }
})


export default store;