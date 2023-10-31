<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" >
			
		</cu-custom>
			<view style="margin: 2.2%; ">
				<view  style="background-color: #ffffff;">
							<u-scroll-list>
								<view class="scroll-list" style="flex-direction: row;">
										<view
											class="scroll-list__line__item"
											v-for="(item, index) in menuArr"
											:key="index"
											:class="[(index === menuArr.length - 1) && 'scroll-list__line__item--no-margin-right']"
										>
											<image
												class="scroll-list__line__item__image"
												:src="icon_url + item.icon"
												@tap="redirectToPage(item.page)"
											>
											</image>
											<text class="scroll-list__line__item__text">{{ item.name }}</text>
										</view>
									</view>
								
							</u-scroll-list>
				</view>
				
			

		<u-sticky>
			 <u-tabs :list="list1" style="background-color: #ffffff; margin-top: 1%"   @tap="getType($event)" >
			        <view
			                slot="left"
			                style="background-color: #ffffff; border-right: 1px solid #CCCCCC ;"
			                
			        >
			            <fui-dropdown-menu   selectedColor="#465CFF"  minWidth="200" :splitLine="true" lineColor="#465CFF" :isCheckbox="false" :options="list" @click="rangeItemClick" @close="rangeClose" ref="ddmRange">
			            	<view class="fui-filter__item" @tap="filterTap">
			            		<text>{{range}}</text>
			            		<view class="fui-filter__icon" :class="{'fui-icon__ani':rangeShow}">
			            			<fui-icon name="turningdown" :size="32"></fui-icon>
			            		</view>
			            	</view>
			            </fui-dropdown-menu>
			        </view>
			    </u-tabs>
		</u-sticky>
		
		<scroll-view >
			<view :class="cards.length >1 ? 'card_wrap':'card_wrap1'">
			
				<fui-row>
					<fui-col :span="12">
						<view v-for="(item, index) in cards" :key="index" class="c_item">
							<view v-if="index%2==0">
						<uni-card :title="item.title" padding="10px 0"  :is-shadow="true" style="margin: 0%; border-radius: 15rpx;" @click="cardClick">
							<image style="width: 100%;height: 300rpx;" :src="icon_url+item.image"></image>
							<text class="uni-body uni-mt-5">{{item.text}}</text>
							<view style="display: flex;flex-wrap: wrap;justify-content: flex-start">
							<view v-for="(item1, index1) in item.tag" :key="index1" >
								<u-tag :text="item1" plain borderColor="#a1a1a1" color="#a1a1a1" style="margin-top: 10rpx;margin-right: 10rpx;"></u-tag>
							</view>
							<u-tag :text="item.type" plain :borderColor="item.type =='脚本'?'#465CFF':'#00aa00'" :color="item.type == '脚本' ? '#465CFF':'#00aa00'" style="margin-top: 10rpx;margin-right: 10rpx;"></u-tag>
							</view>
						</uni-card>
						</view>
						</view>
					</fui-col>
					
				<fui-col :span="12" >
					<view v-for="(item, index) in cards" :key="index" class="c_item">
						<view v-if="index%2==1">
					<uni-card :title="item.title" padding="10px 0"  :is-shadow="true" style="margin: 0%; border-radius: 15rpx;" @click="cardClick">
						<image style="width: 100%;height: 300rpx;" :src="icon_url+item.image"></image>
						<text class="uni-body uni-mt-5">{{item.text}}</text>
						<view style="display: flex;flex-wrap: wrap;justify-content: flex-start">
						<view v-for="(item1, index1) in item.tag" :key="index1" >
							<u-tag :text="item1" plain borderColor="#a1a1a1" color="#a1a1a1" style="margin-top: 10rpx;margin-right: 10rpx;"></u-tag>
						</view>
						<u-tag :text="item.type" plain :borderColor="item.type =='脚本'?'#465CFF':'#00aa00'" :color="item.type == '脚本' ? '#465CFF':'#00aa00'"  style="margin-top: 10rpx;margin-right: 10rpx;"></u-tag>
						</view>
					</uni-card>
					</view>
					</view>
				</fui-col>
				</fui-row>
			
			</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
    import fuiCol from "@/components/firstui/fui-col/fui-col.vue"
	import fuiRow from "@/components/firstui/fui-row/fui-row.vue"
 	export default {
		name: "homepage",
		components:{
				fuiDropdownMenu,fuiIcon,fuiCol,fuiRow
			},
		data() {
			return {
			
			icon_url:"/static/homepage/",
			list:[{
			text: '综合推荐',
			value: 1,
			checked: true
			}, {
			text: '视频脚本',
			value: 2
			}, {
			text: '文案脚本',
			value: 3
			}],
			list1: [{
			                    name: '关注',
			                }, {
			                    name: '推荐',
			                }, {
			                    name: '电影'
			                }, {
			                    name: '科技'
			                }, {
			                    name: '音乐'
			                }, {
			                    name: '美食'
			                }, {
			                    name: '文化'
			                }, {
			                    name: '财经'
			                }, {
			                    name: '手工'
			                }],
			menuArr: [{
							name: 'AI脚本',
							icon: 'AI脚本.png',
							page:'/pages/generate/generate'
						},
						{
							name: 'AI文案',
							icon: 'AI文案.png',
							page:'/pages/generateCopywriting/generateCopywriting'
						}, {
							name: '仓库',
							icon: '草稿箱.png',
							page:'/pages/generate/generate'
						}, {
							name: '原创脚本',
							icon: '原创脚本.png',
							page:'/pages/originalScript/originalScript'
						}, {
							name: '原创文案',
							icon: '原创文案.png',
							page:'/pages/originalCopywriting/originalCopywriting'
						}
					],
			cards:[
				{
					title:'索菲亚教堂',
					type:'文案',
					text:'卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。',
					image:'2.jpg',
					tag:['教堂',]
				},{
					title:'索菲亚教堂',
					type:'脚本',
					text:'卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。',
					image:'2.jpg',
					tag:['教堂','分镜数:12'
					]
				},{
					title:'索菲亚教堂',
					type:'脚本',
					text:'卡片组件通用来显示完整独立的一段信息。',
					image:'2.jpg',
					tag:['教堂','分镜数:13'
					]
				},{
					title:'索菲亚教堂',
					type:'文案',
					text:'卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。',
					image:'2.jpg',
					tag:['教堂',
					]
				},
				
			],
			range: '综合推荐',
			rangeShow: false,
			}
		},
		methods: {
			getType(e){
				console.log(e.index)
				console.log(this.list1[e.index].name)
			},
			redirectToPage(page){
				  uni.navigateTo({
				          url: page,
				        });
			},
			filterTap() {
					//显示下拉框
					this.$refs.ddmRange.show()
					this.rangeShow = true;
				},
			rangeItemClick(e) {
					console.log(e)
					console.log(e.text)
					this.range = e.text
					this.rangeClose()
				},
			rangeClose() {
					this.rangeShow = false;
				},
			cardClick(){
				uni.navigateTo({
				        url: '/pages/scripts/scripts',
				      });
			}
		}
	}
</script>

<style lang="scss">
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
	
	.fui-filter__item {
		width: 200rpx;
		height: 88rpx;
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
.scroll-list {
	@include flex(column);

	
	&__line {


		&__item {
			margin-right: 45rpx;
			margin-top: 20rpx;
			margin-left: 15rpx;
			
			text-align: center;
			&__image {
				width: 125rpx;
				height: 125rpx;
				border: 2px solid #a1a1a1;
				padding:10rpx;
				border-radius: 20rpx;
			}

			&__text {
				margin-top: 10rpx;
				color: $u-content-color;
				font-size: 20rpx;
				font-weight:bold;
				
			}

			&--no-margin-right {
				margin-right: 15rpx;
			}
		}
	}
}
</style>
