<template>
	<view class="songListBox">
		<!-- 顶部分类 -->
		<view class="songListTop">
			<scroll-view scroll-x="true" >
				<view class="topItem">华语</view>
				<view class="topItem">流行</view>
				<view class="topItem">摇滚</view>
				<view class="topItem">民谣</view>
				<view class="topItem">电子</view>
				<view class="topItem">另类/独立</view>
				<view class="topItem">轻音乐</view>
				<view class="topItem">综艺</view>
				<view class="topItem">影视原声</view>
				<view class="topItem">ACG</view>
			</scroll-view>
		</view>
		<!-- 歌单列表 -->
		<view class="songLists">
			<view class="songListsItem" v-for="(item,index) in songLists" :key="index" @click="goPlayList(index)">
				<image :src="item.coverImgUrl" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view class="isOver" v-if="flag">
			--------已全部加载--------
		</view>
	</view>
</template>

<script>
	import {getSongListAPI} from '../../untils/songList.js'
	
	export default {
		data() {
			return {
				// 歌曲列表
				songLists: [],
				flag:true,
				// 点击推荐歌单对应的下标
				listIndex:0
			}
		},
		onLoad() {
			this.getSongLists()
		},
		// 上拉加载更多
		// onReachBottom(){
		// 	if(this.songLists.length == ""){
		// 		this.flag= true
		// 	}else {
		// 		this.getSongLists()
		// 	}
		// },
		methods: {
			// 歌单列表
			    async getSongLists() {
			      const { data: res } = await getSongListAPI(this.songLists);
			      // console.log(res.playlists);
			      // this.songLists = res.playlists.slice(0, 10);
			      this.songLists = res.playlists;
				  // this.songLists = [...this.songLists,...res.playlists]
				  // console.log(this.songLists)
			    },
				// 跳转歌单详情页
				goPlayList(index){
					this.listIndex = index
					uni.$emit("playListId",this.songLists[this.listIndex])
					// console.log(this.songLists[this.listIndex])
					uni.navigateTo({
						url:'/pages/songListPage/songListPage'
					})
				},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #541e24;
		.songListBox{
			// 顶部分类
			.songListTop{
				margin-top: 20rpx;
				white-space: nowrap;
				background-color: #5d3131;
				scroll-view{
					min-width: 100%;
					height: 50rpx;
					.topItem{
						text-align: center;
						width: 200rpx;
						height: 100%;
						line-height: 50rpx;
						font-size: 40rpx;
						color: white;
						display: inline-block;
					}
				}
			}
			::-webkit-scrollbar {
			  width: 0;
			  height: 0;
			  color: transparent;
			}
			// 歌单列表
			.songLists{
				margin-top: 20rpx;
				background-color: #5d3131;
				display: flex;
				flex-wrap: wrap;
				.songListsItem{
					width: 365rpx;
					height: 380rpx;
					margin: 10rpx auto;
					background-color: #5d3131;
					image{
						width: 355rpx;
						margin: 5rpx;
						height: 280rpx;
						border-radius: 20rpx;
					}
					text{
						width: 100%;
						height: 100rpx;
						color: white;
					}
				}
			}
			.isOver{
				width: 100%;
				height: 50rpx;
				margin-top: 20rpx;
				text-align: center;
				font-size: 30rpx;
				font-weight: 900;
				color: white;
			}
		}
	}
</style>
