<template>
	<view style="background-color: #ffffff;letter-spacing: 1rpx;">
		<uni-nav-bar  :fixed="true" shadow background-color="#ffffff" :status-bar="true" :border="false"
					 @clickLeft="back" />
		<view v-if="flag">
			<view class="view1" @click="searchChange">
				<view v-if="searchTrue" class="view11">
					<image src="/static/icon/search.png" class="view111"></image>
					<view class="view112">
						<text>搜索</text>
					</view>
				</view>
				<view v-else class="view11">
					<u--input  border="none" inputAlign="left" :focus="true" :autoBlur="false" 
					  v-model="searchText" maxlength=-1 fontSize="28rpx" @blur="searchBlur" 
					backgroundColor="#ffffff"></u--input>
				</view>
			</view>
			<view class="view2">
				<!-- <view class="view21" :class="[1=== current && 'view21--active']" @click="textClick1">
					<text :style="1=== current?{color:'#1A1111'}:{color:'#767070'}">已发布</text>
				</view> -->
				<!-- <view class="view22" :class="[2=== current && 'view22--active']" @click="textClick2"> -->
				<view class="view22" :class="[2=== current && 'view22--active']" @click="textClick2">
					<text :style="2=== current?{color:'#1A1111'}:{color:'#767070'}">草稿箱</text>
				</view>
			</view>
			<view v-if="current==1">
				<view class="view3">
					<!-- <scroll-view  :scroll-x="true" :show-scrollbar="false" scroll-with-animation class="view31">
						<view class="view311">
							<view v-for="(item, index) in list" :key="index" class="view3111">
									<text>{{item}}</text>
							</view>
						</view>
					</scroll-view> -->
					<u-tabs :list="listq"  @click="getType($event)"  lineColor="#543EE3" lineWidth="60" lineHeight="1.5" 
					active-color="#666666" font-size="32" height="44"  inactive-color="#A0A2A3" 
					itemStyle="height:58rpx;padding-left:58rpx;padding-right:58rpx" activeStyle="color:#543EE3;" inactiveStyle="color:#A0A2A3;">	
						<view slot="right" class="view3r" @click="customize">
						    <text>+ 自定义</text>
						</view>
					</u-tabs>
				</view>
				<view class="view4">
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
			<view v-if="current==2">
				<view class="view3">
					<!-- <scroll-view  :scroll-x="true" :show-scrollbar="false" scroll-with-animation class="view31">
						<view class="view311">
							<view v-for="(item, index) in list" :key="index" class="view3111">
									<text>{{item}}</text>
							</view>
						</view>
					</scroll-view> -->
					<u-tabs :list="listq1"  @click="getType($event)"  lineColor="#543EE3" lineWidth="60" lineHeight="1.5" 
					active-color="#666666" font-size="32" height="44"  inactive-color="#A0A2A3" 
					itemStyle="height:58rpx;padding-left:58rpx;padding-right:58rpx" activeStyle="color:#543EE3;" inactiveStyle="color:#A0A2A3;">	
						
					</u-tabs>
				</view>
				<view class="view4">
					<scroll-view :scroll-y="true" :show-scrollbar="true">
						<view style="display: flex;">
							<view class="column">
								<view v-for="(item,index) in cards1" :key="index">
									<view v-if="index%2==0" class="item">
										<uni-card padding="0" spacing="0"  margin="0" :is-shadow="false"  :border ="false" borderRadius="16rpx">
											<image class="item__image" :src="item.image" @click="imageClick(index)"></image>
											<view class="item__item">
												<text>{{item.text}}</text>
											</view>
										</uni-card>
									</view>
								</view>
							</view>
							<view class="column1">
								<view v-for="(item,index) in cards1" :key="index">
									<view v-if="index%2==1" class="item">
										<uni-card padding="0" spacing="0" margin="0" :is-shadow="false"  :border ="false"  borderRadius="16rpx">
											<image class="item__image" :src="item.image" @click="imageClick(index)"></image>
											<view class="item__item">
												<text>{{item.text}}</text>
											</view>
										</uni-card>
									</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="status" loadmoreText="上拉加载更多" loadingText="正在加载中" loadingIcon="circle"/>
					</scroll-view>
					
				</view>
				
			</view>
			
		</view>
		<view v-else>
			<view class="view1" @click="login">
				<view class="view11">
					<image src="/static/icon/search.png" class="view111"></image>
					<view class="view112">
						<text>搜索</text>
					</view>
				</view>
			</view>
			<view class="view2">
				<view class="view21" :class="[1=== current && 'view21--active']" @click="login">
					<text :style="1=== current?{color:'#1A1111'}:{color:'#767070'}">已发布</text>
				</view>
				<view class="view22" :class="[2=== current && 'view22--active']" @click="login">
					<text :style="2=== current?{color:'#1A1111'}:{color:'#767070'}">草稿箱</text>
				</view>
			</view>
			<view class="view3">
				<u-tabs :list="[{name: '+ 自定义',}]"  @click="login"  lineColor="#543EE3" lineWidth="60" lineHeight="1.5" 
				active-color="#666666" font-size="32" height="44"  inactive-color="#A0A2A3" 
				itemStyle="height:58rpx;padding-left:58rpx;padding-right:58rpx" activeStyle="color:#543EE3;" inactiveStyle="color:#A0A2A3;">	
				</u-tabs>
			</view>
			<image class="view5" src="/static/icon/drawingBoard.png" ></image>		
		</view>
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog mode="input" title="自定义平台" :before-close="true" @close="dialogInputClose" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
	export default {
		name: "works",
		props: {
		   // 定义一个名为message的prop
		   token: {
		     type: String, // 指定数据类型
		     required: true, // 设置为必需
		   },
		   cardss: {
		     type:  Array, // 指定数据类型
		     required: true, // 设置为必需
		   },
		 },
		data() {
			return {
				status: 'loadmore',
				searchTrue:true,
				searchText:'',
				current:2,
				flag:this.$store.state.user.flag,
				currentPulatform:0,
				receivedData:this.$store.state.user,
				show:true,
				icon_url:"../../static/homepage/",
				globalToken:this.token,
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
				
				workNumber:null,
				cards1:this.$store.state.cards,
				listq: [{
							name: '抖音',
				            }, 
						{
				            name: '小红书',
							
						},],
				listq1:[{
							name: '视频',
				            }, 
						{
				            name: '文案',
							
						},],
				ffff:[],
				uFfff:[],	
			}
		},
		onReachBottom(){
			this.status = 'loading';
		},
		methods: {
			onLoad:function(){
				this.globalToken=this.$store.state.globalToken
			},
			searchChange(){
				this.searchTrue=false
			},
			searchBlur(){
				this.searchTrue=true
				this.searchText=''
			},
			textClick1(){
				this.current=1
				console.log(this.current)
			},
			textClick2(){
				this.current=2
				this.cards1=[]
				let self=this
				uni.request({
					url: configService.apiUrl+'/video/conversation/list', 
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
								let nnn={
									id:records[i].id,
									url:records[i].videoUrl,
									title:records[i].title,
									step:'finish'
								}
								let jj={
										id:records[i].id,
										text:records[i].title,
										image:records[i].videoUrl+'?x-oss-process=video/snapshot,t_1000,m_fast',
										step:'finish'
									}
									console.log(jj)
								self.cards1.push(jj)
								self.ffff.push(nnn)
							}else{
										let nnn={
											id:records[i].id,
											step:'unFinish',
											title:records[i].title
										}
										let jj={
												id:records[i].id,
												text:records[i].title,
												image:'../../static/homepage/picture21.png',
												step:'unFinish'
											}
											console.log(jj)
										self.cards1.push(jj)
										console.log("nnn",nnn)
										self.uFfff.push(nnn)
									}
							
						}
						
						console.log(self.cards1)
					},
					fail: (error) => {
						console.error('Error:', error);
					},
				});
			},
			imageClick(index){
				if(this.cards1[index].step==='finish'){
					uni.navigateTo({
						url: '/subPages/new_video/new_video',
								success: (re) => {
									let videoData={
										url:this.cards1[index].image.split("?")[0],
										conversationId: this.cards1[index].id,
									}
									re.eventChannel.emit('video', videoData)
								}
					});
				}else{
					uni.request({
						url: configService.apiUrl+'/video/conversation/getConversationById', 
						method: 'GET',
						data: {
							id:this.cards1[index].id
						},
						header: {
						    'X-Access-Token': this.globalToken,
						},
						success: (res) => {
							uni.request({
								url: configService.apiUrl+'/video/conversation/getMessageByConversationId', 
								method: 'GET',
								data: {
									id:this.cards1[index].id
								},
								header: {
								    'X-Access-Token': this.globalToken,
								},
								success: (r) => {
									let l=r.data.result.length
									let content =r.data.result[l-1].content
									
								    uni.navigateTo({
								    	url: '/subPagesB/new_scripts/new_scripts',
								    	success: (e) => {
								    		let n=0
								    		let t=[]
											console.log("res.data.result.gptScriptConfig.tone.split(',')",res.data.result.gptScriptConfig.tone.split(','))
								    		res.data.result.gptScriptConfig.characterRole.split(',').forEach((item, index) => {
								    			console.log(item)
								    			let i={}
								    			if(n%2==0){
								    				i=
								    					{
								    						title:item,
								    						color:"#F5E1FF",
								    						borderColor:"#C6B3FE"
								    					}
								    			}else{
								    				i=
								    					{
								    						title:item,
								    						color:"#C7FFD8",
								    						borderColor:"#9CD2AD"	
								    					}
								    			}
								    			t.push(i)
								    			n++
								    		})
								    		res.data.result.gptScriptConfig.tone.split(',').forEach((item, index) => {
								    			console.log(item)
								    			let i={}
								    			if(n%2==0){
								    				i=
								    					{
								    						title:item,
								    						color:"#F5E1FF",
								    						borderColor:"#C6B3FE"
								    					}
								    			}else{
								    				i=
								    					{
								    						title:item,
								    						color:"#C7FFD8",
								    						borderColor:"#9CD2AD"	
								    					}
								    			}
								    			t.push(i)
								    			n++
								    		})
											console.log("t",t)
											let result=res.data.result
											result.content=content
								    		let scriptsData={
								    			result:result,
								    			templateCode:res.data.result.templateCode,
								    			tags:t
								    		}
								    		e.eventChannel.emit('script', scriptsData)
								    	}
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
					
				}
			},
			getType(e){
				
				console.log(e.index)
				console.log(this.listq[e.index].name)
			},
			customize(){
				this.$refs.inputDialog.open()
			},
			dialogInputClose(){
				this.$refs.inputDialog.close()
			},
			dialogInputConfirm(value){
				if(value!=''){
					let i={
						name:value
					}
					this.listq.push(i)
				}
				this.$refs.inputDialog.close()
			},
			login(){
				
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
										console.log("self.receivedData",self.receivedData)
										console.log("self.receivedData",self.$store.state.user)
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
		margin-top: 32rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		height:72rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.view11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 100%;
	}
	.view111{
		height:32rpx;
		width:32rpx;
		
	}
	.view112{
		font-size: 24rpx;
		color:#1A1111;
		margin-left:16rpx;
	}
	.view2{
		margin-top: 24rpx;
		width:100%;
		height:92rpx;
		display: flex;
		align-items: center; /* 垂直居中 */
	}
	.view21{
		font-weight: bold;
		margin-left: 28rpx;
		font-size: 32rpx;
			&--active {
				font-size: 40rpx;
			}
	}
	.view22{
		font-weight: bold;
		margin-left: 48rpx;
		font-size: 32rpx;
			&--active {
				font-size: 40rpx;
			}
	}
	.view3{
		margin-top: 24rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		height:58rpx;
		border-bottom: 1.5rpx solid #f8f8f8;
	}
	.view31{
	
		flex:1;

	}
	.view311{
		display: flex;
	}
	.view3111{	
		padding: 0 11px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.view3r{
		width: 172rpx;
		text-align: center;
		color: #A0A2A3;
	}
	.view4{
		height: 810rpx;
		// #ifdef MP-ALIPAY
		height: 950rpx;
		// #endif
		display: flex;
		margin-top: 32rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
		
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
		width: 354rpx; 
		margin-bottom: 16rpx; 
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
	
	.view41{
		display: flex;
		margin-top: 32rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
	}
	.view5{
		width: 440rpx;
		height: 440rpx;
		margin-top: 272rpx;
		margin-left: 140rpx;
	}
</style>
