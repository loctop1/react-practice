import { useState } from "react";

const Login = () => {
    //Email
    const [email, setEmail] = useState("");
    //Password
    const [password, setPassword] = useState("");
    //Hiển thị mật khẩu
    const [isShowPassword, setIsShowPassword] = useState(false);
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
                >
                    Đăng nhập
                </button>
                <div className="back">
                    <i class="fa-solid fa-chevron-left"></i> Quay lại
                </div>
            </div >
        </>
    )
}
export default Login;