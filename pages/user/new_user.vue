<template>
	<view>
		<uni-nav-bar  :fixed="true" shadow background-color="#ffffff" :status-bar="true" :border="false"
					 @clickLeft="back" />
		<view class="view1">
			<view v-if="receivedData.flag" class="view11">
				<view class="view111">
					<view>
						<u--text  :text="number" size="80rpx" :bold="true" align="left"></u--text>
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
						<image :src="receivedData.avatar"></image>
					</view>
				</view>
			</view>
			<view v-else class="view12">
				<u--text  text="未登录" size="80rpx" :bold="true" align="center"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user",
		  props: {
		    userData: {
				type: Object, // 数据类型可以根据实际情况调整
				default:() => ({
					flag:false,
					nickName: '',
					avatar: '',
				}),
		    },
		  },
		data() {
			return {
				number:128,
				nickName:'aaaaaaaaaaaaa',
				avatar:'',
				receivedData:this.userData,
			}
		},
		onLoad:function(){
			console.log(111)
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
			                    },
			            });
						my.getAuthUserInfo({
					    success: (res) => {
							console.log("用户信息：" + JSON.stringify(res))
							this.nickName = res.nickName;
							this.avatar = res.avatar;
							console.log(nickName)
							console.log(avatar)
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
		},
		methods: {
			// #ifdef MP-ALIPAY
			onReady() {
				my.setNavigationBar({
				  frontColor: '#000000',
				  backgroundColor: '#ffffff',
				})
			},
			// #endif
		}
	}
</script>

<style>
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
		height: 56rpx;
		width: 56rpx;
		margin-left: 24rpx;
		/* background-color: #000000; */
		border-radius: 50%;
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
</style>
