<template>
	<view class="mvBox">
		<!-- 最新MV -->
		<NewMv :newMvs="newMvs" @newMvItem="getNewMv"></NewMv>
		<!-- 推荐MV -->
		<RecommendMv :recommendMvs="recommendMvs" @recommendMvItem="getRecommendMv"></RecommendMv>
		<!-- MV排行榜 -->
		<MvTop :mvTops="mvTops" @mvTopItem="getMvTop"></MvTop>
	</view>
</template>

<script>
	import NewMv from '../../components/Mv/newMv.vue'
	import RecommendMv from '../../components/Mv/recommendMv.vue'
	import MvTop from '../../components/Mv/mvTop.vue'
	
	// 引入封装的请求文件
	import {
	  getNewMvAPI, getRecommendMvAPI, getMvTopAPI
	} from "@/untils/mv.js";
	
	export default {
		data() {
			return {
				// 最新MV
				newMvs: [],
				// 推荐MV
				recommendMvs: [],
				// MV排行榜
				mvTops: [],
			}
		},
		components:{
			NewMv,
			RecommendMv,
			MvTop
		},
		onLoad() {
			this.getNewMv()
			this.getRecommendMv()
			this.getMvTop()
		},
		methods: {
			// 最新MV
			async getNewMv() {
			    const { data: res } = await getNewMvAPI(this.newMvs);
			    // console.log(res.data);
			    this.newMvs = res.data.slice(0, 12);
			},
			// 推荐MV
			async getRecommendMv() {
			    const { data: res } = await getRecommendMvAPI(this.recommendMvs);
			    // console.log(res.result);
			    this.recommendMvs = res.result;
			},
			// MV排行榜
			async getMvTop() {
			    const { data: res } = await getMvTopAPI(this.mvTops);
			    // console.log(res.data);
			    this.mvTops = res.data.slice(0, 10);
			},
		}
	}
</script>

<style>
	page{
		background-color: #541e24;
	}
</style>
