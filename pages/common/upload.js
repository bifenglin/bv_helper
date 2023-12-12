var uploadFileSize = 1024 * 1024 * 15; //上传文件限制15m

function getSuffix(filename) {
	let pos = filename.lastIndexOf('.');
	let suffix = '';
	if (pos != -1) {
		suffix = filename.substring(pos);
	}
	return suffix;
}

function getFileName(file, filename) {
	return (
		file + Math.random()
		.toString(36)
		.substring(3, 20) + new Date().getTime() +
		getSuffix(filename)
	);
}
export function uploadImg(file) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			success: function(res) {
				let Imgsrc = res.tempFilePaths[0];// 第一张图片
				let fileName = getFileName(file, Imgsrc); // 自定义上传后的文件名称
				fileUpload("image", Imgsrc, fileName).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				});
			}
		})
	})
}
export function uploadVid(file) {
	return new Promise((resolve, reject) => {
		uni.chooseVideo({
			count: 1,
			sourceType: ['camera', 'album'],
			success: function(res) {
				let videoSrc = res.tempFilePath;
				if (res.size > uploadFileSize) {
					uni.showToast({
						title: '文件大小超过系统上传限制：15M',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				let fileName = getFileName("video", file, videoSrc);
				fileUpload("video",Imgsrc, fileName).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				});
			},
			fail: (err) => {
				reject(err)
				uni.showToast({
					title: '取消选择视频',
					icon: 'none',
					duration: 2000
				});
			}
		})
	})
}
// 文件上传
function fileUpload(type, path, stroeAs) {
	uni.showLoading({
		title: '文件上传中'
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: '', //请求后台签名地址。
			complete: res => {
				var data = res.data;
				uni.uploadFile({
					url: data.host, //后台返回的阿里云存储的上传地址
					filePath: path,
					fileType: type,
					name: 'file',
					formData: {
						key: stroeAs, //文件名
						policy: data.policy, //后台获取超时时间
						OSSAccessKeyId: data.accessid, //后台获取临时ID
						success_action_status: '200', //让服务端返回200,不然，默认会返回204
						signature: data.signature //后台获取签名
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({
							title: '上传成功',
							icon: 'success',
							duration: 2000
						});
						resolve(data.host + stroeAs) // 返回保存在阿里oss上的地址
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
		})
	});
}
