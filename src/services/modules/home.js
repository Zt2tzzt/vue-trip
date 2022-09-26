import ztRequest from "../index";

/**
 * @description: 此函数用于：发送网络请求，获取 Hoem 中的热门建议
 * @Author: ZeT1an
 * @return {Promise} 返回一个 Promise，用于处理请求结果。
 */
export const getHomeHotSuggests = () => {
	return ztRequest.get({
		url: '/home/hotSuggests'
	})
}

/**
 * @description: 此函数用于：发送网络请求，获取 Hoem 中的滚动目录
 * @Author: ZeT1an
 * @return {Promise} 返回一个 Promise，用于处理请求结果。
 */
export const getHomeCategories = () => {
	return ztRequest.get({
		url: '/home/categories'
	})
}

/**
 * @description: 此函数用于：获取 Home 中的内容，即房屋列表数据
 * @Author: ZeT1an
 * @return {Promise} 返回一个 Promise，用于处理请求结果。
 */
export const getHouseList = (page) => {
	return ztRequest.get({
		url: 'home/houselist',
		params: {
			page
		}
	})
}
