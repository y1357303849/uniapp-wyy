<template>
	<view class="authorityBox">
		<view class="topTitle">
			<text>官方榜</text>
		</view>
		<!-- 飙升榜 -->
		<view class="topList"  @click="goPlayList1(index)">
			<view class="topListImg">
				<text>飙升榜</text>
				<image :src="this.surgeTopList[0].al.picUrl" mode=""></image>
			</view>
			<view class="topListSong">
				<text v-for="(item,index) in surgeTopList" :key="index">
					{{index+1}}. {{ item.name }}---{{ item.ar[0].name }}
				</text>
			</view>
		</view>
		<!-- 新歌榜 -->
		<view class="topList"  @click="goPlayList2(index)">
			<view class="topListImg">
				<text>新歌榜</text>
				<image :src="this.newSingTopList[0].al.picUrl" mode=""></image>
			</view>
			<view class="topListSong">
				<text v-for="(item,index) in newSingTopList" :key="index">
					{{index+1}}. {{ item.name }}---{{ item.ar[0].name }}
				</text>
			</view>
		</view>
		<!-- 原创榜 -->
		<view class="topList"  @click="goPlayList3(index)">
			<view class="topListImg">
				<text>原创榜</text>
				<image :src="this.originalTopList[0].al.picUrl" mode=""></image>
			</view>
			<view class="topListSong">
				<text v-for="(item,index) in originalTopList" :key="index">
					{{index+1}}. {{ item.name }}---{{ item.ar[0].name }}
				</text>
			</view>
		</view>
		<!-- 热歌榜 -->
		<view class="topList"  @click="goPlayList4(index)">
			<view class="topListImg">
				<text>热歌榜</text>
				<image :src="this.hotSongTopList[0].al.picUrl" mode=""></image>
			</view>
			<view class="topListSong">
				<text v-for="(item,index) in hotSongTopList" :key="index">
					{{index+1}}. {{ item.name }}---{{ item.ar[0].name }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 点击推荐歌单对应的下标
				listIndex:0
			}
		},
		props: ['surgeTopList', 'newSingTopList', 'originalTopList', 'hotSongTopList',
				'surgeTopAll','newSingTopAll','originalTopAll','hotSongTopAll'],
		methods: {
			navigator() {
				this.$emit('surgeItem', 'newSingItem', 'originalItem', 'hotSongItem')
			},
			// 跳转歌单详情页
			goPlayList1(index){
				this.listIndex = index
				uni.$emit("playListId",this.surgeTopAll.id)
				console.log(this.surgeTopAll.id)
				uni.navigateTo({
					url:'/pages/topPage/topPage'
				})
			},
			goPlayList2(index){
				this.listIndex = index
				uni.$emit("playListId",this.newSingTopAll.id)
				// console.log(this.newSingTopAll.id)
				uni.navigateTo({
					url:'/pages/topPage/topPage'
				})
			},
			goPlayList3(index){
				this.listIndex = index
				uni.$emit("playListId",this.originalTopAll.id)
				// console.log(this.originalTopAll.id)
				uni.navigateTo({
					url:'/pages/topPage/topPage'
				})
			},
			goPlayList4(index){
				this.listIndex = index
				uni.$emit("playListId",this.hotSongTopAll.id)
				// console.log(this.hotSongTopAll.id)
				uni.navigateTo({
					url:'/pages/topPage/topPage'
				})
			},
		}
	}
</script>

<style lang="less">
	.authorityBox {
		width: 750rpx;
		.topTitle{
			width: 700rpx;
			height: 30rpx;
			line-height: 30rpx;
			margin: 50rpx auto;
			text{
				color: white;
				font-size:50rpx;
			}
		}
		.topList {
			width: 700rpx;
			height: 200rpx;
			margin: 50rpx auto;
			border-radius: 20rpx;
			display: flex;
			background-color: #5d3131;

			.topListImg {
				width: 200rpx;
				height: 100%;
				text{
					width: 100%;
					height: 40%;
					color: white;
					display: block;
					font-size: 50rpx;
					text-align: center;
				}
				image {
					width: 100%;
					height: 60%;
					border-radius: 10rpx;
				}
			}

			.topListSong {
				flex: 1;
				height: 90%;
				margin: auto 5%;
				margin-left: 20rpx;

				text {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 35rpx;
					display: block;
					color: white;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
