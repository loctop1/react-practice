import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    /**Giải nén props để lấy giá trị show và handleClose */
    const [email, setEmail] = useState("");
    /**Khai báo biến name và hàm setName để quản lý state của name */
    const [firtName, setFirstName] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */
    const [lastName, setLastName] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */

    //tạo chức năng khi ấn lưu thông tin
    const handleSaveUser = async () => {
        let res = await postCreateUser(email, firtName, lastName);
        /**Gọi hàm postCreateUser để tạo người dùng mới với name và job */
        if (res && res.id) {
            /**Nếu tạo người dùng thành công (có trả về id) */
            handleClose(); // Đóng modal
            setEmail();
            setFirstName();
            setLastName();
            toast.success('Thêm người dùng thành công!');
            handleUpdateTable({ email: email, first_name: firtName, last_name: lastName, id: res.id })
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
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                {/* backdrop="static": Thuộc tính này xác định cách backdrop (phần nền) của modal hoạt động. Giá trị 
                "static" đặt backdrop để cố định, tức là nó không biến mất khi người dùng nhấp chuột bên ngoài modal. Điều 
                này đôi khi được sử dụng để yêu cầu người dùng phải tương tác với modal trước khi có thể thực hiện các tác 
                vụ khác.
                keyboard={false}: Thuộc tính này xác định liệu người dùng có thể đóng modal bằng cách bấm phím Esc hay 
                không. Khi giá trị là false, người dùng sẽ không thể đóng modal bằng cách bấm phím Esc. */}
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
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
                    <Button variant="success" onClick={() => handleSaveUser()}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew;