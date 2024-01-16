<template>
	<view style="background-color: #ffffff;letter-spacing: 1rpx;">
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view style="margin-bottom: 220rpx;">
			<view class="view1" :class="[itemsData.label.length == 0 && 'view1__active']">
				<view class="v11">
					<view v-if="titleTrue" class="view11" >
						<u--text :text=itemsData.title :bold="true"  size="32rpx" color="#000000" align="center" ></u--text>
					</view>
					<view v-else class="view11" style="width: 100%;">
						  <u--input border="none" inputAlign="center" :focus="true" :autoBlur="false" 
						    v-model="itemsData.title" maxlength=-1 fontSize="32rpx" @blur="titleBlur" 
							color="#000000" :customStyle="{'font-weight': 'bold'}"></u--input>
					</view>
					<view @click="title">
						<image src="/static/icon/pencilb.png" class="view12"></image>
					</view>
				</view>
				<view v-if="itemsData.label.length != 0" class="v12">
					<view v-for="(item, index) in itemsData.label" :key="index">
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
						<view class="view2111">
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
							    	<text>描述</text>
							    </view>
							</u-col>							
							<u-col span="9.7">
							    <view class="view232"  >
									<view v-if="itemTitleTrue[index].description">
										<u--text  :text="item.description" size="28rpx" align="left"></u--text>
									</view>
									<view v-else>
										<fui-textarea :fixed="true"  letterSpacing="1rpx"
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
							    	<text>旁白</text>
							    </view>
							</u-col>
							
							<u-col span="9.7">
							    <view class="view232" >
							    	<view v-if="itemTitleTrue[index].narration">
							    		<u--text  :text="item.narration" size="28rpx" align="left"></u--text>
							    	</view>
							    	<view v-else>
							    		<fui-textarea :fixed="true"  letterSpacing="1rpx"
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
							    		<image src="/static/icon/undo.png" class="view2332" ></image>
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
									<fui-textarea  placeholder="请输入笔记......" 
									placeholderStyle="color:#86909C;font-size: 28rpx;" letterSpacing="1rpx"
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
				<button class="button1"  @click="buttonClick1">
					智能修改
				</button>
				<button class="button2"  @click="buttonClick2">
					开始导入
				</button>
			</view>
		</view>
		<view style="height: 1rpx;"></view>
		<fui-toast ref="toast"></fui-toast>
		<view v-if="loadingValid">
			<fui-loading type="col" text="生成中" maskBgColor="rgba(0, 0, 0, 0.6)" isMask :isFixed="true"></fui-loading>
		</view>
		<u-modal :show="show" title="智能修改" @cancel="cancel" @confirm="confirm" z-index="1000"
		:title-style="{'color':'#11161A','font-size':'32rpx'}" style="max-height: 500rpx;" confirmColor="#543EE3" cancelColor="#11161A"
		 show-cancel-button confirm-text="开始修改">
		 <view style="width: 100%;">
			<view class="view4">
				<fui-textarea placeholder="请输入修改建议......" height="150rpx"
				 maxlength=-1  v-model="advice" :padding="['0rpx', '0rpx',]" :focus="true"
				 placeholderStyle="color:#A0A2A3;font-size: 32rpx" size="32"
				 :borderTop="false" :borderBottom="false"></fui-textarea>
			</view>
			<view class="ss">
				<view style="width: 302rpx;display: flex; align-items: center;">
					<view style="font-size: 28rpx;">
						<text>分镜数量</text>
					</view>
					<!-- <view style="font-size: 28rpx;color:#A0A2A3;">
						<text> （选填）</text>
					</view> -->
				</view>
				<view class="s">
					<view class="s1" @click="minus">
						<u-icon name="minus" color="#000000" size="14"></u-icon>	
					</view>
					<view class="s2">					
						  <u--input
						    placeholder="请输入数字"
						    border="none"
						    v-model="storyboardValue"
							@change="inputVal"
							inputAlign="center"
							backgroundColor="#F2F3F5"						
						  ></u--input>
					</view>
					<view class="s3" @click="plus">
						<u-icon name="plus" color="#000000" size="14"></u-icon>
					</view>
				</view>
			</view>
		</view>
		</u-modal>
	</view>
</template>

<script>
	import configService from'@/common/service/config.service.js'
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
	export default {
		components:{
			fuiIcon,fuiTextarea,fuiToast,fuiLoading
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
				storyboardValue:null,
				advice:"",
				show: false,
				titleTrue:true,
				loadingValid:false,
				blvStyles:[],
				itemTitleTrue:[],
				itemsData:{
					title:"",
					label:[],		
					items:[],
				},
				originalData:{
					title:"",
					label:[],		
					originalItems:[],
				},
				globalToken:"",
				gptConversationId:"",
				message: "",
				tags:[],
				gptMessage:null,
				content:null,
				shotNumbers:null
			}
		},
		methods: {
			onLoad(){
				this.globalToken=this.$store.state.globalToken
			    const eventChannel = this.getOpenerEventChannel()     
				let self = this;
			    eventChannel.on('script', data => {
					console.log(data)
					self.gptMessage=data.result.gptMessage
					self.gptConversationId=data.result.id
					const jsonObject = JSON.parse(self.gptMessage.content);
					self.content=jsonObject
					self.originalData.title=jsonObject.title
					self.originalData.label=data.tags
					self.templateCode=data.templateCode
					self.itemsData.title=jsonObject.title
					self.itemsData.label=data.tags
					self.storyboardValue=jsonObject.scenes.length
					jsonObject.scenes.forEach(function(item) {
						let it = {
							title:'镜头'+item.shotNumber,
							description:item.description,
							narration:item.narration,
							note:'',
						}
						let it3 = {
							title:'镜头'+item.shotNumber,
							description:item.description,
							narration:item.narration,
							note:'',
						}
						self.originalData.originalItems.push(it)
						self.itemsData.items.push(it3)
						let it1={
							title:true,
							description:true,
							narration:true,
						}
						self.itemTitleTrue.push(it1)
						let it2={
							backgroundColor: "#F6F6F6"
						}
						self.blvStyles.push(it2)
					});
			    })
			},
			inputVal(e){
				let temp = e.replace(/[^0-9]+/g,'')
				this.$nextTick(()=>{
					this.storyboardValue=temp
				})
			},
			plus(){
				if(this.storyboardValue==100){
					let options = {};
					options.text = '分镜数量最多为100';
					this.$refs.toast.show(options);
				}else{
					this.storyboardValue++
				}
			},
			minus(){
				if(this.storyboardValue==1||this.storyboardValue==''){
					let options = {};
					// options.message = '分镜数量最少为1';
					options.text = '分镜数量最少为1';
					this.$refs.toast.show(options);
					// this.$refs.uToast.show(options);
				}else{
					this.storyboardValue--
				}
			},
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
				this.itemsData.items[index].description=this.originalData.originalItems[index].description
				this.itemsData.items[index].narration=this.originalData.originalItems[index].narration
				this.itemsData.items[index].note=''
			},
			itemDescriptionModify(index){
				this.itemTitleTrue[index].description=false
				this.blvStylesOpen(index)
			},
			itemDescriptionRefresh(index){
				this.itemsData.items[index].description= this.originalData.originalItems[index].description
				
			},
			itemNarrationModify(index){
				this.itemTitleTrue[index].narration=false
				this.blvStylesOpen(index)
			},
			itemNarrationRefresh(index){
				this.itemsData.items[index].narration=this.originalData.originalItems[index].narration
			},
			textareaNoteFocus(index){
				this.blvStylesOpen(index)
			},
			textareaNarrationBlur(index){
				this.itemTitleTrue[index].narration=true
				this.blvStylesClose(index)
			},
			textareaNoteBlur(index){
				this.blvStylesClose(index)
			},
			textareaDescriptionBlur(index){
				this.itemTitleTrue[index].description=true
				this.blvStylesClose(index)
			},
			blvStylesOpen(index){
				this.blvStyles[index].backgroundColor= "#FCF5FF"
			},
			blvStylesClose(index){	
				this.blvStyles[index].backgroundColor= "#F6F6F6"
			},
			buttonClick1(){
				this.show = true;
				this.advice=""
			},
			cancel(){
				this.show = false;
				this.advice=""
			},
			confirm(){
				this.loadingValid=true
				this.show = false
				// #ifdef !H5
				console.log("storyboardValue",this.storyboardValue)
				uni.request({
					url: configService.apiUrl+'/video/conversation/message', 
					method: 'POST',
					data: {
						message: this.advice,
						gptConversationId:this.gptConversationId,
						templateCode:this.templateCode,
						shotNumbers:this.storyboardValue,
						type:'jiaoben'
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
					    console.log('messageResponse:', res.data);
						this.loadingValid=false
						if(res.data.code!=200||res.data.result.content=="抱歉，您的问题不太清楚，请提供更多细节或背景信息，我才能更好地回答您的问题。")
						{
							let options = {};
							options.text = '抱歉，您的问题不太清楚，请提供更多细节或背景信息，我才能更好地回答您的问题。';
							this.$refs.toast.show(options);
						}else{
							uni.navigateTo ({
								url: '/subPagesB/new_scripts/new_scripts',
								success: (re) => {
									let scriptsData={
										result:res.data.result,
										templateCode:this.templateCode,
										tags:this.originalData.label
									}
									re.eventChannel.emit('script', scriptsData)
								}
							});
						}
					},
					fail: (error) => {
						this.loadingValid=false
						console.error('Error:', error);
						let options = {};
						options.text = '生成失败';
						this.$refs.toast.show(options);
					},
				})
				// #endif
			},
			buttonClick2(){
				this.content.title=this.itemsData.title
				for(let i =0;i<this.itemsData.items.length;i++){
					this.content.scenes[i].description=this.itemsData.items[i].description
					this.content.scenes[i].narration=this.itemsData.items[i].narration
				}
				this.gptMessage.content=this.content
				
				// #ifdef !H5
				
				uni.request({
					url: configService.apiUrl+'/video/conversation/edit/message', 
					method: 'PUT',
					data: {
						gptMessage:this.gptMessage
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
					    console.log('messageResponse:', res.data);
						
					},
					fail: (error) => {
						this.loadingValid=false
						console.error('Error:', error);
						let options = {};
						options.text = '导入失败';
						this.$refs.toast.show(options);
					},
				})
				// #endif
				uni.navigateTo({
					url: '/subPages/new_shot/new_shot',
					success: (res) => {
						let scriptsData={
							itemsData:this.itemsData,
							gptConversationId:this.gptConversationId
						}
						res.eventChannel.emit('script', scriptsData)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ss{
		margin-top: 24rpx;
		height: 84rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.s{
		width: 320rpx;
		margin-left: 32rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		background-color: #F2F3F5;
	}
	.s1{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height:100%;
		width: 60rpx;
		border-right:1px solid #E5E6EB;
	}
	.s2{
		height:100%;
		width: 200rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		background-color: #F2F3F5;
	}
	.s3{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height:100%;
		width: 60rpx;
		border-left:1px solid #E5E6EB;
	}
	.view1{
		margin-top: 32rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		padding-top: 24rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		&__active {
			padding-bottom: 24rpx;
		}
	}
	.view11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		/* width: 100%; */
		color: #000000;
		margin-left: 72rpx;
		max-width: 558rpx;
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
		margin-bottom: 24rpx;;
	}
	.view233{
		
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 88rpx;
		height: 42rpx;
		margin-top: 2rpx;
		margin-left: 444rpx;
		margin-bottom: 32rpx;;
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
		height: 152rpx;
	}
	.view4{
		// width: 524rpx;
		width: 100%;
		margin-top: 10rpx;
		border: 1rpx solid #A0A2A3;
		padding: 5rpx;
	}
	.button1{
		margin-top: 48rpx;
		margin-left: 48rpx;
		border-radius: 8rpx;
		width: 306rpx;
		background-color: #ffffff;
		color:#A0A2A3;
		font-size:34rpx;
		border: 2rpx solid #A0A2A3;
		height: 80rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
	
	.button2{
		margin-top: 48rpx;
		margin-left: 24rpx;
		margin-right: 48rpx;
		border-radius: 8rpx;
		width: 306rpx;
		background-color: #543EE3;
		color:#ffffff;
		font-size:34rpx;
		height: 80rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	}
</style>


