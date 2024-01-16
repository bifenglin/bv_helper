<template>
	<view>
		<uni-nav-bar  :fixed="true" shadow background-color="#ffffff" :status-bar="true" :border="false"
					 @clickLeft="back" />
		<view class="view1">
			<view v-if="flag" class="view11">
				<view class="view111">
					<view>
						<u--text  :text="workNumber" color="#543EE3" size="80rpx" :bold="true" align="left"></u--text>
					</view>
					<view class="view112">
						<u--text  text="作品" size="40rpx" align="left"></u--text>
					</view>
				</view>
				<view class="view121">
					<view >
						<u--text  :text="receivedData.nickName" size="32rpx"  align="center"></u--text>
					</view>
					<view class="view1212">
						<image class="image1" :src="receivedData.avatar"></image>
						<image class="image2" src="/static/icon/crown.png"></image>
					</view>
				</view>
			</view>
			<view v-else class="view11">
				<view class="view111">
					<view>
						<u--text  text="0" size="80rpx" color="#543EE3" :bold="true" align="left"></u--text>
					</view>
					<view class="view112">
						<u--text  text="作品" size="40rpx" align="left"></u--text>
					</view>
				</view>
				<view class="view121">
					<view >
						<u--text  text="点击头像登录" color="#A0A2A3" size="32rpx"  align="center"></u--text>
					</view>
					<view class="view1212" @click="avatarLogin">
						<image style="height: 56rpx;width: 61.25rpx;" src="/static/icon/userAvatar.png" ></image>
					</view>
				</view>
			</view>
		</view>
		<view  v-if="receivedData.flag">
			<view>
				<view class="view21">
					<text>我的收藏 </text>
				</view>
				<view class="view3">
					<u-tabs :list="listq"  @click="getType($event)"  lineColor="#ffffff" lineWidth="60" lineHeight="1.5" 
					font-size="32" height="44"  
					itemStyle="height:58rpx;" activeStyle="color:#543EE3;" inactiveStyle="color:#A0A2A3;" :show-bar="false"
					gutter="44rpx">	
						<view slot="right" class="view3r">
						    <image style="height: 28rpx;
			width: 28rpx;" src="/static/icon/fi-br-angle-down.png"></image>
						</view>
					</u-tabs>
				</view>
			</view>
			<view class="view4" >
				<scroll-view :scroll-y="true" :show-scrollbar="true">
					<view style="display: flex;">
						<view class="column">
							<view v-for="(item,index) in cards" :key="index">
								<view v-if="index%2==0" class="item">
									<uni-card padding="0" spacing="0"  margin="0" :is-shadow="false"  :border ="false" borderRadius="16rpx">
										<image class="item__image" :src="icon_url+item.image"></image>
										<view class="item__item">
											<text>{{item.text}}</text>
										</view>
									</uni-card>
								</view>
							</view>
						</view>
						<view class="column1">
							<view v-for="(item,index) in cards" :key="index">
								<view v-if="index%2==1" class="item">
									<uni-card padding="0" spacing="0" margin="0" :is-shadow="false"  :border ="false"  borderRadius="16rpx">
										<image class="item__image" :src="icon_url+item.image"></image>
										<view class="item__item">
											<text>{{item.text}}</text>
										</view>
									</uni-card>
								</view>
							</view>
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view  v-else>
			<view>
				<view class="view21">
					<text>我的收藏 </text>
				</view>
				<view class="view3">
					<u-tabs :list="[{name: '分类',}]"  lineColor="#ffffff" lineWidth="60" lineHeight="1.5" 
					font-size="32" height="44"  
					itemStyle="height:58rpx;" activeStyle="color:#543EE3;" inactiveStyle="color:#A0A2A3;" :show-bar="false"
					gutter="44rpx">	
					</u-tabs>
				</view>
				
				<image class="view51" src="/static/icon/drawingBoard.png" ></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
	export default {
		name: "user",
		  // props: {
		  //   userData: {
				// type: Object, // 数据类型可以根据实际情况调整
				// default:() => ({
				// 	flag:false,
				// 	nickName: '',
				// 	avatar: '',
				// }),
		  //   },
		  // },
		   // props: {
		   //    // 定义一个名为message的prop
		   //    workNumber: {
		   //      type: Number, // 指定数据类型
		   //      required: true, // 设置为必需
		   //    },
		   //  },
		data() {
			return {
				number:0,
				receivedData:this.$store.state.user,
				flag:this.$store.state.user.flag,
				workNumber:this.$store.state.workNumber,
				globalToken:null,
				listq: [{
							name: '图片素材',
				            }, 
						{
				            name: '欢快音乐',
						},
						{
						    name: '好文案',
						},
						{
						    name: '话术',
						},],
				icon_url:"../../static/homepage/",
				cards:[
					{
						
						text:'没有人能抵挡小狗 · 萌宠日记',
						image:'picture11.png',
					},{
						
						text:'两天泰山攻略极速版',
						image:'picture21.png',
						
					},{
						
						text:'美好课桌',
						image:'picture31.png',
					},{
				
						text:'蝴蝶',
						image:'picture41.png',
					},
					
				],
			}
		},
		// onLoad:function(){
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
		// 					self.receivedData.flag=true;
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
		// 					})
		// 	            },
		// 	        });
		// 			my.getAuthUserInfo({
		// 				success: (res) => {
		// 					console.log("用户信息：" + JSON.stringify(res))
		// 					console.log("用户信息：" + JSON.stringify(res))
		// 					self.receivedData.nickName = res.nickName;
		// 					self.receivedData.avatar = res.avatar;
		// 					console.log(self.userObject.nickName)
		// 					console.log(self.userObject.avatar)
		// 					console.log(self.userObject)
		// 					},
		// 				fail: err => console.log(err)	
		// 			});   
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
		// 		}
		// 	});
		// },
		methods: {
			// #ifdef MP-ALIPAY
			onReady() {
				my.setNavigationBar({
				  frontColor: '#000000',
				  backgroundColor: '#ffffff',
				})
			},
			// #endif
			onLoad:function(){
				console.log(this.$store.state.user)
				this.receivedData=this.$store.state.user
				this.globalToken=this.$store.state.globalToken
			},
			avatarLogin(){
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
									url: configService.apiUrl+'/sys/thirdLogin/ALIPAY', 
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
											url: configService.apiUrl+'/video/conversation/list', 
											method: 'GET',
											header: {
											    'X-Access-Token':self.globalToken,
											},
											success: (r) => {
												let number = r.data.result.total
												uni.request({
													url: configService.apiUrl+'/text/conversation/list', 
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
									},
									fail: (error) => {
										console.error('Error:', error);
									},
								});
								my.getAuthUserInfo({
									success: (res) => {
										console.log("用户信息：" + JSON.stringify(res))
										console.log("用户信息：" + JSON.stringify(res))
										self.receivedData.nickName = res.nickName;
										self.receivedData.avatar = res.avatar;
										self.receivedData.flag=true;
										self.$store.commit('setUser', self.receivedData);
										self.flag=true
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
			}
		}
	}
</script>

<style lang="scss">
	
	.view1{
		height: 396rpx;
		background-color: #f8f8f8;
		padding: 48rpx 44rpx;
	}
	.view11{
		background-color: #ffffff;
		width: 100%;
		height: 300rpx;
		border-radius: 24rpx;
		padding: 40rpx 44rpx 32rpx 44rpx;
	}
	.view111{
		height:80rpx;
		display: flex;
		
	}
	.view112{
		margin-left: 24rpx;
		margin-top: 30rpx;
	}
	.view121{
		height: 56rpx;
		margin-top: 92rpx;
		display: flex;
		justify-content: flex-end; /* 将项目放在 Flex 容器的末尾（右侧） */
		align-items: center;
	}
	
	.view1212{
		position: relative;
		margin-left: 24rpx;
		/* background-color: #000000; */
		
	}
	.image1{
		height: 56rpx;
		width: 56rpx;
		border-radius: 50%;
		
	}
	.image2{
		height: 24rpx;
		width: 24rpx;
		z-index: 2;
		top:0;
		right: 0;
		position: absolute;
	}
	.view12{
		background-color: #ffffff;
		width: 100%;
		height: 300rpx;
		border-radius: 24rpx;
		padding: 40rpx 44rpx 32rpx 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.view21{
		font-size: 40rpx;
		margin-top: 52rpx;
		margin-left: 44rpx;
		font-weight: bold;
	}
	.view3{
		margin-top: 20rpx;
		margin-left: 24rpx;
	}
	.view3r{
		height: 28rpx;
		width: 28rpx;
		margin-right: 44rpx;
	}
	.view4{
		// height: 810rpx;
		height: 940rpx;
		// #ifdef MP-ALIPAY
		height: 1080rpx;
		// #endif
		display: flex;
		margin-top: 32rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
		
	}
	.view5{
		display: flex;
		margin-top: 32rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
		
	}
	.view51{
		width: 440rpx;
		height: 440rpx;
		margin-top: 204rpx;
		margin-left: 136rpx;
	}
	.column,
	.column1{
		flex: 1;
	}
	.column {
		margin-right: 7rpx;
	}
	.column1 {
		margin-left: 7rpx;
	}
	.item {
		margin-bottom: 16rpx; 
		width: 354rpx;
		&__image {
			width: 100%;
			height: 472rpx; 
		}
		&__item {
			margin: 0rpx 16rpx 16rpx 16rpx;
			font-size: 28rpx;
			color:#000000;
		}
	}
</style>
