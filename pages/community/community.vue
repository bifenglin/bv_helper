<template>
	<view style="background-color: #ffffff;letter-spacing: 1rpx;">
		<uni-nav-bar  :fixed="true" shadow background-color="#ffffff" :status-bar="true" :border="false"
					 @clickLeft="back" />
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
			
			
			<!-- <view v-for="(item,index) in cards" :key="index">
				<view class="view4__item">
					
				</view>
			</view> -->
		
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog mode="input" title="自定义平台" :before-close="true" @close="dialogInputClose" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
	export default {
		name: "community",
		data() {
			return {
				searchTrue:true,
				searchText:'',
				current:1,
				currentPulatform:0,
				show:true,
				icon_url:"../../static/homepage/",
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
				listq: [{
							name: '抖音',
				            }, 
						{
				            name: '小红书',
							
						},
						{
							name: '案例',
						}, 
						{
							name: '人群',
						}, ],
			}
		},
		methods: {
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
				
				console.log(this.current)
			},
			getType(e){
				console.log(this.top)
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
		height: 948rpx;
		// #ifdef MP-ALIPAY
		height: 1068rpx;
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
</style>
