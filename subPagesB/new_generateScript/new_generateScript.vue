<template>
	<view class="container" style="background-color: #f8f8f8;height: 100vh;">
		<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" status-bar
					 @clickLeft="back" />
		<view style="margin-bottom: 214rpx;">
		<view class="view1">
			<!-- <view class="view11">
				<image src="/static/icon/list.png" class="view11"></image>
			</view> -->
			<uni-icons type="bars" size="14" color="#543EE3" ></uni-icons>
			
			<view class="view12">
				<text>{{sc?sc:'短视频赛道'}}</text>
			</view>
			<!-- <picker @change="pickerChange" :value="index" :range="picker" range-key="name">
				<view style="margin-left: 16rpx;">
					<uni-icons type="bottom" size="18" color="#543EE3" ></uni-icons>
				</view>
			</picker> -->
			<view style="margin-left: 16rpx;" @click="pickerSelect">
				<uni-icons type="bottom" size="18" color="#543EE3" ></uni-icons>
			</view>
			
		</view>
		<view v-if="locationValid" class="view2">
		<!-- <view v-if="false" class="view2"> -->
			<!-- <view class="view11">
				<image src="/static/icon/list.png" class="view11"></image>
			</view> -->
			
			<image v-if="ts==='推荐地区'" src="/static/icon/location.png" style="height: 32rpx;width: 32rpx;"></image>
			<uni-icons v-else type="star" size="16" color="#543EE3" style="margin: 0;"></uni-icons>
			<view class="view12">
				<text>{{s?s:ts}}</text>
			</view>
			<view style="margin-left: 16rpx;" @click="locationSelect">
				<uni-icons type="bottom" size="18" color="#543EE3" ></uni-icons>
			</view>
		</view>
		<view class="view2">
			<view style="width: 302rpx;display: flex;">
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
		<view class="view3">
			<view class="view31">
			</view>
			<view class="view32">
				<text>短视频简短描述</text>
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
		<view class="view7">
			<view class="view71"></view>
			<view class="view72">
				<text>
					人设
				</text>
			</view>
			<view class="view73">
				<text>
					（选填）
				</text>
			</view>
		</view>
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
			<fui-dropdown-menu  selectedColor="#543EE3"   size="28"
			minWidth="596"  lineColor="#543EE3" :isCheckbox="false" :options="list" 
			@click="rangeItemClick" @close="rangeClose" ref="ddmRange">
				<view class="view512">
						<fui-textarea :fixed="true"  counterSize="24rpx"
						 maxlength=-1  v-model="labelValue"   
						 :padding="['0rpx', '0rpx']" height="44rpx"
						 size="28" :borderTop="false" :borderBottom="false"
						 autoHeight @focus="inputFocus" @blur="inputBlur" ></fui-textarea>
				</view>
			</fui-dropdown-menu>
		
			</view>
			<view v-if="cleanTrue" class="view53" @click="clean">
				<uni-icons type="closeempty" size="14" color="#4E5969" height="56rpx" border="none"></uni-icons>
			</view>
			<view v-else class="view531" @click="setLabel">
				<text>确定</text>
			</view>
		</view>
		<view class="view7">
			<view class="view71"></view>
			<view class="view72">
				<text>
					口吻
				</text>
			</view>
			<view class="view73">
				<text>
					（选填）
				</text>
			</view>
		</view>
		<view class="view5">
			<view class="max">
			<view class="view51">
				<view v-for="(item, index) in selectedLabels1" :key="index">
					<view class="view511" :style="{'border':'3rpx solid'+item.borderColor,'background-color':item.color}">
						<view class="view5111">
							<text>{{item.title}}</text>
						</view>
						<view class="view5112" @click="selectedLabelDelete1(index)">
							<uni-icons type="closeempty" size="12" color="#1D2129" ></uni-icons>
						</view>
					</view>
				</view>
			</view>
			
			
			<fui-dropdown-menu  selectedColor="#543EE3"   size="28"
			minWidth="596"  lineColor="#543EE3" :isCheckbox="false" :options="list1" 
			@click="rangeItemClick1" @close="rangeClose1" ref="ddmRange1">
				<view class="view512">
						<fui-textarea :fixed="true"  counterSize="24rpx"
						 maxlength=-1  v-model="labelValue1"   
						 :padding="['0rpx', '0rpx']" height="44rpx"
						 size="28" :borderTop="false" :borderBottom="false"
						 autoHeight @focus="inputFocus1" @blur="inputBlur1" ></fui-textarea>
				</view>
			</fui-dropdown-menu>
			
			</view>
			<view v-if="cleanTrue1" class="view53" @click="clean1">
				<uni-icons type="closeempty" size="14" color="#4E5969" height="56rpx" border="none"></uni-icons>
			</view>
			<view v-else class="view531" @click="setLabel1">
				<text>确定</text>
			</view>
		</view>
		
		</view >
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
		<view v-if="loadingValid">
			<fui-loading type="col" maskBgColor="rgba(0, 0, 0, 0.6)" text="生成中" isMask :isFixed="true"></fui-loading>
		</view>
		<u-picker :show="locationShow" ref="uPicker" cancelColor="#11161A" confirmColor="#543EE3" :defaultIndex="[0,0,0]" 
		:columns="columns" @cancel="locationCancel" @confirm="locationConfirm" 
		@change="locationChangeHandler($event)"></u-picker>
		<u-picker :show="pickerShow" ref="uPicker1"  :columns="picker" cancelColor="#11161A" confirmColor="#543EE3"  keyName="name" @cancel="pickerCancel" @confirm="pickerConfirm"
		@change="pickerChange($event)"></u-picker>
		<u-picker :show="specialtyShow" ref="uPickerSpecialty" cancelColor="#11161A" confirmColor="#543EE3" :defaultIndex="[0,0,0]" 
		:columns="specialtyColumns" @cancel="specialtyCancel" @confirm="specialtyConfirm"
		@change="specialtyChangeHandler($event)"></u-picker>
		
	</view>
</template>

<script>
	import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
	import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
	import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
	import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
	export default {
		components:{
			fuiToast,fuiTextarea,fuiLoading,fuiDropdownMenu
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
				list:[],
				list1:[],
				locationShow: false,
				pickerShow: false,
				specialtyShow:false,
				statusBarHeight:0,
				text:"脚本类型",
				index: -1,
				textarea:"",
				labelValue:"",
				labelValue1:"",
				labelNumber:0,
				labelNumber1:0,
				cleanTrue:true,
				cleanTrue1:true,
				storyboardValue:6,
				buttonValid:false,
				selectedLabels:[],
				selectedLabels1:[],
				picker: [],
				picker1: [],
				picker2: [],
				multiIndex: [0, 0, 0],
				globalToken:'',
				loadingValid:false,
				locationValid:false,
				columns: [],
				specialtyColumns:[],
				s:null,
				sc:null,
				columnData:[],
				columnData1:[],
				currentIdx:0,
				currentIdx1:0,
				city:null,
				place:null,
				name:null,
				ts:null
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
			},
			sc(){
				if(this.sc==="景点描绘"||this.sc==="旅游攻略"||this.sc==="旅游记录"){
					this.s=null
					this.ts='推荐地区'
					this.locationValid=true
					uni.request({
						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceAttraction/city', 
						method: 'GET',
						header: {
						    'X-Access-Token': this.globalToken,
						},
						success: (res) => {
						    console.log('city:', res.data.result);
							const mergedList = {};
							res.data.result.forEach((item) => {
								let province= item.province
								if (mergedList[province]){
									mergedList[province].push(item.city)
								}else{
									mergedList[province]=[item.city]
								}
							});
							this.picker1=Object.keys(mergedList)
							this.columnData=Object.values(mergedList)
							console.log('----------------')
							console.log(this.picker1)
							console.log(this.columnData)
							this.columns.push(this.picker1)
							this.columns.push(this.columnData[0])
							uni.request({
								url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceAttraction/attraction', 
								method: 'GET',
								data: {
									city:this.columnData[0][0],
								},
								header: {
								    'X-Access-Token': this.globalToken,
								},
								success: (re) => {
									console.log(re.data.result)
									this.columns.push(re.data.result)
								},
								fail: (error) => {
									console.error('Error:', error);
									let options = {};
									options.text = '请求失败';
									this.$refs.toast.show(options);
								},
							})
						},
						fail: (error) => {
							console.error('Error:', error);
							let options = {};
							options.text = '请求失败';
							this.$refs.toast.show(options);
						},
					})
				}else if(this.sc==="美食介绍"||this.sc==="美食介绍"||this.sc==="美食制作"){
					this.s=null
					this.ts='推荐特产'
					this.locationValid=true
					uni.request({
						url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceSpecialty/city', 
						method: 'GET',
						header: {
						    'X-Access-Token': this.globalToken,
						},
						success: (res) => {
						    console.log('city:', res.data.result);
							const mergedList1 = {};
							res.data.result.forEach((item) => {
								let province= item.province
								if (mergedList1[province]){
									mergedList1[province].push(item.city)
								}else{
									mergedList1[province]=[item.city]
								}
							});
							this.picker2=Object.keys(mergedList1)
							this.columnData1=Object.values(mergedList1)
							this.specialtyColumns.push(this.picker2)
							this.specialtyColumns.push(this.columnData1[0])
							uni.request({
								url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceSpecialty/specialty', 
								method: 'GET',
								data: {
									city:this.columnData1[0][0],
								},
								header: {
								    'X-Access-Token': this.globalToken,
								},
								success: (re) => {
									console.log(re.data)
									this.specialtyColumns.push(re.data.result)
								},
								fail: (error) => {
									console.error('Error:', error);
									let options = {};
									options.text = '请求失败';
									this.$refs.toast.show(options);
								},
							})
						},
						fail: (error) => {
							console.error('Error:', error);
							let options = {};
							options.text = '请求失败';
							this.$refs.toast.show(options);
						},
					})
				}else{
					this.locationValid=false
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
		  	this.globalToken=this.$store.state.globalToken
			uni.request({
				url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot//sys/category/childList', 
				method: 'GET',
				data: {
					pid:'1734210306342555649',
				},
				header: {
				    'X-Access-Token': this.globalToken,
				},
				success: (res) => {
					res.data.result.forEach((item, index) => {
						console.log(item)
						let i={
							name:item.name,
							id:item.id
						}
						this.picker.push(i)
					})
					this.picker=[this.picker]
				},
				fail: (error) => {
					console.error('Error:', error);
					let options = {};
					options.text = '请求失败';
					this.$refs.toast.show(options);
				},
			});
			uni.request({
				url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/sys/api/queryDictItemsByCode', 
				method: 'GET',
				data: {
					code:'character_role',
				},
				header: {
				    'X-Access-Token': this.globalToken,
				},
				success: (res) => {
					console.log("res.data",res.data)
					res.data.forEach((item, index) => {
						console.log(item)
						let i={}
						if(index==0){
							i={
								text: item.value,
								value: index+1,
								checked: true
							}
						}else{
							i={
								text: item.value,
								value: index+1,
							}
						}
						this.list.push(i)
					})
				},
				fail: (error) => {
					console.error('Error:', error);
					let options = {};
					options.text = '请求失败';
					this.$refs.toast.show(options);
				},
			});
			uni.request({
				url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/sys/api/queryDictItemsByCode', 
				method: 'GET',
				data: {
					code:'tone',
				},
				header: {
				    'X-Access-Token': this.globalToken,
				},
				success: (res) => {
					console.log("res.data",res.data)
					res.data.forEach((item, index) => {
						console.log(item)
						let i={}
						if(index==0){
							i={
								text: item.value,
								value: index+1,
								checked: true
							}
						}else{
							i={
								text: item.value,
								value: index+1,
							}
						}
						this.list1.push(i)
					})
				},
				fail: (error) => {
					console.error('Error:', error);
					let options = {};
					options.text = '请求失败';
					this.$refs.toast.show(options);
				},
			});
		},
		methods: {
			filterTap() {
					//显示下拉框
					this.$refs.ddmRange.show()
				},
			rangeItemClick(e) {
					console.log(e.text)
					this.labelValue=e.text
					this.setLabel()
				},
			rangeClose() {
					
				},
			filterTap1() {
					//显示下拉框
					this.$refs.ddmRange1.show()
				},
			rangeItemClick1(e) {
					this.labelValue1=e.text
					this.setLabel1()
				},
			rangeClose1() {
					
				},
			inputVal(e){
				let temp = e.replace(/[^0-9]+/g,'')
				this.$nextTick(()=>{
					this.storyboardValue=temp
				})
			},
			pickerChange(e){
				this.index = e.indexs[0]	
				console.log("this.index?",this.picker[0][this.index].name)
			},
			locationSelect(){
				if(this.ts==="推荐地区"){
					this.locationShow= true
				}else{
					this.specialtyShow= true
				}
			},
			pickerSelect(){
				this.pickerShow= true
			},
			locationConfirm(e) {
				this.s=e.value.join('/')
				this.place=e.value[1]
				this.name=e.value[2]
				this.locationShow= false	
			},
			specialtyConfirm(e){
				this.s=e.value.join('/')
				this.place=e.value[1]
				this.name=e.value[2]
				this.specialtyShow= false
			},
			locationCancel() {
				this.locationShow= false
			},
			specialtyCancel(){
				this.specialtyShow= false
			},
			pickerCancel() {
				this.pickerShow= false
				if(this.sc==null){
					this.index=-1
				}
			},
			pickerConfirm(e){
				this.index=e.indexs[0]
				this.sc=e.value[0].name
				this.pickerShow= false
			},
			async specialtyChangeHandler(e){
				let columnIndex=e.columnIndex
				let idx =e.index
				let picker = this.$refs.uPickerSpecialty
				if (columnIndex === 0) {
				    // picker为选择器this实例，变化第二列对应的选项
					let c =this.columnData1[idx][0]
					this.currentIdx1=idx
				    picker.setColumnValues(1, this.columnData1[idx])
					await this.getCity1(c,picker)
				}
				if(columnIndex === 1) {
					let c =this.columnData1[this.currentIdx1][idx]
					console.log(c)
					await this.getCity1(c,picker)
				}
			},
			async locationChangeHandler(e){
				let columnIndex=e.columnIndex
				let idx =e.index
				let picker = this.$refs.uPicker
				if (columnIndex === 0) {
				    // picker为选择器this实例，变化第二列对应的选项
					let c =this.columnData[idx][0]
					this.currentIdx=idx
				    picker.setColumnValues(1, this.columnData[idx])
					await this.getCity(c,picker)
				}
				if(columnIndex === 1) {
					let c =this.columnData[this.currentIdx][idx]
					console.log(c)
					await this.getCity(c,picker)
				}
			},
			getCity(c,picker){
				uni.request({
					url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceAttraction/attraction', 
					method: 'GET',
					data: {
						city:c,
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						picker.setColumnValues(2, res.data.result)
					},
					fail: (error) => {
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
				})
			},
			getCity1(c,picker){
				uni.request({
					url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/resource/resourceSpecialty/specialty', 
					method: 'GET',
					data: {
						city:c,
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
						console.log(res)
						picker.setColumnValues(2, res.data.result)
					},
					fail: (error) => {
						console.error('Error:', error);
						let options = {};
						options.text = '请求失败';
						this.$refs.toast.show(options);
					},
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
			selectedLabelDelete(index){
				this.selectedLabels.splice(index, 1)
			},
			selectedLabelDelete1(index){
				this.selectedLabels1.splice(index, 1)
			},
			clean(){
				this.selectedLabels=[]
				this.labelValue=''
			},
			clean1(){
				this.selectedLabels1=[]
				this.labelValue1=''
			},
			inputFocus(){
				this.cleanTrue=false
				this.filterTap()
			},
			inputFocus1(){
				this.cleanTrue1=false
				this.filterTap1()
			},
			inputBlur(){
				this.cleanTrue=true
			},
			inputBlur1(){
				this.cleanTrue1=true
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
			setLabel1(){
				let item={}
				if(this.labelNumber1%2==0){
					item=
						{
							title:this.labelValue1,
							color:"#F5E1FF",
							borderColor:"#C6B3FE"
						}
				}else{
					item=
						{
							title:this.labelValue1,
							color:"#C7FFD8",
							borderColor:"#9CD2AD"	
						}
				}
				this.selectedLabels1.push(item)
				this.cleanTrue1=true
				this.labelValue1=''
				this.labelNumber1++;
			},
			buttonClick(){
				this.loadingValid=true
				let labels=[]
				let labels1=[]
				if(this.labelValue!=''){
					this.setLabel()
				}	
				if(this.labelValue1!=''){
					this.setLabel1()
				}	
				this.selectedLabels.forEach(function(item) {
					labels.push(item.title)
				});
				this.selectedLabels1.forEach(function(item) {
					labels1.push(item.title)
				});
				console.log("labels.join(',')",labels.join(','))
				// #ifdef !H5
				uni.request({
					url: 'https://bvhp-server-37674f03-cd6a-47a1-aece-51f000c331d8.dev-hz.cloudbaseapp-sandbox.cn/jeecg-boot/video/conversation/add', 
					method: 'POST',
					data: {
						message: this.textarea,
						shortNumbers:this.storyboardValue,
						gptScriptConfig:{
							characterRole:labels.join(','),
							tone: labels1.join(','),
							place:this.place,
							name:this.name
						},
						templateCode:this.picker[0][this.index].id,
						// templateCode:this.picker[0][0].id,1734210401423233026
						// templateCode:'1734210401423233026',
						type:'jiaoben'
					},
					header: {
					    'X-Access-Token': this.globalToken,
					},
					success: (res) => {
					    console.log('ResponseGenerateScript:', res.data);
						this.loadingValid=false
						if(res.data.code!=200||res.data.result.content=="抱歉，您的问题不太清楚，请提供更多细节或背景信息，我才能更好地回答您的问题。")
						{
							let options = {};
							options.text = '抱歉，您的问题不太清楚，请提供更多细节或背景信息，我才能更好地回答您的问题。';
							this.$refs.toast.show(options);
						}else{
							uni.navigateTo({
								url: '/subPagesB/new_scripts/new_scripts',
								success: (e) => {
									let n=0
									let t=[]
									this.selectedLabels.forEach((item, index) => {
										console.log(item)
										let i={}
										if(n%2==0){
											i=
												{
													title:item.title,
													color:"#F5E1FF",
													borderColor:"#C6B3FE"
												}
										}else{
											i=
												{
													title:item.title,
													color:"#C7FFD8",
													borderColor:"#9CD2AD"	
												}
										}
										t.push(i)
										n++
									})
									this.selectedLabels1.forEach((item, index) => {
										console.log(item)
										let i={}
										if(n%2==0){
											i=
												{
													title:item.title,
													color:"#F5E1FF",
													borderColor:"#C6B3FE"
												}
										}else{
											i=
												{
													title:item.title,
													color:"#C7FFD8",
													borderColor:"#9CD2AD"	
												}
										}
										t.push(i)
										n++
									})
									let scriptsData={
										result:res.data.result,
										templateCode:this.picker[0][this.index].id,
										tags:t
									}
									e.eventChannel.emit('script', scriptsData)
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
				// #ifdef H5
				uni.navigateTo({
					url: '/subPagesB/new_scripts/new_scripts',
				});
				// #endif
			},
			buttonClick1(){
				let options = {};
				if(this.index==-1){					
					options.text = '请选择脚本类型';
					this.$refs.toast.show(options);
				}else if(this.textarea==''){
					options.text = '请输入短视频简短描述';
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
		justify-content: center;
		padding: 24rpx;
		
	}
	.view11{
		
		height:36rpx;
		width: 36rpx;
	}
	.view12{
		margin-left: 16rpx; 
		font-size: 28rpx;
		width: 550rpx;
		
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
		min-height: 56rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		padding: 6rpx 16rpx;
		margin-right: 8rpx;
		border-radius: 6rpx;
		margin-bottom: 8rpx;
		max-width: 596rpx;
	}
	.view5111{
		display: flex;
		font-size: 28rpx;
		font-weight: bold;
		color: #1D2129;
		max-width: 596rpx;
	}
	.view5112{
		display: flex;
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
	.view7{
		margin-top: 24rpx;
		height: 36rpx;
		margin-left: 3.2%;
		margin-right: 3.2%;
		display: flex;
		align-items: center;
	}
	.view71{
		width: 8rpx;
		height: 36rpx;
		border-radius: 2rpx;
		background-color:  #543EE3;
	}
	.view72{
		width: 550rpx;
		height: 36rpx;
		margin-left: 12rpx;
		display: flex;
		justify-content: left; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		font-size: 28rpx;
		font-weight: bold;
		color: #000000;
	}
	.view73{
		width: 118rpx;
		height: 36rpx;
		margin-left: 12rpx;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		
		font-size: 28rpx;
		color: #A0A2A3;
	}
	.fui-filter__item {
		width:351rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight:bold;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		box-sizing: border-box;
		
	}
	
	.fui-filter__icon {
		
		transition: all .15s linear;
	}
	
	.fui-icon__ani {
		transform: rotate(180deg);
	}
</style>
