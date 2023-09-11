import Enum from "@/locale/VN/emulation/MISAEnum";
import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			data: [],
			filterData: {
				ApplyObject: -1,
				CommendationLevel: -1,
				MovementType: -1,
				IsSystem: -1,
			},
			dataTable: [],
			checkedList: [],
			emulationSearch: "",
			currentPage: 0,
			rowNumber: Enum.Paging.Large,
			isShowToastMessage: false,
			toastMessage: {},
		};
	},
	mutations: {
		setData(state, data) {
			state.data = data;
			localStorage.setItem("emulations", JSON.stringify(data));
		},
		setDataTable(state, dataTable) {
			state.dataTable = dataTable;
		},
		setCheckedList(state, checkedList) {
			state.checkedList = checkedList;
		},
		setFilterData(state, value) {
			state.currentPage = 0;
			state.filterData = { ...value };
		},
		setEmulationSearch(state, value) {
			state.currentPage = 0;
			state.emulationSearch = value;
		},
		setCurrentPage(state, value) {
			state.currentPage = value;
		},
		setRowNumber(state, value) {
			state.currentPage = 0;
			state.rowNumber = value;
		},
		showToastMessage(state, value) {
			state.toastMessage = {
				IsShow: true,
				...value,
			};

			setTimeout(() => {
				state.toastMessage = {
					IsShow: false,
				};
			}, 3000);
		},
	},
	actions: {
		fetchAPIEmulation({ commit }) {
			try {
				// const data = [
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 3,
				// 		EmulationTitleCode: "LĐTTCX",
				// 		EmulationTitleID: 50,
				// 		EmulationTitleName: "Lao động tiên tiến",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 2,
				// 		EmulationTitleCode: "CSTĐCS",
				// 		EmulationTitleID: 48,
				// 		EmulationTitleName: "Chiến sĩ thi đua cơ sở",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 2,
				// 		EmulationTitleCode: "LĐTTCH",
				// 		EmulationTitleID: 49,
				// 		EmulationTitleName: "Lao động tiên tiến",
				// 		Inactive: 0,
				// 		IsSystem: 0,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "CSTĐCB",
				// 		EmulationTitleID: 46,
				// 		EmulationTitleName: "Chiến sĩ thi đua cấp bộ",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "CSTĐCT",
				// 		EmulationTitleID: 47,
				// 		EmulationTitleName: "Chiến sĩ thi đua cấp tỉnh",
				// 		Inactive: 0,
				// 		IsSystem: 0,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 2,
				// 		CommendationLevel: 0,
				// 		EmulationTitleCode: "CSTĐTQ",
				// 		EmulationTitleID: 45,
				// 		EmulationTitleName: "Chiến sĩ thi đua toàn quốc",
				// 		Inactive: 0,
				// 		IsSystem: 0,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 1,
				// 		CommendationLevel: 2,
				// 		EmulationTitleCode: "TTLĐTT",
				// 		EmulationTitleID: 55,
				// 		EmulationTitleName: "Tập thể lao động tiên tiến",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 1,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "CTĐCB",
				// 		EmulationTitleID: 52,
				// 		EmulationTitleName: "Cờ thi đua cấp bộ",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: -1,
				// 	},
				// 	{
				// 		ApplyObject: 1,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "CTĐCT",
				// 		EmulationTitleID: 53,
				// 		EmulationTitleName: "Cờ thi đua cấp tỉnh",
				// 		Inactive: 0,
				// 		IsSystem: 0,
				// 		MovementType: -1,
				// 	},
				// 	{
				// 		ApplyObject: 1,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "TTLĐXS",
				// 		EmulationTitleID: 54,
				// 		EmulationTitleName: "Tập thể lao động xuất sắc",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 0,
				// 	},
				// 	{
				// 		ApplyObject: 1,
				// 		CommendationLevel: 1,
				// 		EmulationTitleCode: "CTĐCP",
				// 		EmulationTitleID: 51,
				// 		EmulationTitleName: "Cờ thi đua chính phủ",
				// 		Inactive: 0,
				// 		IsSystem: 1,
				// 		MovementType: 1,
				// 	},
				// ];
				// localStorage.setItem("emulations", JSON.stringify(data));

				const dataAPI = JSON.parse(localStorage.getItem("emulations"));
				commit("setData", dataAPI);
			} catch (e) {
				console.log(e);
			}
		},
	},
	getters: {
		getData(state) {
			return state.data;
		},
		getFilterData(state) {
			return state.filterData;
		},
		getCheckedList(state) {
			return state.checkedList;
		},
		getEmulationSearch(state) {
			return state.emulationSearch;
		},
		getTotalRow(state) {
			return state.data.length;
		},
		getFirstRow(state) {
			return state.rowNumber * state.currentPage;
		},
		getLastRow(state, getters) {
			return Math.min(
				state.rowNumber * (state.currentPage + 1),
				getters.getDataTableFilter.length
			);
		},
		getDataTableFilter(state) {
			return state.data.filter(
				(item) =>
					(item.EmulationTitleCode.toLowerCase().includes(
						state.emulationSearch.toLowerCase()
					) ||
						item.EmulationTitleName.toLowerCase().includes(
							state.emulationSearch.toLowerCase()
						)) &&
					(state.filterData.ApplyObject == -1 ||
						item.ApplyObject == state.filterData.ApplyObject ||
						item.ApplyObject === Enum.ApplyObject.All) &&
					(state.filterData.CommendationLevel == -1 ||
						item.CommendationLevel == state.filterData.CommendationLevel) &&
					(state.filterData.MovementType == -1 ||
						item.MovementType == state.filterData.MovementType ||
						item.MovementType === Enum.MovementType.All) &&
					(state.filterData.IsSystem == -1 ||
						item.IsSystem == state.filterData.IsSystem)
			);
		},
		getDataTable(state, getters) {
			try {
				const start = getters.getFirstRow;
				const end = getters.getLastRow;
				const dataTableFilter = getters.getDataTableFilter;

				return dataTableFilter.slice(start, end);
			} catch (e) {
				console.log(e);
				return [];
			}
		},
		getCurrentPage(state) {
			return state.currentPage;
		},
		getRowNumber(state) {
			return state.rowNumber;
		},
		getToastMessage(state) {
			return state.toastMessage;
		},
	},
});

export default store;
