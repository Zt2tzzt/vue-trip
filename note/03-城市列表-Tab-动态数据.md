# City 组件开发

使用 Vant 封装 City 组件顶部搜索框组件和 Tabs 组件。

src \ views \ city \ City.vue

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PRIMARY_COLOR } from '@/constant'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import CityGroup from './cpns/CityGroup.vue'

const router = useRouter()
const cityStore = useCityStore()

// 顶部搜索栏
const searchValue = ref('') // 记录搜索框的输入值
// 点击取消按钮
const onCancel = () => {
	router.back()
}

// tab 栏
const tabActiveKey = ref(0) // 记录激活的 tab 索引
cityStore.fetchAllCities()
const { allCities } = storeToRefs(cityStore)
</script>

<template>
	<div class="city">
		<!-- 顶部固定部分 -->
		<header class="top">
			<!-- 顶部搜索栏 -->
			<van-search
				v-model="searchValue"
				placeholder="城市/区域/位置"
				:show-action="true"
				@cancel="onCancel"
			/>
			<!-- tab 栏 -->
			<van-tabs v-model:active="tabActiveKey" :color="PRIMARY_COLOR">
				<template v-for="(value, key) in allCities" :key="key">
					<van-tab :title="value.title" :name="key"></van-tab> <!-- name 属性用于修改 van-tabs 绑定的索引为 key-->
				</template>
			</van-tabs>
		</header>
		<!-- 内容部分 -->
		<section class="content">
			<template v-for="(value, key) in allCities">
				<CityGroup v-show="tabActiveKey === key" :groupsData="value" />
			</template>
		</section>
	</div>
</template>

<style scoped lang="less">
	.top {
		position: relative; // Vant 的 van-index-bar 组件中有绝对定位元素，覆盖了 top 区域，需要增加 top 区域的展示层级。
		z-index: 9;
	}
	.content {
		height: calc(100vh - 98px);
		overflow-y: auto;
	}
</style>
```

# 给头部（以上搜索和 Tab 部分）做固定定位，2种方案（重要）

给以上搜索和 Tab 部分做固定定位

- 方案一：头部 fixed 定位；为下方滚动区域设置 margin-top，
  - 弊端：滚动条会出现在最上面，不推荐；
- 方案二：下方滚动区域给固定高度，并进行纵向区域隐藏（推荐）。

src\views\city\City.vue

```css
.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
```

# 使用 axios

安装 axios 库，

```shell
npm install axios
```

基于 axios 封装网络请求。

src \ services \ request\ index.js

```js
/*
 * axios 封装的2点好处。
 * 1. 如果 axios 某天不再维护，所有依赖 axios 的代码都不需要修改，只需要更改封装的代码。
 * 2. 发送请求代码，存在很多相同的逻辑。
 */
import axios from 'axios'

class ZTRequest {
	instance = null
	interceptors = null

	constructor(config) {
		// 创建 axios 实例
		this.instance = axios.create(config)

		// 保存基本信息
		this.interceptors = config.interceptor

		// 使用拦截器（单个实例拦截器）
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)

		// 使用拦截器（全局拦截器）
		this.instance.interceptors.request.use(
			config => {
				// console.log('全局拦截，请求成功')
				return config
			},
			err => {
				// console.log('全局拦截，请求失败')
				return err
			}
		)
		this.instance.interceptors.response.use(
			res => {
				// console.log('全局拦截，响应成功')
				const data = res.data
				return data
			},
			err => {
				// console.log('全局拦截，响应失败')
				return err
			}
		)
	}

	// 封装request方法
	request(config) {
		return new Promise((resolve, reject) => {
			// 1.单个请求对请求config的处理
			if (config.interceptor?.requestInterceptor) {
				config = config.interceptor.requestInterceptor(config)
			}

			this.instance
				.request(config)
				.then(res => {
					// 单个请求对数据的处理
					if (config.interceptor?.responseInterceptor) {
						res = config.interceptor.responseInterceptor(res)
					}
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	get(config) {
		return this.request({ ...config, method: 'GET' })
	}
	post(config) {
		return this.request({ ...config, method: 'POST' })
	}
	delete(config) {
		return this.request({ ...config, method: 'DELETE' })
	}
	patch(config) {
		return this.request({ ...config, method: 'PATCH' })
	}
}

export default ZTRequest

/**
 * 服务器返回失败的2种模式
	1. HttpErrorCode -> 在 resposeCatch 中拦截，返回一个 err -> err.respons.status
		- 2xx -> 成功
		- 4xx -> 失败
		- 5xx -> 一般指服务器端发生错误的失败
	2. HttpErrorCode
		- 200，数据 {data: "", success: false, returCode: -1001} - 在返回的数据中体现失败。
 */

```

src \ services \ request \ config.js

```js
export const BASE_URL = 'http://codercba.com:1888/api'
export const TIME_OUT = 3000
```

src \ services \ index.js

```js
import ZTRequest from './request'
import { BASE_URL, TIME_OUT } from './request/configjs'
// import storage from '@/utils/cache'

export default new ZTRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptor: {
		requestInterceptor(config) {
			// 携带token的拦截
			// const token = storage.getCache('token')
			// if (token) config.headers.Authorization = `Bearer ${token}`
			// console.log('单例拦截，请求成功')
			return config
		},
		requestInterceptorCatch(err) {
			// console.log('单例拦截，请求失败')
			return err
		},
		responseInterceptor(res) {
			// console.log('单例拦截，响应成功')
			return res
		},
		responseInterceptorCatch(err) {
			// console.log('单例拦截，响应失败')
			return err
		}
	}
})
export * from './modules/city'
export * from './modules/home'
```

# 在 City 中发送网络请求

为 City 组件创建对应的 store，在 store 中发送获取城市信息的网络请求。并展示数据。

src\stores\modules\city.js


# CityGroup 组件的封装

在 city 组件中抽取子组件，使得展示逻辑更加清晰。

使用 Vant 的 VantIndexBar 组件进行封装。

点击城市，返回 Home，并展示选择的城市。

src\views\city\cpns\CityGroup.vue

# HomeSearchBox 组件的封装

在 HomeSearchBox 中日期区域的开发。点击弹出日历供用户选择日期区间。

src\views\home\cpns\HomeSearchBox.vue

# dayjs 工具函数的封装

基于 day.js 封装日期转换的工具函数。

src\utils\format-date.js

```js
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
```

# 在 Home 中发送网络请求

在 Home 中获取热门建议关键词并展示。

src\stores\modules\home.js