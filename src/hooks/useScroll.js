import { ref, onMounted, onUnmounted } from 'vue'
import { ztThrottle } from '@/utils'

const isReachBottom = ref(false)
export const useScroll = () => {
	const scrollTopRef = ref(0)
	const scrollListenerHandler = ztThrottle(() => {
		const { clientHeight, scrollTop, scrollHeight } = document.documentElement
		scrollTopRef.value = scrollTop
		if (clientHeight + scrollTop >= scrollHeight) {
			console.log('滚动到底部了')
			isReachBottom.value = true
		}
	}, 300, {trailing: true})

	onMounted(() => {
		window.addEventListener('scroll', scrollListenerHandler)
	})
	onUnmounted(() => {
		window.removeEventListener('scroll', scrollListenerHandler)
	})

	return {
		isReachBottom,
		scrollTopRef
	}
}
