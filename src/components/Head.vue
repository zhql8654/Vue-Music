<template>
    <div class="head">
        <mt-header fixed :title = headdata.title>
            <mt-button slot="left" v-show="headdata.showleft" @click="util.comeBack" icon="back">返回</mt-button>
            <mt-button slot="right" v-show="headdata.showright.showthis">
                <router-link :to="headdata.showright.router" >{{ headdata.showright.text }}</router-link>
            </mt-button>
        </mt-header>
    </div>
</template>

<script>
export default {
    name: 'head',
    data () {
        return {
            headdata: {
                showleft: true,
                title: '标题',
                showright:{
                    showthis: false,
                    router: '',
                    text: ''
                }
            }
        }
    },
    props: [
        'head',
    ],
    mounted(){
        if(this.head.showleft != undefined){
            this.headdata.showleft = this.head.showleft;
        }
        if(this.head.title != undefined){
            this.headdata.title = this.head.title;
        }
        if(this.head.showright != undefined){
            this.headdata.showright = this.head.showright;
        }
    },
    methods:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
