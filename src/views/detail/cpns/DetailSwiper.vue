<script setup>
const props = defineProps({
	swiperData: {
		type: Array,
		default: () => ({})
	}
})

// 数据整理
/* const swiperGroup = {}
props.swiperData.forEach(item => {
	let valueArr = swiperGroup[item.enumPictureCategory]
	valueArr ||= []
	valueArr.push(item)
}) */
const swiperGroup = props.swiperData.reduce((accumulate, current) => {
	const valueArr = accumulate[current.enumPictureCategory] ||= []
	valueArr.push(current)
	return accumulate
}, {})
//获取  title 名称转换
const nameRegEx = /【(.*?)】/i
const getName = (name) => nameRegEx.exec(name).at(1)
// 获取当前图片所在目录的索引
const getCategoryIndex = item => swiperGroup[item.enumPictureCategory].findIndex(iten => iten === item) + 1
</script>

<template>
	<div class="detail-swiper">
		<van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
			<!-- 图片展示 -->
			<template v-for="item of swiperData" :key="item.url">
				<van-swipe-item class="item">
					<img :src="item.url" alt="" />
				</van-swipe-item>
			</template>
			<!-- 使用指示器的插槽 -->
			<template #indicator="{ active }">
				<div class="indicator">
					<template v-for="(value, key) in swiperGroup" :key="key">
						<span :class="['item', { active: swiperData[active]?.enumPictureCategory == key }]">
							<span class="text">{{ getName(value[0].title) }}</span>
							<span class="count" v-if="swiperData[active]?.enumPictureCategory == key">
								{{ getCategoryIndex(swiperData[active]) }}/{{ value.length }}
							</span>
						</span>
					</template>
				</div>
			</template>
		</van-swipe>
	</div>
</template>

<style scoped lang="less">
.swipe-list {
	.item {
		img {
			width: 100%;
		}
	}

	.indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
		display: flex;
		align-items: center;
    padding: 2px 5px;
    font-size: 12px;
		color: #fff;
    background: rgba(0, 0, 0, 0.8);
		.item {
			margin: 0 3px;

			.text, .count {
				position: relative;
				top: 2px;
			}
			&.active {
				padding: 0 3px;
				border-radius: 5px;
				background-color: #fff;
				color: #333;
			}
		}
  }
}

</style>
