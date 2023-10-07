import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../service/UserService';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    /**Khai báo một state "listUsers" và hàm "setListUsers" để lưu trữ danh sách người dùng. */
    useEffect(() => {
        getUsers();
    }, []);
    /**Sử dụng useEffect để gọi hàm "getUsers" khi component được tạo ra lần đầu. */

    const getUsers = async () => {
    /**Định nghĩa hàm "getUsers" là một hàm bất đồng bộ sử dụng async/await. */ 
        let res = await fetchAllUser();
        /**Gọi hàm "fetchAllUser" (truyền từ component khác) để tải danh sách người dùng từ máy chủ. */
        if (res && res.data) {
            setListUsers(res.data)
            /**res.data chứa danh sách người dùng từ phản hồi. */
        }
        /**Kiểm tra xem phản hồi có dữ liệu và gán dữ liệu vào state "listUsers" nếu có. */
        console.log('>>> check res: ', res);
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ảnh đại diện</th>
                        <th>Email</th>
                        <th>Họ</th>
                        <th>Tên</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>
                                        <img src={item.avatar} className='rounded-circle'/>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
export default TableUsers;