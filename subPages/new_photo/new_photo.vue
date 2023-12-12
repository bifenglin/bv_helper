<template>
	<view >
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view class="view1">
			<u-swiper :list="list" @change="e => current = e.current" imgMode="widthFix" bgColor="#ffffff"
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
				跳转发布
			</button>
		</view>
		<view class="view4">
			<button class="button1"  @click="buttonClick1">
				保存本地
			</button>
			<button class="button2"  @click="buttonClick2">
				存草稿
			</button>
		</view>
		<view style="height: 1rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				text:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文',
				list: [
						'../../static/homepage/2.jpg',
				        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
						'../../static/homepage/2.jpg',
						'../../static/homepage/2.jpg',
						'https://cdn.uviewui.com/uview/swiper/swiper3.png',
						'https://cdn.uviewui.com/uview/swiper/swiper2.png',
						'https://cdn.uviewui.com/uview/swiper/swiper1.png',
						'../../static/homepage/2.jpg'
				],
				ustyle:{
					display:'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}
			}
		},
		methods: {
			buttonClick(){
				
			},
			buttonClick1(){
				
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
		margin-top: 32rpx;
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
		background-color: #106F6A;
		color:#ffffff;
		font-size:34rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
</style>

