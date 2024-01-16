<template>
	
	<view class="container">
		<!-- <homepage :cur="PageCur" v-if="PageCur=='首页'" :key="commponent1Key"></homepage> -->
		<firstpage :cur="PageCur" v-if="PageCur=='首页'" :key="commponent1Key"></firstpage>
		<works v-if="PageCur=='作品'"  :token="globalToken" :cardss="cards" :key="commponent2Key"></works>
		<community v-if="PageCur=='学习社区'"  :key="commponent2Key"></community>
		<user v-if="PageCur=='我的'"  :key="commponent2Key"></user>
		
		<!-- <uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
		 			 @clickLeft="back" />
		 <button type="primary" @click="click" style="margin-top: 200rpx;"></button>
		 <text>{{auth.authCode}}</text> -->
		<u-tabbar
			:value="PageCur"
			@change="NavChange"
			:fixed="true"
			:placeholder="true"
			activeColor="#543EE3"
			inactiveColor="#9F9F9F"
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
				globalToken:null,
				// auth:'',
				workNumber:0,
				cards:[]
			}
		},
		methods: {
			onLoad:function(){
				this.globalToken=this.$store.state.globalToken
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
								uni.request({
									url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/sys/thirdLogin/ALIPAY', 
									method: 'GET',
									data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
										authCode: auth.authCode,
									},
									success: (res) => {
									    console.log('Response:', res.data);
										console.log('Token:', res.data.result.token);
										self.$store.dispatch('updateMyVariable', res.data.result.token);
										self.globalToken=res.data.result.token
										
										uni.request({
											url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/video/conversation/list', 
											method: 'GET',
											header: {
											    'X-Access-Token':self.globalToken,
											},
											success: (r) => {
												let number = r.data.result.total
												uni.request({
													url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/text/conversation/list', 
													method: 'GET',
													header: {
													    'X-Access-Token': self.globalToken,
													},
													success: (re) => {
														self.workNumber=number+re.data.result.total
														self.$store.commit('setWorkNumber', self.workNumber);  
														
													},
													fail: (error) => {
														console.error('Error:', error);
													},
												});
											},
											fail: (error) => {
												console.error('Error:', error);
											},
										});
										
										uni.request({
											url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/video/conversation/list', 
											method: 'GET',
											header: {
											    'X-Access-Token': self.globalToken,
											},
											success: (ress) => {
											    console.log('Response:', ress.data);
												console.log('records:', ress.data.result.records);
												let records=ress.data.result.records
												let recordsId=[]
												for(let i=0;i<records.length;i++){
													if(records[i].step=== "finish")
													{
														
														let jj={
																id:records[i].id,
																text:records[i].title,
																image:records[i].videoUrl+'?x-oss-process=video/snapshot,t_1000,m_fast',
																step:'finish'
															}
															console.log(jj)
														self.cards.push(jj)
														
													}else{
																
																let jj={
																		id:records[i].id,
																		text:records[i].title,
																		image:'../../static/homepage/picture21.png',
																		step:'unFinish'
																	}
																	console.log(jj)
																self.cards.push(jj)
															
															}
													
												}
												
												self.$store.commit('setCards',self.cards);
											},
											fail: (error) => {
												console.error('Error:', error);
											},
										});
									},
									fail: (error) => {
										console.error('Error:', error);
									},
								});
								my.getAuthUserInfo({
									success: (res) => {
										console.log("用户信息：" + JSON.stringify(res))
										console.log("用户信息：" + JSON.stringify(res))
										self.userObject.flag=true
										self.userObject.nickName = res.nickName;
										self.userObject.avatar = res.avatar;
										
										
										self.$store.commit('setUser', self.userObject);
										},
									fail: err => console.log(err)	
								});   
				            },
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
			NavChange: function(e) {
				this.PageCur = e
				console.log('NavChange',this.PageCur)
				console.log(this.$store.state.user)
				console.log('flag',this.$store.state.user.flag)
				
				
				if(this.PageCur==="我的"){
					uni.request({
						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/video/conversation/list', 
						method: 'GET',
						header: {
						    'X-Access-Token':this.globalToken,
						},
						success: (res) => {
							let number = res.data.result.total
							
							uni.request({
								url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/text/conversation/list', 
								method: 'GET',
								header: {
								    'X-Access-Token': this.globalToken,
								},
								success: (re) => {
									this.workNumber=number+re.data.result.total
									this.$store.commit('setWorkNumber', this.workNumber);
								},
								fail: (error) => {
									console.error('Error:', error);
								},
							});
						},
						fail: (error) => {
							console.error('Error:', error);
						},
					});
				}
				if(this.PageCur==="作品"){
					let self=this
					uni.request({
						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/video/conversation/list', 
						method: 'GET',
						header: {
						    'X-Access-Token': self.globalToken,
						},
						success: (res) => {
						    console.log('Response:', res.data);
							console.log('records:', res.data.result.records);
							let records=res.data.result.records
							let recordsId=[]
							for(let i=0;i<records.length;i++){
								if(records[i].step=== "finish")
								{
									
									let jj={
											id:records[i].id,
											text:records[i].title,
											image:records[i].videoUrl+'?x-oss-process=video/snapshot,t_1000,m_fast',
											step:'finish'
										}
										console.log(jj)
									self.cards.push(jj)
									
								}else{
											
											let jj={
													id:records[i].id,
													text:records[i].title,
													image:'../../static/homepage/picture21.png',
													step:'unFinish'
												}
												console.log(jj)
											self.cards.push(jj)
										
										}
								
							}
							
							self.$store.commit('setCards',self.cards);
						},
						fail: (error) => {
							console.error('Error:', error);
						},
					});
				}
				++this.commponent2Key
				// if((this.PageCur==="我的"||this.PageCur==="作品")&&this.$store.state.user.flag===false){
				// 	console.log('aaa')
				// 	let self = this;
				// 	uni.getProvider({
				// 		service: 'oauth',
				// 		success: function (res) {
				// 	        console.log(res.provider)
				// 	        self.provider = res.provider[0];
				// 	        // 支付宝
				// 	        // #ifdef MP-ALIPAY
				// 	        my.getAuthCode({
				// 	            scopes: 'auth_user',
				// 	            success: (auth) => {
				// 	                console.log('支付宝授权凭证',auth)	
									
				// 					uni.request({
				// 						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/sys/thirdLogin/ALIPAY', 
				// 						method: 'GET',
				// 						data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
				// 							authCode: auth.authCode,
				// 						},
				// 						success: (res) => {
				// 						    console.log('Response:', res.data);
				// 							console.log('Token:', res.data.result.token);
				// 							self.$store.dispatch('updateMyVariable', res.data.result.token);
				// 						},
				// 						fail: (error) => {
				// 							console.error('Error:', error);
				// 						},
				// 					});
				// 					my.getAuthUserInfo({
				// 						success: (res) => {
				// 							console.log("用户信息：" + JSON.stringify(res))
				// 							console.log("用户信息：" + JSON.stringify(res))
				// 							self.userObject.nickName = res.nickName;
				// 							self.userObject.avatar = res.avatar;
				// 							self.userObject.flag=true;
				// 							self.$store.commit('setUser', self.userObject);
				// 							self.$nextTick()
				// 							console.log(self.userObject.nickName)
				// 							console.log(self.userObject.avatar)
				// 							console.log(self.userObject)
				// 							},
				// 						fail: err => console.log(err)	
				// 					}); 
				// 	            },
				// 	        });
							  
				// 	        // #endif
				// 	        //微信
				// 	        // #ifdef MP-WEIXIN
				// 	        uni.login({
				// 	            provider: self.provider,
				// 	            success: function (loginRes) {
				// 	                console.log('uniapp统一登录凭证',loginRes) 
				// 	                uni.getUserInfo({
				// 	                    provider: self.provider,
				// 	                    success(infoRes) { 
				// 	                        console.info('uniapp用户基础信息',infoRes)
				// 	                    }
				// 	                });
				// 	            }
				// 	        });
				// 	        // #endif
				// 			++self.commponent2Key
				// 		}
				// 	});
				// }
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
