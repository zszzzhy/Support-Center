let baseUrl;

export default {
	install(Vue, options) {
		// 插件选项
		baseUrl = options.baseUrl;

		Vue.prototype.$fetch = $fetch;
	},
};

// 通用请求函数
export async function $fetch(url, options) {
	const finalOptions = Object.assign(
		{},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		},
		options,
	);

	const response = await fetch(`${baseUrl}${url}`, finalOptions);
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		const message = await response.text();
		const error = new Error(message);
		error.response = response;
		throw error;
	}
}
