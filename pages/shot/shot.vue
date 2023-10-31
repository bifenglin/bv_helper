<template>
	<view>
		
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="backText">拍摄</block>
			<block @click="back"></block>
		</cu-custom>
		
		
		<scroll-view  :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''"  >
			<view style="margin:3.2% ">
			<view v-if="items">
				<view >	
				<fui-row>
					<fui-col :span="8">
						<view class="fui-col__item" ><fui-tag :text="'镜头'+index" background="#0fa3fa" color="#fff" style="width: 100%;"></fui-tag></view>						
					</fui-col>
					<fui-col :span="8">
						<view class="fui-col__item "><fui-tag :text="items.scenery" background="#0fa3fa" color="#fff" style="width: 100%;"></fui-tag></view>
					</fui-col>
					<fui-col :span="8">
						<view class="fui-col__item "><fui-tag :text="items.type" background="#0fa3fa" color="#fff" style="width: 100%;"></fui-tag></view>
					</fui-col>
				</fui-row>
				<view v-if="items.screenDescription">
				<fui-row style="background-color: white; margin-top: 1%;">
					<fui-col :span="8">
						<view class="padding"  style="text-align: center;">
							<text>画面描述</text>
						</view>
					</fui-col>
					<fui-col :span="16">
						<view class="padding" style="border-left: 1px solid #CCCCCC;min-height: 98upx;">{{items.screenDescription}}</view>
					</fui-col>
				</fui-row>
				</view>
				<view v-if="items.narration">
				<fui-row style="background-color: white; margin-top: 1%;">
					<fui-col :span="8">
						
						<view class=" padding"  style="text-align: center;">
							<text>旁白</text>
						</view>
					</fui-col>
					<fui-col :span="16">
						<view class=" padding" style="border-left: 1px solid #CCCCCC;min-height: 98upx;">{{items.narration}}
						</view>
					</fui-col>
				</fui-row>
				</view>
				<view v-if="items.signature">
				<fui-row style="background-color: white; margin-top: 1%;">
					
					<fui-col :span="8">
						<view class=" padding"  style="text-align: center;">
							<text>花字</text>
						</view>
					</fui-col>
					<fui-col :span="16">
						<view class=" padding" style="border-left: 1px solid #CCCCCC;min-height: 98upx;">{{items.signature}}
						</view>
					</fui-col>
				</fui-row>	
				<fui-row style="background-color: white; margin-top: 1%;">
					
					<fui-col :span="8">
						
						<view class=" padding"  style="text-align: center;">
							<text>视频</text>
						
						</view>
					</fui-col>
					<fui-col :span="16">
						
						<view class=" padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">
						<view v-if="videos[current]">
							<video style="height: 298upx;width: 410upx;" ></video>
						</view>
						<view v-else>
							<video style="height: 298upx;width: 410upx;" ></video>
							请上传视频
							<uni-file-picker 
								v-model="imageValue"  
								file-mediatype="image"
								mode="grid"
								file-extname="png,jpg"
								:limit="1"
								style="height: 298upx;width: 410upx;"
							/>
							
						</view>
						</view>
					</fui-col>
				</fui-row>	
				</view>
			</view>
			</view>
				
			<view v-if="current==itemLen">
				<fui-button background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="0" @click="buttonClick" style="margin-bottom:3.2%;margin-top:3.2%;">生成视频</fui-button>
			</view>
			<view class="aaa">
				<fui-pagination :total="itemLen" pageSize="1" :pageType="2" activeBgColor="#0fa3fa" @change="pageChange" style="margin-top:3.2%;">></fui-pagination>
			</view>
			</view>
			
		</scroll-view>
		
		
	</view>
</template>

<script>
	import fuiPagination from "@/components/firstui/fui-pagination/fui-pagination.vue"
	import fuiSection from "@/components/firstui/fui-section/fui-section.vue"
	import fuiDivider from "@/components/firstui/fui-divider/fui-divider.vue"
	import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
	import fuiRow from "@/components/firstui/fui-row/fui-row.vue"
	import fuiCol from "@/components/firstui/fui-col/fui-col.vue"
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	
	export default {
		components:{
			fuiPagination,fuiSection,fuiDivider,fuiTag,fuiRow,fuiCol,fuiButton
		},
		data() {
			return {
				modalName: null,
				scripts:null,
				items:[],
				index:1,
				itemLen:0,
				current:0,
				contentHeight: 0, // 内容区域的高度
				videos:[],
				imageValue:null
			}
		},
		methods: {
			onLoad(){  
			    const eventChannel = this.getOpenerEventChannel()
			     
			    eventChannel.on('script', data => {
					  this.scripts=data 	  
			    })
				this.items=this.scripts[0]
				this.itemLen=this.scripts.length
				
				
			},
			pageChange(e){
				
				this.index=e["current"]
				this.items=this.scripts[e["current"]-1]
				this.current=e["current"]
				
				},
			buttonClick(){
				uni.navigateTo({
					url: '/pages/video/video',
				});
			},
			checkPaginationVisibility() {
     
				const content = uni.createSelectorQuery().select('.scroll-view');
				
				content.boundingClientRect((data) => {
					
					this.contentHeight = data.height;
				}).exec();
			},
		}
	}
</script>

<style>

</style>
