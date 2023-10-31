<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="backText">查看视频</block>
			<block @click="back"></block>
		</cu-custom>
		
		<view style="margin:3.2% ">
			<video style="width: 100%;"></video>
			<fui-button background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="0" @click="buttonClick" style="margin-bottom:3.2%;margin-top:3.2%;">保存至本地</fui-button>
			<fui-button background="#fff" color="#0fa3fa" borderColor="#0fa3fa"  radius="0" @click="buttonClick1" style="margin-bottom:3.2%;margin-top:1%;">返回首页</fui-button>
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
			buttonClick(){
				
			},
			buttonClick1(){
				  uni.reLaunch({
					  url: '/pages/home/home',
				  })
			}
		}
	}
</script>

<style>

</style>
