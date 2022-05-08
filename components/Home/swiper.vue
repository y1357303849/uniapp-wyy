<template>
	<view  class="swiperBox">
		<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in swiperImg" :key="index">
					<image :src="item.imageUrl" mode=""></image>
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
	export default {
		name:"swiper",
		data() {
			return {
				
			};
		},
		props:["swiperImg"],
		methods:{
			navigator(){
				this.$emit('swiperItem')
			}
		}
	}
</script>

<style lang="less">
	// 轮播图
	.swiperBox{
		width: 730rpx;
		height: 100rpx;
		margin: 20rpx auto;
		margin-top: 30rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
	}
</style>
