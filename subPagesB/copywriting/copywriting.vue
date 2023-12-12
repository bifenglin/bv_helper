<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
					 @clickLeft="back" />
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''" style="margin-bottom: 64rpx;" >
			<view style="margin-left:3.2% ;margin-right:3.2%;margin-top: 3.2%;margin-bottom: 96rpx;">
				
			<view >
				<view style="margin-bottom: 2.2%; background-color: #ffffff;height:100rpx ;display: flex;align-items: center;" >
				<u--text :lines="1" :text=text  @click="titleButton" suffixIcon="edit-pen" iconStyle="font-size: 40rpx;color:#b4b4b4" :color="titleColor" size="35rpx" :bold="true" align="center" class="text"></u--text>
				</view >
				<view style="margin-bottom:2.2% ;">
					<u-row >
						<u-col span="4">
							
								<view class="tag">
									标签
								</view>
								
													
						</u-col>
						<u-col span="8">
							<view class="tag">
								内容
							</view>
						</u-col>
						
					 </u-row>
				</view>
				<view v-for="(item, index) in items" :key="index">
				
				
				<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                       <view class="padding"  style="text-align: center;min-height: 98upx;">
				                       	<text>{{item.synopsis}}</text>
				                       </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">
				                        	<text>{{item.content}}</text>
				                        	</view>
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
						<view style="position: relative;z-index: 3;">
							<fui-button @click="modifyButton" background="#fff" color="#0fa3fa" borderColor="#0fa3fa" radius="96rpx" >调整文案</fui-button>	
						</view>			
					</u-col>
					<u-col span="6">
						<view >
							<fui-button @click="shotButton" background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="96rpx">确认文案</fui-button>		
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
				<uni-popup-dialog type="信息" cancelText="否" confirmText="是" title="退出是否保存该文案" :content=content @confirm="dialogConfirm"
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
					   <u--textarea v-model="inputValue" :adjustPosition="true" height="240rpx" placeholder="文案标题" placeholderStyle="color:#f2f2f2" class="Utextarea" maxlength="100"></u--textarea>
						</view>
					</view>
				</u-popup>
			</view>
		
	</view>
</template>

<script>
	
	import fuiDivider from "@/components/firstui/fui-divider/fui-divider.vue"
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import myFabTop from "@/components/wppeng-top/wppeng-top.vue"
	export default {
		components:{
			fuiDivider,fuiButton,fuiTextarea,myFabTop
		},
		data() {
			return {
				modalName: null,			
				items: [
					{
						synopsis:"开头",					
						content:"你是否也有这样的烦恼，每天长时间坐在电脑前，腰酸背痛，手腕酸痛，甚至颈椎疼痛？作为一名从事AI相关事业的科研工作者，我深知这些问题对我们的身体健康和工作效率的影响。"
					},
					{
						synopsis:"情景描述",					
						content:"在这个快节奏的时代，我们的工作和生活方式越来越倾向于久坐不动，这对我们的身体健康造成了很大的威胁。而自动升降桌的出现，为我们解决了这个问题。"
					},
					{
						synopsis:"人设",					
						content:"作为一名从事AI相关事业的科研工作者，我一直在探索如何将AI技术应用于生活中，让人们的生活更加便捷和健康。"
					},
					{
						synopsis:"方法介绍",					
						content:"自动升降桌是一种可以根据个人身高和习惯自动调节高度的办公桌，可以让我们在工作中随时调整桌子的高度，从而保持正确的坐姿和站姿，减轻身体的压力和疲劳感。"
					},
					{
						synopsis:"点赞诱导",					
						content:"如果你也想拥有一个自动升降桌，让你的工作更加高效和健康，不妨点赞支持一下吧！"
					},
					{
						synopsis:"中间",					
						content:"自动升降桌的优点有哪些呢？首先，它可以让我们在工作中随时调整桌子的高度，从而保持正确的坐姿和站姿，减轻身体的压力和疲劳感。其次，它可以根据个人身高和习惯自动调节高度，让我们的工作更加高效和舒适。最后，它还可以提高我们的工作效率和创造力，让我们更加专注和有动力地完成工作。"
					},
					{
						synopsis:"结尾",					
						content:"作为一名从事AI相关事业的科研工作者，我一直在探索如何将AI技术应用于生活中，让人们的生活更加便捷和健康。如果你想了解更多关于AI技术的应用和生活健康的知识，欢迎关注我的主页，让我们一起探索更多的精彩内容吧！"
					},
					{
						synopsis:"最后",					
						content:"#自动升降桌# #健康生活# #AI技术应用# #科研工作者#"
					}					
				],
				
				scrollTop:0,
				text:'点击添加标题',
				show: false,
				inputValue:"",
				titleColor:"#b4b4b4",
				buttondisabled:true,
				flag:true,
				content:'该文案将被保存为\n'
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
								this.content='该文案将被保存为\n'+this.text
								}else{
									this.content='该文案将被保存为\n'+this.dateFormat()
							}
								return true
							} else {
								return false
							}
				
			},
			onload(){
				console.log(this.items.split('\n'))
			},
			dialogInputConfirm(value){
				console.log(value)
				uni.redirectTo ({
					url: '/subPagesB/scripts/scripts',
				});
				this.$refs.inputDialog.close()
			},
			dialogInputClose(){
				this.$refs.inputDialog.close()
				 
				
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
			modifyButton(){
				this.$refs.inputDialog.open()
		
			},
			shotButton(){
				this.$refs.alertDialog.open()
				if(this.text!='点击添加标题'){
					this.content+=this.text
				}else{
					this.content+=this.dateFormat()
				}
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

