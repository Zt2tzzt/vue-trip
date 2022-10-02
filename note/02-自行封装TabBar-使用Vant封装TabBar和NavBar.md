# 自封装 TabBar 组件

点击后激活，并跳转路由。

```vue
<script setup>
import tabBarData from '@/assets/data/tab-bar'
import { getAssetURL } from '@/utils/load-asstes'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const currentIndex = ref(0)
const router = useRouter()
const onTabBarClick = index => {
	currentIndex.value = index
	router.push(tabBarData[index].path)
}
</script>

<template>
	<section class="tab-bar">
		<template v-for="(item, index) of tabBarData" :key="item.text">
			<div
				class="tab-bar-item"
				:class="{ active: currentIndex === index }"
				@click="onTabBarClick(index)"
			>
				<img
					v-if="currentIndex === index"
					:src="getAssetURL(currentIndex === index ? item.imageActive : item.image)"
					alt=""
				/>
				<span>{{ item.text }}</span>
			</div>
		</template>
	</section>
</template>

<style scoped lang="less">
.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	display: flex;
	border-top: 1px solid #f3f3f3;
	.tab-bar-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&.active {
			color: var(--primary-color);
		}
		img {
			width: 36px;
		}
		span {
			font-size: 12pz;
			margin-top: 2px;
		}
	}
}
</style>
```

# 常见 UI 库

项目常见的开发类型对应的 UI 库

- Vue 项目
	- 后台管理系统：Element UI / Element Plus / Vant UI
	- 移动端 Web 页面：Vant UI
	- 门户网站：
		- 国外：Material UI（react，Vue）
		- 国内：完全匹配的 UI 库很少，但有合适的还是可以使用，tree-shaking 机制不会增加打包后包的大小。
- React 项目：Ant Design
- 小程序项目：原生 UI 库、Vant

# 上手 Vant UI 库

参考 [Vant 文档](https://vant-contrib.gitee.io/vant/v4/#/zh-CN)

1. 安装 Vant UI 库，

   ```shell
   # 安装最新版 Vant
   npm i vant
   ```

2. 安装按需引入的插件。[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 

   ```shell
   npm i unplugin-vue-components -D
   ```

3. 进行配置，

   vite.config.js

   ```js
   import vue from '@vitejs/plugin-vue';
   import Components from 'unplugin-vue-components/vite';
   import { VantResolver } from 'unplugin-vue-components/resolvers';
   
   export default {
     plugins: [
       vue(),
       Components({
         resolvers: [VantResolver()],
       }),
     ],
   };
   ```

4. 重启项目。

# 使用 Vant UI 库，封装 TabBar

src / components / tab-bar / TabBar.vue

```vue
<script setup>
import tabBarData from '@/assets/data/tab-bar'
import { getAssetURL } from '@/utils/load-asstes'
import { ref } from 'vue'

const currentIndex = ref(0)
</script>

<template>
	<footer class="tab-bar">
		<van-tabbar v-model="currentIndex" active-color="#ff9845">
			<template v-for="(item, index) of tabBarData" :key="item.text">
				<van-tabbar-item icon="home-o" :to="item.path">
          <!-- icon 插槽 -->
					<template #icon="props">
						<img
							:src="getAssetURL(props.active ? item.imageActive : item.image)"
						/>
					</template>
					<!-- 默认插槽 -->
					<span>{{ item.text }}</span>
				</van-tabbar-item>
			</template>
		</van-tabbar>
	</footer>
</template>

<style scoped lang="less">
.tab-bar {
	img {
		height: 26px;
	}
}
</style>
```

# 重置样式，3种情况（重点）

重置第三方库组件样式的3种情况：

- 重写样式前，先看下第三方组件有没有提供对应的属性或插槽，以支持自定义的设置。

  - 比如：使用插槽后，插入自己的元素，然后在自己的作用域中直接修改该元素。

  ```less
  .tab-bar {
    img {
      height: 30px;
    }
  }
  ```

  

- 重写样式情况一：如果在第三方组件中，要重置的样式应用了 css 变量值，那么可以重写对应的 css 变量值，
  - 在全局重写，如；

  ```css
  :root {
  	--van-tabbar-item-icon-size: 30px !important;
  }
  ```

  - 在局部重写，如：

  ```css
  .tab-bar {
  	--van-tabbar-item-icon-size: 30px !important;
  }
  ```

- 重写样式情况二：重写对应的 css 属性，意味着需要在父组件中，拿到引用的第三方库的组件中的选择器，并重写该选择器对应的样式。有2种方案
  - 去掉 style 元素上的 scoped，直接重写（不推荐）。
  - 使用 Vue 中的特殊语法 `:deep()`，找到子组件的类选择器，并重写样式：

  ```css
  .tab-ar {
    /* :deep(.class) 找到子组件的类, 让子组件的类重写生效 */
    :deep(.van-tabbar-item__icon) {
      font-size: 50px;
    }
  }
  ```

# 首页开发

## 封装顶部导航栏组件 HomeNavBar

src / views / home / cpns / HomeNavBar.vue

```vue
<script setup>
</script>

<template>
	<nav class="home-nav-bar">
		<div class="title">ZT旅途</div>
	</nav>
</template>

<style scoped lang="less">
.home-nav-bar {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	border-bottom: 1px #f2f2f2 solid;
	.title {
		color: var(--primary-color);
		font-size: 16px;
		font-weight: 600;
	}
}
</style>
```

## 首页横幅 banner 图片展示。

src / views / home / Home.vue

```vue
<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';

</script>

<template>
	<div class="home">
		<!-- 顶部导航栏 -->
		<HomeNavBar />
    <!-- 横幅 -->
		<section class="banner">
			<img src="@/assets/img/home/banner.webp">
		</section>
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
```

> 项目依赖安装报错，peerDependencies 对等依赖的版本过高，可以通过 `npm install --force` 强制安装依赖

## 封装旅途搜索 HomeSearchBox 组件，

src \ views \ home \ cpns \ HomeSearchBox.vue

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const cityClick = () => { // 跳转搜索城市的页面。
	router.push('/city')
}
const positionClick = () => { // 获取地理位置信息
	navigator.geolocation.getCurrentPosition(res => { // 获取经纬度。
		console.log('获取位置成功', res)
	}, err => {
		console.log('获取位置失败', err)
	}, {
		enableHighAccuracy: true,
		timeout: 500,
		maximumAge: 0
	})
}
</script>

<template>
	<div class="home-search-box">
    <!-- 当前定位地址，目标城市展示 -->
		<section class="location">
			<div class="city" @click="cityClick">广州</div>
			<div class="position" @click="positionClick">
				<span class="text">我的位置</span>
				<img src="@/assets/img/home/icon_location.png" alt="">
			</div>
		</section>
	</div>
</template>

<style scoped lang="less">
.location {
	display: flex;
	align-items: center;
	height: 44px;
	padding: 0 20px;
	.city {
		flex: 1;
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
			height: 19px;
		}
	}
}
</style>
```

## 一个页面的数据请求和管理有哪些方式？各有什么特点（重点）

方式一：保存在页面中，大多数情况下不推荐，缺点:

* 如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
* 如果页面封装了很多的子组件, 子组件需要这些数据, 我们必须一步步将数据传递过去(props)

方式二：保存在 store 中

* 如 city.vue 一个页面，对应 stores / modules / city.js 一个 cityStore ，对应 services / modules / city.js 网络请求。
* 对于 city 的所有网络请求, 这种**分层架构**结构清晰, 分工明确，效率高。

## 隐藏 TabBar 的2种方案（重点）

方案一：配置路由的 meta 属性；

src / router / index.js

```js
// ...
const routes = [
  {
    path: '/city',
    component: () => import('@/views/city/City.vue'),
    meta: {
      hiddeTabBar: true
    }
  }
]
// ...
```

src / App.vue

```vue
<script setup>
import { useRoute } from 'vue-router';
import TabBar from './components/tab-bar/TabBar.vue';

const route = useRoute() // 返回的 route 对象是响应式的，可直接在 template 中使用。
</script>

<template>
  <div class="app">
    <router-view />
    <TabBar v-show="!route.meta.hiddeTabBar" />
  </div>
</template>
```

方案二：抽取隐藏 TabBar 的样式，并在组件上应用样式。

src \ assets \ css \ common.css

```css
/* 组件中用于隐藏底部 TabBar 的样式 */
.top-page {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* height: 100vh;
  overflow-y: auto; */
}
```

src \ views \ city \ City.vue

```vue
<template>
	<div class="city top-page">
    <!-- ... -->
  </div>
</template>
```

