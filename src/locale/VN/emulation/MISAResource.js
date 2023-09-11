const Resource = {
	/**
	 * Mode và content của Toast message
	 * Author: BHSon (11/5/2023)
	 */
	ToastMessage: {
		// Mode
		Mode: {
			Success: "success", // Thành cônng
			Error: "error", // Thất bại
		},

		// Toast message content khi lưu
		Save: {
			Success: "Lưu thành công", // Thành công
			Error: "Lưu thất bại", // Thất bại
		},

		// Toast message content khi xóa
		Delete: {
			Success: "Xoá thành công", // Thành công
			Error: "Xóa thất bại", // Thất bại
		},
	},

	/**
	 * Đối tượng khen thưởng
	 * Author: BHSon (11/5/2023)
	 */
	ApplyObject: {
		All: "Cá nhân và tập thể",
		Collective: "Tập thể",
		Individual: "Cá nhân",
		// CollectiveAndIndividula: "Cá nhân và tập thể",
		// Family: "Hộ gia đình",
	},

	/**
	 * Cấp khen thưởng
	 * Author: BHSon (11/5/2023)
	 */
	CommendationLevel: {
		Government: "Cấp Nhà nước",
		Provincial: "Cấp Tỉnh/tương đương",
		District: "Cấp Huyện/tương đương",
		Commune: "Cấp xã/tương đương",
	},

	/**
	 * Loại phong trào
	 * Author: BHSon (11/5/2023)
	 */
	MovementType: {
		All: "Thường xuyên; Theo đợt",
		Regularly: "Thường xuyên",
		Batched: "Theo đợt",
	},

	/**
	 * Trạng thái
	 * Author: BHSon (11/5/2023)
	 */
	IsSystem: {
		Disable: "Ngừng sử dụng",
		Enable: "Sử dụng",
	},

	/**
	 * Phân trang
	 * Author: BHSon (11/5/2023)
	 */
	Paging: {
		Small: 10,
		Medium: 20,
		Large: 50,
		ExtraLarge: 100,
	},

	/**
	 * Title của Form, Table, Combobox, Textfield, ...
	 * Author: BHSon (11/5/2023)
	 */
	Title: {
		EmulationHome: "Danh hiệu thi đua",
		Filter: "Lọc danh hiệu",
		FormAdd: "Thêm danh hiệu thi đua",
		FormEdit: "Sửa danh hiệu thi đua",
		FromDelete: "Xóa danh hiệu thi đua",
		EmulationTitleCode: "Mã danh hiệu",
		EmulationTitleName: "Tên danh hiệu khen thưởng",
		ApplyObject: "Đối tượng khen thưởng",
		MovementType: "Loại phong trào",
		CommendationLevel: "Cấp khen thưởng",
		IsSystem: "Trạng thái",
		Note: "Ghi chú",
	},

	/**
	 * PalceHolde của textfield
	 * Author: BHSon (11/5/2023)
	 */
	PlaceHolder: {
		EmulationSearch: "Nhập mã hoặc tên danh hiệu...",
		EmulationTitleCode: "Nhập mã danh hiệu",
		EmulationTitleName: "Nhập tên danh hiệu thi đua",
	},

	/**
	 * Thông báo lỗi của các textfield, ...
	 * Author: BHSon (11/5/2023)
	 */
	Error: {
		// Lỗi để trống
		Empty: {
			EmulationTitleCode: "Mã danh hiêu không được để trống",
			EmulationTitleName: "Tên danh hiệu không được để trống",
			CommendationLevel: "Cấp khen thưởng không được để trống",
			ApplyObject: "Đối tượng khen thưởng không được để trống",
			MovementType: "Loại phong trào không được để trống",
		},

		// Lỗi trùng dữ liệu
		Exist: {
			EmulationTitleCode:
				"Mã danh hiệu thi đua titleCode đã tồn tại trong danh sách, xin vui lòng kiểm tra lại",
		},
	},
};

export default Resource;
