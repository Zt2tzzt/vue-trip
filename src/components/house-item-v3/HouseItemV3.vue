<script setup>
defineProps({
	itemData: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
	<div class="house-item-v3">
		<div class="cover"><img :src="itemData?.image.url" alt="" /></div>
		<div class="info">
			<div class="location">
				<img src="@/assets/img/home/location.png" alt="" />
				<span>{{ itemData.location }}</span>
			</div>
			<div class="name">{{ itemData.houseName }}</div>
			<div class="summary">{{ itemData.summaryText }}</div>
			<div class="price">
				<div class="new">￥{{ itemData.finalPrice }}</div>
				<div class="old">￥{{ itemData.productPrice }}</div>
				<div class="tip" v-if="itemData.priceTipBadge">
					{{ itemData.priceTipBadge.text }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.house-item-v3 {
	width: 50%;
	margin: 5px;
	background: #fff;
	border-radius: 6px;
	overflow: hidden;
	.cover {
		img {
			width: 100%;
		}
	}
	.info {
		padding: 8px 10px;
		color: #666;
		font-size: 12px;
	}
	.location {
		display: flex;
		align-items: center;
		img {
			width: 12px;
			height: 12px;
		}
		.text
	}
}
</style>
