<template>
	<view style="background-color: #ffffff;">
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view style="margin-bottom: 190rpx;">
			<view class="view1">
				<view v-if="titleTrue" class="view11" >
					<u--text :lines="1" :text=text   size="32rpx"  align="center" ></u--text>
				</view>
				<view v-else class="view11" style="width: 100%;">
					  <u--input border="none" inputAlign="center" :focus="true" :autoBlur="false" 
					    v-model="text" maxlength=-1 fontSize="32rpx" @blur="titleBlur"></u--input>
				</view>
				<view @click="title">
					<image src="/static/icon/pencil.png" class="view12"></image>
				</view>
			</view>
			<view v-for="(item, index) in items" :key="index" class="view2">
				<view class="view21">
					<view class="view22" :style="blvStyles[index]">
						<fui-icon name="operate" size="56" color="#000000"></fui-icon>
					</view>
					<view class="view211">
						<view class="view2111">
							<view v-if="itemTitleTrue[index].title" class="view231">
								<u--text :lines="1" :text="item.title" size="28rpx"  align="center" ></u--text>
							</view>
							<view v-else class="view11" style="width: 100%;">
								  <u--input  border="none" inputAlign="center" :focus="true" :autoBlur="false" 
								    v-model="item.title" maxlength=-1 fontSize="28rpx" @blur="itemTitleBlur(index)" 
									backgroundColor="#FCF5FF"></u--input>
							</view>
							<view  @click="itemTitleModify(index)">
								<image src="/static/icon/pencil.png" class="view2112" ></image>
							</view>
						</view>
						<view class="view2113" @click="refresh(index)">
							<text>恢复</text>
						</view>
					</view>
					<view class="view23">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>描述</text>
							    </view>
							</u-col>							
							<u-col span="9.7">
							    <view class="view232" >
									<view v-if="itemTitleTrue[index].description">
										<u--text  :text="item.description" size="28rpx" align="center"></u--text>
									</view>
									<view v-else>
										<fui-textarea :fixed="true"  
										 maxlength=-1  v-model="item.description" :borderTop="false" :borderBottom="false" :focus="true"
										  :padding="['0rpx', '0rpx','0rpx', '0rpx']" bottomLeft="0" :autoHeight="true" @blur="textareaDescriptionBlur(index)"
										  size="28" ></fui-textarea>
									</view>
								</view>
								<view class="view233" >
									<view @click="itemDescriptionModify(index)">
										<image src="/static/icon/pencilz.png" class="view2331" ></image>
									</view>
									<view @click="itemDescriptionRefresh(index)">
										<image src="/static/icon/refresh.png" class="view2332" ></image>
									</view>
								</view>
							</u-col>
							
						</u-row>
					</view>
					<view class="view23">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>旁白</text>
							    </view>
							</u-col>
							
							<u-col span="9.7">
							    <view class="view232" >
							    	<view v-if="itemTitleTrue[index].narration">
							    		<u--text  :text="item.narration" size="28rpx" align="center"></u--text>
							    	</view>
							    	<view v-else>
							    		<fui-textarea :fixed="true"  
							    		 maxlength=-1  v-model="item.narration" :borderTop="false" :borderBottom="false" :focus="true"
							    		  :padding="['0rpx', '0rpx','0rpx', '0rpx']" bottomLeft="0" :autoHeight="true" @blur="textareaNarrationBlur(index)"
							    		  size="28" ></fui-textarea>
							    	</view>
							    </view>
							    <view class="view233" >
							    	<view @click="itemNarrationModify(index)">
							    		<image src="/static/icon/pencilz.png" class="view2331" ></image>
							    	</view>
							    	<view @click="itemNarrationRefresh(index)">
							    		<image src="/static/icon/refresh.png" class="view2332" ></image>
							    	</view>
							    </view>
							</u-col>
							
						</u-row>
					</view>
					<view class="view23" style="border-radius: 0 0 8rpx 8rpx;">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>笔记</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							    <view class="view232" style="margin-bottom: 18rpx;">
									<fui-textarea  placeholder="请输入笔记......" placeholderStyle="color:#86909C;font-size: 28rpx;" 
									 maxlength=-1  v-model="item.note" :borderTop="false" :borderBottom="false" @blur="textareaNoteBlur(index)"
									  :padding="['0rpx', '0rpx',]"  :autoHeight="true" @focus="textareaNoteFocus(index)"
									  size="28" ></fui-textarea>
								</view>
							</u-col>	
						</u-row>
					</view>
				</view>	
			</view>	
			<view class="view3">
				<button class="button"  @click="buttonClick">
					开始导入
				</button>
			</view>
		</view>
		<view style="height: 1rpx;"></view>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
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
				titleTrue:true,
				text:"这是一个示例标题",
				blvStyles:[{
					backgroundColor: "#F6F6F6"
				},
				{
					backgroundColor: "#F6F6F6"
				},
				{
					backgroundColor: "#F6F6F6"
				},],
				itemTitleTrue:[
					{
						title:true,
						description:true,
						narration:true,
					},
					{
						title:true,
						description:true,
						narration:true,
					},
					{
						title:true,
						description:true,
						narration:true,
					},
				],
				items:[
					{
						title:'开场',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
					{
						title:'中间',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
					{
						title:'后面',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
				],
				originalItems:[
					{
						title:'开场',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
					{
						title:'中间',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
					{
						title:'后面',
						description:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						narration:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
						note:'',
					},
				],
				
			}
		},
		methods: {
			title(){
				this.titleTrue=false
			},
			titleBlur(){
				this.titleTrue=true
			},
			itemTitleModify(index){
				this.itemTitleTrue[index].title=false
				this.blvStylesOpen(index)
				
			},
			itemTitleBlur(index){
				this.itemTitleTrue[index].title=true
				this.blvStylesClose(index)
			},
			refresh(index){
				this.items[index].title=this.originalItems[index].title
				this.items[index].description=this.originalItems[index].description
				this.items[index].narration=this.originalItems[index].narration
				this.items[index].note=''
			},
			itemDescriptionModify(index){
				this.itemTitleTrue[index].description=false
				this.blvStylesOpen(index)
			},
			itemDescriptionRefresh(index){
				this.items[index].description=this.originalItems[index].description
			},
			itemNarrationModify(index){
				this.itemTitleTrue[index].narration=false
				this.blvStylesOpen(index)
			},
			itemNarrationRefresh(index){
				this.items[index].narration=this.originalItems[index].narration
			},
			textareaNoteFocus(index){
				this.blvStylesOpen(index)
			},
			textareaNarrationBlur(index){
				this.blvStylesClose(index)
			},
			textareaNoteBlur(index){
				this.blvStylesClose(index)
			},
			textareaDescriptionBlur(index){
				this.blvStylesClose(index)
			},
			blvStylesOpen(index){
				this.blvStyles[index].backgroundColor= "#FCF5FF"
			},
			
			blvStylesClose(index){	
				this.blvStyles[index].backgroundColor= "#F6F6F6"
			},
			buttonClick(){
				
			}
		}
	}
</script>

<style>
	.view1{
		margin-top: 32rpx;
		height: 84rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		padding: 24rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
	}
	.view11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 100%;
		
	}
	.view12{
		width: 32rpx;
		height: 32rpx;
		margin-left: 16rpx;
		margin-right: 24rpx;
		margin-top: 6rpx;
	}
	.view2{
		margin-top: 24rpx;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		
	}
	.view21{
		z-index: 1;
		position: relative;
	}
	.view22{
		width: 24rpx; /* 适应你的容器宽度 */
		height:100%; /* 适应你的容器高度 */
		position: absolute;
		border-radius: 8rpx 0 0 8rpx;
		z-index: 2;
	
		display: flex;
		justify-content: center;
		align-items: center
	}
	.view211{
		height: 80rpx;
		background-color: #FCF5FF;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		border-radius: 8rpx 8rpx 0 0;
	}
	.view2111{
		
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 558rpx;
		height:44rpx;
		
	}
	.view2112{
		width: 28rpx;
		height: 28rpx;
		margin-left: 16rpx;
		margin-top: 8rpx;
	}
	.view2113{
		color:#543EE3;
		font-size: 24rpx;
		margin-left: 16rpx;
	}
	.view23{
		border-top: 1rpx solid #E5E6EB;
	}
	.view231{
		text-align: center;
		font-size: 28rpx;
		margin-left: 24rpx;
	}
	.view232{
		
		margin-top: 18rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		
	}
	.view233{
		
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 88rpx;
		height: 42rpx;
		margin-top: 2rpx;
		margin-left: 446rpx;
		margin-right: 32rpx;
		margin-bottom: 24rpx;;
	}
	.view2331{	
		width: 32rpx;
		height: 32rpx;
	}
	.view2332{
		width: 32rpx;
		height: 32rpx;
		margin-left: 24rpx;
	}
	.view2332{
		width: 32rpx;
		height: 32rpx;
		margin-left: 24rpx;
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

