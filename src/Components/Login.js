import { useState } from "react";
//API Login
import { loginApi } from "../service/UserService";
import { toast } from "react-toastify";

const Login = () => {
    //Email
    const [email, setEmail] = useState("");
    //Password
    const [password, setPassword] = useState("");
    //Hiển thị mật khẩu
    const [isShowPassword, setIsShowPassword] = useState(false);

    //Chức năng đăng nhập
    const handleLogin = async () => {
        if (!email || !password) {
            /**Kiểm tra xem biến email hoặc biến password có giá trị false (null, undefined, rỗng, hoặc 0) không. */
            toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!')
            return;
            /**Nếu một trong hai biến email hoặc password là false, thì hàm này sử dụng thư viện toast để hiển thị một 
             * thông báo lỗi với nội dung "Tên đăng nhập hoặc mật khẩu không chính xác!". */
        }
        let res = await loginApi(email, password);
        /**Hàm này gọi một hàm loginApi với tham số email và password. Sử dụng await để đợi cho đến khi hàm loginApi hoàn 
         * thành và trả về một promise đã được giải quyết (resolved). Kết quả của hàm loginApi được lưu vào biến res. */
        if (res && res.token) {
            /**Kiểm tra xem biến res có tồn tại và có thuộc tính token hay không. */
            localStorage.setItem("token", res.token)
            /**Nếu biến res tồn tại và có thuộc tính token, thì hàm này lưu giá trị res.token vào local storage với key là 
             * "token". Điều này cho phép ứng dụng lưu thông tin đăng nhập để sử dụng trong các yêu cầu sau này. */
        }
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Đăng nhập</div>
                <div className="text">Email hoặc TikTok ID</div>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email hoặc Tiktok ID" />
                <div className="input-2">
                    <input value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={isShowPassword === true ? "text" : "password"}
                        placeholder="Mật khẩu"
                    />
                    <i onClick={() => setIsShowPassword(!isShowPassword)}
                        /**khi phần tử <i> được nhấp, nó sẽ gọi hàm setIsShowPassword để đảo ngược (toggle) giá trị của 
                         * isShowPassword. Điều này có thể được sử dụng để ẩn/hiện mật khẩu. */
                        className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    >
                    </i>
                </div>
                <button
                    disabled={email && password ? false : true}
                    /**Nếu cả email và password đều có giá trị đúng (truthy), thì disabled sẽ được đặt thành false, cho phép 
                     * nút có thể nhấp được. Nếu ít nhất một trong số họ không có giá trị, disabled sẽ được đặt thành true, 
                     * ngăn chặn người dùng nhấp vào nút. */
                    className={"btn1" + (email && password ? " active" : "")}
                    /**Khoảng trống giữa các lớp " active" là cách tiêu chuẩn để thêm nhiều lớp vào một phần tử. Bằng cách này, 
                     * nó sẽ hiểu đúng lớp CSS bạn muốn áp dụng cho phần tử. */
                    onClick={() => handleLogin()}
                >
                    Đăng nhập
                </button>
                <div className="back">
                    <i className="fa-solid fa-chevron-left"></i> Quay lại
                </div>
            </div >
        </>
    )
}
export default Login;