<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		<view class="view">
			<view class="view1">
				<view class="view11" @click="returnModify">
					<text>返回修改</text>
				</view>
				<video class="video"  :poster-for-crawler="videoUrl+'?x-oss-process=video/snapshot,t_0,f_jpg'" :src="videoUrl"  @error="error" @play="play" 
					controls></video>
			</view>
		</view>
		<view class="view2">
			<view class="view21">
				<text>选择音乐</text>
			</view>
			<view class="view22">
				<u-tabs :list="listq"  @click="getType($event)"  lineColor="#ffffff" lineWidth="60" lineHeight="1.5"
				font-size="32" height="44"  
				itemStyle="height:58rpx;" activeStyle="color:#543EE3;font-weight:bold;" inactiveStyle="color:#A0A2A3;" :show-bar="false"
				gutter="44rpx" >	
					<view slot="left" style="display: flex;align-items: center;height: 42rpx;">
						<image class="view22l" src="/static/icon/forbid.png"></image>
						<image class="view22l1" src="/static/icon/minus.png"></image>
					</view>
				</u-tabs>
			</view>
			<view class="view23">
				<u-scroll-list :indicator="false" >
					<view class="scroll-list" >
						<view
							class="scroll-list__line"
							v-for="(item, index) in menuArr"
							:key="index"
						>
							<view
								class="scroll-list__line__item"
								v-for="(item1, index1) in item"
								:key="index1"
								:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
								:style="{'backgroundImage': 'url('+item1.icon+')'}"
								@click="clickItem(item1.ossUrl,item1.name)"
							>	
								<view v-if="!( scene==='情绪场景' && index === 0 && index1=== 0)" class="scroll-list__line__item__text">
									<text>{{item1.name}}</text>
								</view>
								
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="view24">
				<view class="view241">
					<view v-for="(item, index) in list" :key="index" class="text" :class="[(index !=0) && 'text--noLeft',(index ==1) && 'text__second']" >
						{{item}}
					</view>
				</view>
			</view>
			<view class="view25">
				<button class="button"  @click="buttonClick">
					导出
				</button>
			</view>
		</view>
		<u-modal :show="show"  @cancel="cancel" @confirm="confirm" z-index="1000"
		:title-style="{'color':'#11161A','font-size':'32rpx'}" style="max-height: 500rpx;"
		 show-cancel-button confirm-text="确定" confirmColor="#543EE3" cancelColor="#000000">
			<view v-if="listenTrue" class="modalText"  @click="listen">
				<text>点击试听</text>
			</view>
			<view v-else class="modalText"  @click="pause">
				<text>暂停播放</text>
			</view>
		</u-modal>
		<fui-toast ref="toast"></fui-toast>
		<view v-if="loadingValid">
			<fui-loading type="col" text="导出中" maskBgColor="rgba(0, 0, 0, 0.6)" isMask :isFixed="true"></fui-loading>
		</view>
	</view>
</template>

<script>
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
	import configService from'@/common/service/config.service.js'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		components:{
			fuiIcon,fuiTextarea,fuiLoading,fuiToast
		},
		data() {
			return {
				listenTrue:true,
				globalToken:'',
				videoUrl:'',
				v:false,
				listq: [],
				menuArr: [[{name: '',icon: '/static/icon/music.png',ossUrl:null}],[]],
				show:false,
				ossUrl:null,
				title:null,
				gptConversationId:null,
				scene:'情绪场景',
				list: ['剪辑','音乐','文字','贴纸','画中画','特效','模板'],
				intervalId:null,
				loadingValid:false,
			}
		},
		methods: {
			onLoad(){
				this.globalToken=this.$store.state.globalToken
				// this.videoUrl='https://yanbi-resources.oss-cn-shanghai.aliyuncs.com/production/1734811987156766722.mp4'
			    const eventChannel = this.getOpenerEventChannel()     
			    eventChannel.on('videoData', data => {
					console.log('videourl:',data)
					console.log(typeof data);
					this.videoUrl=data.url
					this.gptConversationId=data.conversationId,
					console.log(this.videoUrl)
					console.log(this.gptConversationId)
			    })
				uni.request({
					url: configService.apiUrl+'/gpt/gptMusic/scene', 
					method: 'GET',
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log('sceneResponse:', res.data);
					    console.log('sceneResponse:', res.data.result);
						res.data.result.forEach((item) => {
							let i={
								name:item
							}
							this.listq.push(i)
						});
					},
					fail: (error) => {
						
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
				});
				uni.request({
					url: configService.apiUrl+'/gpt/gptMusic/list', 
					method: 'GET',
					data: {
						scene:this.scene,
						pageSize:20
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log('sceneResponse:', res.data);
					    console.log('sceneResponse:', res.data.result.records);
						for(let i=0;i<res.data.result.records.length;i++){
							let j={
								name: res.data.result.records[i].title,
								icon: '/static/icon/music2.png',
								ossUrl:res.data.result.records[i].ossUrl
							}
							this.menuArr[i%2].push(j)
						}
					},
					fail: (error) => {
						
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
				})
			},
			clickItem(url,title){
				if(url){
					this.show=true
					console.log(url)
					this.ossUrl=url
					this.title=title
				}
			},
			cancel(){
				this.show=false
				this.ossUrl=''
				this.title=''
				innerAudioContext.stop()
			},
			confirm(){
				this.show=false
				innerAudioContext.stop()
				
			},
			getType(e){
				console.log(this.listq[e.index].name)
				this.scene=this.listq[e.index].name
				uni.request({
					url: configService.apiUrl+'/gpt/gptMusic/list', 
					method: 'GET',
					data: {
						scene:this.listq[e.index].name,
						pageSize:20
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log('sceneResponse:', res.data);
					    console.log('sceneResponse:', res.data.result.records);
						if(this.listq[e.index].name==="情绪场景"){
							this.menuArr=[[{name: '',icon: '/static/icon/music.png',ossUrl:null}],[]]
						}
						else{
							this.menuArr=[[],[]]
						}
						for(let i=0;i<res.data.result.records.length;i++){
							let j={
								name: res.data.result.records[i].title,
								icon: '/static/icon/music2.png',
								ossUrl:res.data.result.records[i].ossUrl
							}
							this.menuArr[i%2].push(j)
						}
					},
					fail: (error) => {
						
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
				})
			},
			returnModify(){
				uni.request({
					url: configService.apiUrl+'/video/conversation/getConversationById', 
					method: 'GET',
					data: {
						id:this.gptConversationId
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						uni.request({
							url: configService.apiUrl+'/video/conversation/getMessageByConversationId', 
							method: 'GET',
							data: {
								id:this.gptConversationId
							},
							header: {
							    'X-Access-Token': this.globalToken,
							},
							success: (r) => {
								let l=r.data.result.length
								let content =r.data.result[l-1].content
								let n=0
								let t=[]
								res.data.result.gptScriptConfig.characterRole.split(',').forEach((item, index) => {
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
								let itemsData={
									title:"",
									label:[],		
									items:[],
								}
								let gptMessage=result.gptMessage
								const jsonObject = JSON.parse(gptMessage.content);
								itemsData.title=jsonObject.title
								itemsData.label=t
								jsonObject.scenes.forEach(function(item) {
								    console.log(item);
									let it = {
										title:'镜头'+item.shotNumber,
										description:item.description,
										narration:item.narration,
										note:'',
									}
									itemsData.items.push(it)
								});
								uni.navigateTo({
									url: '/subPages/new_shot/new_shot',
									success: (rs) => {
										let scriptsData={
											itemsData:itemsData,
											gptConversationId:this.gptConversationId
										}
										rs.eventChannel.emit('script', scriptsData)
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
			},
			buttonClick(){
				this.loadingValid=true
				uni.request({
					url: configService.apiUrl+'/gpt/gptVideoConfig/add', 
					method: 'POST',
					data: {
						bgmScene:this.scene,
						bgmTitle:this.title,
						bgmUrl:this.ossUrl,
						conversationId:this.gptConversationId,
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log('sceneResponse:', res.data);
					    console.log('sceneResponse:', res.data.code);
						uni.request({
							url: configService.apiUrl+'/gpt/gptMedia/generate', 
							method: 'GET',
							data: {
								conversationId: this.gptConversationId,
							},
							header: {
							    'X-Access-Token': this.globalToken,
							},
							success: (re) => {
								this.intervalId = setInterval(() => {
								        this.sendRequest();
								      }, 5000); // 5000毫秒即为5秒
							},
							fail: (error) => {
								this.loadingValid=false
								console.log('error:', error);
								a=false
								let options = {};
								options.text = '生成失败';
								this.$refs.toast.show(options);
							},
						})
						
					},
					fail: (error) => {
						this.loadingValid=false
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
				})
			},
			stopRequest() {
			      // 停止定时发送请求
			      clearInterval(this.intervalId);
			    },
			  
			  beforeDestroy() {
			    // 在组件销毁前清除定时器，防止内存泄漏
			    clearInterval(this.intervalId);
			  },
			sendRequest(){
				console.log("lllllll")
				uni.request({
					url: configService.apiUrl+'/video/conversation/getConversationById', 
					method: 'GET',
					data: {
						id: this.gptConversationId,
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log('Response112211:', res);
						console.log('Response112211url:', res.data.result.videoUrl);
						console.log(res.data.result.step)
						if(res.data.result.step === "finish"){
							this.loadingValid=false
							this.stopRequest();
							uni.navigateTo ({
								url: '/subPages/new_video/new_video',
								success: (re) => {
									console.log(typeof res.data.result.videoUrl);
									let videoData={
										url:res.data.result.videoUrl,
										conversationId: this.gptConversationId,
									}
									re.eventChannel.emit('video', videoData)
								}
							});
						}
					},
					fail: (error) => {
						this.loadingValid=false
						console.log('error:', error);
						a=false
						let options = {};
						options.text = '生成失败';
						this.$refs.toast.show(options);
					},
				})
			},
			pause(){
				this.listenTrue=true
				innerAudioContext.pause()
			},
			listen(){
				console.log(this.ossUrl)
				
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.ossUrl;
				innerAudioContext.play()
				this.listenTrue=false
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				innerAudioContext.onPause(() => {
				  console.log('播放暂停');
				});
				innerAudioContext.onStop(() => {
				  console.log('播放停止');
				});
			}
		}
	}
</script>

<style lang="scss">
	.scroll-list {
		@include flex(column);
		&__line {
			@include flex;
			&__item {
				margin-right: 32rpx;
				margin-bottom: 32rpx;
				width: 150rpx;
				height: 150rpx;
				border-radius: 12rpx;
				
				background-size: cover; /* 使背景图片覆盖整个区域 */
				background-position: center; /* 使背景图片在容器中居中 */
				&__image {
					width: 150rpx;
					height: 150rpx;
				}
				&__text {
					padding: 18rpx;
					color: #ffffff;
					font-size: 20rpx;
					text-align: center;
					display: flex;
					justify-content: left; /* 水平居中 */
					align-items: center; /* 垂直居中 */
					height: 100%;	
				}
				&--no-margin-right {
					margin-right: 0;
				}
			}
		}
	}
	.view{
		background-color: #f8f8f8;
		height: 566rpx;
		margin-top: 0rpx;
		border:1rpx solid #f8f8f8;
	}
	.view1{
		margin-left: 24rpx;
		margin-right:24rpx;
	}
	.view11{
		margin-top: 22rpx;
		font-size: 24rpx;
		width: 96rpx;
		height: 36rpx;
		color: #543EE3;
		display: flex;
		justify-content: left; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.view2{
		height: 536rpx;
		width: 100%;
	}
	/* .view3{
		position: fixed;
		height: 152rpx;
		bottom: 68rpx; 
		display: flex;
		width: 100%;
	} */
	.video{
		/* margin-top:32rpx; */
		/* height: auto; */
		margin-top:22rpx;
		height: 390rpx;
		width: 100%;
		border-radius: 8rpx;
		background-color: #000000;
	}
	.view21{
		height: 96rpx;
		width: 670rpx;
		
		border-bottom: 1px solid #F8F8F8;
		margin-left: 40rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		color: #000000;
		font-size: 32rpx;
		}
	.view22{
		margin-top: 16rpx;
		margin-left: 32rpx;
		width: 692rpx;
		height: 42rpx;
		
	}
	.view22l{
		height: 32rpx;
		width: 32rpx;
	}
	.view22l1{
		height: 40rpx;
		width: 40rpx;
		margin-left: 32rpx;
	}
	.view23{
		margin-top: 30rpx;
		margin-left: 32rpx;
		width: 692rpx;
		height: 344rpx;
		
	}
	.modalText{
		color: #543EE3;
		font-size: 32rpx;
		font-weight: bold;
	}
	.view24{
		
		height: 104rpx;
		width: 100%;
		padding: 32rpx 24rpx;
	}
	.view241{
		width: 100%;
		height: 100%;
		
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.view25{
		background-color: #ffffff;
		height: 190rpx;
		width: 100%;
		padding-left: 48rpx;
		padding-right: 48rpx;
		padding-top: 38rpx;
		position: fixed;
		bottom: 0;	
	}
	.button{
		border-radius: 8rpx;
		background-color: #543EE3;
		color:#ffffff;
		font-size:34rpx;
	}
	.text{
		font-size: 32rpx;
		color: #000000;
		&__second{
			color: #543EE3;
			font-weight: bold;
		}
		&--noLeft{
			margin-left: 32rpx;
		}
	}
</style>
