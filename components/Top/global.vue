<template>
	<!-- 全球榜 -->
	<view class="globalBox">
		<view class="topTitle">
			<text>全球榜</text>
		</view>
		<view class="topLists">
			<view class="topItem" v-for="(item,index) in globalTopList" :key="index" @click="goPlayList(index)">
				<image :src="item.coverImgUrl" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props:['globalTopList','globalTopAll'],
		onLoad() {
			
		},
		methods:{
			navigator() {
				this.$emit('globalItem')
			},
			// 跳转歌单详情页
			goPlayList(index){
				// 将当前点击的下标赋值
				const globalIndex = index + 4;
				uni.$emit("playListId",this.globalTopAll[globalIndex].id)
				// console.log(this.globalTopAll[globalIndex].id)
				uni.navigateTo({
					url:'/pages/topPage/topPage'
				})
			},
		}
	}
</script>

<style lang="less">
	.globalBox{
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
		.topLists{
			width: 700rpx;
			margin: 50rpx auto;
			border-radius: 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			background-color: #5d3131;
			.topItem{
				width: 220rpx;
				height: 200rpx;
				// background-color: white;
				image{
					width: 200rpx;
					height: 130rpx;
					border-radius: 10rpx;
				}
				text{
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
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
