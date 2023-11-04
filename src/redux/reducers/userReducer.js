import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH } from "../actions/userAction";

const INITIAL_STATE = {

    account: {
        email: '',
        auth: null,
        token: ''
    },
    isLoading: false,
    isError: false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        //Đăng nhập
        case FETCH_USER_LOGIN:

            return {
                ...state,
                isLoading: true,
                isError: false
            };
        //Lỗi
        case FETCH_USER_ERROR:

            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };
        //Đăng nhập thành công
        case FETCH_USER_SUCCESS:
            console.log('>>>check action: ', action)
            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                isError: false
            };
        //Đăng xuất
        case USER_LOGOUT:
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            return {
                ...state,
                account: {
                    email: '',
                    token: '',
                    auth: false
                },
            }
        // Load lại data
        case USER_REFRESH:
            return {
                ...state,
                account: {
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                    auth: true
                },
            }
        default: return state;
    };
}
export default userReducer;