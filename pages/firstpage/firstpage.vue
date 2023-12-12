<template>
	
	<view class="container" >
		<uni-nav-bar  :fixed="true" shadow background-color="#ffffff" :status-bar="true" :border="false"
					 @clickLeft="back" />
			<view class="up"></view>
			<view class="button1" :style="{'margin-top':toTop+'rpx'}">
				<view class="icon" @click="clickScript">
				</view>
				<view class="iconText">
					<text>脚本</text>
				</view>
			</view>
			<view class="button2" :style="{'margin-top':toTop+'rpx'}">
				<view class="icon" @click="clickCopywriting">			
				</view>
				<view class="iconText">
					<text>文案</text>
				</view>
			</view>
			<view class="down"></view>
		 
	</view>
</template>

<script>
	export default {
		name: "firstpage",
		data() {
			return {
				toTop:678,
				statusBarHeight:0,
				titleBarHeight:0,		
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
			this.toTop = this.toTop+ this.statusBarHeight+this.titleBarHeight		
		  },
		 // #endif
		 
		methods: {
			clickScript(){
				uni.navigateTo({
				        // url: '/subPagesB/new_generateScript/new_generateScript',
						url: '/subPagesB/new_generateScript/new_generateScript',
				    });
			},
			clickCopywriting(){
				uni.navigateTo({
				        url: '/subPagesB/new_generateCopywriting/new_generateCopywriting',
				    });
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;/* 设置整个页面高度为屏幕高度 */
	}
	.up{
		height: 746rpx;
		background-color: #E8E7E7;
	}
	.down{
		flex: 1;
	}
	.icon{
		margin-top: 36rpx;
		margin-left: 60rpx;
		margin-right: 60rpx;
		width: 120rpx;
		height: 120rpx;
		background-color: #E8E7E7;
		border-radius: 16rpx;
	}
	.iconText{
		text-align: center;
		margin-top: 8rpx;
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
</style>
