import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        localStorage.removeItem('token');
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });

            if (!res.ok) {
                throw new Error("Sai tài khoản hoặc mật khẩu");
            }

            const data = await res.json();
            localStorage.setItem('token', data.access_token);

            // Giải mã role từ JWT
            let role = '';
            try {
                const payload = JSON.parse(atob(data.access_token.split('.')[1]));
                role = payload.role;
            } catch (e) {
                role = '';
            }
            localStorage.setItem('role', role);
            window.dispatchEvent(new Event('storage'));

            if (data.first_login) {
                alert("Đây là lần đăng nhập đầu tiên, vui lòng đổi mật khẩu!");
                navigate('/change-password');
            } else {
                setSuccess("Đăng nhập thành công!");
                window.location.href = "/";
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="login-input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="login-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
                {error && <div className="login-error">{error}</div>}
                {success && <div className="login-success">{success}</div>}
            </form>
        </div>
    );
};

export default Login;
