<template>
	<view class="container">
		<!-- 占位 -->
		<view style="height: 160rpx;"></view>

		<!-- 底部按钮 -->
		<view class="btnWrap">
			<button  type="primary" shape="circle" :text="leftText" plain></button>
			<button  type="primary" shape="circle" :text="rightText"></button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "sa-bom-btn",
		props: {
			leftText: {
				type: String,
				default: "取消"
			},
			rightText: {
				type: String,
				default: "确定"
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onTapLeft() {
				console.log('onTapLeft');
			},
			onTapRight() {
				console.log('onTapLeft');
			}
		}
	}
</script>

<style scoped lang="scss">
	$color: #4284E5;

	.btnWrap {
		position: fixed;
		width: calc(100% - 64rpx);
		font-size: 30rpx;
		bottom: 0;
		background-color: #fff;
		display: flex;
		padding: 20rpx 32rpx;
		padding-bottom: calc(constant(safe-area-inset-bottom) + 20rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

		.btn {
			border-color: $color;
			height: 88rpx;

			&:first-child {
				margin-right: 32rpx;
				color: $color;
			}

			&:last-child {
				background-color: $color;
			}
		}
	}
</style>