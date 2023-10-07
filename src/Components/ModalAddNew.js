import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    /**Giải nén props để lấy giá trị show và handleClose */
    const [name, setName] = useState("");
    /**Khai báo biến name và hàm setName để quản lý state của name */
    const [job, setJob] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */

    //tạo chức năng khi ấn lưu thông tin
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        /**Gọi hàm postCreateUser để tạo người dùng mới với name và job */
        if (res && res.id) {
            /**Nếu tạo người dùng thành công (có trả về id) */
            handleClose(); // Đóng modal
            setName(''); // Đặt lại giá trị của biến state name
            setJob(''); // Đặt lại giá trị của biến state job
            toast.success('Thêm người dùng thành công!');
            handleUpdateTable({ first_name: name, id: res.id })
            /**Gọi hàm handleUpdateTable để cập nhật bảng với thông tin người dùng mới
             * { first_name: name, id: res.id }: Đây là đối tượng (object) chứa thông tin người dùng 
             * mới cần cập nhật vào bảng hoặc danh sách.
             * first_name: Tên người dùng mới, giá trị được lấy từ biến name.
             * id: ID của người dùng mới, giá trị được lấy từ res.id (kết quả từ việc tạo người dùng 
             * mới).*/
        } else {
            toast.error('Lỗi! Không thêm được người dùng')
        }
        console.log('>>> check res: ', res);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fw-bold'>Họ và tên</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className='border-dark'
                                    type="text"
                                    placeholder="Vui lòng nhập họ và tên"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='fw-bold'>Nghề nghiệp</Form.Label>
                                <Form.Control
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
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
                    <Button variant="success" onClick={() => handleSaveUser()}>
                        Lưu Thay Đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew;