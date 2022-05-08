<template>
	<view class="recommendMvBox">
		<view class="reMvTop">
			推荐MV
		</view>
		<view class="reMvs">
			<view class="reMvsItem" v-for="(item,index) in recommendMvs" :key="index" @click="goExclusive(index)">
				<image :src="item.picUrl" mode=""></image>
				<text>{{ item.name + "---" + item.artistName }}</text>
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
		props:['recommendMvs'],
		methods:{
			navigator(){
				this.$emit('recommendMvItem')
			},
			// 跳转歌单详情页
			goExclusive(index){
				this.exclusiveIndex = index
				uni.$emit("exclusiveId",this.recommendMvs[this.exclusiveIndex])
				console.log(this.recommendMvs[this.exclusiveIndex])
				uni.navigateTo({
					url:'/pages/mvPage/mvPage'
				})
			},
		}
	}
</script>

<style lang="less">
	.recommendMvBox{
		width: 750rpx;
		margin-top: 20rpx;
		background-color: #5d3131;
		.reMvTop{
			width: 750rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 50rpx;
			color: white;
		}
		.reMvs{
			width: 750rpx;
			margin-top: 10rpx;
			display: flex;
			flex-wrap: wrap;
			.reMvsItem{
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
					height: 80rpx;
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
