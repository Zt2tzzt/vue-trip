<script setup>
defineProps({
	priceInfo: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
	<div class="detail-intro">
		<div class="title">{{ priceInfo.title }}</div>
		<div class="content">{{ priceInfo.introduction }}</div>
	</div>
</template>

<style scoped lang="less">
.detail-intro {
	padding: 16px 12px;
	border: 5px #f2f3f4 solid;
	.title {
		font-size: 14px;
		color: #888;
		font-weight: 700;
	}
	.content {
		margin-top: 10px;
		font-size: 12px;
		line-height: 1.5;
		color: #666;
	}	
}
</style>