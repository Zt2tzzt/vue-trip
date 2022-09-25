<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';
import { useHomeStore } from '@/stores'

const homeStory = useHomeStore()
homeStory.fetchHotSuggestData()
homeStory.fetchCategories()
</script>

<template>
	<div class="home">
		<!-- 顶部导航栏 -->
		<HomeNavBar />
    <!-- 横幅 -->
		<section class="banner">
			<img src="@/assets/img/home/banner.webp">
		</section>
		<!-- 搜索区域 -->
		<HomeSearchBox />
		
	</div>
</template>

<style scoped lang="less">
.banner {
	img {
		width: 100%;
	}
}
</style>