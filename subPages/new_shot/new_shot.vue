<template>
	<view >
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view style="margin-bottom: 190rpx;letter-spacing:1rpx;">
			<view class="view1">
				<view class="v11">
					<u--text :lines="1" :text=originalData.title :bold="true" size="32rpx" color="#000000" align="center" ></u--text>
				</view>
				<view class="v12">
					<view v-for="(item, index) in originalData.label" :key="index">
						<view class="v121" :style="{'border':'3rpx solid'+item.borderColor,'background-color':item.color}">
							<text>{{'# '+item.title}}</text>
						</view>
					</view>
				</view>
				<view style="height: 1rpx;"></view>
			</view>
			<view v-for="(item, index) in itemsData.items" :key="index" class="view2">
				<view class="view21">
					<view class="view211">
						<u--text :lines="1" :text="item.title" size="28rpx"  align="center" ></u--text>
					</view>
					<view v-if="item.description">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>描述</text>
							    </view>
							</u-col>							
							<u-col span="9.7" >
							    <view  class="view23">
									<u--text :text="item.description" size="28rpx" align="left"></u--text>
								</view>
							</u-col>	
						</u-row>
					</view>
					<view v-if="item.narration">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>旁白</text>
							    </view>
							</u-col>
							<u-col span="9.7">
							    <view class="view23">
							    	<u--text :text="item.narration" size="28rpx" align="left"></u--text>						    
							    </view>
							</u-col>							
						</u-row>
					</view>
					<view v-if="item.note">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>笔记</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							   <view class="view23">
									<u--text  :text="item.note" size="28rpx" align="left"></u--text>
							   </view>	
							</u-col>	
						</u-row>
					</view>
					<view style="border-radius: 0 0 8rpx 8rpx;">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>视频</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							   <view class="view23">
								   <view style="border-radius: 8rpx;">
									<u-upload
										:fileList="fileList"
										@afterRead="afterRead"
										@delete="deletePic"
										:multiple="true"
										:maxCount="1"
										accept="video"
										uploadIcon="plus"
										uploadIconColor="#A0A2A3"
										uploadBackgroundColor="#F8F8F8"
									></u-upload>
									</view>
							   </view>	
							</u-col>	
						</u-row>
					</view>
				</view>	
			</view>	
			<view class="view3">
				<button class="button"  @click="buttonClick">
					去剪辑
				</button>
			</view>
		</view>
		<view style="height: 1rpx;"></view>
	</view>
</template>

<script>
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	export default {
		components:{
			fuiIcon,fuiTextarea
		},
		// #ifdef MP-ALIPAY
		onReady() {
			
			my.setNavigationBar({
			  frontColor: '#000000',
			  backgroundColor: '#ffffff',
			})
			
		},
		// #endif
		data() {
			return {
				itemsData:null,
				originalData:null,
				fileList: [],
			}
		},
		methods: {
			onLoad(){
			    const eventChannel = this.getOpenerEventChannel()     
			    eventChannel.on('script', data => {
						this.originalData=data
						this.itemsData=data
			    })
			},
			buttonClick(){
				uni.navigateTo({
					url: '/subPages/new_video/new_video',
				});
			},
			deletePic(event) {
				this[`fileList`].splice(event.index, 1)
			},
			async afterRead(event) {
					// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
					let lists = [].concat(event.file)
					let fileListLen = this[`fileList`].length
					lists.map((item) => {
						this[`fileList`].push({
							...item,
							status: 'uploading',
							message: '上传中'
						})
					})	
					for (let i = 0; i < lists.length; i++) {
						const result = await this.uploadFilePromise(lists[i].url)
						let item = this[`fileList`][fileListLen]
						this[`fileList`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result
					}))
					fileListLen++
				}
			},
				uploadFilePromise(url) {
					return new Promise((resolve, reject) => {
						let a = uni.uploadFile({
							url: '', // 仅为示例，非真实的接口地址
							filePath: url,
							name: 'file',
							formData: {
								user: 'test'
							},
							success: (res) => {
								setTimeout(() => {
									resolve(res.data.data)
								}, 1000)
							}
						});
					})
				},
		}
	}
</script>

<style>
	.view1{
		margin-top: 32rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		padding-top: 24rpx;
	}
	.v11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 100%;
		height: 96rpx;
		color: #000000;
	}
	.v12{
		margin-top: 48rpx;
		margin-bottom: 24rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		
	}
	.v121{
		height: 56rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		padding-left:16rpx;
		padding-right:16rpx;
		margin-right: 8rpx;
		border-radius: 6rpx;
		margin-bottom: 8rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #1D2129;
	}
	.view12{
		width: 32rpx;
		height: 32rpx;
		margin-left: 16rpx;
		margin-right: 24rpx;
		margin-top: 6rpx;
	}
	.view2{
		margin-top: 48rpx;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
	}
	.view21{
		z-index: 1;
		position: relative;
	}
	.view211{
		height: 80rpx;
		background-color: #FCF5FF;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		border-radius: 8rpx 8rpx 0 0;
	}
	.view23{
		padding-top:24rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-bottom: 24rpx;
		
	}
	.view231{
		text-align: center;
		font-size: 28rpx;
		margin-left: 24rpx;
	}
	.view232{
		margin-top: 24rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-bottom: 24rpx;
	}
	.view3{
		position: fixed;
		bottom: 68rpx; 
		z-index: 3;
		display: flex;
		width: 100%;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	.button{
		border-radius: 8rpx;
		width: 654rpx;
		background-color: #543EE3;
		color:#ffffff;
		font-size:34rpx;
	}
</style>

