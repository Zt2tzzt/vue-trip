import dayjs from "dayjs";

/**
 * @description: 此函数用于：格式化日期 MM月dd日
 * @Author: ZeT1an
 * @param {Date} date
 * @return {String} 日期字符串
 */
export const formatMonthDay = (date, pattern = "MM月DD日") => {
	return dayjs(date).format(pattern)
}

/**
 * @description: 此函数用于：计算2个日期之间的差值
 * @Author: ZeT1an
 * @param {Date} startdate 开始日期
 * @param {Date} endDate 结束日期
 * @return {Number} 差的天数
 */
export const getGapOfDate = (startdate, endDate) => {
	return dayjs(endDate).diff(startdate, 'day')
}
