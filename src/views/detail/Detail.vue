<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDeailInfos } from '@/services'
import { computed, reactive, ref, watch } from 'vue'
import DetailSwiper from './cpns/DetailSwiper.vue'
import DetailInfos from './cpns/DetailInfos.vue'
import DetailFacility from './cpns/DetailFacility.vue'
import DetailLandlord from './cpns/DetailLandlord.vue'
import DetailComment from './cpns/DetailComment.vue'
import DetailNotice from './cpns/DetailNotice.vue'
import DetailMap from './cpns/DetailMap.vue'
import DetailIntro from './cpns/DetailIntro.vue'
import TabControl from '@/components/tab-control/TabControl2.vue'
import useScroll from '@/hooks/useScroll'

const route = useRoute()
const router = useRouter()

// 发送请求，获取详情页数据，采用在页面内管理数据的模式。
const detailInfos = ref({})
getDeailInfos(route.params.id).then(res => {
	detailInfos.value = res.data
})
const mainPart = computed(() => detailInfos.value.mainPart)

// 返回按钮点击
const onClickLeft = () => {
	router.back()
}

// tabControl 相关操作
const mainRef = ref(null) // 根元素对象
const { scrollTop, isReachBottom } = useScroll(mainRef) // 拿到滚动位置
const showTabControl = computed(() => scrollTop.value >= 300) // 记录是否需要展示 TabControl
const sectionEls = reactive({}) // 元素 name，与元素对象的映射
const getSectionRef = value => {
	// 用于获取到绑定组件，根元素上的 name 属性
	if (!value) return
	const name = value.$el.getAttribute('name')
	sectionEls[name] = value.$el
}
const names = computed(() => Object.keys(sectionEls)) // 获取到 TabControl 的名称数组
// Tab 点击事件处理
let isClick = false // 记录 Tab 是否被点击了
let currentDistance = 0 // 记录当前滚动位置
const onTabItemClick = index => {
	const key = names.value[index]
	const el = sectionEls[key]
	let distance = el.offsetTop
	if (index !== 0) {
		distance -= 44 + 46
	}
	isClick = true
	currentDistance = distance
	mainRef.value.scrollTo({
		top: distance,
		behavior: 'smooth'
	})
}

// 监听页面滚动，TabControl 做相应切换
const tabIndex = ref(0)
watch(scrollTop, newVal => {
	if (!isClick) {
		const els = Object.values(sectionEls)
		const index = els.map(el => el.offsetTop).findIndex(topVal => topVal - 44 - 46 > newVal) - 1
		tabIndex.value = isReachBottom || index === -1 ? els.length - 1 : index
	} else if (currentDistance === newVal) {
		isClick = false
	}

})
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
		<!-- Tab 栏 -->
		<TabControl
			class="tab"
			v-if="showTabControl"
			:titles="names"
			:tabIndex="tabIndex"
			@tabItemClick="onTabItemClick"
		/>
		<!-- 主题区域 -->
		<div class="main" ref="mainRef">
			<section v-if="mainPart" v-memo="[mainPart]">
				<!--- main 元素滚动时，里面的组件会刷新，使用 v-memo 指令，阻止频繁的刷新 -->
				<!-- 轮播图 -->
				<DetailSwiper :swiperData="mainPart.topModule.housePicture.housePics" />
				<!-- 描述 -->
				<DetailInfos
					name="描述"
					:ref="getSectionRef"
					:topModule="mainPart.topModule"
				/>
				<!-- 设施 -->
				<DetailFacility
					name="设施"
					:ref="getSectionRef"
					:houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"
				/>
				<!-- 房东 -->
				<DetailLandlord
					name="房东"
					:ref="getSectionRef"
					:landlord="mainPart.dynamicModule.landlordModule"
				/>
				<!-- 评论 -->
				<DetailComment
					name="评论"
					:ref="getSectionRef"
					:comment="mainPart.dynamicModule.commentModule"
				/>
				<!-- 须知 -->
				<DetailNotice
					name="须知"
					:ref="getSectionRef"
					:order-rules="mainPart.dynamicModule.rulesModule.orderRules"
				/>
				<!-- 周边 -->
				<DetailMap
					name="周边"
					:ref="getSectionRef"
					:position="mainPart.dynamicModule.positionModule"
				/>
				<!-- 介绍 -->
				<DetailIntro :priceInfo="mainPart.introductionModule" />
			</section>
			<footer class="footer">
				<img src="@/assets/img/detail/icon_ensure.png" alt="" />
				<div class="text">ZT旅途，永无止境</div>
			</footer>
		</div>
	</div>
</template>

<style scoped lang="less">
.tab {
	position: fixed;
	z-index: 99;
	left: 0;
	right: 0;
	top: var(--van-nav-bar-height);
}
.main {
	height: calc(100vh - var(--van-nav-bar-height));
	overflow-y: auto;

	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 120px;
		img {
			width: 123px;
		}
		.text {
			margin-top: 12px;
			font-size: 12px;
			color: #7699a7;
		}
	}
}
</style>
