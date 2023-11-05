import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        // Constructor của ErrorBoundary component, được sử dụng để khởi tạo trạng thái ban đầu.
        super(props);
        // Gọi constructor của lớp cha React.Component
        this.state = { hasError: false };
        // Khởi tạo trạng thái "hasError" là false, ngụ ý rằng không có lỗi ban đầu.
    }

    static getDerivedStateFromError(error) {
        // Hàm tĩnh (static) "getDerivedStateFromError" được gọi khi có lỗi xảy ra trong các component con.
        return { hasError: true };
        // Cập nhật trạng thái để lần render tiếp theo sẽ hiển thị giao diện thay thế (fallback UI).
    }

    componentDidCatch(error, errorInfo) {
        // Hàm "componentDidCatch" được gọi khi có lỗi xảy ra trong các component con.
        // logErrorToMyService(error, errorInfo);
        // // Bạn có thể ghi lỗi vào dịch vụ báo cáo lỗi hoặc thực hiện xử lý lỗi tùy ý ở đây.
    }

    render() {
        if (this.state.hasError) {
            return <h1>Có lỗi xảy ra.</h1>;
            // Nếu trạng thái "hasError" là true (có lỗi), hiển thị giao diện thay thế.
        }

        return this.props.children;
        // Nếu không có lỗi, hiển thị nội dung của component con được truyền vào qua prop "children".
    }
}

export default ErrorBoundary;