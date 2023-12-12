<template>
	<view>
		
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar
					 @clickLeft="back" />
		
		
		<scroll-view  :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''"  >
			<view style="margin:3.2% ">
			<view v-if="(items.scenery&&items.type)||items.screenDescription||items.signature||items.narration">
				<view >	
				<view style="margin-bottom:2.2% ;">
				<fui-row>
					<fui-col :span="8">
						<view class="fui-col__item" >
							<view class="tag">
								{{'镜头'+index}}
							</view>
						</view>						
					</fui-col>
					<fui-col :span="8">
						<view class="fui-col__item ">
							<view class="tag">
								{{items.scenery}}
							</view>
						</view>
					</fui-col>
					<fui-col :span="8">
						<view class="fui-col__item ">
							<view class="tag">
								{{items.type}}
							</view>
						</view>
					</fui-col>
				</fui-row>
				</view>
				<view v-if="items.screenDescription">
				<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;">
				                        	<text>画面描述</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{items.screenDescription}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
				<view v-if="items.narration">
					<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;">
				                        	<text>旁白</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{items.narration}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
				<view v-if="items.signature">
					<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;">
				                        	<text>花字</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class="padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">{{items.signature}}</view>
				                    </u-col>
				                </u-row>
				</view>
				</view>
			
				<view style="background-color: #ffffff; margin-top:7.5rpx;">
				<u-row >
				                    <u-col span="4">
				                        <view class="padding"  style="text-align: center;">
				                        	<text>视频</text>
				                        </view>
				                    </u-col>
				                    <u-col span="8">
				                        <view class=" padding" style="border-left: 1px solid #CCCCCC ;min-height: 98upx;">
				                        <u-upload
				                        	:fileList="fileList"
				                        	@afterRead="afterRead"
				                        	@delete="deletePic"
				                        	
				                        	:multiple="true"
				                        	:maxCount="10"
				                        	accept="video"
				                        ></u-upload>
				                        </view>
				                    </u-col>
				                </u-row>
				</view>
			
				
			
			
			
			<view v-if="current==itemLen">
				<view class="aaa">
				<fui-button background="#0fa3fa" color="white" borderColor="#0fa3fa" radius="0" @click="buttonClick" style="margin-bottom:3.2%;margin-top:3.2%;">生成视频</fui-button>
				</view>
			</view>
			<view class="aaa">
				<fui-pagination :total="itemLen" pageSize="1" :pageType="2" activeBgColor="#0fa3fa" @change="pageChange" >></fui-pagination>
			</view>
			</view>
			</view>
			<view v-else>
				<view class="nothing">
				<u-empty
				       text="未填写脚本"
				        icon="/static/icon/nothing.png"
						width="300"
						height="300"
						textSize="20"
				>
				</u-empty>
				
				</view>
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
	import upload from './upload.js' 
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
				current:1,
				contentHeight: 0, // 内容区域的高度
				videos:[],
				imageValue:null,
				fileList: [],
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
			back() {
							uni.navigateBack({
								delta: 1
							})
						},
			pageChange(e){
				
				this.index=e["current"]
				this.items=this.scripts[e["current"]-1]
				this.current=e["current"]
				
				},
			buttonClick(){
				uni.navigateTo({
					url: '/subPages/video/video',
				});
			},
			checkPaginationVisibility() {
     
				const content = uni.createSelectorQuery().select('.scroll-view');
				
				content.boundingClientRect((data) => {
					
					this.contentHeight = data.height;
				}).exec();
			},
			// 删除图片
			deletePic(event) {
				this[`fileList`].splice(event.index, 1)
			},
						// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList`].length
				lists.map((item) => {
					this[`fileList`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})	
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList`][fileListLen]
					this[`fileList`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
				}))
				fileListLen++
			}
		},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: '', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
				buttonClick1(){
					  uni.reLaunch({
						  url: '/pages/index/index',
					  })
				}	
			
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
	.aaa{margin-top:3.2%;}
	.nothing{
		margin-top: 30%;
		
	}
	.button{
		margin-top: 3.2%;
	}
</style>
