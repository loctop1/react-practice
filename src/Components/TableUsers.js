import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../service/UserService';
//Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
//Phân trang
import ReactPaginate from 'react-paginate';
//Modal thêm người dùng
import ModalAddNew from './ModalAddNew';
//Modal chỉnh sửa người dùng
import ModalEditUser from './ModalEditUser';
//Modal xóa người dùng
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'

//Lodash
import { cloneDeep } from 'lodash';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    /**Khai báo một state "listUsers" và hàm "setListUsers" để lưu trữ danh sách người dùng. */

    const [totalUsers, setTotalUsers] = useState(0);
    /**Khai báo một state "totalUsers" và hàm "setTotalUsers" để lưu trữ tổng số người dùng*/

    const [totalPages, setTotalPages] = useState(0);
    /**Khai báo một state "totalUsers" và hàm "setTotalUsers" để lưu trữ tổng số trang*/

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    /**Khai báo biến state isShowModalAddNew và hàm setIsShowModalAddNew để quản lý trạng thái hiển thị 
     * modal, ban đầu được đặt là false để ẩn modal. */

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    /**Khai báo biến state isShowModalEdit và hàm setIsShowModalEdit để quản lý trạng thái hiển thị 
    * modal, ban đầu được đặt là false để ẩn modal. */

    const [dataUserEdit, setDataUserEdit] = useState({});
    /**useState({}) khởi tạo biến trạng thái dataUserEdit với giá trị ban đầu là một đối tượng 
     * rỗng {}. dataUserEdit sẽ chứa dữ liệu trạng thái và có thể được cập nhật sau này bằng cách sử 
     * dụng setDataUserEdit. */

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    /**Ban đầu, giá trị của isShowModalDelete được thiết lập thành false, tức là modal xóa sẽ bị ẩn khi ứng dụng được khởi 
     * chạy. Khi bạn gọi setIsShowModalDelete(true), modal sẽ được hiển thị (nếu đã được thiết lập để sử dụng biến 
     * isShowModalDelete để quyết định hiển thị).*/

    const [dataUserDelete, setDataUserDelete] = useState({});
    /**lưu trữ thông tin người dùng cần xóa. Sau đó, bạn có thể sử dụng dữ liệu này để thực hiện xóa người dùng hoặc thực 
     * hiện các tác vụ khác liên quan đến người dùng. */

    const [sortBy, setSortBy] = useState("asc");
    /**sortBy là một biến trạng thái (state) đại diện cho thứ tự sắp xếp hiện tại. Nó được khởi tạo với giá trị chuỗi "asc", 
     * thường thể hiện sắp xếp tăng dần.
     * setSortBy là một hàm cho phép bạn cập nhật trạng thái của sortBy. Khi bạn gọi setSortBy(newValue), nó thay đổi giá 
     * trị của sortBy thành giá trị mới (newValue). */

    const [sortField, setSortField] = useState("id");
    /**sortField là một biến trạng thái khác đại diện cho trường hiện tại mà dữ liệu đang được sắp xếp theo. Nó được khởi 
     * tạo với giá trị chuỗi "id", cho biết ban đầu dữ liệu được sắp xếp theo trường "id".
     * setSortField là một hàm cho phép bạn cập nhật trạng thái của sortField. Khi bạn gọi setSortField(newField), nó thay 
     * đổi giá trị của sortField thành tên trường mới (newField). */

    //Chức năng đóng Modal
    const handleClose = () => {
        setIsShowModalAddNew(false);
        /**Khi được gọi, hàm này sẽ đặt giá trị của biến isShowModalAddNew thành false, dẫn đến việc 
         * ẩn modal. */
        setIsShowModalEdit(false);
        /**Khi được gọi, hàm này sẽ đặt giá trị của biến setIsShowModalEdit thành false, dẫn đến việc 
         * ẩn modal. */
        setIsShowModalDelete(false);
        /**Đặt giá trị của biến trạng thái isShowModalDelete thành false, dẫn đến việc ẩn modal "Xóa" (nếu modal "Xóa" đã 
         * được thiết lập để sử dụng biến isShowModalDelete để quyết định hiển thị).*/
    }

    //tạo chức năng cập nhật dữ liệu khi thêm thành công
    const handleUpdateTable = (user) => {
        /**Hàm này nhận một tham số là đối tượng "user" chứa thông tin người dùng mới cần thêm vào danh 
         * sách. */
        setListUsers([user, ...listUsers]);
        /**etListUsers: Đây là hàm được tạo bởi React để cập nhật giá trị của biến state listUsers. 
         * Hàm này sẽ thay thế giá trị hiện tại của listUsers bằng giá trị mới được cung cấp.
         * user: Là đối tượng người dùng mới cần thêm vào danh sách.
         * ...listUsers: Là toán tử spread (...) được sử dụng để sao chép tất cả các phần tử từ mảng 
         * listUsers hiện tại. */
    }

    //Chức năng chỉnh sửa người dùng
    const handleEditUserFromModal = (user) => {
        const _ = require('lodash');
        /**Đoạn mã này import thư viện Lodash và gán nó cho biến _. Lodash là một thư viện JavaScript phổ biến dùng để thao tác 
         * và xử lý dữ liệu. */
        let cloneListUsers = _.cloneDeep(listUsers);
        /**Dòng này tạo một bản sao sâu của danh sách listUsers sử dụng hàm _.cloneDeep từ thư viện Lodash. Bản sao sâu đảm bảo 
         * rằng các thay đổi không ảnh hưởng đến danh sách gốc. */
        let index = listUsers.findIndex(item => item.id === user.id);
        /**Dòng này tìm vị trí của user trong danh sách listUsers bằng cách sử dụng findIndex. Hàm này tìm kiếm phần tử đầu 
         * tiên trong danh sách mà có id trùng với user.id và trả về chỉ số của phần tử đó trong danh sách. Kết quả được lưu 
         * vào biến index. */
        cloneListUsers[index].first_name = user.first_name;
        /**Dòng này chỉnh sửa thông tin first_name của người dùng tại vị trí index trong bản sao cloneListUsers thành 
         * user.first_name, thực hiện việc cập nhật thông tin. */
        cloneListUsers[index].last_name = user.last_name;
        cloneListUsers[index].email = user.email;
        setListUsers(cloneListUsers);
        /**Dòng này sử dụng setListUsers (giả định rằng đây là hàm dùng để cập nhật danh sách người dùng) để cập nhật danh sách 
         * listUsers thành bản sao đã được chỉnh sửa cloneListUsers. */
    }

    useEffect(() => {
        getUsers(1);
    }, []);
    /**Sử dụng useEffect để gọi hàm "getUsers" khi component được tạo ra lần đầu. */

    const getUsers = async (page) => {
        /**Định nghĩa hàm "getUsers" là một hàm bất đồng bộ sử dụng async/await. */
        let res = await fetchAllUser(page);
        /**Gọi hàm "fetchAllUser" (truyền từ component khác) để tải danh sách người dùng từ máy chủ.
         * page này là được truyền ở component UserService*/
        if (res && res.data) {
            setListUsers(res.data)
            /**res.data chứa danh sách người dùng từ phản hồi. */
            setTotalUsers(res.total) //tổng số User
            setTotalPages(res.total_pages) //tổng số trang
        }
        /**Kiểm tra xem phản hồi có dữ liệu và gán dữ liệu vào state "listUsers" nếu có. */
        console.log('>>> check res: ', res);
    }

    //chức năng phân trang
    const handlePageClick = (event) => {
        console.log('>>> check event: ', event);
        getUsers(+event.selected + 1);
        /**+event.selected sẽ chuyển đổi giá trị event.selected thành một số.
         * +event.selected + 1 sẽ thêm 1 đơn vị vào giá trị event.selected, có thể là để tăng trang 
         * lên 1 nếu event.selected biểu thị trang trước đó.*/
    }

    //Chức năng chỉnh sửa người dùng
    const handleEditUser = (user) => {
        console.log(user);
        setDataUserEdit(user);
        /**Dòng này đặt giá trị của biến state dataUserEdit bằng thông tin người dùng được truyền vào hàm handleEditUser. Điều 
         * này có nghĩa là thông tin người dùng sẽ được lưu trữ trong state để sau đó có thể truy cập và sử dụng trong modal 
         * chỉnh sửa. */
        setIsShowModalEdit(true);
        /** Dòng này đặt giá trị của biến state isShowModalEdit thành true. Điều này dẫn đến hiển thị modal chỉnh sửa người 
         * dùng trên giao diện người dùng, vì modal này dựa vào giá trị của isShowModalEdit để quyết định xem có hiển thị hay 
         * không. */
    }

    //Hiển thị modal xóa
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
        /**Gọi hàm setDataUserDelete để thiết lập giá trị của biến trạng thái dataUserDelete bằng thông tin người dùng được 
         * truyền vào hàm handleDeleteUser. Thông tin người dùng này sẽ được sử dụng sau đó khi bạn thực hiện tác vụ xóa. */
    }

    //Chức năng cập nhật lại data khi xóa người dùng thành công
    const handleDeleteUserFromModal = (user) => {
        const _ = require('lodash');
        /**Đoạn mã này import thư viện Lodash và gán nó cho biến _. Lodash là một thư viện JavaScript phổ biến dùng để thao tác 
         * và xử lý dữ liệu. */
        let cloneListUsers = _.cloneDeep(listUsers);
        /**Dòng này tạo một bản sao sâu của danh sách listUsers sử dụng hàm _.cloneDeep từ thư viện Lodash. Bản sao sâu đảm bảo 
         * rằng các thay đổi không ảnh hưởng đến danh sách gốc. */
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        /**cloneListUsers: Đây là danh sách ban đầu được sao chép sâu bằng cách sử dụng _.cloneDeep để đảm bảo không 
         * ảnh hưởng đến danh sách gốc.
         * .filter(item => item.id !== user.id):Nó tạo một bản sao mới của danh sách chứa tất cả các phần tử của danh sách 
         * ban đầu, trừ những phần tử mà có id trùng với user.id. Điều này sẽ loại bỏ người dùng đã bị xóa khỏi danh sách.
         * Kết quả của .filter() được gán lại cho biến cloneListUsers, và bằng cách này, danh sách cloneListUsers được cập 
         * nhật với các người dùng còn lại sau khi xóa người dùng có id trùng với user.id. */
        setListUsers(cloneListUsers);
        /**Dòng này sử dụng setListUsers (giả định rằng đây là hàm dùng để cập nhật danh sách người dùng) để cập nhật danh sách 
         * listUsers thành bản sao đã được chỉnh sửa cloneListUsers. */
    }

    //Chức năng sắp xếp thứ tự
    const handleSort = (sortBy, sortField) => {
        setSortBy("sortBy")
        setSortField("sortField")
        //Đây là hai dòng gán giá trị cho các biến trạng thái sortBy và sortField ở dưới thẻ i
        const _ = require('lodash');
        /**Đoạn mã này import thư viện Lodash và gán nó cho biến _. Lodash là một thư viện JavaScript phổ biến dùng để thao tác 
         * và xử lý dữ liệu. */
        let cloneListUsers = _.cloneDeep(listUsers);
        /**Dòng này tạo một bản sao sâu của danh sách listUsers sử dụng hàm _.cloneDeep từ thư viện Lodash. Bản sao sâu đảm bảo 
         * rằng các thay đổi không ảnh hưởng đến danh sách gốc. */
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        /**Dòng này sử dụng hàm _.orderBy từ Lodash để sắp xếp bản sao của danh sách người dùng cloneListUsers dựa trên 
         * trường sortField và thứ tự sắp xếp sortBy. Kết quả của việc sắp xếp này ghi đè lên bản sao cloneListUsers. */
        setListUsers(cloneListUsers);
        /**Dòng này sử dụng setListUsers (giả định rằng đây là hàm dùng để cập nhật danh sách người dùng) để cập nhật danh sách 
         * listUsers thành bản sao đã được chỉnh sửa cloneListUsers. */
    }
    return (
        <>
            <div className='my-3 fs-2 fw-bold add-new'>
                <span>
                    <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} size='sm' /> Danh sách người dùng
                </span>
                <button onClick={() => setIsShowModalAddNew(true)} className='btn btn-primary btn-lg float-end'>
                    Thêm người dùng
                </button>
            </div>
            <Table striped bordered hover responsive className='custom-table'>
                <thead>
                    <tr>
                        <th >
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i onClick={() => handleSort("desc", "id")} className="fa-solid fa-arrow-down" style={{ color: 'black' }}></i>
                                    <i onClick={() => handleSort("asc", "id")} className="fa-solid fa-arrow-up" style={{ color: 'black' }}></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>Họ</span>
                                <span>
                                    <i onClick={() => handleSort("desc", "first_name")} className="fa-solid fa-arrow-down" style={{ color: 'black' }}></i>
                                    <i onClick={() => handleSort("asc", "first_name")} className="fa-solid fa-arrow-up" style={{ color: 'black' }}></i>
                                </span>
                            </div>
                        </th>
                        <th>Tên</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(item)} className='btn btn-success mx-3 fw-bold'>
                                            Sửa
                                        </button>
                                        <button className='btn btn-danger fw-bold' onClick={() => handleDeleteUser(item)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table >
            {/* Modal thêm User */}
            < ModalAddNew
                show={isShowModalAddNew}
                /**truyền giá trị của biến isShowModalAddNew vào prop show của <ModalAddNew>. Điều này sẽ 
                 * quyết định xem modal có được hiển thị (nếu isShowModalAddNew là true) hoặc ẩn đi 
                 * (nếu isShowModalAddNew là false). */
                handleClose={handleClose}
                /**truyền hàm handleClose vào prop handleClose của <ModalAddNew>. Khi người dùng tương tác 
                 * và muốn đóng modal, hàm này sẽ được gọi để thay đổi giá trị của isShowModalAddNew thành 
                 * false, dẫn đến việc ẩn modal. */
                handleUpdateTable={handleUpdateTable}
            />
            {/* Modal chỉnh sửa User */}
            < ModalEditUser
                show={isShowModalEdit}
                /**truyền giá trị của biến isShowModalEdit vào prop show của <ModalEditUser>. Điều này sẽ 
                 * quyết định xem modal có được hiển thị (nếu isShowModalEdit là true) hoặc ẩn đi 
                 * (nếu isShowModalEdit là false). */
                handleClose={handleClose}
                /**truyền hàm handleClose vào prop handleClose của <ModalEditUser>. Khi người dùng tương tác 
                 * và muốn đóng modal, hàm này sẽ được gọi để thay đổi giá trị của isShowModalEdit thành 
                 * false, dẫn đến việc ẩn modal. */
                dataUserEdit={dataUserEdit}
                /**dataUserEdit chứa dữ liệu về người dùng mà bạn muốn chỉnh sửa trong modal. Modal có thể sử dụng dataUserEdit 
                 * để hiển thị thông tin chi tiết về người dùng hoặc để cho phép người dùng chỉnh sửa thông tin. */
                handleEditUserFromModal={handleEditUserFromModal}
            />
            {/* Modal xóa User */}
            < ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
            <ReactPaginate
                nextLabel={
                    <FontAwesomeIcon icon={faCircleChevronRight} size='xl' style={{ color: '#005eff' }} />
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel={
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='xl' style={{ color: '#005eff' }} />
                }
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}
export default TableUsers;