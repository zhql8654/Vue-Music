import Vue from 'vue'
import App from '@/App'

import router from '@/library/router'
import store from '@/library/vuex'
import mint from '@/library/mint'


/* axios >> https://www.npmjs.com/package/axios */
import axiosJs from 'axios'
axiosJs.defaults.timeout = 5000;
Vue.prototype.axios = axiosJs


/* UtilJS */
import UtilJS from './assets/js/util.js'
Vue.prototype.util = UtilJS

/* APIJS */
import APIJS from './assets/js/api.js'
Vue.prototype.api = APIJS


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	mint,
	render: h => h(App)
})



/*
                //res = JSON.stringify(res)
                //res = JSON.parse(res)

                //document.getElementById("domId")
                //document.getElementsByName("domName")

                
		总结  

		1、路由js里面访问 vuex 的 store 状态的问题
		2、路由js里面访问 util 里方法的问题

		---就是不知道路由js里怎么访问当前vue来获取挂载对象


*/