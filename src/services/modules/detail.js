import ztRequest from "../index";

/**
 * @description: 此函数用于：发送网络请求，获取房屋详情
 * @Author: ZeT1an
 * @param {String} houseId 房屋id
 * @return {Promise} 返回一个 Promise 用于处理请求数据。
 */
export const getDeailInfos = (houseId) => {
	return ztRequest.get({
		url: '/detail/infos',
		params: {
			houseId
		}
	})
}
