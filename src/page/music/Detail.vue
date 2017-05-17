<template>
    <div class="music-deailt">
        <!-- <heada :head='head' ></heada> -->

        <mt-header fixed :title ="musicdetail.name" class="head">
            <mt-button slot="left"  @click="util.comeBack" icon="back">返回</mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        

        <div class="wrap-music">

            <div class="music-artists">---
                <span v-for="(data, index) in musicdetail.artists">
                    {{ data.name }}
                    <span v-if="index < musicdetail.artists.length-1">/</span>
                </span>---
            </div>
            <div class="music-pigwrap">
                <div class="music-pig" :class="onPlayClass">
                    <img src="../../assets/logo.png">
                </div>
            </div>

            <div class="music-lyric" id="music_lyric">
                <!-- <p>{{ lyricShow[0] }}</p>
                <p>{{ lyricShow[1] }}</p>
                <p>{{ lyricShow[2] }}</p> -->

                <p v-for="(data,index) in musiclyric" >
                    {{ data[1] }}
                </p>      
               <!--  {{ musiclyric }}  -->       
            </div>

        </div>

        <div class="music-progress" id="music_progress">
            <p>{{ currentTime }}/ {{ duration }}</p>
            <mt-range v-model = currentTime :max=duration :barHeight=3 >
                <div slot="start">{{ currentTime | changeTime }}</div>
                <div slot="end">{{ duration | changeTime }}</div>
            </mt-range>
            <div class="music-btnwrap">
                <mt-button class="play-btn" @click="play">{{ playText }}</mt-button>
                <!-- <mt-button @click="stopMusic">停止</mt-button> -->
            </div>
        </div>
        
    
    </div>
</template>

<script>
import { Range } from 'mint-ui';
export default {
    name: 'music-deailt',
    components: {
       
    },
    data () {
        return {
            onPlayClass:'',//旋转class名
            musicdetail:{},//详情
            musiclyric: '',//歌词
            playText: '加载',//按钮名称
            currentTime:0, //当前播放时间
            duration:0,//总时间
            lyricShow: [],//显示的歌词  三句
        }
    },
    filters:{
        changeTime: function (time) {
            var minute = parseInt(time / 60);
            if (minute < 10) {
                minute = '0' + minute;
            }
            var secound = parseInt(time % 60);
            if (secound < 10) {
                secound = '0' + secound;
            }
            return minute + ':' + secound;
        }
    },
    mounted(){
        const vm = this;
        this.isHaveDetailData()
        this.isHaveLyricData();


    },
    methods:{
        //判断是否有 详情 缓存 
        isHaveDetailData(){
            const vm = this;
            let data = sessionStorage.getItem("musicdetaildata");
            if(data){
                data = JSON.parse(data)
                if(data.musicId == vm.$route.params.id){
                    vm.musicdetail = data.musicdata;
                    vm.setMusic();
                }
                else{
                    vm.SearchDetail();
                }
            }    
            else{
                vm.SearchDetail();
            }
        },
        //请求 详情  接口 
        SearchDetail(){
            const vm = this;
            let id = this.$route.params.id;
            if(!vm.util.isNull(id)){
                //console.log("请求详情接口"+id);
                vm.util.openIndicator();
                vm.axios.get(vm.api.music.detail, {
                    params: {
                        'id': id
                    }
                }).then(function (res) {
                    vm.util.closeIndicator();
                    if('200' == res.data.code){
                        vm.musicdetail = res.data.songs[0];
                        let data = {musicId: id,musicdata: res.data.songs[0]}
                        sessionStorage.setItem("musicdetaildata", JSON.stringify(data));
                        vm.setMusic(); 
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
        },
        //判断是否有 歌词 缓存 
        isHaveLyricData(){
            const vm = this;
            let data = sessionStorage.getItem("musiclyricdata");
            if(data){
                data = JSON.parse(data)
                if(data.musicId == vm.$route.params.id){
                    //vm.musiclyric = data.musicdata;
                    vm.musiclyric = vm.util.getLyricArr(data.musicdata);
                    //console.log(data.musicdata)
                    //vm.setLyric();
                }
                else{
                    vm.SearchLyric();
                }
            }    
            else{
                vm.SearchLyric();
            }
        },
        //请求 歌词  接口 
        SearchLyric(){
            const vm = this;
            let id = this.$route.params.id;
            if(!vm.util.isNull(id)){
                //console.log("请求歌词接口"+id);
                vm.util.openIndicator();
                vm.axios.get(vm.api.music.lyric, {
                    params: {
                        'id': id,
                        'lv': -1,
                        'kv': -1,
                        'tv': -1
                    }
                }).then(function (res) {
                    vm.util.closeIndicator();
                    if('200' == res.data.code){
                        if(res.data.hasOwnProperty("lrc") ){
                            //console.log(res.data.lrc.lyric);
                            //vm.musiclyric = res.data.lrc.lyric;
                            vm.musiclyric = vm.util.getLyricArr(res.data.lrc.lyric);
                            let data = {musicId: id,musicdata: res.data.lrc.lyric}
                            sessionStorage.setItem("musiclyricdata", JSON.stringify(data));
                            //vm.setLyric(); 
                        }
                        else{
                            vm.musiclyric = '暂无歌词';
                        }
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
                vm.util.showToast('歌曲id有误！');
            }  
        },
        //音乐 初始化
        setMusic(){
            //console.log("音乐 初始化");
            const vm = this;
            let OnAudio = document.getElementById("musicId");
            if(!vm.util.isNull(OnAudio)){//当前在播放
                if(OnAudio.currentSrc != vm.musicdetail.mp3Url){//当前播放不是选中歌曲
                    OnAudio.src =  vm.musicdetail.mp3Url;
                    /*let timer = setInterval(function (){
                        if(OnAudio.readyState == 4){
                            //OnAudio.play();
                            vm.setProgress();
                            vm.setTime();
                            //vm.setLyric();
                            clearInterval(timer);
                        }
                    },10);*/
                }
                else{//当前播放是选中歌曲
                    
                }
            }
            else{//当前不在播放
                let audio = document.createElement("audio");
                audio.id = "musicId";
                audio.src =  vm.musicdetail.mp3Url;
                document.body.appendChild(audio);
                /*let timer = setInterval(function (){
                    if(audio.readyState == 4){
                        //audio.play();
                        vm.setProgress();
                        vm.setTime();
                        //vm.setLyric();
                        clearInterval(timer);
                    }
                },10);*/
            }
            vm.setProgress();
            vm.setTime();
            //vm.setLyric();
        },
        //初始化 歌词 
        setLyric(){
            //console.log("歌词 初始化");
            const vm = this;
            let audio = document.getElementById("musicId");
            let lyricArr = vm.musiclyric;
            let lyricP=document.getElementById("music_lyric").getElementsByTagName("p");
            let num = -1;
            //console.log(lyricArr);

            let timer = setInterval(function (){
                if(!audio.paused){
                    let k = vm.getOnArrNum();
                    if(k != num){
                        if(k == 0) {
                            lyricP[k].setAttribute("class", "music-lyric-on"); 
                        }
                        else if(k == 1){
                            lyricP[0].setAttribute("class", "");
                            lyricP[k-1].setAttribute("class", "music-lyric-on");
                        }
                        else{
                            lyricP[k-2].setAttribute("class", "");
                            lyricP[k-1].setAttribute("class", "music-lyric-on");

                        }
                        num = k;
                    }
                }
                else{
                    clearInterval(timer);
                }
            },300);
            
        },
        //时间  初始化
        setTime(){
            //console.log("时间 初始化");
            const vm = this;
            let audio = document.getElementById("musicId");
            if(!audio.paused){
                vm.playText = '暂停';
                //vm.setLyric();
                vm.onPlayClass = 'cd-rotate';
            }
            else{
                vm.playText = '播放';
            }
            vm.duration = parseInt(vm.musicdetail.duration/1000); //总时长
            //console.log("duration:"+ vm.duration)
            let timer = setInterval(function (){
                if(audio.ended){//播放完成  结束
                    vm.stopMusic();
                }
                if(!audio.paused){
                    vm.currentTime = parseInt(audio.currentTime); //当前播放时间
                    //console.log("currentTime:"+ vm.currentTime);
                }
                else{
                    clearInterval(timer);
                }
            },300);
        },
        //进度条 初始化
        setProgress(){
            //console.log("setProgress")
            const vm = this;
            let audio = document.getElementById("musicId");
            let ele = document.getElementById("music_progress");
            ele = ele.getElementsByClassName("mt-range-thumb")[0];
            ele.addEventListener("touchstart",function(event){
                if(!audio.paused){
                    vm.play(); 
                }
            })
            ele.addEventListener("touchend",function(event){
                let timer = setTimeout(function (){//暂停300毫秒
                    vm.play(); 
                },300);
            })
        },
        //控制按钮  暂停/播放
        play(){
            const vm = this;
            let audio = document.getElementById("musicId");
            if(audio.paused){
                audio.currentTime = vm.currentTime;
                audio.play();
                vm.playText = '暂停';
                vm.setTime();
                vm.setLyric();
                vm.onPlayClass = 'cd-rotate';
            }
            else{
                audio.pause();
                vm.playText = '播放';
                vm.onPlayClass = '';

            }
        },
        //控制按钮  停止播放
        stopMusic(){
            const vm = this;
            let audio = document.getElementById("musicId");
            vm.currentTime = 0;
            audio.pause();
            vm.playText = '播放';
            vm.onPlayClass = '';
        },
        getOnArrNum(){
            const vm = this;
            let lyricArr = vm.musiclyric
            let i = 0;
            for(i = 0; i < lyricArr.length; i++){
                if(vm.currentTime+1.8 < lyricArr[i][0]){
                    break;
                }
                //console.log(11);
            }
            //console.log("获取当前播放："+ i);
            return i;
        }

        
       

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap-music{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding: 50px 0 126px 0;
    overflow: hidden;
    display: flex;
    flex-flow: column;
}
/*  作者 */
.music-artists{
    text-align: center;
    font-size: 0.9rem;
}


/*旋转图片 */
.music-pigwrap{
    width: 100%;
    height: 180px;
    padding: 15px 0;
}
.music-pig{
    position: relative;
    width: 180px;
    height: 180px;   
    margin: auto;
}
.music-pig img{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    margin-top: -90px;
    margin-left: -90px;
    border-radius: 100%;
}
.cd-rotate{
    -webkit-animation: rotating 8s linear 0.3s infinite;
    animation: rotating 8s linear 0.3s infinite;
}
@-webkit-keyframes rotating{
    0%{ transform:rotate(-360deg); }
    100%{ transform:rotate(0deg); }
}

/* 歌词 */
.music-lyric{
    flex: 1;
    overflow: hidden;
    overflow:auto;
    font-size: 0.9rem;
}
.music-lyric p{
    text-align: center;
}
.music-lyric-on{
    font-size: 1.1rem;
    color: red;
    margin: 0.4rem 0;
}
/*.music-lyric p:nth-child(2){
    font-size: 1.1rem;
    color: red;
    margin: 0.4rem 0;
}*/



/* 底部 */
.music-progress{
    padding: 10px 5%;
    position: fixed;
    width: 90%;
    background: #fff;
    bottom: 0;
    left: 0;
    border-top: 1px solid #999;
} 
.music-btnwrap{
    padding: 0.4rem 0;
    text-align: center;
}

</style>
