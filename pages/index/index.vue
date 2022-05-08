<template>
	<view class="indexBox">
		<!-- 搜索框 -->
		<view class="indexSearch">
			<input type="text" value="请输入内容" />
		</view>
		<!-- 轮播图 -->
		<Swiper :swiperImg="swiperImg" @swiperItem="getSwiper"></Swiper>
		<!-- 推荐歌单 -->
		<ThePlayList :playLists="playLists" @PlayListItem="getPlayList"></ThePlayList>
		<!-- 独家放送 -->
		<Exclusive :exclusives="exclusives" @exclusiveItem="getExclusives"></Exclusive>
		<!-- 最新专辑 -->
		<NewAlbum :newAlbums="newAlbums" @newAlbumItem="getNewAlbums"></NewAlbum>
	</view>
</template>

<script>
	// 引入封装的请求文件
	import {
	  getSwiperAPI,
	  getPlayListAPI,
	  getExclusiveAPI,
	  getNewAlbumAPI
	} from "@/untils/home.js";
	
	import Swiper from '../../components/Home/swiper.vue'
	import ThePlayList from '../../components/Home/thePlayList.vue'
	import Exclusive from '../../components/Home/exclusive.vue'
	import NewAlbum from '../../components/Home/newAlbum.vue'
	
	export default {
		data() {
			return {
				// 轮播图
				swiperImg: [],
				// 推荐歌单
				playLists:[],
				// 独家放送
				exclusives:[],
				// 最新专辑
				newAlbums:[]
			}
		},
		components:{
			Swiper,
			ThePlayList,
			Exclusive,
			NewAlbum
		},
		onLoad() {
			this.getSwiper()
			this.getPlayList()
			this.getExclusives()
			this.getNewAlbums()
		},
		methods: {
			// 轮播图
			async getSwiper() {
			      const { data: res } = await getSwiperAPI(this.swiperImg);
			      // console.log(res.banners);
			      this.swiperImg = res.banners;
			},
			// 推荐歌单
			async getPlayList() {
			      const { data: res } = await getPlayListAPI(this.playLists);
			      // console.log(res.result);
			      // 选定从数组中的哪个数据开始到结束
			      this.playLists = res.result.slice(11, 23);
			      // console.log(this.playLists);
			},
			// 独家放送
			async getExclusives() {
			      const { data: res } = await getExclusiveAPI(this.exclusives);
			      // console.log(res.result);
			      // 选定从数组中的哪个数据开始到结束
			      this.exclusives = res.result;
			      // console.log(this.exclusives);
			},
			// 最新音乐
			async getNewAlbums() {
			      const { data: res } = await getNewAlbumAPI(this.newAlbums);
			      console.log(res.result);
			      // 选定从数组中的哪个数据开始到结束
			      this.newAlbums = res.albums;
			      // console.log(this.newAlbums);
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #541e24;
		.indexBox{
			// 搜索框
			.indexSearch{
				input{
					width: 730rpx;
					height: 60rpx;
					margin: 20rpx auto;
					border-radius: 20rpx;
					box-sizing: border-box;
					color: white;
					text-align: center;
					background-color: #5d3131;
				}
			}
		}
	}
</style>
