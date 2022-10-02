<script>
	export default {
		name: 'home'
	}
</script>
<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue'
import HomeSearchBox from './cpns/HomeSearchBox.vue'
import useHomeStore from '@/stores/modules/home'
import Homecategory from './cpns/Homecategory.vue'
import HomeContent from './cpns/HomeContent.vue'
import useScroll from '@/hooks/useScroll'
import { computed, onActivated, ref, watch } from 'vue'
import SearchBar from '@/components/search-bar/SearchBar.vue'

const homeStory = useHomeStore()

// 发送网络请求
homeStory.fetchHotSuggestData()
homeStory.fetchCategories()
homeStory.fetchHouseList()

// 上拉加载更多，增加 Content 中的内容
const homeRef = ref(null)
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, newValue => {
	if (newValue) {
		homeStory.fetchHouseList().then(() => {
			isReachBottom.value = false
		})
	}
})

// 是否展示搜索框
const isShowSearchBar = computed(() => scrollTop.value >= 360)

// 返回 Home 时，保留原来的滚动位置
onActivated(() => {
	homeRef.value?.scrollTo({
		top: scrollTop.value
	})
})

</script>

<template>
	<div class="home" ref="homeRef">
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
	height: 100vh;
	box-sizing: border-box;
	overflow-y: auto;
}
.banner {
	img {
		width: 100%;
	}
}
</style>
