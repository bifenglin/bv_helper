<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		<scroll-view  style="margin-bottom: 214rpx;">
		<view class="view1">
			
				<uni-icons type="bars" size="14" color="#543EE3" ></uni-icons>
			
			<view style="margin-left: 16rpx; font-size: 28rpx;width: 550rpx;">
				<text>{{index>-1?picker[index]:'脚本类型'}}</text>
			</view>
			<!-- <view style="margin-left: 16rpx;" @click="show = true">
				<uni-icons type="bottom" size="18" color="#543EE3" ></uni-icons>
			</view>
			<u-picker :show="show" :columns="columns" @cancel="cancel" @confirm="confirm" confirmColor="#543EE3">
				
			</u-picker> -->
			<picker mode = "selector" @change="pickerChange" :value="index" :range="picker" >
				<view style="margin-left: 16rpx;">
					<uni-icons type="bottom" size="18" color="#543EE3" ></uni-icons>
				</view>
			</picker>
		</view>
		<view class="view2">
			<view style="width: 302rpx;display: flex;">
				<view style="font-size: 28rpx;">
					<text>分镜数量</text>
				</view>
				<view style="font-size: 28rpx;color:#A0A2A3;">
					<text> （选填）</text>
				</view>
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
		<view class="view3">
			<view class="view31">
			</view>
			<view class="view32">
				<text>脚本口令</text>
			</view>
		</view>
		<view class="view4">
			<fui-textarea placeholder="请输入内容......" :fixed="true"  counterSize="24rpx"  
			 maxlength=-1  v-model="textarea" borderColor="#000000" isCounter 
			 height="184rpx" :padding="['0rpx', '0rpx',]" counterColor="#A0A2A3"
			 placeholderStyle="color:#707376;font-size: 30rpx" size="30"
			 :borderTop="false" :borderBottom="false"></fui-textarea>
		</view>
		<!-- <view class="view5" :style="{'padding-bottom':selectedLabels==''?'8rpx':''}"> -->
		<view class="view5">
			<view class="max">
			<view class="view51">
				<view v-for="(item, index) in selectedLabels" :key="index">
					<view class="view511" :style="{'border':'3rpx solid'+item.borderColor,'background-color':item.color}">
						<view class="view5111">
							<text>{{item.title}}</text>
						</view>
						<view class="view5112" @click="selectedLabelDelete(index)">
							<uni-icons type="closeempty" size="12" color="#1D2129" ></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="view512">
					<fui-textarea :fixed="true"  counterSize="24rpx"
					 maxlength=-1  v-model="labelValue"   
					 :padding="['0rpx', '0rpx']" height="48rpx"
					 size="36" :borderTop="false" :borderBottom="false"
					 autoHeight @focus="inputFocus" @blur="inputBlur" ></fui-textarea>
			</view>
			</view>
			<view v-if="cleanTrue" class="view53" @click="clean">
				<uni-icons type="closeempty" size="14" color="#4E5969" height="56rpx" border="none"></uni-icons>
			</view>
			<view v-else class="view531" @click="setLabel">
				<text>确定</text>
			</view>
		</view>
		</scroll-view >
		<view class="view6">
			<view v-if="buttonValid">
				<button class="button1"  @click="buttonClick">		
						一键生成
				</button>
			</view>
			<view v-else>
				<button class="button2"  @click="buttonClick1">
				    一键生成
				</button>
			</view>
		</view>
		<fui-toast ref="toast"></fui-toast>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	export default {
		components:{
			fuiToast,fuiTextarea
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
				show: false,
				statusBarHeight:0,
				text:"脚本类型",
				index: -1,
				textarea:"",
				labelValue:"",
				labelNumber:0,
				cleanTrue:true,
				storyboardValue:6,
				buttonValid:false,
				selectedLabels:[
					
				],
				picker: ['旅游', '带货', '美食','美妆'],
				
			}
		},
		watch:{
			index(){
				if(this.index==-1){
					this.buttonValid=false;
				}else if(this.textarea!=''){
					this.buttonValid=true;
				}
			},
			
			textarea(){
				if(this.textarea==''){
					this.buttonValid=false;
				}else if(this.index!=-1){
					this.buttonValid=true;
				}
			}
		},
		// #ifdef !H5
		beforeMount() {	
			 this.statusBarHeight =  uni.getSystemInfoSync().statusBarHeight
			 console.log(this.statusBarHeight)
		  },
		  // #endif
		  onLoad:function(){
		  	console.log(this.$store.state.globalToken)
		  },
		methods: {
			inputVal(e){
				let temp = e.replace(/[^0-9]+/g,'')
				this.$nextTick(()=>{
					this.storyboardValue=temp
					// if(e==''){
					// 	this.storyboardValue=6
					// }
				})
			},
			pickerChange(e){
				this.index = e.detail.value				
			},
			
			confirm(e) {
				console.log('confirm', e.value[0]);
				this.text = e.value[0]
				console.log(this.text);
				this.show= false
			},
			cancel() {
				this.show= false
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
			selectedLabelDelete(index){
				this.selectedLabels.splice(index, 1)
			},
			clean(){
				this.selectedLabels=[]
				this.labelValue=''
			},
			inputFocus(){
				this.cleanTrue=false
			},
			inputBlur(){
				
			},
			setLabel(){
				let item={}
				if(this.labelNumber%2==0){
					item=
						{
							title:this.labelValue,
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						}
				}else{
					item=
						{
							title:this.labelValue,
							color:"#C7FFD8",
							borderColor:"#9CD2AD"
						}
				}
				this.selectedLabels.push(item)
				this.cleanTrue=true
				this.labelValue=''
				this.labelNumber++;
			},
			buttonClick(){
				uni.navigateTo({
					url: '/subPagesB/new_scripts/new_scripts',
				});
			},
			// uni.request({
			//   url: 'https://example.com/api/data', // 请求的 URL
			//   method: 'GET', // 请求方法，可以是 'GET'、'POST' 等
			//   data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
			//     key1: 'value1',
			//     key2: 'value2',
			//   },
			//   header: { // 请求头，可以设置各种自定义的请求头信息
			//     'Content-Type': 'application/json',
			//     'Authorization': 'Bearer YourAccessToken',
			//   },
			//   success: (res) => {
			//     // 请求成功的回调函数
			//     console.log(res.data); // 服务端返回的数据
			//   },
			//   fail: (err) => {
			//     // 请求失败的回调函数
			//     console.error(err);
			//   },
			// });
			// uni.request({
			// 	url: '/jeecg-boot/gpt/jiaoben/add', 
			// 	method: 'POST',
			// 	data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
			// 		message: this.textarea,
					
			// 	},
			// })
			buttonClick1(){
				let options = {};
				if(this.index==-1){					
					options.text = '请选择脚本类型';
					this.$refs.toast.show(options);
				}else if(this.textarea==''){
					options.text = '请输入脚本口令';
					this.$refs.toast.show(options);
				}
				this.$refs.toast.show(options);
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
	  background-color: #f8f8f8; /* 设置为你想要的背景颜色值 */
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
	.image{
		width: 18rpx;
		height: 18rpx;
		padding:18rpx
	}
	.image1{
		width: 36rpx;
		height: 36rpx;
	}
	.view1{
		margin-top: 32rpx;
		height: 84rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
		padding: 24rpx;
	}
	.view2{
		margin-top: 24rpx;
		height: 84rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.view3{
		margin-top: 24rpx;
		height: 84rpx;
		background-color: #ffffff;
		border-radius: 8rpx 8rpx 0 0;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
		padding: 24rpx;
	}
	.view31{
		height: 36rpx;
		width: 8rpx;
		border-radius: 2rpx;
		background-color: #543EE3;
		font-size: 30rpx
	}
	.view32{
		font-size: 32rpx;
		margin-left: 12rpx;
		font-weight: bold;	
	}
	.view4{
		margin-top: 2rpx;
		height: 280rpx;
		background-color: #ffffff;
		border-radius: 0 0 8rpx 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.view5{
		margin-top: 24rpx;
		min-height: 72rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
		padding: 8rpx 24rpx 8rpx 8rpx;
		border: 3rpx solid #543EE3;
	}
	.view51{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		max-width: 596rpx;
		min-width: 596rpx;
	}
	.view511{
		height: 56rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		padding: 6rpx 16rpx;
		margin-right: 8rpx;
		border-radius: 6rpx;
		margin-bottom: 8rpx;
	}
	.view5111{
		font-size: 28rpx;
		font-weight: bold;
		color: #1D2129;
	}
	.view5112{
		margin-left: 8rpx;
	}
	.view512{
		max-width: 596rpx;
		min-width: 596rpx;
	}
	.view53{
		margin-left: 35rpx;
	}
	.view531{
		margin-left: 20rpx;
		font-size: 20rpx;	
	}
	.max{
	
		
	}
	.button1{
		border-radius: 8rpx;
		background-color: #543EE3;
		color:#ffffff;
		font-size:34rpx;
	}
	.button2{
		border-radius: 8rpx;
		background-color: #543EE3;
		opacity: 0.8;
		color:#ffffff;
		font-size:34rpx;
	}
	.view6{
		background-color: #ffffff;
		height: 190rpx;
		width: 100%;
		padding-left: 48rpx;
		padding-right: 48rpx;
		padding-top: 38rpx;
		position: fixed;
		bottom: 0;	
	}
</style>
