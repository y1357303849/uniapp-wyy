<template>
	<!-- 歌手详情页 -->
	<view class="singerPageBox">
		<!-- 歌手图片 -->
		<view class="singerImg">
			<image :src="singerTexts.artist.cover" mode=""></image>
		</view>
		<!-- 歌手简略 -->
		<view class="singerSketchy">
			<text class="singerName">{{singerTexts.artist.name}}</text>
			<text class="singerFans">7001.1万 粉丝</text>
			<text class="singerStatus">{{singerTexts.identify.imageDesc}}</text>
			<view class="followBtn">
				<view class="fbText">已关注</view>
			</view>
		</view>
		<!-- tab -->
		<view class="singerTab">
			<view class="stHome" :class="{ stActive: cssHome === index }" @click="goHomeBox(1,index)">
				主页
			</view>
			<view class="stSongs" :class="{ stActive: cssSongs === index }" @click="goSongsBox(2,index)">
				歌曲
			</view>
			<view class="stAlbum" :class="{ stActive: cssAlbum === index }" @click="goAlbumBox(3,index)">
				专辑127
			</view>
			<view class="stVideo" :class="{ stActive: cssVideo === index }" @click="goVideoBox(4,index)">
				视频333
			</view>
		</view>
		<!-- 首页内容 -->
		<view class="stHomeBox" v-show="showType === 1">
			<!-- 艺人百科 -->
			<view class="sEncyclopedia">
				<text class="seTitle">艺人百科</text>
				<text class="seName">艺人名：{{singerTexts.artist.name}}</text>
				<text class="seStatus">身份：{{singerTexts.identify.imageDesc}}</text>
				<text class="seSex">性别：男</text>
				<text class="seBirthday">生日：1974-07-27 狮子座</text>
				<text class="seCountry">国家/地区：中国（香港）</text>
				<text class="seSchool">学校：英国金斯顿大学</text>
				<text class="seText">歌手简介：{{singerTexts.artist.briefDesc}}</text>
			</view>
			<!-- 相似艺人 -->
			<view class="resembleSinger">
				<text class="rsTitle">
					相似艺人
				</text>
				<scroll-view scroll-x="true">
					<view class="rsItem" v-for="(item,index) in resembleS" :key="index">
						<view class="reImg">
							<image class="rsImgs" :src="item.picUrl" mode=""></image>
						</view>
						<text class="rsName">{{item.name}}({{item.alias[0]}})</text>
						<text class="rsFans">{{item.fansCount}}粉丝</text>
						<view class="rsFollow">
							<text class="rfText">已关注</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 歌曲内容 -->
		<view class="stSongsBox" v-show="showType === 2">
			<!-- 播放全部 -->
			<view class="ssPlayAll">
				<view class="splayBtn">
					播放热门50
				</view>
			</view>
			<!-- 热门50首列表 -->
			<view class="fhotSongs">
				<scroll-view scroll-y="true" >
					<view class="ssItem" v-for="(item,index) in fHotSongs" :key="index">
						<text class="siIndex">{{ index + 1 }}</text>
						<view class="siSongName">
							<text class="sSongName">{{item.name}}({{item.alia[0]}})</text>
							<text class="sSingerName">{{item.ar[0].name}}-{{item.al.name}}</text>
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
		<!-- 专辑内容 -->
		<view class="stAlbumBox" v-show="showType === 3">
			<!-- 按时间 -->
			<view class="saTime">
				<view class="stimeText">
					按发布时间排序
				</view>
			</view>
			<!-- 专辑列表 -->
			<view class="saAlbums">
				<scroll-view scroll-y="true" >
					<view class="saItem" v-for="(item,index) in singerAlbums" :key="index">
						<image class="saImg" :src="item.blurPicUrl" mode=""></image>
						<view class="saAlbumName">
							<text class="saName">{{item.name}}</text>
							<text class="saDate">2021-12-13 {{item.size}}首</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 视频内容 -->
		<view class="stVideoBox" v-show="showType === 4">
			<!-- 全部、MV -->
			<view class="svTwoBtn">
				<text class="stOne stActive">全部</text>
				<text class="stTwo">MV</text>
			</view>
			<!-- 视频列表 -->
			<view class="svVideos">
				<scroll-view scroll-y="true" >
					<view class="svItem" v-for="(item,index) in singerVideos" :key="index">
						<image class="siImg" :src="item.imgurl" mode=""></image>
						<view class="siSongtext">
							<text class="ssName">{{item.name}}</text>
							<text class="ssDate">{{item.publishTime}}</text>
							<text class="ssPlayNum">{{item.playCount}}播放</text>
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
				// 歌手Id
				singerId: '',
				// 歌手介绍数据
				singerTexts: [],
				// 相似歌手
				resembleS: [],
				// 热门50首
				fHotSongs:[],
				// 歌手专辑
				singerAlbums:[],
				// 歌手视频
				singerVideos:[],
				// 展示点击tab对应的内容
				showType: 1,
				// css样式
				cssHome: 0,
				cssSongs: 0,
				cssAlbum: 0,
				cssVideo: 0
			}
		},
		onLoad() {
			uni.$on('singerId', (val) => {
				this.singerId = val.id;
				// console.log(this.singerId);
				// 将数据存储到localStorage里
				window.localStorage.setItem(
					"singerId",
					JSON.stringify(this.singerId)
				);
			})
			this.getSingrText()
			this.getResemble()
			this.getSongsHot()
			this.getSingerAlbums()
			this.getSingerVideo()
		},
		methods: {
			// 请求歌手头部详情数据
			async getSingrText() {
				// 将存储的数据赋值到sText里
				const sText = window.localStorage;
				// console.log(sText);
				const {
					data: res
				} = await request.get(
			  // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
					"/artist/detail?id=" + sText.singerId, {
						params: {
							toplist: this.singerTexts,
						},
					}
				);
				this.singerTexts = res.data;
				console.log(this.singerTexts);
			},
			// 请求相似歌手详情数据
			async getResemble() {
				// 将存储的数据赋值到musicId里
				const sResemble = window.localStorage;
				// console.log(sResemble);
				const {
					data: res
				} = await request.get(
					// 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
					"/simi/artist?id=" + sResemble.singerId, {
						params: {
							morelist: this.resembleS,
						},
					}
				);
				this.resembleS = res.artists;
				// console.log(this.resembleS);
			},
			// 请求歌手热门50首详情数据
			async getSongsHot() {
			      // 将存储的数据赋值到sSongsHot里
			      const sSongsHot = window.localStorage;
			      // console.log(sSongsHot);
			      const { data: res } = await request.get(
			        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
			        "/artist/top/song?id=" + sSongsHot.singerId,
			        {
			          params: {
			            hotlist: this.fHotSongs,
			          },
			        }
			      );
			      this.fHotSongs = res.songs;
			      // console.log(this.fHotSongs);
			},
			// 请求歌手MV详情数据
			async getSingerVideo() {
			      // 将存储的数据赋值到sVideo里
			      const sVideo = window.localStorage;
			      // console.log(sVideo);
			      const { data: res } = await request.get(
			        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
			        "/artist/mv?id=" + sVideo.singerId,
			        {
			          params: {
			            mvlist: this.singerVideos,
			          },
			        }
			      );
			      this.singerVideos = res.mvs;
			      // console.log(this.singerVideos);
			    },
			// 请求歌手专辑详情数据
			    async getSingerAlbums() {
			      // 将存储的数据赋值到ssAlbum 里
			      const ssAlbum = window.localStorage;
			      // console.log(ssAlbum);
			      const { data: res } = await request.get(
			        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
			        "/artist/album?id=" + ssAlbum .singerId + "&limit=50",
			        {
			          params: {
			            albumlist: this.singerAlbums,
			          },
			        }
			      );
			      this.singerAlbums = res.hotAlbums;
			      // 提取出各个专辑的ID，在请求专辑的详情数据
			      // this.singerAlbums.forEach((item) => {
			      //   // console.log(item.id);
			      //   this.singerAlbumId.push(item.id);
			      // });
			      // console.log(this.singerAlbumId);
			      // console.log(this.singerAlbums);
			    },
			// 点击切换内容
			goHomeBox(type, index) {
				this.cssHome = index
				this.cssSongs = 0
				this.cssAlbum = 0
				this.cssVideo = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			},
			goSongsBox(type, index) {
				this.cssSongs = index
				this.cssHome = 0
				this.cssAlbum = 0
				this.cssVideo = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			},
			goAlbumBox(type, index) {
				this.cssAlbum = index
				this.cssHome = 0
				this.cssSongs = 0
				this.cssVideo = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			},
			goVideoBox(type, index) {
				this.cssVideo = index
				this.cssHome = 0
				this.cssSongs = 0
				this.cssAlbum = 0
				this.showType = type;
				if (this.showType === 1) {
					this.style.display = true;
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #541e24;

		.singerPageBox {
			width: 750rpx;

			// 歌手图片
			.singerImg {
				width: 750rpx;
				height: 500rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			// 歌手简略
			.singerSketchy {
				width: 700rpx;
				height: 300rpx;
				position: relative;
				top: -30rpx;
				margin: 0rpx auto;
				border-radius: 20rpx;
				text-align: center;
				color: white;
				background-color: #5d3131;

				.singerName {
					width: 700rpx;
					height: 100rpx;
					line-height: 100rpx;
					font-size: 50rpx;
					display: block;
					font-weight: 900;
				}

				.singerFans {
					width: 700rpx;
					height: 50rpx;
					display: block;
				}

				.singerStatus {
					width: 700rpx;
					height: 50rpx;
					display: block;
				}

				.followBtn {
					width: 700rpx;
					height: 100rpx;

					.fbText {
						width: 200rpx;
						height: 50rpx;
						margin: 0 auto;
						margin-top: 10rpx;
						line-height: 50rpx;
						border: 1rpx solid white;
						border-radius: 50rpx;
					}
				}
			}

			// tab
			.singerTab {
				width: 700rpx;
				height: 100rpx;
				line-height: 100rpx;
				position: sticky;
				top: 89rpx;
				z-index: 99999;
				background-color: #482522;
				border-radius: 20rpx;
				text-align: center;
				color: white;
				margin: 0rpx auto;
				display: flex;
				.stHome,
				.stSongs,
				.stAlbum,
				.stVideo {
					width: 200rpx;
					height: 100rpx;
				}

				.stActive {
					color: #5d3131;
					font-weight: 900;
					border-bottom: 10rpx solid #5d3131;
					box-sizing: border-box;
				}
			}
			// 首页内容
			.stHomeBox {

				// 艺人百科
				.sEncyclopedia {
					width: 700rpx;
					height: 600rpx;
					margin: 0rpx auto;
					margin-top: 20rpx;
					border-radius: 20rpx;
					background-color: #5d3131;

					.seTitle {
						width: 700rpx;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 40rpx;
						color: white;
						padding-left: 20rpx;
						display: block;
					}

					.seName,
					.seStatus,
					.seSex,
					.seBirthday,
					.seCountry,
					.seSchool {
						width: 700rpx;
						height: 50rpx;
						line-height: 50rpx;
						color: white;
						padding-left: 20rpx;
						display: block;
					}

					.seText {
						width: 700rpx;
						height: 200rpx;
						line-height: 50rpx;
						color: white;
						padding-left: 20rpx;
						box-sizing: border-box;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 4;
						-webkit-box-orient: vertical;
					}
				}

				// 相似艺人
				.resembleSinger {
					width: 700rpx;
					height: 350rpx;
					margin: 0rpx auto;
					margin-top: 20rpx;
					border-radius: 20rpx;
					background-color: #5d3131;
					white-space: nowrap;

					.rsTitle {
						width: 700rpx;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 40rpx;
						color: white;
						padding-left: 20rpx;
						display: block;
					}

					scroll-view {
						min-width: 100%;
						height: 260rpx;

						// white-space: nowrap;
						.rsItem {
							width: 200rpx;
							height: 260rpx;
							margin-left: 20rpx;
							text-align: center;
							background-color: #482522;
							border-radius: 20rpx;
							display: inline-block;
							color: white;

							// float: left;
							.reImg {
								width: 200rpx;
								height: 100rpx;

								.rsImgs {
									width: 100rpx;
									height: 100rpx;
									line-height: 100rpx;
									border-radius: 50%;
								}
							}

							.rsName {
								width: 200rpx;
								height: 50rpx;
								line-height: 50rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
							}

							.rsFans {
								width: 200rpx;
								height: 50rpx;
								line-height: 50rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
							}

							.rsFollow {
								width: 200rpx;
								height: 50rpx;
								line-height: 50rpx;

								.rfText {
									width: 150rpx;
									height: 50rpx;
									display: block;
									margin: 0 auto;
									border: 1rpx solid white;
									border-radius: 50rpx;
								}
							}
						}
					}

					::-webkit-scrollbar {
						width: 0;
						height: 0;
						color: transparent;
					}
				}
			}
			// 歌曲内容
			.stSongsBox{
				width: 750rpx;
				// 播放全部按钮
				.ssPlayAll{
					width: 750rpx;
					height: 80rpx;
					line-height: 80rpx;
					margin-top: 20rpx;
					background-color:#5d3131;
					.splayBtn{
						width: 250rpx;
						height: 80rpx;
						color: white;
						text-align: center;
						font-size: 40rpx;
					}
				}
				// 热门50首列表
				.fhotSongs{
					width: 750rpx;
					margin-top: 10rpx;
					scroll-view{
						width: 750rpx;
						.ssItem{
							width: 750rpx;
							height: 100rpx;
							margin-top: 10rpx;
							background-color:#5d3131 ;
							color: white;
							.siIndex{
								width: 50rpx;
								height: 100rpx;
								text-align: center;
								line-height: 100rpx;
								float: left;
							}
							.siSongName{
								width: 500rpx;
								height: 100rpx;
								margin-left: 20rpx;
								line-height: 50rpx;
								float: left;
								.sSongName{
									width: 500rpx;
									height: 50rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
								.sSingerName{
									width: 500rpx;
									height: 50rpx;
									font-size: 27rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
							}
							.tpTwoBtn{
								width: 150rpx;
								height: 100rpx;
								float: left;
								line-height: 100rpx;
								text-align: center;
								.iconfont{
									float: left;
									margin-left: 10rpx;
									font-size: 50rpx;
								}
							}
						}	
					}
				}
			}
			// 专辑内容
			.stAlbumBox{
				width: 750rpx;
				// 按时间
				.saTime{
					width: 750rpx;
					height: 80rpx;
					line-height: 80rpx;
					margin-top: 20rpx;
					background-color:#5d3131;
					.stimeText{
						width: 250rpx;
						height: 80rpx;
						color: white;
						text-align: center;
						font-size: 30rpx;
					}
				}
				// 专辑列表
				.saAlbums{
					width: 750rpx;
					margin-top: 10rpx;
					scroll-view{
						width: 750rpx;
						.saItem{
							width: 750rpx;
							height: 150rpx;
							margin-top: 10rpx;
							background-color: #5d3131;
							.saImg{
								width: 150rpx;
								height: 150rpx;
								margin-left: 20rpx;
								border-radius: 20rpx;
								float: left;
							}
							.saAlbumName{
								width: 560rpx;
								height: 150rpx;
								margin-left: 20rpx;
								float: left;
								color: white;
								.saName{
									width: 560rpx;
									height: 80rpx;
									line-height: 80rpx;
									font-size: 40rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
								.saDate{
									width: 560rpx;
									height: 70rpx;
									line-height: 70rpx;
									font-size: 25rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
							}
						}
					}
				}
			}
			// 视频内容
			.stVideoBox{
				width: 750rpx;
				// 全部、MV
				.svTwoBtn{
					width: 750rpx;
					height: 80rpx;
					line-height: 80rpx;
					margin-top: 20rpx;
					color: white;
					text-align: center;
					background-color:#5d3131;
					.stOne{
						width: 150rpx;
						height: 80rpx;
						display: block;
						float: left;
					}
					.stTwo{
						width: 150rpx;
						height: 80rpx;
						display: block;
						float: left;
					}
					.stActive{
						background-color: #482522;
						border-radius: 50rpx;
					}
				}
				// 视频列表
				.svVideos{
					width: 750rpx;
					margin-top: 10rpx;
					scroll-view{
						width: 750rpx;
						.svItem{
							width: 750rpx;
							height: 200rpx;
							background-color: #5d3131;
							margin-top: 10rpx;
							.siImg{
								width: 365rpx;
								height: 200rpx;
								float: left;
								border-radius: 20rpx;
							}
							.siSongtext{
								width: 365rpx;
								height: 200rpx;
								float: left;
								margin-left: 20rpx;
								color: white;
								.ssName{
									width: 365rpx;
									height: 100rpx;
									line-height: 50rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
								}
								.ssDate,.ssPlayNum{
									width: 365rpx;
									height: 50rpx;
									line-height: 50rpx;
									font-size: 25rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
