<template>
	<view class="indexExclusivesBox">
		<!-- 视频 -->
		<view class="videoBox">
			<video :src="videoUrl" controls></video>
		</view>
		<!-- 简介评论tab -->
		<view class="topTab">
			<view class="oneTab" :class="{ tabActive: cssSynopsis === index }" @click="goSynopsis(1,index)">
				简介
			</view>
			<view class="twoTab" :class="{ tabActive: cssComment === index }" @click="goComment(2,index)">
				评论{{videoComment.length}}
			</view>
		</view>
		<!-- 简介内容 -->
		<view class="synopsisBox" v-show="showType === 1">
			<!-- 头部视频信息 -->
			<view class="synopsisTop">
				<view class="singerText">
					<image class="singerImg" src="" mode=""></image>
					<view class="singerName">
						<text class="sName">{{videoData.artists[0].name}}/{{videoData.artists[1].name}}</text>
						<text class="fansNum">0粉丝 0视频</text>
					</view>
				</view>
				<view class="songText">
					<text class="songName">{{videoData.name}}</text>
					<text class="whactNum">{{videoData.playCount}}观看 {{videoData.publishTime}}</text>
				</view>
				<view class="fourBtn">
					<view class="iconfont icon-gouxuan"></view>
					<view class="iconfont icon-fenxiang"></view>
					<view class="iconfont icon-pinglun"></view>
					<view class="iconfont icon-icon"></view>
				</view>
			</view>
			<!-- 相关视频 -->
			<view class="relatedVideo">
				<scroll-view scroll-y="true" >
					<view class="rvItem" v-for="(item, index) in videoMore" :key="index">
						<view class="rVideoImg">
							<image class="rvImg" :src="item.cover" mode=""></image>
						</view>
						<view class="rVideoTetx">
							<text class="rtOne">{{ item.name }}</text>
							<text class="rtTwo">{{ item.artistName }}</text>
							<text class="rtThree">{{item.playCount}}播放</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="commentBox" v-show="showType === 2">
			<!-- 推荐、最热、最新 -->
			<view class="commentTop">
				<text class="ctOne ctActive">推荐</text>
				<text class="ctTwo">最热</text>
				<text class="ctThree">最新</text>
			</view>
			<!-- 评论区 -->
			<view class="commentContent">
				<scroll-view scroll-y="true" >
					<view class="ccItem" v-for="(item,index) in videoComment" :key="index">
						<!-- 评论人信息 -->
						<view class="ciTop">
							<image class="ctImg" :src="item.user.avatarUrl" mode=""></image>
							<view class="ctName">
								<text class="cnUser">{{item.user.nickname}}</text>
								<text class="cnDate">{{item.timeStr}}</text>
							</view>
						</view>
						<!-- 评论内容 -->
						<view class="ciContent">
							<text class="ccText">{{item.content}}</text>
						</view>
						<!-- 别人的回复 -->
						<view class="ciOthers">
							<view class="coUserText">
								<text class="coUser">xxxxx:</text>
								<text class="coText">测试>测试>测试>测试>测试>测试>测试>测试>测试>测试</text>
							</view>
							<text class="coMore">100条回复></text>
						</view>
					</view>
				</scroll-view>
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
				// 视频ID
				videoId: "",
				// 视频信息
				videoData: [],
				// 视频数据
				videoUrl: '',
				// 视频相关推荐
				videoMore:[],
				// 评论数据
				videoComment:[],
				// 展示点击tab对应的内容
				showType: 1,
				// css样式
				cssSynopsis: 0,
				cssComment: 0,
			}
		},
		onLoad() {
			uni.$on('exclusiveId', (val) => {
				this.exclusiveId = val.id;
				// console.log(this.exclusiveId);
				// 将数据存储到localStorage里
				window.localStorage.setItem(
					"exclusiveId",
					JSON.stringify(this.exclusiveId)
				);
			})
			this.getMvDetail()
			this.getMvVideo()
			this.getMvMore()
			this.getMvComment()
		},
		onUnload(){
			// uni.$off('exclusiveId')
		},
		methods: {
			// 请求对应的MV数据
			async getMvDetail() {
				// 将存储的数据赋值到vtId里
				const vtId = window.localStorage;
				// console.log(vtId.exclusiveId);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家MV详情页的数据
					"/mv/detail?mvid=" + vtId.exclusiveId, {
						params: {
							res: this.videoData,
						},
					}
				);
				this.videoData = res.data;
				// console.log(this.videoData);
			},
			// 请求对应的Mv视频
			async getMvVideo() {
				// 将存储的数据赋值到mvideoId里
				const mvideoId = window.localStorage;
				// console.log(mvideoId.exclusiveId);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家Mv视频
					"/mv/url?id=" + mvideoId.exclusiveId, {
						params: {
							res: this.videoUrl,
						},
					}
				);
				this.videoUrl = res.data.url;
				// console.log(this.videoUrl);
			},
			// 请求对应的MV相关推荐
			async getMvMore() {
				// 将存储的数据赋值到mvMoreId里
				const mvMoreId = window.localStorage;
				// console.log(mvMoreId.exclusiveId);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家MV详情页的数据
					"/simi/mv?mvid=" + mvMoreId.exclusiveId, {
						params: {
							mvMore: this.videoMore,
						},
					}
				);
				this.videoMore = res.mvs;
				// console.log(this.videoMore);
			},
			// 请求对应的MV数评论
			async getMvComment() {
			      // 将存储的数据赋值到mvCommentId里
			      const mvCommentId = window.localStorage;
			      // console.log(mvCommentId.exclusiveId);
			      const { data: res } = await request.get(
			        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家MV详情页的数据
			        "/comment/mv?id=" + mvCommentId.exclusiveId,
			        {
			          params: {
			            comments: this.videoComment,
			          },
			        }
			      );
				  // 最新
			      // this.videoComment = res.comments;
				  // 最热
			      this.videoComment = res.hotComments;
			      // console.log(this.videoComment);
			    },
			// tab切换页面
			goSynopsis(type, index) {
				this.cssSynopsis = index
				this.cssComment = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			},
			goComment(type, index) {
				this.cssComment = index
				this.cssSynopsis = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #541e24;

		.indexExclusivesBox {
			width: 750rpx;

			// 视频
			.videoBox {
				width: 750rpx;
				height: 400rpx;
				position: sticky;
				top: 0;
				z-index: 99999;
				video {
					width: 750rpx;
					height: 400rpx;
				}
			}

			// 简介评论tab
			.topTab {
				width: 750rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: white;
				background-color: #5d3131;
				position: sticky;
				top: 400rpx;
				z-index: 99999;
				.oneTab {
					width: 150rpx;
					height: 80rpx;
					float: left;
				}

				.twoTab {
					width: 150rpx;
					height: 80rpx;
					float: left;
				}

				.tabActive {
					box-sizing: border-box;
					color: #482522;
					border-bottom: 8rpx solid #482522;
				}
			}

			// 简介
			.synopsisBox {
				width: 750rpx;

				// 头部视频信息
				.synopsisTop {
					width: 750rpx;
					height: 340rpx;
					margin-top: 20rpx;
					background-color: #5d3131;

					.singerText {
						width: 750rpx;
						height: 100rpx;

						.singerImg {
							width: 100rpx;
							height: 100rpx;
							float: left;
							background-color: white;
							border-radius: 50%;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.singerName {
							width: 500rpx;
							height: 100rpx;
							margin-left: 20rpx;
							float: left;
							color: white;

							.sName {
								width: 500rpx;
								height: 50rpx;
								display: block;
							}

							.fansNum {
								width: 500rpx;
								height: 50rpx;
								display: block;
							}
						}
					}

					.songText {
						width: 750rpx;
						height: 100rpx;
						line-height: 50rpx;
						margin-top: 20rpx;
						color: white;

						.songName {
							width: 750rpx;
							height: 50rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}

						.whatchNum {
							width: 750rpx;
							height: 50rpx;
							display: block;
						}
					}

					.fourBtn {
						width: 750rpx;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						margin-top: 20rpx;
						color: white;
						display: flex;
						.iconfont{
							font-size: 50rpx;
						}
						view {
							width: 200rpx;
							height: 100rpx;
						}
					}
				}
				// 视频相关推荐
				.relatedVideo{
					width: 750rpx;
					margin-top: 10rpx;
					scroll-view{
						width: 750rpx;
						display: flex;
						
						.rvItem{
							width: 750rpx;
							height: 200rpx;
							margin-top: 10rpx;
							background-color: #5d3131;
							.rVideoImg{
								width: 300rpx;
								height: 200rpx;
								float: left;
								.rvImg{
									width: 250rpx;
									height: 150rpx;
									margin: 25rpx;
									border-radius: 20rpx;
								}
							}
							.rVideoTetx{
								width: 430rpx;
								height: 200rpx;
								float: left;
								color: white;
								margin-left: 20rpx;
								.rtOne{
									width: 430rpx;
									height: 100rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
								}
								.rtTwo,.rtThree{
									width: 430rpx;
									height: 50rpx;
									font-size: 30rpx;
									line-height: 50rpx;
									display: block;
								}
							}
						}
					}
				}
			}
			// 评论
			.commentBox{
				width: 750rpx;
				margin-top: 20rpx;
				// 推荐、最新、最热
				.commentTop{
					width: 750rpx;
					height: 70rpx;
					line-height: 70rpx;
					color: white;
					background-color: #5d3131;
					.ctOne,.ctTwo,.ctThree{
						width: 100rpx;
						height: 70rpx;
						display: block;
						float: left;
						text-align: center;
					}
					.ctActive{
						color: #482522;
					}
				}
				// 评论区
				.commentContent{
					width: 750rpx;
					margin-top: 20rpx;
					scroll-view{
						width: 750rpx;
						.ccItem{
							width: 750rpx;
							margin-top: 20rpx;
							background-color: #5d3131;
							// 评论人信息
							.ciTop{
								width: 750rpx;
								height: 80rpx;
								.ctImg{
									width: 100rpx;
									height: 80rpx;
									margin-right: 20rpx;
									border-radius: 50%;
									float: left;
								}
								.ctName{
									width: 500rpx;
									height: 80rpx;
									line-height: 40rpx;
									float: left;
									color: white;
									.cnUser{
										width: 500rpx;
										height: 40rpx;
										display: block;
									}
									.cnDate{
										width: 500rpx;
										height: 40rpx;
										font-size: 27rpx;
										display: block;
									}
								}
							}
							// 评论内容
							.ciContent{
								width: 630rpx;
								margin-top: 20rpx;
								color: white;
								margin-left: 120rpx;
								.ccText{
									width: 630rpx;
									margin-top: 20rpx;
									color: white;
									// margin-left: 120rpx;
									display: block;
								}
							}
							// 别人的回复
							.ciOthers{
								width: 600rpx;
								height: 150rpx;
								margin-top: 20rpx;
								color: white;
								margin-left: 120rpx;
								margin-right: 30rpx;
								border-radius: 20rpx;
								background-color: #482522;
								.coUserText{
									width: 550rpx;
									margin: 0 auto;
									.coUser{
										width: 150rpx;
										height: 50rpx;
										line-height: 50rpx;
										text-align: center;
										display: block;
										float: left;
									}
									.coText{
										float: left;
										width: 400rpx;
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
									}
								}
								.coMore{
									width: 200rpx;
									height: 50rpx;
									position: absolute;
									bottom: 0;
									margin-left: 25rpx;
									text-align: center;
									line-height: 50rpx;
									display: block;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
