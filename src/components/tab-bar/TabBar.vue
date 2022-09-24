<script setup>
import tabBarData from '@/assets/data/tab-bar'
import { getAssetURL } from '@/utils/load-asstes'
import { ref } from 'vue'

const currentIndex = ref(0)
</script>

<template>
	<footer class="tab-bar">
		<van-tabbar v-model="currentIndex" active-color="#ff9845">
			<template v-for="(item, index) of tabBarData" :key="item.text">
				<van-tabbar-item icon="home-o" :to="item.path">
					<template #icon="props">
						<img
							:src="getAssetURL(props.active ? item.imageActive : item.image)"
						/>
					</template>
					<!-- 默认插槽 -->
					<span>{{ item.text }}</span>
				</van-tabbar-item>
			</template>
		</van-tabbar>
	</footer>
</template>

<style scoped lang="less">
.tab-bar {
	img {
		height: 26px;
	}
}
</style>
