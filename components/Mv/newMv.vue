<template>
	<view class="newMvBox">
		<!-- 头部 -->
		<view class="newMvTop">
			<view class="titleName">
				最新MV
			</view>
			<view class="tagList">
				<text>内地</text>
				<text>港台</text>
				<text>欧美</text>
				<text>日本</text>
				<text>韩国</text>
			</view>
		</view>
		<!-- mv -->
		<view class="newMvs">
			<view class="newMvsItem" v-for="(item,index) in newMvs" :key="index" @click="goExclusive(index)">
				<image :src="item.cover" mode=""></image>
				<text>{{ item.name }}---{{ item.artistName }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 点击独家放送对应的下标
				exclusiveIndex:0
			}
		},
		props:['newMvs'],
		methods: {
			navigator(){
				this.$emit('newMvItem')
			},
			// 跳转歌单详情页
			goExclusive(index){
				this.exclusiveIndex = index
				uni.$emit("exclusiveId",this.newMvs[this.exclusiveIndex])
				// console.log(this.newMvs[this.exclusiveIndex])
				uni.navigateTo({
					url:'/pages/mvPage/mvPage'
				})
			},
		}
	}
</script>

<style lang="less">
	.newMvBox{
		width: 750rpx;
		margin-top: 10rpx;
		background-color: #5d3131;
		.newMvTop{
			width: 750rpx;
			height: 100rpx;
			.titleName{
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 50rpx;
				color: white;
				float: left;
			}
			.tagList{
				float: left;
				text{
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					color: white;
					display: block;
					float: left;
				}
			}
		}
		.newMvs{
			width: 750rpx;
			margin-top: 10rpx;
			display: flex;
			flex-wrap: wrap;
			.newMvsItem{
				width: 365rpx;
				height: 380rpx;
				margin: 10rpx auto;
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
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
