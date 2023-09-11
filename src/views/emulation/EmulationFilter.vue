<template>
	<div class="wrapper">
		<div class="custom-arrow" style="right: 57px"></div>

		<div class="popup">
			<header class="header">
				Lọc danh hiệu
				<button class="popup__button" @click="onCloseFilter">
					<div class="close-icon"></div>
				</button>
			</header>

			<div class="popup__main">
				<MISACombobox
					:title="Resource.Title.ApplyObject"
					:data="applyObject"
					:defaultIdSelected="filterData.ApplyObject"
					@onChange="onChangeApplyObject"
				/>

				<MISACombobox
					:title="Resource.Title.CommendationLevel"
					:data="commendationLevel"
					:defaultIdSelected="filterData.CommendationLevel"
					@onChange="onChangeCommendationLevel"
				/>

				<MISACombobox
					:title="Resource.Title.MovementType"
					:data="movementType"
					:defaultIdSelected="filterData.MovementType"
					@onChange="onChangeMovementType"
				/>

				<MISACombobox
					:title="Resource.Title.IsSystem"
					:data="isSytem"
					:defaultIdSelected="filterData.IsSystem"
					@onChange="onChangeIsSystem"
				/>
			</div>

			<footer class="popup__footer df-row">
				<div class="popup__actions right df-row">
					<MISAButton second @click="onCloseFilter"> Hủy </MISAButton>
					<MISAButton primary @click="onSubmitFilter"> Áp dụng </MISAButton>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import {
	applyObject,
	commendationLevel,
	movementType,
	isSytem,
} from "@/locale/VN/emulation";
import store from "@/store/store";
import Resource from "@/locale/VN/emulation/MISAResource";

export default {
	name: "EmulationFilter",
	data() {
		return {
			Resource,
			applyObject: [{ Value: -1, Field: "Tất cả" }, ...applyObject],
			commendationLevel: [{ Value: -1, Field: "Tất cả" }, ...commendationLevel],
			movementType: [{ Value: -1, Field: "Tất cả" }, ...movementType],
			isSytem: [{ Value: -1, Field: "Tất cả" }, ...isSytem],
		};
	},
	computed: {
		filterData() {
			return { ...store.getters.getFilterData };
		},
	},
	methods: {
		/**
		 * Thay đổi giá trị apply object của filter
		 * Author: BHS(11/5/2023)
		 */
		onChangeApplyObject(value) {
			this.filterData.ApplyObject = value;
		},

		/**
		 * Thayu đổi giá trị commendation level của filter
		 * Author: BHS(11/5/2023)
		 */
		onChangeCommendationLevel(value) {
			this.filterData.CommendationLevel = value;
		},

		/**
		 * Thay đổi giá trị movement type của filter
		 * Author: BHS(11/5/2023)
		 */
		onChangeMovementType(value) {
			this.filterData.MovementType = value;
		},

		/**
		 * Thay đổi giá trị is system của filter
		 * Author: BHS(11/5/2023)
		 */
		onChangeIsSystem(value) {
			this.filterData.IsSystem = value;
		},

		/**
		 * Hàm đóng filter
		 * Author: BHS(11/5/2023)
		 */
		onCloseFilter() {
			this.$emit("onToggleEmulationFilter");
		},

		/**
		 * Hàm xác nhận filter
		 * Author: BHS(11/5/2023)
		 */
		onSubmitFilter() {
			// Cập nhật lại fitler data trong store
			store.commit("setFilterData", this.filterData);
			// Đóng popup filter
			this.$emit("onToggleEmulationFilter");
		},
	},
};
</script>

<style scoped>
.wrapper {
	width: 360px;
	margin-top: 12px;
	position: absolute;
	top: 100%;
	right: 11px;
	z-index: 15;
}

.title {
	color: #666;
	font-weight: unset;
}
</style>
