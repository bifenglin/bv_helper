<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
					 @clickLeft="back" />
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''"  style="margin-bottom: 164rpx; ">
			<view style="margin-left:24rpx ;margin-right:24rpx;margin-top: 24rpx; min-height: 400rpx;">
				<view style="margin-bottom: 20rpx; background-color: #ffffff;height:100rpx ;display: flex;align-items: center;" >
					<u--text :lines="1" :text=text  @click="titleButton" suffixIcon="edit-pen" iconStyle="font-size: 40rpx;color:#b4b4b4" :color="titleColor" size="35rpx" :bold="true" align="center" class="text">
						
					</u--text>
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
					<view style=" z-index: 1;position: relative;">
						<view class="background-lview" :style="blvStyles[index]" v-show="true" @click="handleItemClick(index)">
						  <fui-icon name="operate" ></fui-icon>
						</view>
						
						<view class="background-view" :style="itemShow[index]" :ref="`bv${index}`" >
							
							<u-row >
							    <u-col span="4"  offset="1">
							        <view style="border-right: 1px solid black;">							
										<fui-button @click="button1(index)" radius="0" background="#0fa3fa" color="white" height="65rpx" borderColor="#0fa3fa">向上增加</fui-button>	
									</view>
							    </u-col>
								<u-line direction="col"></u-line>
							    <u-col span="4">
							        <view >									
							        	<fui-button @click="button2(index)" radius="0" background="#0fa3fa" color="white" height="65rpx" borderColor="#0fa3fa">向下增加</fui-button>	<u-line direction="col" color="#0a0a0b" height="60rpx"></u-line>			
							        </view>
								
							    </u-col>
								
								<u-col span="2.8">
								    <view style="border-left:1px solid black;">
								    	<fui-button @click="button3(index)" radius="0" background="#0fa3fa" color="white" height="65rpx" borderColor="#0fa3fa">删除</fui-button>	
								    </view>
								</u-col>
							</u-row>
						</view>
					
					
					
					
				
				
				<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4" style="">
										
				                        <view class="padding" style="min-height: 98upx;">
											
												<textarea placeholder="点击输入大纲"  placeholder-style="color:#adadad;font-size:28rpx;"  v-model="item.synopsis" @input="adjustHeight(index)" auto-height maxlength="-1" class="Btextarea1" @focus="textareaFocus(index)"></textarea>
											</view>
				                        	
				                        
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" :style="textMinHeight[index]" >									
											<textarea placeholder="点击输入内容"  placeholder-style="color:#adadad;font-size:28rpx;"  v-model="item.content" auto-height maxlength="-1" class="Btextarea" @focus="textareaFocus(index)"></textarea>
										</view>
				                    </u-col>
				                </u-row>
				</view>
				
				
				</view>
				
			</view>
			<view >
				<view style="position: fixed;left: 24rpx;right: 24rpx;bottom: 68rpx; z-index: 4;">
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
				   <u--textarea v-model="inputValue" height="240rpx" placeholder="文案标题" placeholderStyle="color:#f2f2f2" class="Utextarea" maxlength="100"></u--textarea>
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
	import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	export default {
		components:{
			fuiDropdownMenu,fuiIcon,fuiDivider,myFabTop,fuiButton,fuiTextarea
		},
		data() {
			return {
				modalName: null,
				textMinHeight:[{
					minHeight:"98upx",
					borderLeft: "1px solid #CCCCCC" 
				}],
				items:[
						{
							synopsis:"",					
							content:""
						},			
				],
				itemShow:[
					{
						display:'none'
					},
				],
				
				scrollTop:0,
				text:'点击添加标题',
				show: false,
				inputValue:"",
				titleColor:"#b4b4b4",
				buttondisabled:true,
				flag:true,
				content:'该文案将被保存为\n',
				blvStyles:[{
					backgroundColor: "#b4b4b4"
				},],
				count:-1,
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
			adjustHeight(index){
				let className = `aaa${index}`;
				
				uni.createSelectorQuery()
				  .select(`.${className}`) // 通过类名或选择器选择要获取高度的视图
				  .boundingClientRect((rect) => {
				    if (rect) {
						console.log(rect.height)
				      this.textMinHeight[index].minHeight=rect.height+"px"
				      
				    }
				  })
				  .exec();
			},
				
			itemShowOpen(index){
				this.itemShow[index].display='block'
			},
			blvStylesOpen(index){
				this.blvStyles[index].backgroundColor= "#0fa3fa"
			},
			itemShowClose(index){
				this.itemShow[index].display='none'
			},
			blvStylesClose(index){	
				this.blvStyles[index].backgroundColor= "#b4b4b4"
			},
			handleItemClick(index){
				if(this.itemShow[index].display=='none'){
					this.itemShowOpen(index)
					this.blvStylesOpen(index)
					if(this.count!=-1&&this.count!=index){
						this.itemShowClose(this.count)
						this.blvStylesClose(this.count)
					}
					this.count=index
				}
				else{
					this.itemShowClose(index)
					this.blvStylesClose(index)
					this.count=-1
				}
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
			
			textareaFocus(index){
				if(this.itemShow[index].display=='none'){
					this.blvStylesOpen(index)
					if(this.count!=-1&&this.count!=index){
						this.itemShowClose(this.count)
						this.blvStylesClose(this.count)
					}
				}
				else{
					this.itemShowClose(index)
					this.blvStylesClose(this.count)
				}
				this.count=index
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
			button1(index){
				let element1={
							synopsis:"",					
							content:""
						}	
				let element2=	{
						display:'none'
					}
				let element3={
					backgroundColor: "#b4b4b4"
				}
				let element4={
					minHeight:"98upx",
					borderLeft: "1px solid #CCCCCC" 
				}
				this.count=	this.count+1
				this.items.splice(index, 0, element1)
				this.itemShow.splice(index, 0, element2)	
				this.blvStyles.splice(index, 0, element3)
				this.textMinHeight.splice(index, 0, element4)
			},
			button2(index){
				let element1={
							synopsis:"",					
							content:""
						}
				let element2=	{
						display:'none'
					}
				let element3={
					backgroundColor: "#b4b4b4"
				}
				let element4={
					minHeight:"98upx",
					borderLeft: "1px solid #CCCCCC" 
				}
				this.items.splice(index+1, 0, element1)
				this.itemShow.splice(index+1, 0, element2)
				this.blvStyles.splice(index+1, 0, element3)
				this.textMinHeight.splice(index+1, 0, element4)
			},
			button3(index){
				this.items.splice(index, 1)
				this.itemShow.splice(index, 1)	
				this.blvStyles.splice(index, 1)
				this.textMinHeight.splice(index, 1)
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
	height: 350rpx;
	margin:3.2%;
	background-color: #ffffff;
	}
.u-popup-slot1 {
	width: 100%;
	margin-top:3.2%;
	background-color: #f2f2f2;		
	}
.text{
	padding-left:3.2% ;
	padding-right:3.2% ;
	
}
.Btextarea1{
	max-width: 184rpx;
	font-size: 28rpx;
	//margin: 30rpx 30rpx 30rpx 30rpx;	
	padding: 0;
	
}
.Btextarea{
	max-width: 408rpx;
	font-size: 28rpx;
	padding:0;	
	
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

	

.background-view {
	
	width: 500rpx; /* 适应你的容器宽度 */
	height: 65rpx; /* 适应你的容器高度 */
	background-image: url('/static/icon/select.png'); /* 图片路径 */
	background-size: cover; /* 图片尺寸适应容器大小 */
	background-position: center; /* 图片居中对齐 */
	position: absolute;
	top: 50%;
	left: 270rpx;
	transform: translate(-50%, -50%);
	z-index: 3;
	
}
.background-lview {
	width: 10px; /* 适应你的容器宽度 */
	height:100%; /* 适应你的容器高度 */
	
	position: absolute;
	border-radius: 8rpx 0 0 8rpx;
	//border: 1px solid black;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>