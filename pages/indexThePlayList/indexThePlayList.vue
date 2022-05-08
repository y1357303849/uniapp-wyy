<template>
	<!-- 歌单详情页 -->
	<view class="iThePlayListBox">
		<!-- 头部信息 -->
		<view class="playListTop">
			<view class="playListImg">
				<image class="plImg" :src="playListData.coverImgUrl" mode=""></image>
			</view>
			<view class="playListData">
				<text class="plName">{{ playListData.name }}</text>
				<view class="plDataUser">
					<image class="userImg" :src="playListData.creator.avatarUrl" mode=""></image>
					<text class="plUser">{{ playListData.creator.nickname }}</text>
				</view>
				<text class="plText">{{ playListData.description }}</text>
			</view>
		</view>
		<!-- 收藏评论分享按钮 -->
		<view class="threeButton">
			<view class="collectBtn">
				<view class="iconfont icon-tianjiawenjianjia"></view>
				<text class="btnText">({{ playListData.subscribedCount }})</text>
			</view>
			<view class="commentBtn">
				<view class="iconfont icon-pinglun"></view>
				<text class="btnText">(557)</text>
			</view>
			<view class="relayBtn">
				<view class="iconfont icon-fenxiang"></view>
				<text class="btnText">({{ playListData.shareCount }})</text>
			</view>
		</view>
		<!-- 播放全部 -->
		<view class="playAll">
			<text class="allBtn">播放全部({{playListAll.length}})</text>
		</view>
		<!-- 音乐播放 -->
		<!-- view class="playBox">
			<audio :src="singUrls" :poster="playSingData.al.picUrl" :name="playSingData.name"
				:author="playSingData.ar[0].name" controls="true"></audio>
		</view> -->
		<!-- 歌曲列表 -->
		<view class="tpSongsList">
			<scroll-view scroll-y="true">
				<view class="tpScrollItem" v-for="(item, index) in playListAll" :key="index"
					@click="playSing(item.id,index,item)">
					<text class="itemIndex">{{ index + 1}}</text>
					<view class="songsData">
						<text class="sdTop">{{ item.name }}</text>
						<text class="sdBottom">{{ item.ar[0].name }}-{{ item.al.name }}</text>
					</view>
					<!-- mv、更多按钮 -->
					<view class="tpTwoBtn">
						<view class="iconfont icon-bofangqi-bofangxiaodianshi"></view>
						<view class="iconfont icon-gengduo-shuxiang"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 导入request模块
	import request from '../../untils/request.js'

	export default {
		data() {
			return {
				// 歌单ID
				playListId: "",
				// 歌单数据
				playListData: [],
				// 歌单完整歌曲列表
				playListAll: [],
				// 音乐播放
				singUrls: '',
				// 当前点击的音乐信息
				playSingData: [],
				// 点击歌曲的下标
				nAlbumIndex: 0,
			}
		},
		onLoad() {
			uni.$on('playListId', (val) => {
				this.playListId = val.id;
				// console.log(this.playListId);
				// 将数据存储到localStorage里
				window.localStorage.setItem(
					"playListId",
					JSON.stringify(this.playListId)
				);
			})
			this.getiThePlayList()
			this.getSingAll()
			this.playSing()
		},
		onHide() {
			// uni.$off('playListId')
		},

		methods: {
			// 请求对应的歌单数据
			async getiThePlayList() {
				// 将存储的数据赋值到plId里
				const plId = window.localStorage;
				// console.log(plId.playListId);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
					"/playlist/detail?id=" + plId.playListId, {
						params: {
							playlist: this.playListData,
						},
					}
				);
				this.playListData = res.playlist;
				// console.log(this.playListData);
			},
			// 请求歌单完整数据
			async getSingAll() {
				// 将存储的数据赋值到plId里
				const sAllId = window.localStorage;
				// console.log(sAllId.playListId);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
					"/playlist/track/all?id=" + sAllId.playListId, {
						params: {
							playlist: this.playListAll,
						},
					}
				);
				this.playListAll = res.songs;
				// console.log(this.playListAll);
			},
			// // 播放歌曲
			// async getPlaySing (){

			// }
			// 点击播放歌曲
			async playSing(id, index, item) {
				// console.log(item)
				this.playSingData = []
				this.singUrls = ''
				// console.log(id)
				this.nAlbumIndex = index
				// console.log(this.nAlbumIndex)
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
					"/song/url?id=" + id, {
						params: {
							singUrls: this.singUrls,
						},
					}
				);
				// console.log(res.data[0].url);
				this.singUrls = res.data[0].url;
				this.playSingData = item
				console.log(this.playSingData)
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #541e24;
	}

	.iThePlayListBox {
		width: 750rpx;

		// 头部信息
		.playListTop {
			width: 750rpx;
			height: 350rpx;
			margin-top: 20rpx;
			background-color: #5d3131;
			color: white;
			position: relative;

			.playListImg {
				width: 200rpx;
				height: 220rpx;
				float: left;
				margin-left: 20rpx;
				margin-top: 20rpx;

				.plImg {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}

			.playListData {
				width: 500rpx;
				// height: 300rpx;
				float: left;
				margin-left: 20rpx;
				margin-top: 20rpx;

				.plName {
					width: 500rpx;
					height: 100rpx;
					line-height: 50rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.plDataUser {
					width: 500rpx;
					height: 70rpx;
					line-height: 70rpx;
					margin-top: 10rpx;

					.userImg {
						width: 70rpx;
						height: 70rpx;
						float: left;
						border-radius: 50%;
					}

					.plUser {
						float: left;
						display: block;
						margin-left: 10rpx;
					}
				}

				.plText {
					width: 500rpx;
					height: 30rpx;
					font-size: 20rpx;
					margin-top: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}

		// 三个按钮
		.threeButton {
			width: 650rpx;
			height: 100rpx;
			position: relative;
			top: -50rpx;
			margin: 0 auto;
			border-radius: 50rpx;
			display: flex;
			justify-content: space-around;
			background-color: #482522;
			color: white;

			view {
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;

				// text-align: center;
				.iconfont {
					width: 50rpx;
					margin-left: 20rpx;
					font-size: 50rpx;
					float: left;
				}

				.btnText {
					width: 130rpx;
					display: block;
					float: left;
					text-align: center;
				}
			}
		}

		// 播放全部
		.playAll {
			width: 750rpx;
			height: 100rpx;
			line-height: 100rpx;
			position: sticky;
			top: 89rpx;
			z-index: 99999;
			background-color: #5d3131;
			color: white;

			.allBtn {
				width: 100rpx;
				height: 100rpx;
				margin-left: 50rpx;
			}
		}

		// 音乐播放
		.playBox {
			position: sticky;
			top: 196rpx;
			z-index: 99999;
		}

		// 歌曲列表
		.tpSongsList {
			width: 750rpx;
			margin-top: 20rpx;

			scroll-view {
				width: 750rpx;

				.tpScrollItem {
					width: 750rpx;
					height: 100rpx;
					margin-top: 10rpx;
					display: flex;
					color: white;
					background-color: #5d3131;

					.itemIndex {
						width: 50rpx;
						height: 100rpx;
						line-height: 100rpx;
						left: 100rpx;
						text-align: center;
						margin-right: 30rpx;
					}

					.songsData {
						width: 550rpx;
						height: 100rpx;

						.sdTop {
							width: 550rpx;
							height: 50rpx;
							line-height: 50rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;

						}

						.sdBottom {
							width: 550rpx;
							height: 50rpx;
							font-size: 27rpx;
							line-height: 50rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}

					.tpTwoBtn {
						width: 200rpx;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;

						.iconfont {
							float: left;
							margin-left: 10rpx;
							font-size: 50rpx;
						}
					}
				}
			}
		}

	}
</style>
