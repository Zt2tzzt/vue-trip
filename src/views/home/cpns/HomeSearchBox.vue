<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const cityClick = () => {
	router.push('/city')
}
const positionClick = () => {
	navigator.geolocation.getCurrentPosition(res => {
		console.log('获取位置成功', res)
	}, err => {
		console.log('获取位置失败', err)
	}, {
		enableHighAccuracy: true,
		timeout: 500,
		maximumAge: 0
	})
}
</script>

<template>
	<div class="home-search-box">
		<!-- 当前定位地址，目标城市展示 -->
		<section class="location">
			<div class="city" @click="cityClick">广州</div>
			<div class="position" @click="positionClick">
				<span class="text">我的位置</span>
				<img src="@/assets/img/home/icon_location.png" alt="">
			</div>
		</section>
	</div>
</template>

<style scoped lang="less">
.location {
	display: flex;
	align-items: center;
	height: 44px;
	padding: 0 20px;
	.city {
		flex: 1;
		font-size: 15px;
		color: #333;
	}
	.position {
		width: 74px;
		display: flex;
		align-items: center;
		.text {
			position: relative;
			top: 2px;
			font-size: 12px;
			color: #666;
		}
		img {
			margin-left: 5px;
			width: 18px;
			height: 19px;
		}
	}
}
</style>