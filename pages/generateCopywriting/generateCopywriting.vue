<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''" >
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">AI文案</block>
			</cu-custom>
			<view style="margin-left:3.2% ;margin-right:3.2%;">
			<form >		
				<view class="cu-form-group" style="margin-top: 3.2%;">	
					<view class="title">文案类型</view>
					<picker @change="pickerChange" :value="index" :range="picker" >
						<view class="picker">
							{{index>-1?picker[index]:'选择类型'}}
						</view>
					</picker>
				</view>
				
				<view style="margin-top: 3.2%">
					<fui-textarea placeholder="请输入内容"  maxlength=-1  v-model="text"  isCounter height="550rpx"></fui-textarea>
				</view>
				<view style="margin-top: 3.2%">
					<view v-if="buttonValid">
						<button class="cu-btn block bg-blue margin-tb-sm lg"  @click="buttonClick">
							<view v-if="generate" >
								一键生成文案
							</view>
							<view v-else>
								<text class="cuIcon-loading2 cuIconfont-spin"></text>生成中
							</view>
						</button>
					</view>
					<view v-else>
						<button class="cu-btn block bg-grey margin-tb-sm lg"  @click="buttonClick1">
						    一键生成文案
						</button>
					</view>
				</view>
				<fui-toast ref="toast"></fui-toast>
			</form>		
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
				
			
				StoryboardValue:"",
				
				
				
				text:'',
				generate:true,
				buttonValid:false,
			}
		},
		watch:{
			index(){
				if(this.index==-1){
					this.buttonValid=false;
				}else if(this.text!=''){
					this.buttonValid=true;
				}
			},
			
			text(){
				if(this.text==''){
					this.buttonValid=false;
				}else if(this.index!=-1){
					this.buttonValid=true;
				}
			}
		},
		methods: {
			pickerChange(e){
				this.index = e.detail.value				
			},
			
			buttonClick(){
				this.generate=false;
				let formData={
					'type':this.picker[this.index],
					'StoryboardValue':this.StoryboardValue,
					'description':this.text
				}
				console.log(formData);
				uni.navigateTo({
					url: '/pages/copywriting/copywriting',
					events:{
						 success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('acceptDataFromOpenerPage', { data: formData })
						  }
					}
				});
				
				
			},
			buttonClick1(){
				let options = {};
				if(this.index==-1){					
					options.text = '请选择文案类型';
				}
				else if(this.text==''){
					options.text = '请输入描述内容';
				}
				this.$refs.toast.show(options);
			},
			
			
		}
	}
</script>

<style>

</style>

