import App from "../App";
import ContainerPage from './ContainerPage';
import Menu from './Menu';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Space } from 'antd';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from './Auth';
import {  Outlet } from "react-router-dom";




export default function Header({ clickPage }) {
    const { isAuthenticated, login, logout, inputLoginValue, inputPassValue } = useContext(AuthContext);


    const handleMenuItemClick = (component) => {
        clickPage(component);
    };

    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Form
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = (values) => {
        console.log('Finish:', values);
    };


    return (
    <>
        <header className="shadow">
            <nav className="navbar">
                <ContainerPage>
                    <a className=" navbar-brand" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png" alt="Netflix" /></a>
                

                    <Menu/>

                    {isAuthenticated ? (
                        <button onClick={logout}>Выйти</button>
                    ) : (
                        <>                     
                                <Button type="primary" onClick={showModal}>
                                    Войти
                                </Button>

                            <Modal title="Авторизация" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Введите ваш логин!',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="test" onChange={inputLoginValue} />
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
                                            placeholder="test" onChange={inputPassValue}
                                        />
                                    </Form.Item>
                                    <Form.Item shouldUpdate>
                                        {() => (
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                disabled={
                                                    !clientReady ||
                                                    !form.isFieldsTouched(true) ||
                                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                                }
                                                onClick={() => { setIsModalOpen(false); login() }}
                                            >
                                                Войти
                                            </Button>
                                        )}
                                    </Form.Item>
                                </Form>
                                <p>{isAuthenticated ? 'Вы вошли в систему.' : 'Вы не вошли в систему.'}</p>
                            </Modal>

                        </>
                    )}
                    <p>{isAuthenticated && 'Вы вошли!'}</p>


                </ContainerPage>
            </nav>
        </header>
        
        <div>
        <Outlet />
        </div>
        </>
    )
}