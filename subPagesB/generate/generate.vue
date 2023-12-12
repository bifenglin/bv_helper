<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''" >
			<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
						 @clickLeft="back" />
			<view style="margin:3.2% ;">
				
				<view class="cu-form-group" >	
					<view class="title">脚本类型</view>
				
					<picker mode = "selector" @change="pickerChange" :value="index" :range="picker" >
						<view style="display: flex;text-align: right;align-items: right;
		justify-content: flex-end; font-size: 28upx;"> 
							{{index>-1?picker[index]:'选择类型'}}
							<u-icon name="arrow-right"></u-icon>
							</view>
					</picker>
					
				</view>
				
				<view class="cu-form-group flex " style="margin-top: 3.2%;">
						<view class="title" >分镜数量</view>
						
						<view class="flex-twice margin-xs radius" style="text-align: right;">
							<view v-if="seen" >
								<view >
									<text  style="color: grey; font-size: 28rpx;">请输入100内的整数</text>
								</view>
							</view>
							<view v-else><text style="color: red; font-size: 28rpx;">输入错误</text></view>
						</view>
						
						<view class="flex-sub margin-xs radius" style="text-align: right;">
						<view v-if="seen" >
							<input placeholder="选填" type="number"  :style="inputFieldStyles"   maxlength=3 v-model="StoryboardValue" @input="inputChange"></input>	
						</view>
							<view v-else><input placeholder="选填" type="number"  :style="inputFieldStyles"   maxlength=3 v-model="StoryboardValue" @input="inputChange"></input>	</view>
						</view>
					
				</view> 
				<view style="margin-top: 3.2%">
					<fui-textarea placeholder="请输入内容"  maxlength=-1  v-model="text"  isCounter height="550rpx"></fui-textarea>
				</view>
				<view style="margin-top: 3.2%">
					<view v-if="buttonValid">
						<button class="cu-btn block bg-blue margin-tb-sm lg"  @click="buttonClick">
							<view v-if="generate" >
								一键生成脚本
							</view>
							<view v-else>
								<text class="cuIcon-loading2 cuIconfont-spin"></text>生成中
							</view>
						</button>
					</view>
					<view v-else>
						<button class="cu-btn block bg-grey margin-tb-sm lg"  @click="buttonClick1">
						    一键生成脚本
						</button>
					</view>
				</view>
				<fui-toast ref="toast"></fui-toast>
					
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	export default {
		components:{
			fuiTextarea,fuiToast,
		},
		data() {
			return {
				modalName: null,
				index: -1,
				picker: ['推荐景点', '带货', '其他'],
				input:-1,
				
				inputFieldStyles:{
					border: '1px solid grey',
					smarginLeft: 'auto',
					width: '80%',
					textAlign:'center',
				},
				StoryboardValue:"",
				
				seen:true,
				maxValue: 100,
				text:'',
				generate:true,
				buttonValid:false,
				
			}
		},
		watch:{
			index(){
				if(this.index==-1){
					this.buttonValid=false;
				}else if(this.seen==true&&this.text!=''){
					this.buttonValid=true;
				}
			},
			seen(){
				if(this.seen==false){
					this.buttonValid=false;
				}else if(this.index!=-1&&this.text!=''){
					this.buttonValid=true;
				}
			},
			text(){
				if(this.text==''){
					this.buttonValid=false;
				}else if(this.index!=-1&&this.seen==true){
					this.buttonValid=true;
				}
			}
		},
		methods: {
			back() {
							uni.navigateBack({
								delta: 1
							})
						},
			pickerChange(e){
				this.index = e.detail.value				
			},
			inputChange(){
				let value=this.StoryboardValue
				console.log(value)
				if(/\./.test(value)||value<0||value>=this.maxValue||/[a-zA-Z]/.test(value)){
					this.inputFieldStyles.border = '2px solid red';
					this.seen=false;
				}else if(value==''){
					this.inputFieldStyles.border = '1px solid grey';
					this.seen=true;
				}else{
					this.inputFieldStyles.border = '2px solid green';
					this.seen=true;
				}
				
			},
			buttonClick(){
				this.generate=false;
				let formData={
					'type':this.picker[this.index],
					'StoryboardValue':this.StoryboardValue,
					'description':this.text
				}
				uni.request({
				    url: 'http://106.14.35.229:8080/jeecg-boot/gpt/jiaoben/add', 
				    data: {
				        createBy: 1,
						type: "C304",
				    },
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data.message);
						console.log(res.data.code);
						console.log('request success');
						uni.navigateTo({
							url: '/subPagesB/scripts/scripts',
							events:{
								 success: function(res) {
								    // 通过eventChannel向被打开页面传送数据
								    res.eventChannel.emit('acceptDataFromOpenerPage', { data: formData })
								  }
							}
						});
				    },
					fail: (err) => {
						console.error('请求失败', err);
					}
				});	
			},
			buttonClick1(){
				let options = {};
				if(this.index==-1){					
					options.text = '请选择脚本类型';
					this.$refs.toast.show(options);
				}else if(this.seen==false){
					options.text = '请正确输入分镜数量';
					this.$refs.toast.show(options);
				}else if(this.text==''){
					options.text = '请输入描述内容';
					this.$refs.toast.show(options);
				}
				this.$refs.toast.show(options);
			},
			
			change(e) {
							// console.log('change', e);
						},confirm(e) {
				// console.log('confirm', e);
				this[`show${this.index}`] = false
			},
			cancel() {
				// console.log('cancel');
				this[`show${this.index}`] = false
			}
			
		}
	}
</script>

<style>

</style>

