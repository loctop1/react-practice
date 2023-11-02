import { useEffect, useState, useContext } from "react";
//API Login
import { loginApi } from "../service/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const { loginContext } = useContext(UserContext);
    //Email
    const [email, setEmail] = useState("");
    //Password
    const [password, setPassword] = useState("");
    //Hiển thị mật khẩu
    const [isShowPassword, setIsShowPassword] = useState(false);
    //Ẩn hiện icon Loading
    const [loadingAPI, setLoadingAPI] = useState(false);
    //Chức năng chuyển trang khi đăng nhập thành công
    const navigate = useNavigate();

    //Chức năng ngăn người dùng khi đã đăng nhập thành công nên không thể đăng nhập tiếp
    useEffect(() => {
        let token = localStorage.getItem('token');
        /**Trong dòng này, bạn đang cố gắng lấy giá trị được lưu trữ trong local storage với khóa ('token') để kiểm tra xem 
         * người dùng đã đăng nhập hay chưa. Biến token sẽ chứa giá trị của token nếu nó tồn tại trong local storage, hoặc 
         * null nếu không tồn tại. */
        if (token) {
            /**kiểm tra xem biến token có giá trị khác null hay không. Nếu token tồn tại, điều này có nghĩa người dùng đã 
             * đăng nhập. */
            navigate('/');
            /**Nếu đã đăng nhập rồi thì điều hướng về trang chủ */
        }
    }, []);

    //Chức năng đăng nhập
    const handleLogin = async () => {
        if (!email || !password) {
            /**Kiểm tra xem biến email hoặc biến password có giá trị false (null, undefined, rỗng, hoặc 0) không. */
            toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!')
            return;
            /**Nếu một trong hai biến email hoặc password là false, thì hàm này sử dụng thư viện toast để hiển thị một 
             * thông báo lỗi với nội dung "Tên đăng nhập hoặc mật khẩu không chính xác!". */
        }
        setLoadingAPI(true);
        let res = await loginApi(email.trim(), password);
        /**Hàm này gọi một hàm loginApi với tham số email và password. Sử dụng await để đợi cho đến khi hàm loginApi hoàn 
         * thành và trả về một promise đã được giải quyết (resolved). Kết quả của hàm loginApi được lưu vào biến res.
         * Phương thức trim() trong ngôn ngữ lập trình thường được sử dụng để loại bỏ các ký tự khoảng trắng (hoặc 
         * whitespace) từ đầu và cuối một chuỗi (string). Điều này rất hữu ích khi bạn muốn xử lý dữ liệu người dùng nhập 
         * vào hoặc khi bạn cần làm sạch chuỗi đầu vào trước khi thực hiện các thao tác xử lý khác. */
        if (res && res.token) {
            /**Kiểm tra xem biến res có tồn tại và có thuộc tính token hay không. */
            loginContext(email, res.token);
            navigate('/');
            /**Chuyển hướng về trang chủ khi đăng nhập thành công */
            toast.success('Đăng nhập thành công!')
        } else {
            //error
            if (res && res.status === 400) {
                toast.error(res.data.error);
                /**Nếu biến res tồn tại và mã trạng thái là 400, hiển thị thông báo lỗi từ res.data.error bằng thư viện "toast". */
            }
        }
        setLoadingAPI(false);
    }
    // Chức năng quay lại trang chủ
    const handleGoBack = () => {
        navigate("/")
    }

    //Chức năng enter khi đăng nhập
    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Đăng nhập</div>
                <div className="text">Email hoặc TikTok ID "eve.holt@reqres.in"</div>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email hoặc Tiktok ID" />
                <div className="input-2">
                    <input value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={isShowPassword === true ? "text" : "password"}
                        placeholder="Mật khẩu"
                        onKeyDown={(event) => handlePressEnter(event)}
                    /**Nó cho phép bạn xác định một hàm xử lý sự kiện sẽ được gọi khi người dùng nhấn một phím bất kỳ 
                     * trên bàn phím. */
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
                    className={"btn1 " + (email && password ? "active" : "")}
                    /**Khoảng trống giữa các lớp " active" là cách tiêu chuẩn để thêm nhiều lớp vào một phần tử. Bằng cách này, 
                     * nó sẽ hiểu đúng lớp CSS bạn muốn áp dụng cho phần tử. */
                    onClick={() => handleLogin()}
                >
                    {loadingAPI && <i class="fa-solid fa-spinner fa-spin-pulse"></i>} Đăng nhập
                </button>
                <div className="back">
                    <i class="fa-solid fa-arrow-left fa-xl" style={{ color: 'black' }}></i>
                    <span className="fw-bold fs-5" onClick={() => handleGoBack()}> Quay lại</span>
                </div>
            </div >
        </>
    )
}
export default Login;