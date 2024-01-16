<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view  class="view1">
			<view class="view11" >
				<view class="view111"  @click="returnModify">
					<text>返回修改</text>
				</view>
				<view class="view112"  @click="returnHomepage">
					<text>返回首页</text>
				</view>
			</view>
			<video class="video"  :poster-for-crawler="videoUrl+'?x-oss-process=video/snapshot,t_0,f_jpg'" :src="videoUrl"  @error="error" @play="play" 
				controls></video>
		</view>
		<!-- <view class="view2">
			<button class="button"  @click="buttonClick">
				返回首页
			</button>
		</view> -->
		<view class="view3">
			<button class="button1"  @click="buttonClick1">
				保存本地
			</button>
			<button class="button2"  @click="buttonClick2">
				存草稿
			</button>
		</view>
		
		<fui-toast ref="toast"></fui-toast>
	</view>
</template>

<script>
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
	export default {
		components:{
			fuiIcon,fuiTextarea,fuiLoading,fuiToast
		},
		data() {
			return {
				globalToken:'',
				videoUrl:'',
				v:false,
				gptConversationId:null
			}
		},
		methods: {
			onLoad(){
				this.globalToken=this.$store.state.globalToken
				// this.videoUrl='https://yanbi-resources.oss-cn-shanghai.aliyuncs.com/production/1734811987156766722.mp4'
			    const eventChannel = this.getOpenerEventChannel()     
			    eventChannel.on('video', data => {
					console.log('videourl:',data)
					console.log(typeof data);
					this.videoUrl=data.url
					this.gptConversationId=data.conversationId
					console.log(this.videoUrl)
			    })
			},
			returnHomepage(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			buttonClick1(){
				uni.saveVideoToPhotosAlbum({
					filePath: this.videoUrl,
					success: function () {p
						let options = {};
						options.text = '已保存';
						this.$refs.toast.show(options);
					},
					fail: (error) => {
						console.error('Error:', error);
						let options = {};
						options.text = '保存失败';
						this.$refs.toast.show(options);
					},
				});
				let options = {};
				options.text = '已保存';
				this.$refs.toast.show(options);
			},
			buttonClick2(){
				let options = {};
				options.text = '已保存';
				this.$refs.toast.show(options);
			},
			error(event){
				console.log('error',event)
			},
			play(){
				console.log('play')
			},
			returnModify(){
				uni.navigateTo ({
					url: '/subPages/clip/clip',
					success: (re) => {
						let videoData={
							url:this.videoUrl,
							conversationId: this.gptConversationId,
						}
						re.eventChannel.emit('videoData', videoData)
					}
				});
			}
		}
	}
</script>

<style>
	.view1{
		margin-left: 24rpx;
		margin-right:24rpx;
	}
	.view2{
		margin-top: 32rpx;
		margin-left: 48rpx;
		margin-right:48rpx;
	}
	.view11{
		margin-top: 22rpx;
		font-size: 24rpx;
		width: 100%;
		height: 36rpx;
		color: #543EE3;
		display: flex;
		justify-content: space-between;
		
	}
	.view111{
	
		font-size: 24rpx;
		width: 96rpx;
		height: 36rpx;
		color: #543EE3;
		display: flex;
		justify-content: left; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.view112{
		
		font-size: 24rpx;
		width: 96rpx;
		height: 36rpx;
		color: #543EE3;
		display: flex;
		justify-content: left; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	/* .view3{
		position: fixed;
		height: 152rpx;
		bottom: 68rpx; 
		display: flex;
		width: 100%;
		
	} */
	.view3{
		height: 152rpx;
		margin-bottom: 44rpx; 
		display: flex;
		width: 100%;
	}
	.video{
		margin-top:32rpx;
		height: 1000rpx;
		width: 100%;
		border-radius: 8rpx;
		background-color: #000000;
	}
	.button{
		border-radius: 8rpx;
		height: 80rpx;
		width: 100%;
		background-color: #543EE3;
		color:#ffffff;
		font-size:34rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.button1{
		margin-top: 32rpx;
		margin-left: 48rpx;
		border-radius: 40rpx;
		height: 80rpx;
		width: 316rpx;
		background-color: #ffffff;
		border: 1rpx solid #A0A2A3;
		color:#707376;
		font-size:34rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.button2{
		margin-top: 32rpx;
		margin-left: 24rpx;
		margin-right: 48rpx;
		border-radius: 40rpx;
		height: 80rpx;
		width: 316rpx;
		background-color: #FFA000;
		color:#ffffff;
		font-size:34rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
</style>
