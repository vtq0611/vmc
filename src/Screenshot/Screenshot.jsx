import React from 'react';
import './Screenshot.css';
// import chatDemo from './assets/chat-demo.png'; // Thay bằng ảnh thật nếu có

const Screenshot = () => (
  <section id="minh-hoa" className="screenshot-section">
    <div className="screenshot-container">
      <h2 className="screenshot-title">Hướng dẫn sử dụng Chatbot</h2>
      <h3 style={{ textAlign: 'left' }}>Bước 1: Mở ứng dụng Chatbot ở góc dưới bên phải</h3>
      <img src="public/anh_minh_hoa_1.png" alt="Ảnh hướng dẫn cách dùng Chatbot" className="screenshot-img" />
      <p className="screenshot-caption">Ảnh chụp màn hình cuộc trò chuyện mẫu với Chatbot VMC</p>
      <h3 style={{ textAlign: 'left' }}>Bước 2: Nhập câu hỏi vào ô chat. Ví dụ: nhập thông tin tra cứu về <i>"quyết định tăng lương"</i></h3>
      <p style={{ textAlign: 'left' }}>Chatbot sẽ phân tích câu hỏi và tìm kiếm thông tin liên quan và thông tin được trích xuất từ những tài liệu nào dưới phần trích xuất.</p>
      <div className="d-flex">
        <img src="public/1.png" style={{ width: '50%' }} alt="Ảnh chụp màn hình cuộc trò chuyện mẫu" className="screenshot-img" />
        <img src="public/2.png" style={{ width: '50%' }} alt="Ảnh chụp màn hình cuộc trò chuyện mẫu" className="screenshot-img" />
      </div>
      <h3 style={{ textAlign: 'left' }}>Bước 3: Hiển thị kết quả (có trích xuất thông tin bên dưới câu trả lời)</h3>
      <img src="public/anh_minh_hoa_3.png" alt="Ảnh chụp màn hình cuộc trò chuyện mẫu" className="screenshot-img" />
    </div>
    
  </section>
);

export default Screenshot;
