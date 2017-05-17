<template>
    <div class="music-musiclist">
        <heada :head='head' ></heada>
        
        <div class="wrap">
            <div class="musiclist">
                <div class="music" v-for="data in musiclist" 
                    :data-id="data.id"
                    key="data.id"
                >
                    <router-link :to='{name:"musicdetail", params:{ id:data.id } }'>
                        <div class="music-name">{{ data.name }}</div>
                        <div class="music-info">
                            <span v-for="(data2, index) in data.artists">
                                {{ data2.name }}
                                <span v-if="index < data.artists.length-1">/</span>
                            </span>
                        </div>
                        <!-- <div v-show="util.isNull('data.alia[0]')" class="music-info">
                            {{ data.alia[0] }}
                        </div> -->
                    </router-link>
                </div>
                
            </div>

        </div>
        
    
    </div>
</template>

<script>
import heada from  "@/components/Head.vue"

export default {
    name: 'music-musiclist',
    components: {
        heada,
    },
    data () {
        return {
            head:{
                title:'音乐榜'
            },
            musiclist: [],

        }
    },
    mounted(){
        this.isHaveData();
    },
    methods:{
        //判断是否缓存
        isHaveData(){
            const vm = this;
            let musiclist = sessionStorage.getItem("musiclistdata");
            if(musiclist){
                musiclist = JSON.parse(musiclist)
                if(musiclist.musicId == vm.$route.params.id){
                    vm.musiclist = musiclist.musicdata;
                    //console.log(JSON.stringify(musiclist.musicdata[0]))
                }
                else{
                    vm.PlayList();
                }
            }    
            else{
                vm.PlayList();
            }
        },
        //请求 音乐榜  接口 
        PlayList(){
            const vm = this;
            let id = this.$route.params.id;
                vm.util.openIndicator();
                vm.axios.get(vm.api.music.playlist, {
                    params: {
                        'id': id
                    }
                }).then(function (res) {
                    vm.util.closeIndicator();
                    if('200' == res.data.code){
                        //console.log(res.data.result.tracks);
                        //console.log(JSON.stringify(res.data.result.tracks));
                        vm.musiclist = res.data.result.tracks;
                        let data = {musicId: id,musicdata: res.data.result.tracks}
                        sessionStorage.setItem("musiclistdata", JSON.stringify(data));
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

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
