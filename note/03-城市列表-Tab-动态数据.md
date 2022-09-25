- 使用 Vant 封装 City 组件顶部搜索框组件。
- 使用 Vant 封装 City 组件中部 Tabs 组件。
- 给头部（以上2个部分）做固定定位，2种方案。1.fixed 定位；2.下方滚动区域给固定高度。
- 安装 axios 库，基于 axios 封装网络请求。
- 为 City 组件创建对应的 store，在 store 中发送获取城市信息的网络请求。并展示数据。

```vue
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PRIMARY_COLOR } from '@/constant'
import { useCityStore } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()
const cityStore = useCityStore()

// 顶部搜索栏
const searchValue = ref('') // 记录搜索框的输入值
const cancelClick = () => {
	router.back()
}
// tab 栏
const tabActiveKey = ref(0) // 记录激活的 tab 索引
cityStore.fetchAllCities()
const { allCities } = storeToRefs(cityStore)
const currentGroup = computed(() => allCities.value[tabActiveKey.value]) // 当前选中的 tab，对应要展示的数据。
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
				@cancel="cancelClick"
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
			<template v-for="group of currentGroup?.cities" :key="group.group">
				<div class="group-group">
					<h2 class="title">标题：{{group.group}}</h2>
					<div class="list">
						<template v-for="city of group.cities" :key="city.cityId">
							<div class="city">{{city.cityName}}</div>
						</template>
					</div>
				</div>

			</template>
		</section>
	</div>
</template>

<style scoped lang="less">
	.content {
		height: calc(100vh - 98px);
		overflow-y: auto;
	}
</style>

```
- 在 city 组件中抽取子组件，是的展示逻辑更加清晰。使用 Vant 的 IndexBar 组件进行封装。

```vue
<van-index-bar>
	<template v-for="group of groupsData.cities" :key="group.group">
		<van-index-anchor :index="group.group" />
		<template v-for="city of group.cities" :key="city.cityId">
			<van-cell :title="city.cityName" />
		</template>
	</template>
</van-index-bar>
```

- 点击城市，返回 Home，并展示选择的城市。
- 在 HomeSearchBox 中日期区域的开发。点击弹出日历供用户选择日期区间。
- 基于 day.js 封装日期转换的工具函数。
- 在 Home 中获取热门建议关键词并展示