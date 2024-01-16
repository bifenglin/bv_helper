<template>
	<view >
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view class="view1">
			<u-swiper :list="list" keyName="url" @change="e => current = e.current" imgMode="widthFix" bgColor="#ffffff"
			:autoplay="false" height="872rpx" radius="8rpx" :ustyle="ustyle" class="view11">
			    <view v-if="list.length<=5" slot="indicator" class="indicator">
			        <view class="indicator__dot" v-for="(item, index) in list" :key="index"
			            :class="[index === current && 'indicator__dot--active']">
			        </view>
			    </view>
				<view v-else slot="indicator" class="indicator">
						<view v-if="current>3" class="indicator1__dot">
						</view>
						<view v-if="current<=3" class="indicator__dot" :class="[0 === current && 'indicator__dot--active']">
						</view>
						<view v-if="current<=3||current==list.length-1" class="indicator__dot" v-for="(item, index) in Range(3)" :key="index"
						    :class="[index+1 === current%4 && current!=list.length-1 && 'indicator__dot--active']">
						</view>
						<view v-if="current>3&&current!=list.length-1" class="indicator__dot" v-for="(item, index) in Range(2)" :key="index">
						</view>
						<view v-if="current>3&&current!=list.length-1" class="indicator__dot" :class="[ 'indicator__dot--active']">
						</view>
						<view v-if="current!=list.length-1" class="indicator1__dot">
						</view>
						<view v-if="current==list.length-1" class="indicator__dot" :class="[ 'indicator__dot--active']">
						</view>
				</view>
			</u-swiper>
		</view>
		<view class="view2">
			<u--text  :text="text" size="28rpx" align="center"></u--text>
		</view>
		<view class="view3">
			<button class="button"  @click="buttonClick">
				返回首页
			</button>
		</view>
		<view class="view4">
			<button class="button1"  @click="buttonClick1">
				一键复制
			</button>
			<button class="button2"  @click="buttonClick2">
				存草稿
			</button>
		</view>
		<view style="height: 1rpx;"></view>
		<fui-toast ref="toast"></fui-toast>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
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
				current: 0,
				text:'',
				list: [],
				gptConversationId:null,
				ustyle:{
					display:'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}
			}
		},
		methods: {
			onLoad(){
			    const eventChannel = this.getOpenerEventChannel()     
			    eventChannel.on('photoData', data => {
					console.log(data)
					this.list=data.photoUrls
					this.gptConversationId=data.conversationId
					this.text=data.text
					console.log(this.list)
			    })
			},
			buttonClick(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			buttonClick1(){
				// this.list.forEach((item, index) => {
				// 	console.log(item)
				// 	uni.saveImageToPhotosAlbum({
				// 		filePath: item,
				// 		success: function () {
							
				// 		},
				// 		fail: (error) => {
				// 			console.error('Error:', error);
				// 			let options = {};
				// 			options.text = '保存失败';
				// 			this.$refs.toast.show(options);
				// 		},
				// 	});
				// })
				uni.setClipboardData({
					data: this.text,
					success: function () {
						console.log('success');
					}
				});
				let options = {};
				options.text = '复制成功';
				this.$refs.toast.show(options);
			},
			buttonClick2(){
				
			},
			Range(n) {
			      // 一个简单的生成数字范围的函数，返回一个包含 0 到 n-1 的数组
			      return Array.from({ length: n }, (_, index) => index);
			    }
		}
	}
</script>

<style lang="scss">
	.indicator {
	    display: flex;
	    justify-content: center;	
		align-items: center; /* 垂直居中 */
	    &__dot {
	        height: 10rpx;
	        width: 10rpx;
	        border-radius: 50%;
	        background-color:#000000;
	        margin: 0 8rpx;
	        transition: background-color 0.3s;
	        &--active {
	            background-color: red;
	        }
	    }
	}
	.indicator1 {
	    display: flex;
	    justify-content: center;
		align-items: center; /* 垂直居中 */
	    &__dot {
	        height: 6rpx;
	        width: 6rpx;
	        border-radius: 50%;
	        background-color:#000000;
	        margin: 0 8rpx;
	        transition: background-color 0.3s;
			&--active {
			    background-color: red;
			}
	    }
	}
	.view1{
		margin-left: 48rpx;
		margin-right:48rpx;
		margin-top: 32rpx;
		height: 872rpx;
		
	}
	.view11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.view2{
		margin-left: 48rpx;
		margin-right:48rpx;
		margin-top: 32rpx;
		padding: 18rpx 32rpx 24rpx 32rpx;
	}
	.view3{
		margin-top: 32rpx;
		margin-left: 48rpx;
		margin-right:48rpx;
	}
	.view4{	
		height: 152rpx;
		margin-bottom: 44rpx; 
		display: flex;
		margin-top: 0rpx;
		width: 100%;
	
	}
	.view41{
		position: fixed;
		height: 152rpx;
		bottom: 68rpx; 
		display: flex;
		width: 100%;
	}
	.video{
		margin-top: 281rpx;
		height: 390rpx;
		width: 100%;
		border-radius: 8rpx;
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
		margin-top: 48rpx;
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
		margin-top: 48rpx;
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

