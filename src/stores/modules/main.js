import { defineStore } from "pinia";

const startDate = new Date
const endDate = new Date
endDate.setDate(endDate.getDate() + 1)

export default defineStore('main', {
	state: () => ({
		token: '',
		startDate,
		endDate,
		isLoading: false
	})
})