// Lắng nghe sự kiện 'submit' trên form đăng nhập có id là 'loginForm'
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    // Ngăn chặn hành vi mặc định của form (tải lại trang)
    e.preventDefault();

    // Lấy giá trị từ các trường input 'Tên đăng nhập' và 'Mật khẩu'
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    
    // Lấy phần tử hiển thị kết quả
    const resultElement = document.getElementById("result");
    
    // Ẩn thông báo lỗi trước khi gửi yêu cầu mới
    resultElement.classList.add("hidden");
    resultElement.textContent = "Đang xử lý..."; // Hiển thị trạng thái đang xử lý
    resultElement.classList.remove("hidden"); // Hiện thông báo xử lý

    try {
        // Gửi dữ liệu đến Google Apps Script bằng phương thức POST
        // THAY THẾ "YOUR_EXEC_URL" bằng URL triển khai (Deployment URL) thực tế của Google Apps Script của bạn
        const response = await fetch("https://script.google.com/macros/s/AKfycbzH921ywuFiFVE7j_f2kqobKf4U-HzIe2Youcx1IfMxQHaL3Ba0E9e6fkIAgi0L1NGS/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // Dữ liệu được gửi dưới dạng chuỗi URL-encoded
            body: `user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`
        });

        // Chuyển đổi phản hồi từ server thành dạng JSON
        const data = await response.json(); // Giả định Apps Script trả về JSON

        // Xử lý kết quả từ Google Apps Script
        if (data.status === "success") {
            // Nếu đăng nhập thành công
            resultElement.textContent = "Đăng nhập thành công!";
            resultElement.style.color = "green"; // Đổi màu thông báo thành công
            // Chuyển hướng hoặc thực hiện hành động sau khi đăng nhập thành công
            // Ví dụ: window.location.href = "dashboard.html";
        } else {
            // Nếu đăng nhập thất bại
            resultElement.textContent = data.message || "Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.";
            resultElement.style.color = "red"; // Giữ màu đỏ cho thông báo lỗi
        }
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề trong quá trình gửi hoặc nhận dữ liệu
        console.error("Lỗi khi gửi dữ liệu:", error);
        resultElement.textContent = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
        resultElement.style.color = "red";
    } finally {
        // Đảm bảo thông báo kết quả luôn hiển thị sau khi xử lý
        resultElement.classList.remove("hidden");
    }
});
