import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { putUpdateUser } from '../service/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    /**Giải nén props để lấy giá trị show và handleClose và dataUserEdit */
    const [email, setEmail] = useState("");
    /**Khai báo biến name và hàm setName để quản lý state của name */
    const [firtName, setFirstName] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */
    const [lastName, setLastName] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */

    //chức năng chỉnh sửa người dùng
    const handleEditUser = async () => {
        /**Hàm này được khai báo với từ khóa async, cho phép sử dụng await để đợi kết quả của một promise. */
        let res = await putUpdateUser(email, firtName, lastName);
        /**Dòng này gọi một hàm putUpdateUser với các tham số email, firtName, và lastName. Sử dụng await để đợi kết quả trả về 
         * từ hàm này và gán kết quả cho biến res. */
        if (res && res.updatedAt) {
            /**Dòng này kiểm tra xem kết quả res có tồn tại và có thuộc tính updatedAt không. Nếu có, nghĩa là việc cập nhật 
             * người dùng thành công. */
            handleEditUserFromModal({
                /**Dòng này gọi hàm handleEditUserFromModal để thực hiện việc cập nhật thông tin người dùng trong danh sách. */
                first_name: firtName,
                last_name: lastName,
                email: email,
                id: dataUserEdit.id,
            })

            handleClose(); //đóng một modal hoặc cửa sổ hiện tại sau khi cập nhật thành công.
            toast.success('Cập nhật người dùng thành công!');
        }
        console.log(res);
    }

    useEffect(() => {
        if (show) {
            /**Hiệu ứng kiểm tra giá trị của biến show. Nếu show là true, hiệu ứng tiếp tục thực hiện lệnh bên trong. */
            setEmail(dataUserEdit.email);
            /**Nếu show là true, thì lệnh này được thực hiện. Nó đặt giá trị của biến name bằng giá trị của 
             * dataUserEdit.first_name. Điều này có nghĩa là nếu show là true và dataUserEdit thay đổi, name sẽ được cập nhật 
             * với first_name của dataUserEdit. */
            setFirstName(dataUserEdit.first_name);
            setLastName(dataUserEdit.last_name);
        }
    }, [dataUserEdit]);
    console.log('>>> check prop Edit: ', dataUserEdit);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fw-bold'>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className='border-dark'
                                    type="email"
                                    placeholder="Vui lòng nhập họ và tên"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fw-bold'>Họ</Form.Label>
                                <Form.Control
                                    value={firtName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    className='border-dark'
                                    type="text"
                                    placeholder="Vui lòng nhập họ và tên"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='fw-bold'>Tên</Form.Label>
                                <Form.Control
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    className='border-dark'
                                    type="text"
                                    placeholder="Vui lòng nhập công việc của bạn" />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={() => handleEditUser()}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUser;