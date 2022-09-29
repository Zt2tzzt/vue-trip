<script setup>
import useHomeStore from '@/stores/modules/home';

const homeStory = useHomeStore()
</script>

<template>
	<div class="home-category">
		<template v-for="item of homeStory.categories">
			<div class="item">
				<img :src="item.pictureUrl" alt="">
				<div class="text">{{ item.title }}</div>
			</div>
		</template>
	</div>
</template>

<style scoped lang="less">
.home-category {
	display: flex;
	overflow-x: auto;
	height: 80px;
	padding: 0 10px;
	margin-top: 8px;
	&::-webkit-scrollbar { // 消除滚动条
		display: none;
	}
	.item {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 70px;
		text-align: center;
		img {
			width: 32px;
			height: 32px;
		}
		.text {
			font-size: 12px;
			margin-top: 9px;
		}
	}
}
</style>