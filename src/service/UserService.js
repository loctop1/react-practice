import axios from "./customize-axios";

//Api để hiện thị dữ liệu người dùng
const fetchAllUser = (page) => {
    return (
        axios.get(`/api/users?page=${page}`)
        /**page=${page} là một tham số truy vấn được thêm vào URL để xác định trang dữ liệu bạn 
         * muốn lấy. */
    )
}

//Api để thêm dữ liệu người dùng
const postCreateUser = (name, job) => {
    return (
        axios.post("/api/users/", { name, job })
    )
}

//Api để cập nhật người dùng
const putUpdateUser = (name, job) => {
    return (
        axios.put("/api/users/", { name, job })
    )
}

//Gọi Api để xóa người dùng
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
    /**axios.delete(): Đây là một phương thức của thư viện Axios để thực hiện yêu cầu HTTP DELETE đến một tài nguyên. Đường 
     * dẫn của tài nguyên cần xóa được xây dựng bằng cách sử dụng biến id để đặt vào URL. Sau khi yêu cầu hoàn thành, nó trả 
     * về một Promise. */
}

//Tạo API đăng nhập
const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password })
}
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };