import React, { useState } from 'react';

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Mặc định là user
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Gửi token ở đây
                },
                body: JSON.stringify({
                    full_name: fullName,
                    department,
                    username,
                    password,
                    email,
                    role
                })
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Đăng ký thất bại");
            }
            setLoading(false);
            alert("Đăng ký thành công!");
            window.location.href = "/";
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <h2>Đăng ký tài khoản mới</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }} onSubmit={handleSubmit}>
                <input type="text" placeholder="Tên" value={fullName} onChange={e => setFullName(e.target.value)} style={{ padding: '0.5rem' }} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '0.5rem' }} required />
                <input type="text" placeholder="Đơn vị" value={department} onChange={e => setDepartment(e.target.value)} style={{ padding: '0.5rem' }} required />
                <input type="text" placeholder="Số điện thoại" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '0.5rem' }} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '0.5rem' }} required />
                <button type="submit" style={{ padding: '0.5rem', background: '#EA0029', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }} disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
};

export default Register;
