<script setup>
import { useCityStore, useHomeStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formartMonthDay, getGapOfDate } from '@/utils'
import { PRIMARY_COLOR } from '@/constant'

const router = useRouter()
const cityStore = useCityStore()
const homeStore = useHomeStore()

// 目标城市，当前位置
const onCityClick = () => {
	// 选择城市
	router.push('/city')
}
const { currentCity } = storeToRefs(cityStore) // 展示城市
const onPositionClick = () => {
	// 获取定位
	navigator.geolocation.getCurrentPosition(
		res => {
			console.log('获取位置成功', res)
		},
		err => {
			console.log('获取位置失败', err)
		},
		{
			enableHighAccuracy: true,
			timeout: 500,
			maximumAge: 0
		}
	)
}
// 滞留时间
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const startDate = ref(today) // 默认为今天
const endDate = ref(tomorrow) // 默认为明天
const gapOfDate = computed(() => getGapOfDate(startDate.value, endDate.value))
const startDateStr = computed(() => formartMonthDay(startDate.value))
const endDateStr = computed(() => formartMonthDay(endDate.value))
const showCalendar = ref(false) // 记录日期是否展示的状态
const onCalendarConfirm = values => {
	// 日历确认
	const [start, end] = values
	startDate.value = start
	endDate.value = end
	showCalendar.value = false
}
// 热门建议
const { hotSuggests } = storeToRefs(homeStore)
// 开始搜索按钮
const searchBtnClick = () => {
	router.push({
		path: '/search',
		query: {
			startDateStr: startDateStr.value,
			endDateStr: endDateStr.value,
			currentCity: currentCity.value.cityName
		}
	})
}
</script>

<template>
	<div class="home-search-box">
		<!-- 当前定位地址，目标城市展示 -->
		<section class="location">
			<div class="city" @click="onCityClick">{{ currentCity.cityName }}</div>
			<div class="position" @click="onPositionClick">
				<span class="text">我的位置</span>
				<img src="@/assets/img/home/icon_location.png" alt="" />
			</div>
		</section>
		<!-- 日期区域 -->
		<section class="section date-range" @click="showCalendar = true">
			<div class="date">
				<span class="tip">入住</span>
				<span class="time">{{ startDateStr }}</span>
			</div>
			<div class="stay">共{{ gapOfDate }}晚</div>
			<div class="date">
				<span class="tip">离店</span
				><span class="time">{{ endDateStr }}</span>
			</div>
		</section>
		<!-- 日历 -->
		<van-calendar
			v-model:show="showCalendar"
			type="range"
			:color="PRIMARY_COLOR"
			:round="false"
			:show-confirm="false"
			@confirm="onCalendarConfirm"
		/>
		<!-- 价格/人数选择 -->
		<section class="section price-counter bottom-gray-line">
			<div class="start">价格不限</div>
			<div class="end">人数不限</div>
		</section>
		<!-- 关键字 -->
		<section class="section keyword bottom-gray-line">
			关键字/位置/民宿名
		</section>
		<!-- 热门建议 -->
		<section class="section hot-suggests">
			<template v-for="(item, index) in hotSuggests" :key="index">
				<div
					class="item"
					:style="{
						color: item.tagText.color,
						background: item.tagText.background.color
					}"
				>
					{{ item.tagText.text }}
				</div>
			</template>
		</section>
		<section class="section search-btn">
			<div class="btn" @click="searchBtnClick">开始搜索</div>
		</section>
	</div>
</template>

<style scoped lang="less">
.home-search-box {
	--van-calendar-popup-height: 100%;
}
.location {
	display: flex;
	align-items: center;
	line-height: 1;
	height: 44px;
	padding: 0 20px;
	.city {
		flex: 1;
		position: relative;
		top: 4px;
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
			height: 18px;
		}
	}
}

.section {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 0 20px;
	color: #999;
	height: 44px;
}
.date-range {
	justify-content: space-between;
	margin-top: 10px;

	.end {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 44px;
	}

	.date {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 44px;

		.tip {
			font-size: 12px;
			color: #999;
		}

		.time {
			margin-top: 3px;
			color: #333;
			font-size: 15px;
			font-weight: 500;
		}
	}
}

.price-counter {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.start {
		border-right: 1px solid var(--line-color);
	}
}
.hot-suggests {
	margin: 10px 0;
	height: auto;
	.item {
		padding: 4px 8px;
		margin: 4px;
		border-radius: 14px;
		font-size: 12px;
		line-height: 1;
	}
}

.search-btn {
	.btn {
		width: 342px;
		height: 38px;
		max-height: 50px;
		border-radius: 20px;
		font-weight: 500;
		font-size: 18px;
		line-height: 38px;
		text-align: center;
		color: #fff;
		background-image: var(--theme-linear-gradient);
	}
}
</style>
