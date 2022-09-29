import { defineStore } from "pinia";
import { getAllCities } from "@/services";

export default defineStore('city', {
	state: () => ({
		allCities: [],
		currentCity: {
			cityName: '深圳'
		}
	}),
	actions: {
		async fetchAllCities() {
			const res = await getAllCities()
			this.allCities = res.data
		}
	}
})
