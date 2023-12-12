<template>
	<view style="background-color: #ffffff;letter-spacing:1rpx;">
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
			@clickLeft="back"/>
		
		<view style="margin-bottom: 190rpx;">
			<view class="view1">
				<view class="v11">
					<view v-if="titleTrue" class="view11" >
						<u--text :lines="1" :text=originalData.title :bold="true"  size="32rpx" color="#000000" align="center" ></u--text>
					</view>
					<view v-else class="view11" style="width: 100%;">
						  <u--input border="none" inputAlign="center" :focus="true" :autoBlur="false" 
						    v-model="originalData.title" maxlength=-1 fontSize="32rpx" @blur="titleBlur" 
							color="#000000" :customStyle="{'font-weight': 'bold'}"></u--input>
					</view>
					<view @click="title">
						<image src="/static/icon/pencilb.png" class="view12"></image>
					</view>
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
					<view class="view22" :style="blvStyles[index]">
						<fui-icon name="operate" size="56" color="#000000"></fui-icon>
					</view>
					<view class="view211">
						<view class="view2111" >
							<view v-if="itemTitleTrue[index].title" class="view231">
								<u--text :lines="1" :bold="true" :text="item.title" size="28rpx"  align="center" ></u--text>
							</view>
							<view v-else class="view11" style="width: 100%; margin-left: 24rpx;">
								  <u--input  border="none" inputAlign="center" :focus="true" :autoBlur="false" :customStyle="{'fontWeight': 'bold'}"
								    v-model="item.title" maxlength=-1 fontSize="28rpx" @blur="itemTitleBlur(index)" 
									backgroundColor="#FCF5FF"></u--input>
							</view>
							<view  @click="itemTitleModify(index)">
								<image src="/static/icon/pencilh.png" class="view2112" ></image>
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
							    	<text>内容</text>
							    </view>
							</u-col>							
							<u-col span="9.7">
							    <view class="view232" >
									<view v-if="itemTitleTrue[index].content">
										<u--text  :text="item.content" size="28rpx" align="center"></u--text>
									</view>
									<view v-else>
										<fui-textarea :fixed="true"   letterSpacing="1rpx"
										 maxlength=-1  v-model="item.content" :borderTop="false" :borderBottom="false" :focus="true"
										  :padding="['0rpx', '0rpx','0rpx', '0rpx']" bottomLeft="0" :autoHeight="true" @blur="textareaContentBlur(index)"
										  size="28" ></fui-textarea>
									</view>
								</view>
								<view class="view233" >
									<view @click="itemContentModify(index)">
										<image src="/static/icon/pencilz.png" class="view2331" ></image>
									</view>
									<view @click="itemContentRefresh(index)">
										<image src="/static/icon/undo.png" class="view2332" ></image>
									</view>
								</view>
							</u-col>
							
						</u-row>
					</view>
					<view class="view23">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>人设</text>
							    </view>
							</u-col>
							<u-col span="9.7">
							    <view class="view232" style="margin-bottom: 18rpx;">
							    	<fui-textarea  placeholder="请输入人设......" letterSpacing="1rpx"
									 placeholderStyle="color:#86909C;font-size: 28rpx;" 
							    	 maxlength=-1  v-model="item.persona" :borderTop="false" :borderBottom="false" @blur="textareaPersonaBlur(index)"
							    	  :padding="['0rpx', '0rpx',]"  :autoHeight="true" @focus="textareaPersonaFocus(index)"
							    	  size="28" ></fui-textarea>
							    </view>		    
							</u-col>
						</u-row>
					</view>
					<view class="view23" style="border-radius: 0 0 8rpx 8rpx;">
						<u-row>
							<u-col span="2.3">
							    <view class="view231">
							    	<text>笔记</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							    <view class="view232" style="margin-bottom: 18rpx;">
									<fui-textarea  placeholder="请输入笔记......" letterSpacing="1rpx" placeholderStyle="color:#86909C;font-size: 28rpx;" 
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
				<button class="button" @click="buttonClick">
					开始导入
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
				titleTrue:true,
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
						content:true,
						
					},
					{
						title:true,
						content:true,
						
					},
					{
						title:true,
						content:true,
						
					},
				],
				itemsData:{
					title:"这是一个示例标题",
					label:[
						{
							title:"打工暂停",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签",
							color:"#C7FFD8",
							borderColor:"#9CD2AD"
						},{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签2",
							color:"#C7FFD8",
							borderColor:"#9CD2AD"
						},{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
					],
					items:[
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
					],
				},
				
				originalData:{
					title:"这是一个示例标题",
					label:[
						{
							title:"打工暂停",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签",
							color:"#C7FFD8",
							borderColor:"#9CD2AD"
						},{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
						{
							title:"标签2",
							color:"#C7FFD8",
							borderColor:"#9CD2AD"
						},{
							title:"标签1",
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						},
					],
					originalItems:[
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
						{
							title:'开场',
							content:'这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字',
							persona:'',
							note:'',
						},
					],
				},
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
				this.itemsData.items[index].title=this.originalData.originalItems[index].title
				this.itemsData.items[index].content=this.originalData.originalItems[index].content
				this.itemsData.items[index].persona=''
				this.itemsData.items[index].note=''
			},
			itemContentModify(index){
				this.itemTitleTrue[index].content=false
				this.blvStylesOpen(index)
			},
			itemContentRefresh(index){
				this.itemsData.items[index].content=this.originalData.originalItems[index].content
			},
			textareaNoteFocus(index){
				this.blvStylesOpen(index)
			},
			textareaPersonaFocus(index){
				this.blvStylesOpen(index)
			},
			textareaPersonaBlur(index){
				this.blvStylesClose(index)
			},
			textareaNoteBlur(index){
				this.blvStylesClose(index)
			},
			textareaContentBlur(index){
				this.itemTitleTrue[index].content=true
				this.blvStylesClose(index)
			},
			blvStylesOpen(index){
				this.blvStyles[index].backgroundColor= "#FCF5FF"
			},
			blvStylesClose(index){	
				this.blvStyles[index].backgroundColor= "#F6F6F6"
			},
			buttonClick(){
				uni.navigateTo({
					url: '/subPages/new_photograph/new_photograph',
					success: (res) => {
							res.eventChannel.emit('copywriting', this.itemsData)
					    }
				});
			}
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
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
	}
	.view11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		/* width: 100%; */
		color: #000000;
		/* font-family: 'PingFang SC'; */
	}
	.v11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 100%;
		height: 96rpx;
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
		margin-top: 32rpx;
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
		margin-top: 24rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-bottom: 24rpx;
	}
	.view233{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 88rpx;
		height: 42rpx;
		margin-top: 2rpx;
		margin-left: 444rpx;
		margin-bottom: 32rpx;
	}
	.view2331{	
		width: 32rpx;
		height: 32rpx;
	}
	.view2332{
		width: 40rpx;
		height: 40rpx;
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


