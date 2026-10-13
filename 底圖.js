const 備選底圖 = {
	"製圖師亮":{
		'url' : 'http://0.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png?key=cb1_2rwh_1_4cc762fc5c853e92b7c2e3f1'
	},"製圖師暗":{
		'url' : 'http://0.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png?key=cb1_2rwh_1_4cc762fc5c853e92b7c2e3f1'
	},"雄蕊":{
		'url': "https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}"+(window.devicePixelRatio>1.5 ? "@2x":"")+".png"
	},"蹤迹":{
		'url': 'https://tile.tracestrack.com/base/{z}/{x}/{y}.png?key=c9b06c7e3f6edfd81737634530fdb75a'
	},"天地圖":{
		'url': "https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=93c7cba7a04d9b86d08e058d5451982f"
	}
};
var 選中底圖 = '';