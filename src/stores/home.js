import { getHomeCategories, getHomeHotSuggests, getHouseList } from "@/services";
import { defineStore } from "pinia";

export const useHomeStore = defineStore('home', {
	state: () => ({
		hotSuggests: [],
		categories: [],
		currentPage: 1, // 当前页数
		houseList: []
	}),
	actions: {
		fetchHotSuggestData() {
			getHomeHotSuggests().then(res => {
				this.hotSuggests = res.data
			})
		},
		fetchCategories() {
			getHomeCategories().then(res => {
				this.categories = res.data
			})
		},
		fetchHouseList() {
			getHouseList(this.currentPage++).then(res => {
				// this.houseList = this.houseList.concat(res.data)
				this.houseList.push(...res.data)
			})
		}
	}
})