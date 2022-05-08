<template>
	<view class="newAlbumBox">
		<view class="albumItem" v-for="(item,index) in newAlbums" :key="index" 
		@click="playSing(item.id)">
			<image :src="item.blurPicUrl" mode=""></image>
			<view class="albumName">
				<text>{{ item.artist.name }}</text>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入request模块
	import request from '../../untils/request.js'
	
	export default {
		data() {
			return {
				// 音乐播放
				singUrls: [],
				// 点击歌曲的下标
				// nAlbumIndex: 0,
			}
		},
		props:['newAlbums'],
		onLoad() {
			this.playSing()
		},
		methods: {
			navigator(){
				this.$emit('newAlbumItem')
			},
			// async playSing(id){
			// 	// console.log(this.newAlbums[index].id)
			// 	// this.nAlbumIndex = index
			// 	// console.log(this.nAlbumIndex)
			// 	 const { data: res } = await request.get(
			// 	        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
			// 	        "/song/url?id=" + id,
			// 	        {
			// 	          params: {
			// 	            singUrls: this.singUrls,
			// 	          },
			// 	        }
			// 	      );
			// 	      console.log(res.data[0].url);
			// 	      this.singUrls = res.data[0].url;
			// }
		}
	}
</script>

<style lang="less">
	.newAlbumBox{
		width: 750rpx;
		// height: 500rpx;
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: #5d3131;
		border-radius: 10rpx;
		.albumItem{
			width: 355rpx;
			height: 200rpx;
			margin: 10rpx auto;
			image{
				width: 50%;
				height: 200rpx;
				float: left;
				border-radius: 20rpx;
			}
			.albumName{
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
</style>
