<template>
	<view class="exclusiveBox">
		<!-- 独家放送 -->
		<scroll-view scroll-x="true" style="white-space: nowrap">
			<view class="scrollItem" v-for="(item,index) in exclusives" :key="index" @click="goExclusive(index)">
				<image :src="item.sPicUrl" mode=""></image>
				<text>{{ item.copywriter }}</text>
			</view>
		</scroll-view>
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
		props:['exclusives'],
		methods: {
			navigator(){
				this.$emit('exclusiveItem')
			},
			// 跳转歌单详情页
			goExclusive(index){
				this.exclusiveIndex = index
				uni.$emit("exclusiveId",this.exclusives[this.exclusiveIndex])
				console.log(this.exclusives[this.exclusiveIndex])
				uni.navigateTo({
					url:'/pages/indexExclusives/indexExclusives'
				})
			},
		}
	}
</script>

<style lang="less">
	.exclusiveBox{
		width: 730rpx;
		height: 300rpx;
		margin: 20rpx auto;
		margin-top:10px;
		white-space: nowrap;
		scroll-view{	
			min-width:100%;
			height: 300rpx;
			
			.scrollItem{
				width: 730rpx;
				height: 300rpx;
				// float: left;
				margin-right: 20rpx;
				display: inline-block;
				image{
					width: 730rpx;
					height: 250rpx;
					border-radius: 20rpx;
				}
				text{
					width: 730rpx;
					height: 50rpx;
					color: white;
					display: block;
					overflow: hidden;
				}
			}
		}
		::-webkit-scrollbar {
		  width: 0;
		  height: 0;
		  color: transparent;
		}
	}
</style>
