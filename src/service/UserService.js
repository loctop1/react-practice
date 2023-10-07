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
        axios.post("/api/users", { name, job })
    )
}
export { fetchAllUser, postCreateUser };