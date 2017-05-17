 /*  Util JS */
import router from '@/library/router'
import { Toast,Indicator  } from 'mint-ui'; 

export default {
 	isNull: function (val){
        if(typeof(val) == 'string'){
            val=val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
        if(val == '' || val == null || val.length == 0 || val == undefined ){
            return true;
        }
        else{
            return false;
        }
    },
    comeBack: function (){
      	//history.go(-1);
        router.go(-1)
        //console.log("返回")
    },
    comeBackSearch: function (){
        sessionStorage.removeItem('musicsearchdata');
        router.go(-1); 
    },
    showToast: function (msg){
        Toast({
            message: msg,
            duration: 1500
        });
    },
    openIndicator: function (){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
        });
    },
    closeIndicator: function (){
        Indicator.close();
    },
    getLyricArr: function(text){
        //将数据分隔成一行一行，存入数组    
        let lines = text.split('\n'),    
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]    
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        pattern3 = /\[\d{2}:\d{2}.\d{3}\]/g,    
        //保存最终结果的数组    
        result = [];   
        //console.log(lines.length); 
        //去掉不含时间的行   暂不考虑 
        /*while (!pattern.test(lines[0])) {    
            lines = lines.slice(1);    
            console.log(1111)
        };*/
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉    
        lines[lines.length - 1].length === 0 && lines.pop(); 

        //console.log(lines.length);
        //console.log(lines);

        lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {    
            //提取出时间[xx:xx.xx]    
            let time = v.match(pattern); 
            //提取歌词    
            let value = v.replace(pattern, ''); 
            if(time == null){
                time = v.match(pattern3);
                value = v.replace(pattern3, ''); 
            }  

            //console.log(time+":"+value);

            if(value != ''){
                //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔    
                time.forEach(function(v1, i1, a1) {    
                    //去掉时间里的中括号得到xx:xx.xx    
                    let t = v1.slice(1, -1).split(':');    
                    //将结果压入最终数组    
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);    
                });
            }    
        });   
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词    
        result.sort(function(a, b) {    
            return a[0] - b[0];    
        }); 
        //console.log(result);
        return result;  
    }
    

 }