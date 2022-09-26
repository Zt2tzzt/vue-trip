<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';
import { useHomeStore } from '@/stores'
import Homecategory from './cpns/Homecategory.vue';
import HomeContent from './cpns/HomeContent.vue';

const homeStory = useHomeStore()
homeStory.fetchHotSuggestData()
homeStory.fetchCategories()
homeStory.fetchHouseList()
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
		<!-- Category 区域 -->
		<Homecategory />
		<!-- Content 区域 -->
		<HomeContent />
	</div>
</template>

<style scoped lang="less">
.banner {
	img {
		width: 100%;
	}
}
</style>