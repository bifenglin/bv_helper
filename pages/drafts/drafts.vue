<template>
	<view>
		
		<uni-nav-bar dark :fixed="true" shadow background-color="#00aaff" status-bar 
					 @clickLeft="back" />
		<view style="margin: 3.2%; margin-bottom:4%;">
			<u-sticky :offset-top="top">
				<view style="background-color: white;margin-top: 10rpx; ">
					<u-tabs :list="list1"  @click="getType($event)" :scrollable="false" itemStyle="width:234rpx; height: 44px">
					</u-tabs>
				</view>
			</u-sticky>
			<scroll-view >
			
			<view v-if="list1[typeIndex].badge.value=='0'" class="nothing">
			<u-empty
					:text="nothingText"
			        icon="/static/icon/nothing(3).png"
					width="300"
					height="300"
					textSize="20"
			>
			</u-empty>
			</view>
			
			<view v-else :class="dynamicCards.length >1 ? 'card_wrap':'card_wrap1'">
				<fui-row>
					<fui-col :span="12">
						<view v-for="(item, index) in dynamicCards" :key="index" class="c_item">
							<view v-if="index%2==0">
						
						<uni-card :title="item.title" padding="10px 0"  :is-shadow="true" margin="0" style="border-radius: 15rpx;"  @click="cardClick">
							<image style="width: 100%;height: 300rpx;" :src="icon_url+item.image"></image>
							<text class="uni-body uni-mt-5">{{item.text}}</text>
							<view style="display: flex;flex-wrap: wrap;justify-content: flex-start">
								<view v-if="item.tag" style="margin-top: 10rpx;margin-right: 10rpx;">
								<u-tag :text="item.tag" plain borderColor="#a1a1a1" color="#a1a1a1" ></u-tag>
							</view>
							<view style="margin-top: 10rpx;margin-right: 10rpx;">
							<u-tag :text="item.type" plain :borderColor="item.type =='脚本'?'#465CFF':'#00aa00'" :color="item.type == '脚本' ? '#465CFF':'#00aa00'" ></u-tag>
							</view>
							</view>
						</uni-card>
						
						
						</view>
						</view>
					</fui-col>
					
				<fui-col :span="12" >
					<view v-for="(item, index) in dynamicCards" :key="index" class="c_item">
						<view v-if="index%2==1">
					<uni-card :title="item.title" padding="10px 0"  :is-shadow="true" margin="0" style="border-radius: 15rpx;" @click="cardClick">
						<image style="width: 100%;height: 300rpx;" :src="icon_url+item.image"></image>
						<text class="uni-body uni-mt-5">{{item.text}}</text>
						<view style="display: flex;flex-wrap: wrap;justify-content: flex-start">
							<view v-if="item.tag" style="margin-top: 10rpx;margin-right: 10rpx;">
							<u-tag :text="item.tag" plain borderColor="#a1a1a1" color="#a1a1a1" ></u-tag>
						</view>
						<view style="margin-top: 10rpx;margin-right: 10rpx;">
						<u-tag :text="item.type" plain :borderColor="item.type =='脚本'?'#465CFF':'#00aa00'" :color="item.type == '脚本' ? '#465CFF':'#00aa00'" ></u-tag>
						</view>
						</view>
					</uni-card>
					</view>
					</view>
				</fui-col>
				</fui-row>
			
			</view>
			</scroll-view >
		</view>
	</view>
</template>

<script>
	import fuiCol from "@/components/firstui/fui-col/fui-col.vue"
	import fuiRow from "@/components/firstui/fui-row/fui-row.vue"
	export default {
		
		components:{
				fuiCol,fuiRow
			},
		data() {
			return {
				top:0,
				count:0,
				nothingText:"脚本仓库为空",
				typeIndex:0,
				icon_url:"/static/homepage/",
				cards0:[
					{
						title:'索菲亚教堂',
						type:'脚本',
						image:'2.jpg',
						tag:'分镜数:12'
						
					},{
						title:'索菲亚教堂',
						type:'脚本',
						image:'2.jpg',
						tag:'分镜数:13'
						
					},
					
				],
				cards1:[
					{
						title:'索菲亚教堂',
						type:'文案',
						
						image:'2.jpg',
						
					},{
						title:'索菲亚教堂',
						type:'文案',	
						image:'2.jpg',				
					},
					
				],
				list1: [{
				            name: '脚本',
							badge: {
										value: 2,
										type:'primary',
										shape:'horn',
										showZero:true,
							        }
				            }, {
				            name: '文案',
							badge: {
										value:'2',
										showZero:true,
										type:'primary',
										shape:'circle',
										
							        }
				            }, {
				             name: '视频',
							 badge: {
							 			value: '0',
										type:'primary',
										shape:'circle',
										showZero:true,
							         }
				        }, ],
			}
		},
		// #ifdef !H5
		beforeMount() {
			
			 this.top =  44 + uni.getSystemInfoSync().statusBarHeight
			
		   
		  },
		// #endif
		computed: {
		    dynamicCards() {
		      const dynamicKey = 'cards' + this.typeIndex;
		      return this[dynamicKey];
		    },
		  },
		methods: {
			back() {
							uni.navigateBack({
								delta: 1
							})
						},
			getType(e){
				console.log(this.top)
				console.log(e.index)
				console.log(this.list1[e.index].name)
				this.typeIndex=e.index
				this.nothingText=this.list1[e.index].name+"仓库为空"
				this.list1[e.index].badge.shape='horn'
				if(this.count!=e.index){
					this.list1[this.count].badge.shape='circle'
				}
				this.count=e.index
			},
		}
	}
</script>

<style lang="scss">
.nothing{
	margin-top: 10%;
}
	.card_wrap {
	      // 大盒子
		  margin-top: 0.5%;
	      width: 100%;
		  margin-bottom:  100upx;
		 
	    }
	.card_wrap1 {
	      // 大盒子
		margin-top: 0.5%;
		width: 100%;
		margin-bottom:  100upx;
		
	    }
	.c_item {
	      // 每个item
	      
	     
	      margin: 4.5px 4.5px 2.5px 2.5px; // 间隙为5px
	      
	      width: calc(
	        (100% - 10px)
	      ); // 这里的10px = (分布个数2-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
	      min-width: calc((100% - 5px)); // 加入这两个后每个item的宽度就生效了
	     
	    
	    }
	
	
</style>
