<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
					 @clickLeft="back" />
		
		<view style="margin:3.2% ">
			<video style="width: 100%;"></video>
			<view class="button">
			<fui-button background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="0" @click="buttonClick" >保存至本地</fui-button>
			</view>
			<view class="button">
			<fui-button background="#fff" color="#0fa3fa" borderColor="#0fa3fa"  radius="0" @click="buttonClick1" >返回首页</fui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	export default {
		components:{
			fuiButton
		},
		data() {
			return {
				
			}
		},
		methods: {
			back() {
							uni.navigateBack({
								delta: 1
							})
						},
			buttonClick(){
				
			},
			buttonClick1(){
				  uni.reLaunch({
					  url: '/pages/index/index',
				  })
			}
		}
	}
</script>

<style >
.button{
	margin-top: 3.2%;
}
</style>
