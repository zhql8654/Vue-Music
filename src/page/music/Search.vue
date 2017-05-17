<template>
    <div class="photo-index">

        <div class="mint-header is-fixed search-box">
            <div class="is-left" @click="util.comeBackSearch">
                <button class="mint-button mint-button--default mint-button--normal">
                    <span class="mint-button-icon">
                        <i class="mintui mintui-back"></i>
                    </span> 
                    <label class="mint-button-text">返回</label>
                </button>
            </div>
            <div class="mint-header-title">
                <div class="search-input">
                    <input v-model="keywords" placeholder="请输入内容" type="text">
                </div>
                <div class="search-sub" @click="SearchSub">
                    <mt-button type="primary" size="large">搜索</mt-button>
                </div>
            </div>
        </div>

        <div class="wrap">
            <div class="musiclist">
                <div class="music" v-for="data in musiclist" 
                    :data-id="data.id"
                    key="data.id"
                >
                    <router-link :to='{name:"musicdetail", params:{ id:data.id } }'>
                        <div class="music-name">{{ data.name }}</div>
                        <div class="music-info">
                            {{ data.ar | cutAr }} - {{ data.al.name }}
                        </div>
                        <div v-show="util.isNull('data.alia[0]')" class="music-info">
                            {{ data.alia[0] }}
                        </div>
                    </router-link>
                </div>
                
            </div>
            


            <!--<p>dfd</p>
            <div class="index-btn">
                <router-link to="/index">
                    <mt-button type="primary" size="large">返回主页</mt-button>
                </router-link>
            </div> --> 
        </div>
        
        
    
    </div>
</template>

<script>
export default {
    name: 'photo-index',
    data () {
        return {
            keywords: '',
            musiclist:[]
        }
    },
    filters:{
        cutAr: function(val){
            if(val.length == 1){
                return val[0].name;
            }
            else{
                return val[0].name + '/' + val[1].name;
            }
        }
    },
    mounted(){
        this.isHaveData();

    },
    methods:{
        //判断是否缓存
        isHaveData(){
            const vm = this;
            let musiclist = sessionStorage.getItem("musicsearchdata");
            if(musiclist){
                musiclist = JSON.parse(musiclist)
                vm.musiclist = musiclist.musicdata; 
                vm.keywords = musiclist.keywords; 
            }
        },
        //请求 搜索  接口 
        SearchSub(){
            const vm = this;
            let keywords = this.keywords;
            if(!vm.util.isNull(keywords)){
                vm.util.openIndicator();
                vm.axios.post(vm.api.music.search + keywords).then(function (res) {
                    vm.util.closeIndicator();
                    //var ress=JSON.stringify(res.data)
                    //console.log(ress)
                    if('200' == res.data.code){
                        vm.musiclist = res.data.result.songs;

                        let data = {'keywords':keywords,'musicdata': res.data.result.songs};
                        sessionStorage.setItem("musicsearchdata", JSON.stringify(data));

                    }
                    else{
                        vm.util.showToast(res.data.code);
                    }
                }).catch(function (error) {
                    vm.util.closeIndicator();
                    vm.util.showToast('请求接口失败！');
                    console.log(error);
                });
            }
            else{
                vm.util.showToast('请输入搜索内容！');
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
