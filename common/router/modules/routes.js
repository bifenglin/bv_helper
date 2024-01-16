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
	    path: '/subPagesB/generate/generate',
	    name: 'generate',
	    meta: {
	        title: 'AI脚本',
	    },
	},{
	    path: '/subPagesB/scripts/scripts',
	    name: 'scripts',
	    meta: {
	        title: '确认脚本',
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
	    path: '/subPages/shot/shot',
	    name: 'shot',
	    meta: {
	        title: '拍摄',
	    },
	},
	{
	    path: '/subPages/video/video',
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
	    path: '/subPagesB/generateCopywriting/generateCopywriting',
	    name: 'generateCopywriting',
	    meta: {
	        title: 'AI文案',
	    },
	},{
	    path: '/subPagesB/copywriting/copywriting',
	    name: 'copywriting',
	    meta: {
	        title: '查看文案',
	    },
	},{
	    path: '/subPages/originalScript/originalScript',
	    name: 'originalScript',
	    meta: {
	        title: '原创脚本',
	    },
	},
	{
	    path: '/subPages/originalCopywriting/originalCopywriting',
	    name: 'originalCopywriting',
	    meta: {
	        title: '原创文案',
	    },
	},
	{
	    path: '/pages/drafts/drafts',
	    name: 'drafts',
	    meta: {
	        title: '仓库',
	    },
	},
	{
	    path: '/pages/user/user1',
	    name: 'userlogin',
	    meta: {
	        title: '用户中心',
	    },
	},
	{
	    path: '/pages/firstpage/firstpage',
	    name: 'firstpage',
	    meta: {
	        title: '首页',
	    },
	},
	{
	    path: '/subPagesB/new_generateScript/new_generateScript',
	    name: 'new_generateScript',
	    meta: {
	        title: '脚本',
	    },
	},
	{
	    path: '/subPagesB/new_generateCopywriting/new_generateCopywriting',
	    name: 'new_generateCopywriting',
	    meta: {
	        title: '文案',
	    },
	},
	{
	    path: '/subPagesB/new_scripts/new_scripts',
	    name: 'new_scripts',
	    meta: {
	        title: '脚本编辑',
	    },
	},
	{
	    path: '/subPages/new_copywriting/new_copywriting',
	    name: 'new_copywriting',
	    meta: {
	        title: '文案编辑',
	    },
	},
	{
	    path: '/subPages/new_shot/new_shot',
	    name: 'new_shot',
	    meta: {
	        title: '视频导入',
	    },
	},
	{
	    path: '/subPages/new_video/new_video',
	    name: 'new_video',
	    meta: {
	        title: '查看视频',
	    },
	},
	{
	    path: '/subPagesB/new_copywriting/new_copywriting',
	    name: 'new_copywriting',
	    meta: {
	        title: '文案编辑',
	    },
	},
	{
	    path: '/subPages/new_photograph/new_photograph',
	    name: 'new_photograph',
	    meta: {
	        title: '照片导入',
	    },
	},
	{
	    path: '/subPages/new_photo/new_photo',
	    name: 'new_photo',
	    meta: {
	        title: '查看照片',
	    },
	},
	{
	    path: '/pages/user/new_user',
	    name: 'new_user',
	    meta: {
	        title: '我的',
	    },
	},
	{
	    path: '/pages/works/works',
	    name: 'works',
	    meta: {
	        title: '作品',
	    },
	},
	{
	    path: '/pages/community/community',
	    name: 'community',
	    meta: {
	        title: '学习社区',
	    },
	},
	{
	    path: '/subPages/clip/clip',
	    name: 'clip',
	    meta: {
	        title: '视频剪辑',
	    },
	},
]
export default routes