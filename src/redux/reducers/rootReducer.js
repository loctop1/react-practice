import { combineReducers } from 'redux';
/**combineReducers là một hàm được cung cấp bởi thư viện Redux, được sử dụng để kết hợp nhiều reducer con thành một reducer 
 * duy nhất. Chức năng chính của nó là tạo một reducer tổng hợp, có thể được sử dụng như reducer chính (thường được gọi là 
 * rootReducer) trong Redux store. */
import userReducer from './userReducer.js';


const rootReducer = combineReducers({

    user: userReducer,

});

export default rootReducer;