<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		<view class="view1">
			<video class="video" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
				controls></video>
		</view>
		<view class="view2">
			<button class="button"  @click="buttonClick">
				跳转发布
			</button>
		</view>
		<view class="view3">
			<button class="button1"  @click="buttonClick1">
				保存本地
			</button>
			<button class="button2"  @click="buttonClick2">
				存草稿
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			buttonClick(){
				
			},
			buttonClick1(){
				
			},
			buttonClick2(){
				
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
	.view3{
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
		background-color: #106F6A;
		color:#ffffff;
		font-size:34rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
</style>
