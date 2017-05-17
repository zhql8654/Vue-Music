<template>
    <div class="login">
        <heada :head='head'></heada>
        
        <div class="wrap cell-hd">
            <div class="login-logo">
                <img src="../../assets/logo.png">
            </div>
            <div class="inputwrap">
                <mt-field label="用户名：" type="text" placeholder="请输入用户名" v-model="username"></mt-field>
                <mt-field label="密　码：" type="password" placeholder="请输入密码" v-model="userpass"></mt-field>
            </div>

            <div class="rm-btn">
                <mt-button @click="LoginSub" type="primary" size="large">登录</mt-button>
            </div>

            <div class="login-enter">
                <router-link to="/index" >进入主页</router-link>
            </div>
            
        </div>

    </div>
</template>

<script>
import heada from  "@/components/Head.vue"

export default {
    name: 'login',
    components: {
        heada,
    },
    data () {
        return {
            head:{
                title:'登录',
                showright:{
                    showthis: true,
                    router: '/user/register',
                    text: '注册'
                }
            },
            username: '',
            userpass: '',
            musiclist:[]
        }
    },
    mounted(){

    },
    methods:{
        //  登录
        LoginSub(){
            const vm = this;
            let name = this.username;
            let pass = this.userpass;
            let isNull = vm.util.isNull;
            if(isNull(name) || isNull(pass)){
                vm.util.showToast("不能为空！");
            }
            else{
                let userinfo = [];
                if(!isNull(localStorage.getItem('userinfo'))){
                    userinfo = JSON.parse(localStorage.getItem('userinfo'));
                }
                //console.log(userinfo.length)
                let i = 0;
                while (i < userinfo.length)
                {
                    if(userinfo[i].username == name){
                        if(userinfo[i].userpass == pass){
                            vm.util.openIndicator();
                            // 成功后操作 
                            setTimeout(function (){
                                vm.util.closeIndicator();
                                vm.$store.commit('login',true);
                                vm.$store.commit('setUser',JSON.stringify(userinfo[i]));
                                vm.$router.push('/user');
                                vm.util.showToast("登录成功！");
                            }, 1000);
                        }
                        else{
                            vm.util.showToast("密码错误！");
                        }
                        return ;
                    }
                    i++;
                    if(i == userinfo.length){
                        vm.util.showToast("账号不存在！");
                    }
                }   
            }
        }
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-logo{
    text-align: center;
}
.login-logo img{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin: 36px auto;
}
.login-enter{
    width: 100px;
    height: 32px;
    line-height: 32px;
    margin: 10px auto;
    text-align: center;
    font-size: 14px;
    color: #999;
    border: 1px solid #ccc;
    border-radius: 6px;
}


/*.mus-pig{
    overflow: hidden;
    margin: 0 1rem;
}
.mus-list{
    width: 50%;
    float: left;
    text-align: center;
}
.mus-list img{
    width: 60%;
    height: auto;
    border-radius: 50%;
}
.mus-list p{
    font-size: 0.9rem;
    height: 2.8rem;
    line-height: 1.4rem;
    overflow: hidden;

}*/


</style>

