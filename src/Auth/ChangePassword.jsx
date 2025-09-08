import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Regex: ít nhất 6 ký tự, 1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ thường, chữ hoa và ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }

    setError("");
    try {
      const res = await fetch("http://localhost:8000/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Đổi mật khẩu thất bại");
      }

      setLoading(false);
      alert("Đổi mật khẩu thành công!");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Đổi mật khẩu</h2>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Đổi mật khẩu</button>
        {error && <div className="change-password-error">{error}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
