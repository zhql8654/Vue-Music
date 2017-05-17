<template>
    <div class="register">
        <heada :head='head' ></heada>
        
        <div class="wrap cell-hd">
            <div class="inputwrap">
                <mt-field label="用户名*：" type="text" placeholder="请输入用户名" v-model="user.username"></mt-field>
                <mt-field label="昵　称：" type="text" placeholder="请输入昵称" v-model="user.nickname"></mt-field>
                <mt-field label="密　码*：" type="password" placeholder="请输入密码" v-model="user.userpass"></mt-field>
                <mt-field label="确认密码*：" type="password" placeholder="请再次输入密码" v-model="userpass2"></mt-field>
                <mt-field label="生　日：" type="date" placeholder="请输入生日" v-model="user.birthday"></mt-field>
                <mt-field label="个性签名：" type="text" placeholder="请输入签名" v-model="user.autograph"></mt-field>
                

            </div>

            <div class="rm-btn">
                <mt-button @click="RegisterSub" type="primary" size="large">注册</mt-button>
            </div>

        </div>
    
    </div>
</template>

<script>
import heada from  "@/components/Head.vue"

export default {
    name: 'register',
    components: {
        heada,
    },
    data () {
        return {
            head:{
                title:'注册',
                showright:{
                    showthis: true,
                    router: '/user/login',
                    text: '登录'
                }
            },
            user:{
                username:'',
                nickname:'',
                userpass:'',
                birthday:'',
                autograph:'',
            },
            userpass2:''
        }
    },
    mounted(){

    },
    methods:{
        //用户注册
        RegisterSub(){
            const vm = this;
            let name = vm.user.username;
            let pass = vm.user.userpass;
            let pass2 = vm.userpass2;
            let isNull = vm.util.isNull;
            let userinfo = [];
            if(!isNull(localStorage.getItem('userinfo'))){
                userinfo = JSON.parse(localStorage.getItem('userinfo'));
            }
            //console.log(userinfo.length);
            if(isNull(name) || isNull(pass) || isNull(pass2)){
                vm.util.showToast("不能为空！");
            }
            else{
                if(pass.length < 6 || pass2.length < 6){
                    vm.util.showToast("密码最少6位！");
                }
                else if(pass != pass2){
                    vm.util.showToast("密码不一致！");
                }
                else{
                    if(userinfo.length > 0){
                        let flag = true;
                        for(let i = 0; i < userinfo.length; i++){
                            if(userinfo[i].username == name){
                                vm.util.showToast("用户名已注册！");
                                flag = false;
                                return ;
                            }
                        }
                        if(flag){
                            //console.log('成功');
                            userinfo.push(vm.user)
                            localStorage.setItem("userinfo", JSON.stringify(userinfo)); 
                            vm.$router.push('/user/login');
                        }
                    }
                    else{
                        //console.log('成功');
                        userinfo.push(vm.user)
                        localStorage.setItem("userinfo", JSON.stringify(userinfo));
                        vm.$router.push('/user/login');
                    }   
                } 
            }
        }
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>


