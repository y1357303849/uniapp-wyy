<template>
	<view class="topBox">
		<!-- 官方榜 -->
		<Authority 
		:surgeTopList="surgeTopList" :surgeTopAll="surgeTopAll" @surgeItem="getSurge"
		:newSingTopList="newSingTopList" :newSingTopAll="newSingTopAll" @newSingItem="getNewSing"
		:originalTopList="originalTopList" :originalTopAll="originalTopAll" @originalItem="getOriginal"
		:hotSongTopList="hotSongTopList" :hotSongTopAll="hotSongTopAll" @hotSongItem="getHotSong"
		>
		</Authority>
		<!-- 全球榜 -->
		<Global :globalTopList="globalTopList" :globalTopAll="globalTopAll" @globalItem="getGlobal"></Global>
	</view>
</template>

<script>
	import Authority from '../../components/Top/authority.vue'
	import Global from '../../components/Top/global.vue'

	import {
		getSurgeTopAPI,
		getNewSingTopAPI,
		getOriginalTopAPI,
		getHotSongTopAPI,
		getGlobalTopAPI,
	} from '../../untils/top.js'

	export default {
		data() {
			return {
				// 飙升榜
				surgeTopList: [],
				// 新歌榜
				newSingTopList: [],
				// 原创榜
				originalTopList: [],
				// 热歌榜
				hotSongTopList: [],
				// 全球榜
				globalTopList: [],
				// -----总数据------
				// 飙升榜
				surgeTopAll: [],
				// 新歌榜
				newSingTopAll: [],
				// 原创榜
				originalTopAll: [],
				// 热歌榜
				hotSongTopAll: [],
				// 全球榜
				globalTopAll: [],
			}
		},
		components: {
			Authority,
			Global 
		},
		onLoad() {
			this.getSurge()
			this.getNewSing()
			this.getOriginal()
			this.getHotSong()
			this.getGlobal()
		},
		methods: {
			// 飙升榜
			    async getSurge() {
			      const { data: res } = await getSurgeTopAPI(this.surgeTopList);
			      // console.log(res.playlist.tracks);
			      this.surgeTopAll = res.playlist;
			      this.surgeTopList = res.playlist.tracks.slice(0, 3);
				  // console.log(this.surgeTopList[0].al.picUrl)
			    },
			    // 新歌榜
			    async getNewSing() {
			      const { data: res } = await getNewSingTopAPI(this.newSingTopList);
			      // console.log(res.playlist.tracks);
			      this.newSingTopAll= res.playlist;
			      this.newSingTopList = res.playlist.tracks.slice(0, 3);
			    },
			    // 原创榜
			    async getOriginal() {
			      const { data: res } = await getOriginalTopAPI(this.originalTopList);
			      // console.log(res.playlist.tracks);
			      this.originalTopAll = res.playlist;
			      this.originalTopList = res.playlist.tracks.slice(0, 3);
			    },
			    // 热歌榜
			    async getHotSong() {
			      const { data: res } = await getHotSongTopAPI(this.hotSongTopList);
			      // console.log(res.playlist.tracks);
			      this.hotSongTopAll = res.playlist;
			      this.hotSongTopList = res.playlist.tracks.slice(0, 3);
			    },
				// 全球榜
				async getGlobal() {
				    const { data: res } = await getGlobalTopAPI(this.globalTopList);
				    // console.log(res.list);
				    this.globalTopAll = res.list;
				    // console.log(this.globalAll);
				    this.globalTopList = res.list.slice(4, 34);
				    // console.log(this.globalTopList);
				},
		}
	}
</script>

<style>
	page {
		background-color: #541e24;
	}
</style>
