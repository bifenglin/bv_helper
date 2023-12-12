<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
					 @clickLeft="back" />
			
			
		
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''" style="margin-bottom: 64rpx;">
			<view style="margin-left:3.2% ;margin-right:3.2%;margin-top: 3.2%;margin-bottom: 96rpx;">
				<view style="margin-bottom: 2.2%; background-color: #ffffff;height:100rpx ;display: flex;align-items: center;" >
					<u--text :lines="1" :text=text  @click="titleButton" suffixIcon="edit-pen" iconStyle="font-size: 40rpx;color:#b4b4b4" :color="titleColor" size="35rpx" :bold="true" align="center" class="text"></u--text>
				</view >				
			<view v-for="(item, index) in items" :key="index">
				<view style="margin-bottom:2.2% ;">	
				<u-row >
					<u-col span="4">
						
							<view class="tag">
								{{'镜头'+(index+1)}}
							</view>
											
					</u-col>
					<u-col span="4">
						
							<view class="tag">
								{{item.scenery}}
							</view>
						
					</u-col>
					<u-col span="4">
						
							<view class="tag">
								{{item.type}}
							</view>
						
					</u-col>
				</u-row>
				</view>
				<view v-if="item.screenDescription">
				<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;min-height: 98upx;">
				                        	<text>画面描述</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{item.screenDescription}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
				<view v-if="item.narration">
					<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;min-height: 98upx;">
				                        	<text>旁白</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{item.narration}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
				<view v-if="item.signature">
					<view style="background-color: #ffffff; margin-top:7.5rpx;min-height: 98upx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;min-height: 98upx;">
				                        	<text>花字</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{item.signature}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
				<fui-divider width="100%" height="50" dividerColor="#CCCCCC" ></fui-divider>
			
			</view>
			
			<view >
				<view style="position: fixed;bottom: 0;left: 3.2%;right:3.2%;bottom: 68rpx;">
					<u-row >
					
					 <u-col span="6">
						<view>
							<fui-button @click="modifyButton" background="#fff" color="#0fa3fa" borderColor="#0fa3fa" radius="96rpx" style="margin-bottom:3.2%;">调整脚本</fui-button>	
						</view>			
					</u-col>
					<u-col span="6">
						<view >
							<fui-button @click="shotButton" background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="96rpx" style="margin-bottom:3.2%;">开始拍摄</fui-button>		
						</view>	
					</u-col>
					</u-row >
				</view>	
			
			</view>
			</view>
			<my-fab-top :scrollTop="scrollTop"></my-fab-top>
			<view>
				<uni-popup ref="inputDialog" type="dialog"  :mask-click="false">
				<uni-popup-dialog ref="inputClose"  mode="input" title="调整意见" 
					placeholder="请输入调整意见" confirmText="重新生成" @close="dialogInputClose" @confirm="dialogInputConfirm"></uni-popup-dialog>
				</uni-popup>
			</view>
		</scroll-view>
		
		<uni-popup ref="alertDialog" type="dialog">
			<view style="text-align: center; "> 
				<uni-popup-dialog type="信息" cancelText="否" confirmText="是" title="退出是否保存该脚本" :content=content @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
			</view>
		</uni-popup>
		<view>
				<u-popup :show="show"  closeIconPos="top-left" :closeOnClickOverlay="false" :safeAreaInsetBottom="true" :safeAreaInsetTop="true"  >
		            <view class="cuIcon-close popupClose" @click="close"></view>
					<view class="inputButton">
					<fui-button background="#0fa3fa" color="#fff" height="50rpx" width="100rpx"  radius="10rpx" size="30" @click="save" disabledBackground="#e1e1e1" disabledColor="#878787" :disabled="buttondisabled">保存</fui-button>
					</view>
					<view class="u-popup-slot">
						<view class="u-popup-slot1">
					   <u--textarea v-model="inputValue" :adjustPosition="true" height="240rpx" placeholder="脚本标题" placeholderStyle="color:#f2f2f2" class="Utextarea" maxlength="100"></u--textarea>
						</view>
					</view>
				</u-popup>
			</view>
	</view>
</template>

<script>
	
	import fuiDivider from "@/components/firstui/fui-divider/fui-divider.vue"
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	import myFabTop from "@/components/wppeng-top/wppeng-top.vue"
	export default {
		components:{
			fuiDivider,myFabTop,fuiButton
		},
		data() {
			return {
				modalName: null,
				data:'1',
				items:[
					{
						scenery:'近景',
						type:'静态',
						screenDescription:'使用提示：按 Enter 键或点击“发送”按钮发送消息,文本生成可能需要等待1-2分钟。第一次发送的消息可以发送一个商品名词，例如：啵啵洗发水。等待视频脚本内容生成后可以对内容进行描述，例如：请添加它的使用方法内容。若出现异常，请刷新页面并且进行问题反馈。',
						narration:'hhh',
						signature:'使用提示：按 Enter 键或点击“发送”按钮发送消息,文本生成可能需要等待1-2分钟。第一次发送的消息可以发送一个商品名词，例如：啵啵洗发水。等待视频脚本内容生成后可以对内容进行描述，例如：请添加它的使用方法内容。若出现异常，请刷新页面并且进行问题反馈。',
					},
					{
							scenery:'近景',
							type:'静态',
							screenDescription:'使用提示：按 Enter 键或点击“发送”按钮发送消息,文本生成可能需要等待1-2分钟。第一次发送的消息可以发送一个商品名词，例如：啵啵洗发水。等待视频脚本内容生成后可以对内容进行描述，例如：请添加它的使用方法内容。若出现异常，请刷新页面并且进行问题反馈。',
							narration:'',
							signature:'使用提示：按 Enter 键或点击“发送”按钮发送消息,文本生成可能需要等待1-2分钟。第一次发送的消息可以发送一个商品名词，例如：啵啵洗发水。等待视频脚本内容生成后可以对内容进行描述，例如：请添加它的使用方法内容。若出现异常，请刷新页面并且进行问题反馈。使用提示：按 Enter 键或点击“发送”按钮发送消息,文本生成可能需要等待1-2分钟。第一次发送的消息可以发送一个商品名词，例如：啵啵洗发水。等待视频脚本内容生成后可以对内容进行描述，例如：请添加它的使用方法内容。若出现异常，请刷新页面并且进行问题反馈。',
						}
				],
				scrollTop:0,
				text:'点击添加标题',
				show: false,
				inputValue:"",
				titleColor:"#b4b4b4",
				buttondisabled:true,
				flag:true,
				content:'该脚本将被保存为\n'
			}
		},
		watch:{
			inputValue(){
				this.buttondisabled=false
			}
		},
		methods: {
			back() {
							uni.navigateBack({
								delta: 1
							})
						},
			onPageScroll(res){
			            this.scrollTop=res.scrollTop
			        },
			
			onBackPress() {
				if (this.flag) {
					        console.log(this.dateFormat())
							this.$refs.alertDialog.open()
							if(this.text!='点击添加标题'){
								this.content='该脚本将被保存为\n'+this.text
							}else{
								this.content='该脚本将被保存为\n'+this.dateFormat()
							}
								return true
							} else {
								return false
							}
				
			},
			modifyButton(){
				this.$refs.inputDialog.open()
			},
			dialogInputClose(){
				this.$refs.inputDialog.close()
			},
			dialogInputConfirm(value){
				console.log(value)
				this.$refs.inputDialog.close()
				 uni.redirectTo ({
					url: '/subPagesB/scripts/scripts',
				});
				
			},
			dialogClose(){
				this.flag = false
				this.$refs.alertDialog.close()
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			dialogConfirm(){
				this.flag = false
				this.$refs.alertDialog.close()
				 uni.navigateBack({
				 	delta: 1, //返回层数，2则上上页
				 })
				
			},		 
			shotButton(){
				uni.navigateTo({
					url: '/subPages/shot/shot',
					success: (res) => {
					
					      res.eventChannel.emit('script', this.items)
					      }
				
				});
			},
			titleButton(){
				if(this.text!='点击添加标题'){
					this.inputValue=this.text
					this.buttondisabled=false
				}else if(this.inputValue!=''){
					this.buttondisabled=false
				}
				this.show=true
			},
			save() {
				if(!/^\s*$/.test(this.inputValue)){
					this.text=this.inputValue
					this.titleColor="black"
			      }else{
					  this.text='点击添加标题'
					  this.titleColor="#b4b4b4"
				  }
				this.show = false
				this.buttondisabled=true
				},
			close() {
			    this.show = false
				this.buttondisabled=true
			},
			dateFormat() {
				    let date = new Date(new Date().toISOString());
				    let year = date.getFullYear();
				    // 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				    // 拼接
				    return year + "年" + month + "月" + day + "日" + hours + ":" + minutes + ":" + seconds;
				    // return year + "-" + month + "-" + day;
				},
			
		}
	}
</script>

<style lang="scss">
	.tag{
		background-color:#0fa3fa ; 
		width: 100%;
		border-radius: 8rpx;
		text-align: center;
		height:54rpx ;
		font-size:24rpx  ;
		line-height:54rpx;
		color: #ffffff;;
	}
.u-popup-slot {
		height: 450rpx;
		background-color: #ffffff;

	}
.u-popup-slot1 {
		width: 93.2%;
		position: absolute;
		top: 18.2%;
		right: 3.2%;
		left:3.2%;
		background-color: #f2f2f2;
	}
.text{
	
	padding-left:3.2% ;
	padding-right:3.2% ;
	
}
.Utextarea{
	background-color: #f2f2f2;
}
.inputButton{
	position: absolute;
	top: 5%;
	right: 3.2%;
}
.popupClose{
	position: absolute;
	top: 5%;
	left: 3.2%;
	color: #8b8b8b;
	font-size: 40rpx;
	
}
</style>

