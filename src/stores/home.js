import { getHomeCategories, getHomeHotSuggests } from "@/services";
import { defineStore } from "pinia";

export const useHomeStore = defineStore('home', {
	state: () => ({
		hotSuggests: [],
		categories: []
	}),
	actions: {
		fetchHotSuggestData() {
			getHomeHotSuggests().then(res => {
				this.hotSuggests = res.data
			})
		},
		fetchCategories() {
			getHomeCategories().then(res => {
				console.log('---cate res---', res)
				this.categories = res.data
			})
		}
	}
})