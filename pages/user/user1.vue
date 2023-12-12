<template>
  <view>
    <!-- 按钮触发获取用户信息授权 -->
	<button scope="userInfo" type="primary" open-type="getAuthorize" @getAuthorize="getUserInfo" class="bottom">授权获取code值</button>
    
  </view>
</template>

<script>
export default {
  methods: {
    getUserInfo() {
	// 获取服务供应商
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
								var nickName = res.nickName;
								var avatar = res.avatar;
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

    }
  
}
</script>

<style scoped>
/* 样式设计，可根据需要自行调整 */
.bottom {
  margin: 40%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
}
</style>
