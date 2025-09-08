import './Contact.css';

const Contact = () => (
  <section id="lien-he" className="contact-section">
    <div className="contact-container">
      <h2 className="contact-title">Liên hệ</h2>
      <p className="contact-desc">
        Nếu bạn cần hỗ trợ hoặc có thắc mắc về Chatbot VMC, vui lòng liên hệ:
      </p>
      <div className="contact-info">
        <div className="contact-label">Phòng:</div>
        <div className="contact-value">Kỹ thuật công nghệ</div>
      </div>
      <div className="contact-info">
        <div className="contact-label">Đầu mối liên hệ:</div>
        <div className="contact-value">Lê Yên Tiến</div>
      </div>
      <div className="contact-info">
        <div className="contact-label">Số điện thoại:</div>
        <div className="contact-value">0946.937.554</div>
      </div>
      <div className="contact-info">
        <div className="contact-label">Email:</div>
        <div className="contact-value">tienly@viettel.com.vn</div>
      </div>
    </div>
  </section>
);

export default Contact;
