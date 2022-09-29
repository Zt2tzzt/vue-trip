<script setup>
import { computed } from 'vue';
import { PRIMARY_COLOR } from '@/constant';
import useCityStore from '@/stores/modules/city';
import { useRouter } from 'vue-router';

const props = defineProps({
	groupsData: {
		type: Object,
		default: () => ({})
	}
})
const cityStore = useCityStore()
const router = useRouter()

// 为 van-index-bar 组件动态添加索引
const indexList = computed(() => ['#'].concat(props.groupsData.cities.map(item => item.group)))
// 选择城市
const onCityClick = (city) => {
	cityStore.currentCity = city // 选中当前城市
	router.back() // 返回上页
}
</script>

<template>
	<div class="city-group">
		<van-index-bar :indexList="indexList" :highlight-color="PRIMARY_COLOR">
			<!-- 热门城市 -->
			<van-index-anchor index="热门" />
			<div class="list">
				<template v-for="city of groupsData.hotCities" :key="city.cityId">
					<div class="city" @click="onCityClick(city)">{{ city.cityName }}</div>
				</template>
			</div>
			<!-- 按名称排序 -->
			<template v-for="group of groupsData.cities" :key="group.group">
				<van-index-anchor :index="group.group" />
				<template v-for="city of group.cities" :key="city.cityId">
					<van-cell :title="city.cityName" @click="onCityClick(city)" />
				</template>
			</template>
		</van-index-bar>
	</div>
</template>

<style scoped lang="less">
	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		padding: 10px;
		padding-right: 25px;

		.city {
			width: 70px;
			height: 28px;
			margin: 6px 0;
			border-radius: 14px;
			font-size: 12px;
			color: #000;
			text-align: center;
			line-height: 28px;
			background-color: #fff4ec;
		}
	}
</style>
