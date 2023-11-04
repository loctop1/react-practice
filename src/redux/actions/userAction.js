import { toast } from "react-toastify";
import { loginApi } from "../../service/UserService";

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';


//Đăng nhập
export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginApi(email.trim(), password);
        /**Hàm này gọi một hàm loginApi với tham số email và password. Sử dụng await để đợi cho đến khi hàm loginApi hoàn 
         * thành và trả về một promise đã được giải quyết (resolved). Kết quả của hàm loginApi được lưu vào biến res.
         * Phương thức trim() trong ngôn ngữ lập trình thường được sử dụng để loại bỏ các ký tự khoảng trắng (hoặc 
         * whitespace) từ đầu và cuối một chuỗi (string). Điều này rất hữu ích khi bạn muốn xử lý dữ liệu người dùng nhập 
         * vào hoặc khi bạn cần làm sạch chuỗi đầu vào trước khi thực hiện các thao tác xử lý khác. */
        if (res && res.token) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('email', email.trim())
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email.trim(), token: res.token }
            });
            toast.success('Đăng nhập thành công!')
        } else {
            //error
            if (res && res.status === 400) {
                toast.error('Tài khoản hoặc mật khẩu không chính xác');
                /**Nếu biến res tồn tại và mã trạng thái là 400, hiển thị thông báo lỗi từ res.data.error bằng thư viện "toast". */
            }

            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    }
}

//Đăng xuát
export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        });
        toast.success('Đăng xuất thành công!')
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}