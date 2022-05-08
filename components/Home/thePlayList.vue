<template>
	<view class="thePlayListBox">
		<!-- 推荐歌单 -->
			<view class="listTitle">
				推荐歌单
			</view>
			<scroll-view scroll-x="true" >
				<view class="listItem" v-for="(item,index) in playLists" :key="index" @click="goPlayList(index)">
					<image :src="item.picUrl" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
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
		props:["playLists"],
		methods: {
			navigator(){
				this.$emit('PlayListItem')
			},
			// 跳转歌单详情页
			goPlayList(index){
				this.listIndex = index
				uni.$emit("playListId",this.playLists[this.listIndex])
				// console.log(this.playLists[this.listIndex])
				uni.navigateTo({
					url:'/pages/indexThePlayList/indexThePlayList'
				})
			},
		}
	}
</script>

<style lang="less">
	.thePlayListBox {
		width: 730rpx;
		// height: 300rpx;
		margin: 20rpx auto;
		margin-top:120px;
	    white-space: nowrap;
		background-color: #5d3131;
		border-radius: 10rpx;
		.listTitle {
			width: 730rpx;
			height: 30px;
			line-height: 30px;
			color: white;
			font-size: 50rpx;
		}

		scroll-view {
			min-width:100%;
			height: 300rpx;
			margin-top: 20rpx;
			.listItem {
				width: 100px;
				height: 300rpx;
				// float: left;
				margin-right: 40rpx;
				display: inline-block;
				
				image {
					width: 100px;
					height: 200rpx;
					border-radius: 20rpx;
				}
				text {
					width: 100px;
					// height: 100rpx;
					font-size: 30rpx;
					color: white;
					display:block;
					overflow: hidden;
					text-overflow: ellipsis;
				
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
