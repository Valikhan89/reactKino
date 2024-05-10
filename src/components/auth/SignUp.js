import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';



export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");
    function register(e) {
        if (copyPassword !== password) {
            setError("Пароли не совпадают");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setError("");
                setEmail("");
                setCopyPassword("");
                setPassword("");
            })
            .catch((error) => console.log(error));
    }


    //Form
    const [formReg] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);


    return (
        <div>
            <Form form={formReg} name="normal_login" className="login-form" onFinish={register}>
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
                <Form.Item
                    name="passwordCopy"
                    rules={[
                        {
                            required: true,
                            message: 'Подтвердите пароль',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        value={copyPassword}
                        onChange={(e) => setCopyPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!clientReady}>
                        Регистрация
                    </Button>
                </Form.Item>

            </Form>
            {error ? <p>{error}</p> : ""}

        </div>
    )

}