<script setup>
import tabBarData from "@/assets/data/tab-bar";
import { getAssetURL } from "@/utils/load-asstes";
</script>

<template>
	<section class="tab-bar">
		<template v-for="item of tabBarData" :key="item.text">
			<div class="tab-bar-item">
				<img :src="getAssetURL(item.image)" alt="">
				<span>{{item.text}}</span>
			</div>
		</template>
	</section>
</template>

<style scoped lang="less">
.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	display: flex;
	border-top: 1px solid #f3f3f3;

	.tab-bar-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			width: 36px;
		}
		span {
			font-size: 12pz;
			margin-top: 2px;
		}
	}
}
</style>