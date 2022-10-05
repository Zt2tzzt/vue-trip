<script setup>
import { computed } from 'vue'
import { PRIMARY_COLOR } from '@/constant'

const props = defineProps({
	titles: {
		type: Array,
		default: () => []
	},
	tabIndex: {
		type: Number,
		default: 0
	}
})
const emit = defineEmits(['tabItemClick'])

const activeIndex = computed(() => props.tabIndex)
const onClickTab = ({ name: index }) => {
	emit('tabItemClick', index)
}
</script>

<template>
	<div class="tab-control">
		<van-tabs v-model:active="activeIndex" :color="PRIMARY_COLOR" @click-tab="onClickTab">
			<template v-for="item of titles" :key="item">
				<van-tab :title="item"></van-tab>
			</template>
		</van-tabs>
	</div>
</template>

<style scoped lang="less"></style>
