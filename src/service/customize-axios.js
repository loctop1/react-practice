import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in',
});
/**axios.create() là một phương thức để tạo một instance Axios riêng biệt với các cấu hình cụ thể. 
 * Trong trường hợp này, baseURL được đặt thành 'https://reqres.in'. */

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    /**Thêm một interceptor cho phản hồi (response) của Axios instance đã tạo ở trên.
     * Interceptor là một cơ chế để can thiệp vào các phản hồi hoặc lỗi trước khi chúng được xử lý 
     * bởi mã gọi API.
     * function (response) Hàm này được gọi khi phản hồi (response) từ API có mã trạng thái HTTP nằm 
     * trong khoảng từ 2xx (200-299).*/
    return response.data;
    /**trả về dữ liệu của phản hồi (return response.data;), có nghĩa là nó sẽ giữ lại dữ liệu phản 
     * hồi và chuyển nó tiếp cho mã gọi API sử dụng Axios. */
}, function (error) {
    /**Hàm này được gọi khi có lỗi trong quá trình gửi yêu cầu hoặc phản hồi từ API có mã trạng thái 
     * nằm ngoài khoảng từ 2xx. */
    return Promise.reject(error);
    /**trả về một Promise đã bị từ chối với lỗi (return Promise.reject(error);), có nghĩa là nó sẽ 
     * chuyển lỗi đến mã gọi API để xử lý. */
});
export default instance;