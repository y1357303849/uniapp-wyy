<template>
	<view class="mvTopBox">
		<!-- 头部 -->
		<view class="mvTopTitle">
			<view class="titleName">
				MV排行榜
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
		<view class="mvTops">
			<view class="mvTopItem" v-for="(item,index) in mvTops" :key="index" @click="goExclusive(index)">
				<image :src="item.cover" mode=""></image>
				<view class="mvTopName">
					<text>{{ item.artistName }}</text>
					<text>{{ item.name }}</text>
				</view>
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
		props:['mvTops'],
		methods:{
			navigator(){
				this.$emit('mvTopItem')
			},
			// 跳转歌单详情页
			goExclusive(index){
				this.exclusiveIndex = index
				uni.$emit("exclusiveId",this.mvTops[this.exclusiveIndex])
				console.log(this.mvTops[this.exclusiveIndex])
				uni.navigateTo({
					url:'/pages/mvPage/mvPage'
				})
			},
		}
	}
</script>

<style lang="less">
	.mvTopBox{
		width: 750rpx;
		margin-top: 10rpx;
		background-color: #5d3131;
		.mvTopTitle{
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
		.mvTops{
			width: 750rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.mvTopItem{
				width: 355rpx;
				height: 200rpx;
				margin: 10rpx auto;
				image{
					width: 50%;
					height: 200rpx;
					float: left;
					border-radius: 20rpx;
				}
				.mvTopName{
					width: 50%;
					height: 200rpx;
					float: left;
					text{
						width: 155rpx;
						height: 50%;
						font-size: 25rpx;
						// line-height: 100rpx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						color: white;
						padding-left: 10rpx;
					}
				}
			}
		}
	}
</style>
