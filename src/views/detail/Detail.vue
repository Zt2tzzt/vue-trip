<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDeailInfos } from '@/services'
import { computed, ref } from 'vue';
import DetailSwiper from './cpns/DetailSwiper.vue';

const route = useRoute()
const router = useRouter()

// 发送请求，获取详情页数据，采用在页面内管理数据的模式。
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDeailInfos(route.params.id).then(res => {
	detailInfos.value = res.data
})

// 返回按钮点击
const onClickLeft = () => {
	router.back()
}
</script>

<template>
	<div class="detail">
		<!-- 导航栏 -->
		<van-nav-bar
			title="房屋详情"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<!-- 主题区域 -->
		<div class="main" v-if="mainPart">
			<!-- 轮播图 -->
			<DetailSwiper :swiperData="mainPart.topModule.housePicture.housePics" />
		</div>
	</div>
</template>

<style scoped lang="less"></style>
