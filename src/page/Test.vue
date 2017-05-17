<template>
    <div class="test">

        <h1>404页面</h1>
        <router-link to="/index">
            <mt-button>返回主页</mt-button>
        </router-link>
    
    </div>
</template>

<script>
export default {
    name: 'test',
    data () {
        return {
            msg: ''
        }
    },
    mounted(){

    },
    methods:{
        //这里是方法
        testfun(){
            //++++++
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
    text-align: center;
    line-height: 5rem;
}
</style>
