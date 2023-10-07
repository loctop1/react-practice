import axios from "./customize-axios";

const fetchAllUser = (page) => {
    return(
        axios.get(`/api/users?page=${page}`)
        /**page=${page} là một tham số truy vấn được thêm vào URL để xác định trang dữ liệu bạn 
         * muốn lấy. */
    )
}
export {fetchAllUser};