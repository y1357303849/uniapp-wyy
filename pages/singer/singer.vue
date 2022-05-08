<template>
	<view class="singerBox">
		<!-- 顶部分类 -->
		<view class="singerTop">
			<view class="areaList">
				<text>华语</text>
				<text>欧美</text>
				<text>日本</text>
				<text>韩国</text>
				<text>其他</text>
			</view>
			<view class="sexAndBand">
				<text>男</text>
				<text>女</text>
				<text>乐队/组合</text>
			</view>
		</view>
		<!-- 热门歌手横幅 -->
		<view class="hotSinger">
			热门歌手
		</view>
		<!-- 歌手列表 -->
		<view class="singerList">
			<scroll-view scroll-y="true" >
				<view class="singerItem" v-for="(item,index) in singerList" :key="index" @click="goSingerPage(index)">
					<image :src="item.picUrl" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入封装的请求文件
	import {
	  getWholeListAPI
	} from "@/untils/singer.js";
	
	export default {
		data() {
			return {
				// 歌手头像列表
				singerList: [],
				// 点击歌手对应的下标
				singerIndex: 0,
			}
		},
		onLoad() {
			this.getSingers()
		},
		methods: {
			// 歌手列表
			async getSingers() {
			      const { data: res } = await getWholeListAPI(this.singerList);
			      // console.log(res.artists);
			      this.singerList = res.artists;
			},
			// 点击跳转歌手详情页
			    goSingerPage(index) {
					this.singerIndex = index;
					uni.$emit("singerId", this.singerList[this.singerIndex])
					// console.log(this.singerList[this.singerIndex])
					uni.navigateTo({
						url:'/pages/singerPage/singerPage'
					})
			    },
		}
	}
</script>

<style lang="less">
	page{
		background-color: #541e24;
		.singerBox{
			width: 750rpx;
			margin-top: 10rpx;
			// 顶部分类
			.singerTop{
				width: 750rpx;
				height: 100rpx;
				color: white;
				z-index: 9999;
				background-color: #5d3131;
				.areaList{
					width: 750rpx;
					height: 50rpx;
					line-height: 50rpx;
					text{
						width: 150rpx;
						height: 50rpx;
						display: block;
						float: left;
						text-align: center;
					}
				}
				.sexAndBand{
					width: 750rpx;
					height: 50rpx;
					line-height: 50rpx;
					text{
						width: 150rpx;
						height: 50rpx;
						display: block;
						float: left;
						text-align: center;
					}
				}
			}
			// 横幅
			.hotSinger{
				width: 750rpx;
				height: 50rpx;
				margin-top: 20rpx;
				color: white;
				background-color: #5d3131;
				position: sticky;
				top: 90rpx;
				z-index: 9999;
			}
			// 歌手列表
			.singerList{
				width: 750rpx;
				display: flex;
				margin-top: 10rpx;
				display: flex;
				flex-direction:column-reverse;
				scroll-view{
					.singerItem{
						width: 750rpx;
						height: 100rpx;
						margin-top: 20rpx;
						image{
							width: 100rpx;
							height: 100rpx;
							float: left;
							border-radius: 50%;
						}
						text{
							width: 500rpx;
							height: 100rpx;
							margin-left: 20rpx;
							line-height: 100rpx;
							color: white;
							font-size: 35rpx;
							display: block;
							float: left;
						}
					}
				}
			}
		}
	}
</style>
