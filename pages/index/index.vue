<template>
	<view>
		
		<home :cur="PageCur" v-if="PageCur=='home'" :key="commponent1Key"></home>
		<people v-if="PageCur=='people'" :key="commponent2Key"></people>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur=='home'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="home">
				<view class='cuIcon-homefill'></view>主页
			</view>
			<view :class="PageCur=='peoplelis'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="peoplelis">
				<view class='cuIcon-notice'></view>消息
			</view>
			<view :class="PageCur=='profile'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="profile">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/icon/VIP.png" >
				</image>会员
			</view>
			<view :class="PageCur=='people'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="people">
				<view class='cuIcon-people'></view>个人
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				commponent1Key: 0,
				commponent2Key: 0,
			}
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
				title: '首页'
			});
			this.PageCur='home'
			++this.commponent1Key
			++this.commponent2Key
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
			
		}
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}

			&__slot-icon {
				width: 17px;
				height: 17px;
			}
		}
	}
</style>
