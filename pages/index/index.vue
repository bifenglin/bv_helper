<template>
	
	<view class="container">
		<!-- <homepage :cur="PageCur" v-if="PageCur=='首页'" :key="commponent1Key"></homepage> -->
		<firstpage :cur="PageCur" v-if="PageCur=='首页'" :key="commponent1Key"></firstpage>
		<works v-if="PageCur=='作品'" :key="commponent2Key"></works>
		<user v-if="PageCur=='我的'" :userData="userObject" :key="commponent2Key"></user>
		
		<!-- <uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
		 			 @clickLeft="back" />
		 <button type="primary" @click="click" style="margin-top: 200rpx;"></button>
		 <text>{{auth.authCode}}</text> -->
		<u-tabbar
			:value="PageCur"
			@change="NavChange"
			:fixed="true"
			:placeholder="true"
			activeColor="#000000"
			inactiveColor="#A0A2A3"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="首页" name="首页">
			<image
						class="u-page__item__slot-icon"
						slot="active-icon"
						src="/static/icon/image_homepage1.png"
					></image>
					<image
						class="u-page__item__slot-icon"
						slot="inactive-icon"
						src="/static/icon/image_homepage2.png"
					></image>
			</u-tabbar-item>
			<u-tabbar-item text="学习社区" name="学习社区">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/icon/image_community1.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/icon/image_community2.png"
						></image>
			</u-tabbar-item>
			<u-tabbar-item text="作品" name="作品">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/icon/image_works1.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/icon/image_works2.png"
						></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的" name="我的">
				<image
							class="u-page__item__slot-icon"
							slot="active-icon"
							src="/static/icon/image_me1.png"
						></image>
						<image
							class="u-page__item__slot-icon"
							slot="inactive-icon"
							src="/static/icon/image_me2.png"
						></image>
			</u-tabbar-item>
		</u-tabbar>
		
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: '首页',
				commponent1Key: 0,
				commponent2Key: 0,
				userObject:{
					flag:false,
					nickName:'',
					avatar:'',
				},
				// auth:'',
			}
		},
		onLoad:function(){
			let self = this;
			uni.getProvider({
				service: 'oauth',
				success: function (res) {
			        console.log(res.provider)
			        self.provider = res.provider[0];
			        // 支付宝
			        // #ifdef MP-ALIPAY
		            my.getAuthCode({
		                scopes: 'auth_user',
		                success: (auth) => {
			                console.log('支付宝授权凭证',auth)	
							self.userObject.flag=true;
							self.$store.dispatch('updateMyVariable', 'Hello, Vuex World!');
							uni.request({
								url: 'http://106.14.35.229:8080/jeecg-boot/sys/thirdLogin/ALIPAY', 
								method: 'GET',
								data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
									authCode: auth.authCode,
								},
								success: (res) => {
								    console.log('Response:', res.data);
								},
								fail: (error) => {
									console.error('Error:', error);
								},
							})
			            },
			        });
					my.getAuthUserInfo({
						success: (res) => {
							console.log("用户信息：" + JSON.stringify(res))
							console.log("用户信息：" + JSON.stringify(res))
							self.userObject.nickName = res.nickName;
							self.userObject.avatar = res.avatar;
							console.log(self.userObject.nickName)
							console.log(self.userObject.avatar)
							console.log(self.userObject)
							},
						fail: err => console.log(err)	
					});   
			        // #endif
			        //微信
			        // #ifdef MP-WEIXIN
			        uni.login({
			            provider: self.provider,
			            success: function (loginRes) {
			                console.log('uniapp统一登录凭证',loginRes) 
			                uni.getUserInfo({
			                    provider: self.provider,
			                    success(infoRes) { 
			                        console.info('uniapp用户基础信息',infoRes)
			                    }
			                });
			            }
			        });
			        // #endif
				}
			});
			
			uni.setNavigationBarTitle({
				title: this.PageCur
			});
			this.PageCur='首页'
			++this.commponent1Key
			++this.commponent2Key
		},
		methods: {
			// click(){
			// 	let self = this;
			// 		uni.getProvider({
			// 			service: 'oauth',
			// 			success: function (res) {
			// 		        console.log(res.provider)
			// 		        self.provider = res.provider[0];
			// 		        // 支付宝
			// 		        // #ifdef MP-ALIPAY
			// 		        my.getAuthCode({
			// 		            scopes: 'auth_user',
			// 		            success: (auth) => {
			// 		                console.log('支付宝授权凭证',auth)
			// 						self.auth=auth;
			// 						self.userObject.flag=true;
			// 		            },
			// 		        });
			// 				my.getAuthUserInfo({
			// 					success: (res) => {
			// 						console.log("用户信息：" + JSON.stringify(res))
			// 						self.userObject.nickName = res.nickName;
			// 						self.userObject.avatar = res.avatar;
			// 						console.log(self.userObject.nickName)
			// 						console.log(self.userObject.avatar)
			// 						console.log(self.userObject)
			// 						},
			// 					fail: err => console.log(err)	
			// 				});   
			// 		        // #endif
			// 		        //微信
			// 		        // #ifdef MP-WEIXIN
			// 		        uni.login({
			// 		            provider: self.provider,
			// 		            success: function (loginRes) {
			// 		                console.log('uniapp统一登录凭证',loginRes) 
			// 		                uni.getUserInfo({
			// 		                    provider: self.provider,
			// 		                    success(infoRes) { 
			// 		                        console.info('uniapp用户基础信息',infoRes)
			// 		                    }
			// 		                });
			// 		            }
			// 		        });
			// 		        // #endif
			// 			}
			// 		});
			// 	},
			NavChange: function(e) {
				this.PageCur = e
				
				if(this.PageCur==="我的"){
					console.log('aaa')
					let self = this;
					uni.getProvider({
						service: 'oauth',
						success: function (res) {
					        console.log(res.provider)
					        self.provider = res.provider[0];
					        // 支付宝
					        // #ifdef MP-ALIPAY
					        my.getAuthCode({
					            scopes: 'auth_user',
					            success: (auth) => {
					                console.log('支付宝授权凭证',auth)	
									self.userObject.flag=true;
					            },
					        });
							my.getAuthUserInfo({
								success: (res) => {
									console.log("用户信息：" + JSON.stringify(res))
									self.userObject.nickName = res.nickName;
									self.userObject.avatar = res.avatar;
									console.log(self.userObject.nickName)
									console.log(self.userObject.avatar)
									console.log(self.userObject)
									},
								fail: err => console.log(err)	
							});   
					        // #endif
					        //微信
					        // #ifdef MP-WEIXIN
					        uni.login({
					            provider: self.provider,
					            success: function (loginRes) {
					                console.log('uniapp统一登录凭证',loginRes) 
					                uni.getUserInfo({
					                    provider: self.provider,
					                    success(infoRes) { 
					                        console.info('uniapp用户基础信息',infoRes)
					                    }
					                });
					            }
					        });
					        // #endif
						}
					});
				}
				uni.setNavigationBarTitle({
					title: this.PageCur
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
	  display: flex;
	  flex-direction: column;
	  height: 100vh;/* 设置整个页面高度为屏幕高度 */
	}
	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}

			&__slot-icon {
				width: 24px;
				height: 24px;
			}
		}
	}
</style>
