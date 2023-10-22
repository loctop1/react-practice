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
    return response.data ? response.data : { statusCode: response.status };
    /**Nếu phản hồi có dữ liệu (response.data không phải là null hoặc undefined), thì dữ liệu phản hồi sẽ được trả về. Nếu 
     * phản hồi không có dữ liệu, một đối tượng mới được tạo với thuộc tính statusCode để thể hiện mã trạng thái HTTP của 
     * phản hồi. Điều này cho phép mã gọi API sử dụng Axios tiếp tục xử lý phản hồi, dù có dữ liệu hoặc không. */
}, function (error) {
    /**Hàm này được gọi khi có lỗi trong quá trình gửi yêu cầu hoặc phản hồi từ API có mã trạng thái 
     * nằm ngoài khoảng từ 2xx. */
    let res = {};
    /**Khởi tạo một đối tượng 'res' để chứa thông tin về lỗi. */
    if (error.response) {
        /**Kiểm tra xem nếu có phản hồi từ server. */
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.data = error.response.data; // Lấy dữ liệu phản hồi từ phản hồi lỗi.
        res.status = error.response.status; // Lấy mã trạng thái từ phản hồi lỗi.
        res.headers = error.response.headers; //Lấy thông tin header từ phản hồi lỗi.
    } else if (error.request) {
        // Làm việc này nếu đã gửi yêu cầu nhưng không nhận được phản hồi.
        // `error.request` là một instance của XMLHttpRequest trong trình duyệt hoặc http.ClientRequest trong Node.js.
        console.log(error.request);
        /**Log thông tin về yêu cầu gửi đi (đối tượng 'error.request'). */
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        /**Log thông báo lỗi thông qua thuộc tính 'message' của đối tượng lỗi 'error'. */
    }
    return res;
});
export default instance;