const Home = () => {
    return (
        <>
            <div className="home-container">
                <h2>Yêu cầu:</h2>
                <ul>
                    <li>Sử dụng API từ trang web https://reqres.in/ để tạo website.</li>
                    <li>Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các chức năng:</li>
                    <li>1. Đăng nhập</li>
                    <li>2. Thêm User</li>
                    <li>3. Sửa User</li>
                    <li>4. Xoá User</li>
                    <li>5. Hiển thị tất cả các User</li>
                    <li>6. Tìm kiếm User theo Id</li>
                    <li>7. Sắp xếp theo FirstName</li>
                    <li>8. Import User từ file .csv</li>
                    <li>9. Export User ra file .csv</li>
                </ul>
                <h2>Result:</h2>
                <p>Thời gian hoàn thành: 1-3 ngày</p>
                <p>Gửi link Heroku và Github link lại email này</p>
                <p>Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.</p>
                <h2>Yêu cầu backend (optional - không bắt buộc):</h2>
                <p>Sử dụng python django rest framework, tạo các api như trên trang web: https://reqres.in/</p>
            </div>
        </>
    )
}
export default Home;