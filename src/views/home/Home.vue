<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue'
import HomeSearchBox from './cpns/HomeSearchBox.vue'
import useHomeStore from '@/stores/modules/home'
import Homecategory from './cpns/Homecategory.vue'
import HomeContent from './cpns/HomeContent.vue'
import { useScroll } from '@/hooks'
import { computed, watch } from 'vue'
import SearchBar from '@/components/search-bar/SearchBar.vue'

const homeStory = useHomeStore()

homeStory.fetchHotSuggestData()
homeStory.fetchCategories()
homeStory.fetchHouseList() // 获取 Content 中的内容
// 上拉加载更多，增加 Content 中的内容
const { isReachBottom, scrollTopRef } = useScroll()
watch(isReachBottom, newValue => {
	if (newValue) {
		homeStory.fetchHouseList().then(() => {
			isReachBottom.value = false
		})
	}
})
// 是否展示搜索框
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
