if (/\sQQ|micromessenger/i.test(navigator.userAgent.toLowerCase())){
	let 全遮板 = document.createElement("div");
	全遮板.style.cssText = "writing-mode:vertical-rl; position:fixed; z-index:900; height:100vh; width:100vw; top:0; left:0; background-color:#333; color:#ccc; font-size:8vh; line-height:100vw; letter-spacing:2vh; text-align:center";
	全遮板.innerHTML = '請以瀏覽器啓視';
	document.body.appendChild(全遮板);
}
import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.13.0/dist/maplibre-gl.mjs';
import { TerminatorLayer } from "./terminator-layer.js";
const pmProtocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles',pmProtocol.tile);
const PMTILES_NAME = ['鄉以上地點','中國无港澳臺海域','中國政區界','海深','公海和南極'];
const TILES_LOC = 'https://pub-76f7e7fbf50f4423b85486dda0feb0c9.r2.dev/瓦/';
for (const pmtilesUrl of PMTILES_NAME){
	const p = new pmtiles.PMTiles(TILES_LOC + pmtilesUrl +'.pmtiles');
	pmProtocol.add(p);
}
function 簡轉正(str){
	return str.replace(/连/g,'連');
}
maplibregl.addProtocol('cog', MaplibreCOGProtocol.cogProtocol);
maplibregl.addProtocol('簡正轉換', async (requestParameters, abortController)=>{
	// const realTileUrl = requestParameters.url.replace('簡正轉換://', 'https://');
	// const response = await fetch(realTileUrl, { signal: abortController.signal });
	// const arrayBuffer = await response.arrayBuffer();
	// const pbf = new window.Pbf(new Uint8Array(arrayBuffer));
	// const tile = new window.MapboxVectorTile.VectorTile(pbf);
	// const targetLayer = tile.layers['poi'];
	// if (targetLayer) {
	// 	for (let i = 0; i < targetLayer.length; i++) {
	// 		const feature = targetLayer.feature(i);
	// 		if (feature.properties.name) {
	// 			// Perform the OpenCC Simplified -> Traditional character swap
	// 			feature.properties.name = 簡轉正(feature.properties.name);
	// 		}
	// 	}
	// }
});
var 圖央 = [localStorage.getItem("經度"), localStorage.getItem("緯度")], 初縮放 = localStorage.getItem("縮放級");
if(圖央.some(d=>d==undefined)){
	圖央 = [112.45, 34.67];
} else {
	圖央 = 圖央.map(x=>Number(x));
}
if(初縮放==undefined){
	初縮放 = 12;
} else {
	初縮放 = Number(初縮放);
	if(初縮放<1){ 初縮放 = 1;}
}
localStorage.removeItem("經度");localStorage.removeItem("緯度");
export const lmap = new maplibregl.Map({
	container: 'map',
	zoom: 初縮放, center: 圖央, pitch: 0,
	hash: false, canvasContextAttributes: {antialias: true},
	style: {
		version: 8,
		sources: {
			蹤迹:{
				type: 'raster',
				tiles: [備選底圖["蹤迹"]["url"]],
				tileSize: 256, attribution: '&copy; 蹤迹平面', maxzoom: 19
			},
			天地圖:{
				type: 'raster',
				tiles: [備選底圖["天地圖"]["url"]],
				tileSize: 256
			},
			製圖師亮:{
				type: 'raster',
				tiles: [備選底圖["製圖師亮"]["url"]],
				tileSize: 256
			},
			製圖師暗:{
				type: 'raster',
				tiles: [備選底圖["製圖師暗"]["url"]],
				tileSize: 256
			},
			雄蕊:{
				type: 'raster',
				tiles: [備選底圖["雄蕊"]["url"]],
				tileSize: window.devicePixelRatio>1.5 ? 512 : 256
			},
			// Use a different source for terrain and hillshade layers, to improve render quality
			terrainSource: {
				type: 'raster-dem',
				url: 'https://tiles.mapterhorn.com/tilejson.json'
			},
			hillshadeSource: {
				type: 'raster-dem',
				url: 'https://tiles.mapterhorn.com/tilejson.json'
			},
			海底高程: {
				type: 'raster-dem',
				// tiles: [TILES_LOC+'GEBCO_2026/{z}/{x}/{y}.webp'],
				url: `pmtiles://${TILES_LOC}海深.pmtiles`,
				tileSize: 256, encoding: "terrarium"
			},
			鄉以上地點: {
				type: 'vector',
				// url: 'http://localhost:8080/data/鄉以上地點.json'//mbtiles
				url: `pmtiles://${TILES_LOC}鄉以上地點.pmtiles`
			},
			中國政區界綫: {
				type: 'vector',
				// url: 'http://localhost:8080/data/中國政區界.json'
				url: `pmtiles://${TILES_LOC}中國政區界.pmtiles`
			},
			開放免費地圖: {
				type: 'vector',
				url: 'https://tiles.openfreemap.org/planet'
			},
			經綫: {
				type: 'geojson',
				data: {
					"type": "FeatureCollection",
					"features": 畫經綫()
				}
			},
			特殊緯綫: {
				type: 'geojson',
				data: {
					"type": "FeatureCollection",
					"features": 畫赤道和歸極綫()
				}
			},
			普通緯綫: {
				type: 'geojson',
				data: {
					"type": "FeatureCollection",
					"features": 畫普通緯綫()
				}
			},
			中國除港澳臺外之海域: {
				type: 'vector', url: `pmtiles://${TILES_LOC}中國无港澳臺海域.pmtiles`
			},
			公海和南極: {
				type: 'vector', url: `pmtiles://${TILES_LOC}公海和南極.pmtiles`
			}
		},
		layers: 諸層,
		terrain: {
			source: 'terrainSource',
			exaggeration: 1
		},
		// light: {"anchor": "map", "color": "#fff", "position": [1.4, -180, 90], "intensity": 0.1},
		sky: {"sky-color":"hsl(197, 71%, 63%)", "horizon-color":"hsl(213, 76%, 65%)", "atmosphere-blend": 0.25},
		projection: {"type": "globe"}
	},
	minZoom: 1, maxZoom: 21, maxPitch: 85
});
let 昏旦;
lmap.on('style.load', () => {
	昏旦 = new TerminatorLayer({updateInterval: 30000});
	const layers = lmap.getStyle().layers;
	const firstSymbol = layers.find(layer => layer.type === "symbol");
	lmap.addLayer(昏旦, firstSymbol?.id);
});
lmap.on('zoom', () => {
	const z = lmap.getZoom();
	var 傾極 = (z-6)/7*85;
	if (傾極 < 0){ 傾極 = 0;}
	else if (傾極 > 85){ 傾極 = 85;}
	lmap.setMaxPitch(傾極);
});
lmap.addControl(new maplibregl.FullscreenControl());
lmap.addControl(
	new maplibregl.NavigationControl({
		visualizePitch: true,
		showZoom: true,
		showCompass: true
	})
);
lmap.addControl(
	new maplibregl.TerrainControl({
		source: 'terrainSource',
		exaggeration: 1
	})
);
async function testFetchLatency(url, bearTime=4000) {
	const start = performance.now();
	try {
		const res = await fetch(`${url}${url.includes('?')?'&':'?'}_t=${Date.now()}`, {
			method: "GET", // HEAD 只取標頭，不下載完整內容
			signal: AbortSignal.timeout(bearTime)
		});
		if (res.ok) {
			return performance.now() - start;
		}
		return null;// 逾時
	} catch {
		return null;// 出錯
	}
}
function 易圖層源(mymap, newsource){
	const oldLayers = mymap.getStyle().layers;
	const layerIndex = oldLayers.findIndex(l => l.id==="底圖");
	const layerDef = oldLayers[layerIndex];
	const before = oldLayers[layerIndex+1] && oldLayers[layerIndex+1].id;
	layerDef.source = newsource;
	mymap.removeLayer("底圖");
	mymap.addLayer(layerDef, before);
}
function 測底圖延遟(易源=false){
	let 諸選項 = document.getElementById("底圖選單").options;
	for (const 底圖 in 備選底圖){
		testFetchLatency(備選底圖[底圖]["url"].replace('{x}','10').replace('{y}','20').replace('{z}','5')).then(r=>{
			備選底圖[底圖]["響應時長"] = r;
			let 該底圖選項 = document.getElementById("底圖選單").querySelector(`option[value="${底圖}"]`);
			該底圖選項.dataset.latency = r;
			該底圖選項.text = 該底圖選項.text.replace(/[⚫️🔴🟡🟢]/ug,'');
			if (r==null){
				該底圖選項.text = '⚫️'+ 該底圖選項.text;
				該底圖選項.title = '連不上';
			} else if (r>1500){
				該底圖選項.text = '🔴'+ 該底圖選項.text;
				該底圖選項.title = '慢（'+ String(Math.round(r/10))+'）';
			} else if (r>800){
				該底圖選項.text = '🟡'+ 該底圖選項.text;
				該底圖選項.title = '中（'+ String(Math.round(r/10))+'）';
			} else {
				該底圖選項.text = '🟢'+ 該底圖選項.text;
				該底圖選項.title = '快（'+ String(Math.round(r/10))+'）';
			}
			if (r!=null && (選中底圖=='' || 易源)){
				易源 = false;
				選中底圖 = 底圖;
				易圖層源(lmap, 選中底圖);
				for (let i=0; i<諸選項.length; i++){
					if (諸選項[i].value==選中底圖){
						諸選項[i].selected = true; break;
					}
				}
			}
		});
	}
}
function 測瓦服務器延遟(){
	const servers = {"雲耀":"https://pub-76f7e7fbf50f4423b85486dda0feb0c9.r2.dev/","Neocities":"https://vert.neocities.org/m/"};
	for (const server in servers){
		testFetchLatency(servers[server]+'nst.webp', 10000).then(r=>{
			console.log(server,r);
		});
	}
}
測底圖延遟(true);
setInterval(測底圖延遟, 10000);
setTimeout(測瓦服務器延遟, 5000);
document.getElementById("底圖選單").addEventListener('change',function(){
	var 所選值 = this.selectedOptions[0].value;
	易圖層源(lmap, 所選值);
});
lmap.on('moveend',()=>{
	localStorage.setItem("經度", lmap.getCenter().lng.toString());
	localStorage.setItem("緯度", lmap.getCenter().lat.toString());
});
lmap.on('zoomend',()=>{
	localStorage.setItem("縮放級", lmap.getZoom().toString());
});