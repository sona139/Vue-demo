const Enum = {
	/**
	 * Đối tượng khen thưởng
	 * Author: BHSon (11/5/2023)
	 */
	ApplyObject: {
		All: -1, // Tất cả
		Collective: 1, // Cá nhân
		Individual: 2, // Tập thể
		// CollectiveAndIndividula: 3,
		// Family: 4,
	},

	/**
	 * Cấp khen thưởng
	 * Author: BHSon ( 11/5/2023)
	 */
	CommendationLevel: {
		All: -1,
		Government: 0, // Cấp nhà nước
		Provincial: 1, // Cấp tỉnh / tương đương
		District: 2, // Cấp huyện / tương đương
		Commune: 3, // Cấp xã / tương đương
	},

	/**
	 * Loại phong trào
	 * Author: BHSon (11/5/2023)
	 */
	MovementType: {
		All: -1, // Tất cả
		Regularly: 0, // Thường xuyên
		Batched: 1, // Theo đợt
	},

	/**
	 * Trạng thái
	 * Author: BHSon (11/5/2023)
	 */
	IsSystem: {
		All: -1,
		Disable: 0, // Ngừng sử dụng
		Enable: 1, // Sử dụng
	},

	/**
	 * Phân trang
	 * Author: BHSon (11/5/2023)
	 */
	Paging: {
		Small: 10, // Nhỏ
		Medium: 20, // Vừa
		Large: 50, // Lớn
		ExtraLarge: 100, // Rất lớn
	},

	/**
	 * Mã HTTP
	 * Author: BHSon (11/5/2023)
	 */
	HTTPCode: {
		Success: 200, // Thành công
		BadRequest: 400, // Thất bại
		NotFound: 404, // Không tìm thấy
	},
};

export default Enum;
