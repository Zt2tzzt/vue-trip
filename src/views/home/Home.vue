<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue'
import HomeSearchBox from './cpns/HomeSearchBox.vue'
import { useHomeStore } from '@/stores'
import Homecategory from './cpns/Homecategory.vue'
import HomeContent from './cpns/HomeContent.vue'
import { useScroll } from '@/hooks'
import { computed, watch } from 'vue'
import SearchBar from '@/components/search-bar/SearchBar.vue'

const homeStory = useHomeStore()
homeStory.fetchHotSuggestData()
homeStory.fetchCategories()
homeStory.fetchHouseList()
// 上拉加载更多
const { isReachBottom, scrollTopRef } = useScroll()
watch(isReachBottom, newValue => {
	if (newValue) {
		homeStory.fetchHouseList().then(() => {
			isReachBottom.value = false
		})
	}
})
const isShowSearchBar = computed(() => scrollTopRef.value >= 360)
</script>

<template>
	<div class="home">
		<!-- 顶部搜搜框 -->
		<SearchBar v-show="isShowSearchBar" />
		<!-- 顶部导航栏 -->
		<HomeNavBar />
		<!-- 横幅 -->
		<section class="banner">
			<img src="@/assets/img/home/banner.webp" />
		</section>
		<!-- 搜索区域 -->
		<HomeSearchBox />
		<!-- Category 区域 -->
		<Homecategory />
		<!-- Content 区域 -->
		<HomeContent />
		<button @click="homeStory.fetchHouseList()">加载更多</button>
	</div>
</template>

<style scoped lang="less">
.home {
	padding-bottom: 60px;
}
.banner {
	img {
		width: 100%;
	}
}
</style>
