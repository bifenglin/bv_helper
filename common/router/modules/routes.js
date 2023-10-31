const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '主页',
	    },
    },
	{
	    //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	  path: '/pages/home/home',
	  //aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
	  name: 'home',
	    meta: {
	        title: '首页',
	    },
	},
    {
	    path: '/pages/user/people',
        name: 'people',
        meta: {
	        title: '个人中心',
	    },
	},
	{
	    path: '/pages/user/userdetail',
	    name: 'userdetail',
	    meta: {
	        title: '个人详情',
	    },
	},
	{
	    path: '/pages/user/useredit',
	    name: 'useredit',
	    meta: {
	        title: '个人编辑',
	    },
	},
	{
	    path: '/pages/user/userexit',
	    name: 'userexit',
	    meta: {
	        title: '退出',
	    },
	},
	{
	    path: '/pages/user/location',
	    name: 'location',
	    meta: {
	        title: '定位',
	    },
	},
	{
	    path: '/pages/common/exit',
	    name: 'exit',
	    meta: {
	        title: '退出',
	    },
	},
	{
	    path: '/pages/common/success',
	    name: 'success',
	    meta: {
	        title: 'success',
	    },
	},{
	  path: '/pages/addressbook/address-book',
	  name: 'addressBook',
	    meta: {
	        title: 'addressBook',
	    },
	},
	{
	  path: '/pages/addressbook/level-address-book',
	  name: 'levelAddressBook',
	    meta: {
	        title: 'levelAddressBook',
	    },
	},
	{
	  path: '/pages/addressbook/member',
	  name: 'member',
	    meta: {
	        title: 'member',
	    },
	},
	{
	  path: '/pages/addressbook/address-detail',
	  name: 'addressDetail',
	    meta: {
	        title: 'addressDetail',
	    },
	},
	{
	    path: '/pages/annotation/annotationList',
	    name: 'annotationList',
	    meta: {
	        title: '通知公告',
	    },
	},
	{
	    path: '/pages/annotation/annotationDetail',
	    name: 'annotationDetail',
	    meta: {
	        title: '通知详情',
	    },
	},
	{
	    path: '/pages/common/helloWorld',
	    name: 'helloWorld',
	    meta: {
	        title: 'helloWorld',
	    },
	},{
	    path: '/pages/generate/generate',
	    name: 'generate',
	    meta: {
	        title: '脚本生成',
	    },
	},{
	    path: '/pages/scripts/scripts',
	    name: 'scripts',
	    meta: {
	        title: '拍摄脚本',
	    },
	},
	{
	    path: '/pages/modifyScript/modifyScript',
	    name: 'modifyScript',
	    meta: {
	        title: '调整脚本',
	    },
	},
	{
	    path: '/pages/shot/shot',
	    name: 'shot',
	    meta: {
	        title: '拍摄',
	    },
	},
	{
	    path: '/pages/video/video',
	    name: 'video',
	    meta: {
	        title: '查看视频',
	    },
	},
	{
	    path: '/pages/homepage/homepage',
	    name: 'homepage',
	    meta: {
	        title: '主页',
	    },
	},
	{
	    path: '/pages/generateCopywriting/generateCopywriting',
	    name: 'generateCopywriting',
	    meta: {
	        title: 'AI文案',
	    },
	},{
	    path: '/pages/copywriting/copywriting',
	    name: 'copywriting',
	    meta: {
	        title: '查看文案',
	    },
	},{
	    path: '/pages/originalScript/originalScript',
	    name: 'originalScript',
	    meta: {
	        title: '原创脚本',
	    },
	},
	{
	    path: '/pages/originalCopywriting/originalCopywriting',
	    name: 'originalCopywriting',
	    meta: {
	        title: '原创文案',
	    },
	},
]
export default routes