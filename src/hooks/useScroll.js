import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { ztThrottle } from '@/utils'

export default elRef => {
	let el = null
	let eleOfListenner = null
	const isReachBottom = ref(false)
	const scrollTopRef = ref(0)
	const clientHeightRef = ref(0)
	const scrollHeightRef = ref(0)

	const scrollListenerHandler = ztThrottle(
		() => {
			// console.log('---elRef---', elRef.value)
			eleOfListenner = el === window ? document.documentElement : el
			// console.log('---eleOfListenner---', eleOfListenner)
			const { clientHeight, scrollTop, scrollHeight } = eleOfListenner
			scrollTopRef.value = scrollTop
			clientHeightRef.value = clientHeight
			scrollHeightRef.value = scrollHeight
			// console.log('---clientHeight---', clientHeight)
			// console.log('---scrollTop---', scrollTop)
			// console.log('---scrollHeight---', scrollHeight)
			if (clientHeight + scrollTop >= scrollHeight) {
				console.log('滚动到底部了')
				isReachBottom.value = true
			} else {
				isReachBottom.value = false
			}
		},
		100,
		{ trailing: true }
	)

	onMounted(() => {
		// console.log('---elRef---', elRef.value)
		el = elRef?.value || window
		// console.log('---el---', el)
		el.addEventListener('scroll', scrollListenerHandler)
		// window.addEventListener('scroll', scrollListenerHandler)
	})

	onUnmounted(() => {
		el.removeEventListener('scroll', scrollListenerHandler)
		// window.removeEventListener('scroll', scrollListenerHandler)
	})

	onActivated(() => {
		el.addEventListener('scroll', scrollListenerHandler)
	})

	onDeactivated(() => {
		el.removeEventListener('scroll', scrollListenerHandler)
	})

	return {
		isReachBottom,
		scrollTop: scrollTopRef,
		clientHeight: clientHeightRef,
		scrollHeight: scrollHeightRef
	}
}
