<template>
	<view >
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		
		<view style="margin-bottom: 190rpx;letter-spacing:1rpx;">
			<view class="view1" :class="[itemsData.label.length == 0 && 'view1__active']">
				<view class="v11">
					<u--text :lines="1" :text=itemsData.title :bold="true" size="32rpx" color="#000000" align="center" ></u--text>
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
			<view v-for="(item, index) in itemsData.items"  :key="index" class="view2">
				<view class="view21">
					<view class="view211">
						<u--text :lines="1" :text="item.title" :bold="true" size="28rpx"  align="center" ></u--text>
					</view>
					<view v-if="item.content">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>内容</text>
							    </view>
							</u-col>							
							<u-col span="9.7" >
							    <view  class="view23">
									<u--text :text="item.content" size="28rpx" align="left"></u--text>
								</view>
							</u-col>	
						</u-row>
					</view>
					<!-- <view v-if="item.persona">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>人设</text>
							    </view>
							</u-col>
							<u-col span="9.7">
							    <view class="view23">
							    	<u--text :text="item.persona" size="28rpx" align="left"></u--text>						    
							    </view>
							</u-col>							
						</u-row>
					</view>
					<view v-if="item.note">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>笔记</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							   <view class="view23">
									<u--text  :text="item.note" size="28rpx" align="left"></u--text>
							   </view>	
							</u-col>	
						</u-row>
					</view> -->
					<view style="border-radius: 0 0 8rpx 8rpx;">
						<u-row>
							<u-col span="2.3">
							    <view class="view231" >
							    	<text>照片</text>
							    </view>
							</u-col>
							<u-col span="9.7" style="border-radius: 0 0 8rpx 8rpx;">
							   <view class="view23">
								
								   <view style="border-radius: 8rpx;">
									<u-upload
										:fileList="fileList[index]"
										@afterRead="afterRead($event,index)"
										@delete="deletePic($event,index)"
										:multiple="true"
										:maxCount="10"
										accept="image"
										uploadIcon="plus"
										uploadIconColor="#A0A2A3"
										uploadBackgroundColor="#F8F8F8"
									></u-upload>
									</view>
							   </view>	
							</u-col>	
						</u-row>
					</view>
				</view>	
			</view>	
			<view class="view3">
				<button class="button"  @click="buttonClick">
					导出
				</button>
			</view>
		</view>
		<view style="height: 1rpx;"></view>
		<view v-if="loadingValid">
			<fui-loading type="col" text="生成中" maskBgColor="rgba(0, 0, 0, 0.6)" isMask :isFixed="true"></fui-loading>
		</view>
	</view>
</template>

<script>
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
	import CryptoJS from './CryptoJS.min.js';
	export default {
		components:{
			fuiIcon,fuiTextarea,fuiLoading
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
				itemsData:null,
				fileList: [],
				loadingValid:false,
				gptConversationId:null,
				globalToken:null
			}
		},
		methods: {
			onLoad(){
				this.globalToken=this.$store.state.globalToken
			    const eventChannel = this.getOpenerEventChannel()     
			    eventChannel.on('copywriting', data => {
						this.itemsData=data.itemsData
						this.gptConversationId=data.gptConversationId
						console.log(data)
						for(var i=0;i<this.itemsData.items.length;i++){
							this.fileList.push([])
						}
			    })
			},
			buttonClick(){
				// uni.navigateTo({
				// 	url: '/subPages/new_video/new_video',
				// });
				let self=this
				uni.navigateTo ({
					url: '/subPages/new_photo/new_photo',
					success: (re) => {
						let te=""
						self.itemsData.items.forEach(function(item) {
							te = te + item.content
						})
						// for(let i=0;i<)
						let photoData={
							photoUrls:[].concat(...self.fileList),
							conversationId: self.gptConversationId,
							text: te,
							type:'image'
						}
						re.eventChannel.emit('photoData', photoData)
					}
				});
			},
			deletePic(event,index) {
				this.fileList[index].splice(event.index, 1)
			},
			async afterRead(event,index) {
				console.log(1111)
				console.log(event.file)
				console.log(11111)
					// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
					let lists = [].concat(event.file)
					let fileListLen = this.fileList[index].length
					lists.map((item) => {
						this.fileList[index].push({
							...item,
							status: 'uploading',
							message: '上传中'
						})
					})	
					for (let i = 0; i < lists.length; i++) {
						console.log(1111)
						console.log(lists[i].url)
						const result = await this.uploadFilePromise(lists[i].url,index)
						console.log(result)
						let item = this.fileList[index][fileListLen]
						this.fileList[index].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result
					}))
					fileListLen++
				}
			},
			encode : function (input) {
			    var output = "";
			    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			    var i = 0;
			    input = this.utf8_encode(input);		
			    while (i < input.length) {
			        chr1 = input.charCodeAt(i++);
			        chr2 = input.charCodeAt(i++);
			        chr3 = input.charCodeAt(i++);		
			        enc1 = chr1 >> 2;
			        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			        enc4 = chr3 & 63;
			        if (isNaN(chr2)) {
			            enc3 = enc4 = 64;
			        } else if (isNaN(chr3)) {
			            enc4 = 64;
			        }
					output = output +
			        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(enc1) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(enc2) +
			        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(enc3) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(enc4);
			    }
			    return output;
			},
			utf8_encode : function (string) {
			    string = string.replace(/\r\n/g,"\n");
			    var utftext = "";
			    for (var n = 0; n < string.length; n++) {
			        var c = string.charCodeAt(n);			
			        if (c < 128) {
			            utftext += String.fromCharCode(c);
			        }
			        else if((c > 127) && (c < 2048)) {
			            utftext += String.fromCharCode((c >> 6) | 192);
			            utftext += String.fromCharCode((c & 63) | 128);
			        }
			        else {
			            utftext += String.fromCharCode((c >> 12) | 224);
			            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			            utftext += String.fromCharCode((c & 63) | 128);
			        }
			    }
			    return utftext;
			},
			uploadFilePromise(url,index) {
				return new Promise((resolve, reject) => {
					let Imgsrc = url;
					let fileName ='produce/'+this.gptConversationId+'/'+index+'.jpg'
					let host='https://yanbi-resources.oss-cn-shanghai.aliyuncs.com'
					uni.request({
						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/sys/oss/sts/get', //请求后台签名地址。
						method: 'GET',
						data: { // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 后面
							durationSeconds: 2000,
						},
						header: {
						    'X-Access-Token': this.globalToken,
						},
						success: (res) =>  {
							var data = res.data.result.credentials;
							console.log(data)
							const date = new Date();
							date.setHours(date.getHours() + 1);
							var policyText = {
							    "expiration":  date.toISOString(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
								"conditions": [
								["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
								]
							};
							var accesskey=data.accessKeySecret
							var policyBase64 = this.encode(JSON.stringify(policyText))
							var message = policyBase64
							// var bytes = CryptoJS.AES.encrypt(CryptoJS.SHA1, message, accesskey, { asBytes: true }) ;
							var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(message, accesskey));
							console.log(signature)
							uni.uploadFile({
								url: host, //后台返回的阿里云存储的上传地址
								filePath: Imgsrc,
								fileType: "image",
								name: 'file',
								formData: {
									key: 'produce/'+this.gptConversationId+'/'+index+'.jpg', //文件名
									policy: policyBase64,
									OSSAccessKeyId: data.accessKeyId, //后台获取临时ID
									signature: signature ,//后台获取签名
									success_action_status: '200', //让服务端返回200,不然，默认会返回204
									'x-oss-security-token': data.securityToken,
								},
								success: res => {
									uni.hideLoading();
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 2000
									});
									resolve(host+'/'+fileName) // 返回保存在阿里oss上的地址
								},
								fail: err => {
									reject(err)
									uni.hideLoading();
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							});
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view1{
		margin-top: 32rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		padding-top: 24rpx;
		&__active {
			padding-bottom: 24rpx;
		}
	}
	.v11{
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		width: 100%;
		height: 96rpx;
		color: #000000;
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
		margin-top: 48rpx;
		border-radius: 8rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
	}
	.view21{
		z-index: 1;
		position: relative;
	}
	.view211{
		height: 80rpx;
		background-color: #FCF5FF;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		border-radius: 8rpx 8rpx 0 0;
	}
	.view23{
		padding-top:24rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-bottom: 24rpx;
		
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


