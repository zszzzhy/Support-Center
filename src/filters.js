import moment from 'moment';
// data 过滤器
export function date(value) {
	return moment(value).format('L');
}
