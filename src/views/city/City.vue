<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PRIMARY_COLOR } from '@/constant'
import { useCityStore } from '@/stores'
import { storeToRefs } from 'pinia'
import CityGroup from './cpns/CityGroup.vue'

const router = useRouter()
const cityStore = useCityStore()

// 顶部搜索栏
const searchValue = ref('') // 记录搜索框的输入值
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
