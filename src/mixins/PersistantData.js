// 备份用户输入
export default function(id, fields) {
	return {
		mthods: {
			saveAllPersistantData() {
				for (const field of fields) {
					localStorage.setItem(`${id}.${field}`, JSON.stringify(this.$data[field]));
				}
			},
		},
		// 自动备份用户在表单中输入的内容
		watch: fields.reduce((obj, field) => {
			// 侦听处理函数
			obj[field] = function(val) {
				localStorage.setItem(`${id}.${field}`, JSON.stringify(val));
			};
			return obj;
		}, {}),
		// 在组件创建时恢复值
		created() {
			for (const field of fields) {
				const savedValue = localStorage.getItem(`${id}.${field}`);
				if (savedValue !== null) {
					this.$data[field] = JSON.parse(savedValue);
				}
			}
		},
		// 在组件被销毁时保存字段
		beforeDestroy() {
			this.saveAllPersistantData;
		},
	};
}
