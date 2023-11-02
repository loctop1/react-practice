import { createStore, applyMiddleware } from 'redux';
/**createStore là một hàm được cung cấp bởi thư viện Redux, được sử dụng để tạo ra một kho lưu trữ trạng thái (store) cho 
 * ứng dụng Redux. Store là nơi lưu trữ toàn bộ trạng thái ứng dụng và cung cấp phương thức để thay đổi trạng thái thông qua 
 * reducers. Thông qua createStore, bạn truyền vào một reducer chính (thường được gọi là rootReducer) để xác định cách trạng 
 * thái ứng dụng thay đổi khi các hành động (actions) được gửi đến nó.
 * applyMiddleware là một hàm được cung cấp bởi Redux để áp dụng các middleware vào quá trình xử lý hành động. Middleware là 
 * một cơ chế mà bạn có thể sử dụng để thực hiện các tác vụ trung gian hoặc kiểm tra hành động trước khi chúng được gửi đến 
 * reducer. Trong trường hợp của mã của bạn, bạn đang sử dụng middleware thunk. */
import rootReducer from './reducers/rootReducer';
/**rootReducer là một reducer chính của ứng dụng, thường là một tổ hợp của nhiều reducer con. Nhiệm vụ của nó là quản lý 
 * trạng thái toàn cục của ứng dụng bằng cách chuyển hành động đến các reducer con tương ứng. Mỗi reducer con xác định cách 
 * trạng thái của một phần cụ thể của ứng dụng thay đổi. */
import thunk from 'redux-thunk';
/**thunk là một middleware được sử dụng để xử lý các hành động bất đồng bộ trong Redux. Nó cho phép bạn gửi các hành động có 
 * kiểu function thay vì là một đối tượng thông thường. Khi một hành động kiểu thunk được gửi, middleware này sẽ thực thi 
 * hàm đó và cho phép bạn thực hiện các tác vụ không đồng bộ như gọi API, đợi kết quả và sau đó gửi các hành động khác dựa 
 * trên kết quả. */
import { composeWithDevTools } from 'redux-devtools-extension';
/**composeWithDevTools là một hàm được cung cấp bởi Redux DevTools Extension, một công cụ dành cho các nhà phát triển để 
 * theo dõi và gỡ lỗi ứng dụng Redux. Chức năng chính của composeWithDevTools là cung cấp khả năng sử dụng DevTools 
 * Extension với Redux. */

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;