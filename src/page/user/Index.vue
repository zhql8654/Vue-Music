<template>
    <div class="user-index">

        <h1 class="user-h1">
            用户：
            <span v-show="isLogin">{{user.nickname}}</span>
            <span v-show="!isLogin">未登录</span>
        </h1>

        <div class="index-btn" v-show="!isLogin">
            <router-link to="/user/login">
                <mt-button size="large">登录</mt-button>
            </router-link>
        </div>

        <div class="index-btn" v-show="isLogin">
            <mt-button @click="LoginOut" type="danger" size="large">退出登录</mt-button>
        </div>

        <div class="index-btn">
            <router-link to="/index">
                <mt-button type="primary" size="large">返回主页</mt-button>
            </router-link>
        </div>
    
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
    name: 'user-index',
    data () {
        return {
            isLogin: false,
            user:{}
        }
    },
    mounted(){
        const vm = this;
        const isNull = vm.util.isNull;
        let isLogin = sessionStorage.getItem("isLogin");
        let user = sessionStorage.getItem("userinfo");
        if(!isNull(isLogin)){
            this.isLogin = isLogin;  
        }
        if(!isNull(user)){
            this.user = JSON.parse(user);
        }

        
        //console.log(this.isLogin);
        //console.log(this.user);
    },
    methods:{
        LoginOut(){
            const vm = this;
            MessageBox.confirm('是否退出登录?').then(action => {
                vm.util.openIndicator();
                // 退出登录操作  +++++ 
                setTimeout(function (){
                    // 退出登录后操作  +++++ 
                    vm.util.closeIndicator();
                    vm.$store.commit('logout',false);
                    vm.$router.push('/user/login');
                    vm.util.showToast("退出成功");
                }, 1000);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-h1{
    text-align: center;
}

.index-btn{
    margin: 10px;
}
</style>
