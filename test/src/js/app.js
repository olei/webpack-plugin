
import { flow } from 'lodash';
import { formatTime } from 'utils/util';

App({
	onLaunch() {

		flow(() => console.log('typeof formatTime', typeof formatTime))();

		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},
	getUserInfo(cb) {
		if (this.globalData.userInfo) {
			typeof cb == 'function' && cb(this.globalData.userInfo);
		} else {
			//调用登录接口
			wx.login({
				success: () => {
					wx.getUserInfo({
						success: (res) => {
							this.globalData.userInfo = res.userInfo;
							typeof cb == 'function' && cb(this.globalData.userInfo);
						},
					});
				},
			});
		}
	},
	globalData: {
		userInfo: null,
	},
});

async function test() {
	var a = await fn()
}
function fn() {
	return new Promise(res => {
		setTimeout('res', 1000)
	})
}