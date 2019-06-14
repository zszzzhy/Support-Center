export default function(resources) {
	return {
		data() {
			let initData = {
				// 用于计算当前正在加载请求的数量
				remoteDataLoading: 0,
			};

			// 初始化数据属性
			initData.remoteErrors = {};
			for (const key in resources) {
				initData[key] = null;
				initData.remoteErrors[key] = null;
			}

			return initData;
		},
		computed: {
			// 决定是否显示加载动画
			remoteDataBusy() {
				return this.$data.remoteDataLoading !== 0;
			},
			// 如果至少有一个错误就返回 true
			hasRemoteErrors() {
				return Object.keys(this.$data.remoteErrors).some(key => this.$data.remoteErrors[key]);
			},
		},
		methods: {
			async fetchResource(key, url) {
				this.$data.remoteDataLoading++;
				this.$data.remoteErrors[key] = null; // 重置错误
				try {
					this.$data[key] = await this.$fetch(url);
				} catch (err) {
					console.log(err);
					this.$data.remoteErrors[key] = err; // 放置错误
				}
				this.$data.remoteDataLoading--;
			},
		},
		created() {
			for (const key in resources) {
				let url = resources[key];
				// 如果值是一个函数，侦听它的结果
				if (typeof url === 'function') {
					this.$watch(
						url,
						val => {
							this.fetchResource(key, val);
						},
						{
							immediate: true,
						},
					);
				} else {
					this.fetchResource(key, url);
				}
			}
		},
	};
}
