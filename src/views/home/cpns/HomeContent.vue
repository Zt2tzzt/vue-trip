<script setup>
import { useHomeStore } from '@/stores';
import HouseItemV3 from '@/components/house-item-v3/HouseItemV3.vue';
import HouseItemV9 from '@/components/house-item-v9/HouseItemV9.vue';

const homeStore = useHomeStore()
</script>

<template>
	<div class="home-content">
		<div class="title">热门精选</div>
		<div class="list">
			<template v-for="item of homeStore.houseList" :key="item.data.houseId">
				<HouseItemV3 v-if="item.discoveryContentType === 3" :itemData="item.data" />
				<HouseItemV9 v-else-if="item.discoveryContentType === 9" :itemData="item.data" />
			</template>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-content {
	padding: 10px 8px;
	.title {
		font-size: 22px;
		padding: 10px;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>