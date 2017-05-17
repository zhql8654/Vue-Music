 /*  API JS */
const prefix = '';
const agent = 'https://bird.ioliu.cn/v1/?url='
//const agent = 'https://bird.ioliu.cn/v1'

const wangyi = agent + 'http://music.163.com';


export default {
	music:{
		search 		: 	'https://api.imjad.cn/cloudmusic/?type=search&s=',
	 	lyric 		: 	wangyi + '/api/song/lyric',
	 	detail 		: 	'https://bird.ioliu.cn/netease', 	// id=2222
	 	playlist 	: 	wangyi + '/api/playlist/detail',	// id=2222
	}
 }
