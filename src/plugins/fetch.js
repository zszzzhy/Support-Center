let baseUrl;

export default {
	install(Vue, options) {
		// 插件选项
		baseUrl = options.baseUrl;

		Vue.prototype.$fetch = $fetch;
	},
};

// 通用请求函数
export async function $fetch(url) {
	const response = await fetch(`${baseUrl}${url}`);
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		const error = new Error('error');
		throw error;
	}
}
