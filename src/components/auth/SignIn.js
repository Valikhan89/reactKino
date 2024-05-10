import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    function logIn(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setError("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.log(error);
                setError("Неверный логин или пароль");
            });
    }


    //Form
    const [form] = Form.useForm();



    return (
        <div>


            <Form form={form} name="normal_login" className="login-form">
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введите ваш email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите ваш пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={logIn}
                        >
                            Войти
                        </Button>
                    )}
                </Form.Item>
                {error ? <p>{error}</p> : ""}
            </Form>

        </div>
    )

}