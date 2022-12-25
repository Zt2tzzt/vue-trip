import { getHomeCategories, getHomeHotSuggests, getHouseList } from "@/services";
import { defineStore } from "pinia";

export default defineStore('home', {
	state: () => ({
		hotSuggests: [],
		categories: [],
		currentPage: 1, // 当前页数
		houseList: []
	}),
	actions: {
		fetchHotSuggestData() {
			getHomeHotSuggests().then(res => {
				console.log('hotSuggests res:', res.data)
				this.hotSuggests = res.data
			})
		},
		fetchCategories() {
			getHomeCategories().then(res => {
				console.log('categories res:', res)
				this.categories = res.data
			})
		},
		fetchHouseList() {
			return getHouseList(this.currentPage++).then(res => {
				console.log('houseList res:', res)
				// this.houseList = this.houseList.concat(res.data)
				this.houseList.push(...res.data)
			})
		}
	}
})