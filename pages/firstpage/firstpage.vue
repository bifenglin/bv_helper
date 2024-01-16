<template>
	
	<view class="container" >
			<view class="up">
				<view class="view1">
					<view class="view11">
						<text>新媒体AI创作</text>
					</view>
					<view class="view11">
						<text>辅助工具</text>
					</view>
				</view>
			</view>
			<!-- <image src="https://yanbi-resources.oss-cn-shanghai.aliyuncs.com/production/1739531077251338241.mp4?x-oss-process=video/snapshot,t_1000,m_fast"></image> -->
			<view class="button1" :style="{'margin-top':toTop+'rpx'}">
				<view class="icon" @click="clickScript">
					<image class="image" src="/static/icon/image_script.png"></image>
				</view>
				<view class="iconText">
					<text>生成短视频</text>
				</view>
			</view>
			<view class="button2" :style="{'margin-top':toTop+'rpx'}">
				<view class="icon" @click="clickCopywriting">
					<image class="image" src="/static/icon/image_copywriting.png"></image>
				</view>
				<view class="iconText">
					<text>生成文案</text>
				</view>
			</view>
			<view class="down">
				<view class="view2">
					<view class="view21">
						<image style="width: 608rpx;
		height: 210rpx;" src="/static/icon/Group3059(1).png"></image>
					</view>
				</view>
			</view>
		 <fui-toast ref="toast"></fui-toast>
	</view>
</template>

<script>
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	export default {
		name: "firstpage",
		components:{
			fuiToast
		},
		data() {
			return {
				globalToken:null,
				statusBarHeight:0,
				titleBarHeight:0,
				receivedData:this.$store.state.user,
				// #ifdef MP-ALIPAY
				toTop:769,
				// #endif
				// #ifndef MP-ALIPAY
				toTop:678,
				// #endif
			}
		},
		// #ifdef MP-ALIPAY
		onReady() {
			my.setNavigationBar({
			  frontColor: '#000000',
			  backgroundColor: '#ffffff',
			})
			
		},
		// #endif
		// #ifdef MP-ALIPAY
		beforeMount() {	
			this.statusBarHeight=uni.getSystemInfoSync().statusBarHeight
			this.titleBarHeight=uni.getSystemInfoSync().titleBarHeight
			console.log(this.statusBarHeight)
			console.log(this.titleBarHeight)
			this.toTop = this.toTop+ this.statusBarHeight+this.titleBarHeight		
		  },
		 // #endif
		methods: {
			onLoad:function(){
				this.globalToken=this.$store.state.globalToken
			},
			check(url){
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
												uni.navigateTo({
													url:url
												        // url: '/subPagesB/new_generateScript/new_generateScript',
														// url: '/subPages/clip/clip',
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
				            },
							fail: (error) => {
								console.error('Error:', error);
								console.error('Error:', error.error);
								if(error.error==11){
									let options = {};
									options.text = '请先进行授权';
									self.$refs.toast.show(options);
								}
								// let options = {};
								// options.text = '请先进行授权';
								// this.$refs.toast.show(options);
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
			},
			toUrl(url){
				uni.navigateTo({
					url:url
				    });
			},
			clickScript(){
				let url='/subPagesB/new_generateScript/new_generateScript'
				if(this.globalToken){
					this.check(url)
				}else{
					this.toUrl(url)
				}
				
			},
			clickCopywriting(){
				let url='/subPagesB/new_generateCopywriting/new_generateCopywriting'
				if(this.globalToken){
					this.check(url)
				}else{
					this.toUrl(url)
				}
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	
	}
	.up{
		height: 840rpx;
		// #ifdef MP-ALIPAY
		height: 1019rpx; 
		// #endif
		background-image: url('/static/icon/background1.png'); /* 图片的URL */
		  /* 可以设置其他背景相关的样式 */
		  background-size: cover;
		  background-position: center;
	}
	.down{
		
	}
	.icon{
		margin-top: 36rpx;
		margin-left: 60rpx;
		margin-right: 60rpx;
		width: 120rpx;
		height: 120rpx;
	}
	.iconText{
		text-align: center;
		margin-top: 8rpx;
	}
	.image{
		width: 120rpx;
		height: 120rpx;
	}
	.button1 {
		position: absolute;
		top:0;
		left:106rpx;
		height: 240rpx;
		width: 240rpx;
		background-color: #ffffff;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
	}
	.button2 {
		position: absolute;
		top:0rpx;
		left:406rpx;
		height: 240rpx;
		width: 240rpx;
		background-color: #ffffff;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
	}
	.view1{
		width: 638rpx;
		height: 180rpx;
		margin-top: 280rpx;
		margin-left: 56rpx;
		margin-right: 56rpx;
		font-size: 64rpx;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.view11{
		display: flex;
		flex-direction: center;
		justify-content: center;
	}
	.view2{
		margin-top: 128rpx;
		margin-left: 48rpx;
		width: 608rpx;
		height: 210rpx;
	}
</style>
