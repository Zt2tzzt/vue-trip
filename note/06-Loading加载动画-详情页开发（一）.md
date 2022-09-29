# 封装 Loading 组件

为增加用户体验，点击蒙板，组件隐藏。

在网络请求拦截器中，处理模板隐藏显示逻辑。

> Pinia 中导出生成 store 的函数时，最好不要集中导出，如
>
> `export * from './modules/main'`
>
> 导入函数时，最好单独导入，如：
>
> `import useMainStore from '@/stores/modules/main'`

src \ components \ loading \ Loading.vue

```vue
<script setup>
import useMainStore from '@/stores/modules/main';

const mainStore = useMainStore()
// 用户点击时，隐藏组件，增加用户体验。
const loadingClick = () => mainStore.isLoading = false
</script>

<template>
	<div class="loading" v-show="mainStore.isLoading" @click="loadingClick">
		<div class="bg">
			<img src="@/assets/img/home/full-screen-loading.gif" alt="">
		</div>
	</div>
</template>

<style scoped lang="less">
.loading {
	position: fixed;
	z-index: 999;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, .2);
	.bg {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 104px;
		height: 104px;
		background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
		img {
			width: 70px;
			height: 70px;
			margin-bottom: 8px;
		}
	}
}
</style>
```

src \ services \ request \ index.js

```js
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()
// ...
// 使用拦截器（全局拦截器）
this.instance.interceptors.request.use(
  config => {
    if (this.showLoading) {
      mainStore.isLoading = true
    }
    return config
  },
  err => {
    return err
  }
)
this.instance.interceptors.response.use(
  res => {
    const data = res.data
    mainStore.isLoading = false
    return data
  },
  err => {
    mainStore.isLoading = false
    return err
  }
)
// ...
```

src \ App.vue

```vue
<script setup>
import TabBar from './components/tab-bar/TabBar.vue'
import Loading from './components/loading/Loading.vue'
import { useRoute } from 'vue-router'

const route = useRoute() // 返回的 route 对象，是响应式的，可以直接在 template 中使用。
</script>
<template>
	<div class="app">
		<router-view />
		<TabBar v-show="!route.meta.hiddeTabBar" />
		<Loading />
	</div>
</template>
```

# 详情页开发，创建 Detail 组件

跳转详情页，

- 在 HomeContent 中的 HouseItemV3 / HouseItemV9 组件上监听点击事件，
- 该点击事件，会作为非 prop 的 attribute 传递到组件的根节点。

src \ views \ home \ cpns \ HomeContent.vue

```vue
<script setup>
import useHomeStore from '@/stores/modules/home'
import HouseItemV3 from '@/components/house-item-v3/HouseItemV3.vue'
import HouseItemV9 from '@/components/house-item-v9/HouseItemV9.vue'
import { useRouter } from 'vue-router'

const homeStore = useHomeStore()
const router = useRouter()
const onItemClick = houseId => {
	router.push(`/detail/` + houseId)
}
</script>
<template>
	<div class="home-content">
		<div class="title">热门精选</div>
		<div class="list">
			<template v-for="item of homeStore.houseList" :key="item.data.houseId">
				<HouseItemV3
					v-if="item.discoveryContentType === 3"
					:itemData="item.data"
					@click="onItemClick(item.data.houseId)"
				/>
				<HouseItemV9
					v-else-if="item.discoveryContentType === 9"
					:itemData="item.data"
					@click="onItemClick(item.data.houseId)"
				/>
			</template>
		</div>
	</div>
</template>
<style scoped lang="less">
.home-content {
	padding: 10px 8px;
	.title {
		font-size: 22px;
		padding: 10px;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
```

配置 Detail 组件的路由，采用动态路由。

src \ router \ index.js

```js
{
  path: '/detail/:id',
  component: () => import('@/views/detail/Detail.vue'),
  meta: { hiddeTabBar: true }
}
```

在 Detail 中，开发导航组件，使用 Vant 中的组件

在 Detail 中，发送网络请求，请求数据。这次采用在页面内管理数据的模式。

src \ views \ detail \ Detail.vue

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDeailInfos } from '@/services'
import { computed, ref } from 'vue';
import DetailSwiper from './cpns/DetailSwiper.vue';

const route = useRoute()
const router = useRouter()

// 发送请求，获取详情页数据。
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
```

# 开发 DetailSwiper 组件

在 Detai 中，开发 DetailSwiper 组件。指示器使用插槽自定义。

```vue
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
const getName = (name) => {
	const res = nameRegEx.exec(name)
	return res[1]
}
// 获取当前图片所在目录的索引
const getCategoryIndex = item => {
	return swiperGroup[item.enumPictureCategory].findIndex(iten => iten === item) + 1
}
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
```
