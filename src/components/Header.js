import App from "../App";
import ContainerPage from './ContainerPage';
import Menu from './Menu';
import { Modal, Button, Tabs } from 'antd';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from './Auth';
import { Outlet } from "react-router-dom";
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"
import AuthDetails from "./auth/AuthDetails";




export default function Header({ clickPage }) {
    const { isAuthenticated, logout, loginData } = useContext(AuthContext);


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


    return (
        <>
            <header className="shadow">
                <nav className="navbar">
                    <ContainerPage>
                        <a className=" navbar-brand" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png" alt="Netflix" /></a>


                        <Menu />

                        {!isAuthenticated && (
                            <>
                                <Button type="primary" onClick={showModal}>
                                    Войти
                                </Button>
                                <Modal title="Авторизация" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                    <Tabs
                                        defaultActiveKey="1"
                                        centered
                                        items={[
                                            {
                                                label: 'Войти',
                                                key: '1',
                                                children:  <SignIn />,
                                            },
                                            {
                                                label: 'Регистрация',
                                                key: '2',
                                                children:  <SignUp />,
                                            },
                                        ]}
                                    />

                                    <p>{isAuthenticated ? 'Вы вошли в систему.' : 'Вы не вошли в систему.'}</p>
                                </Modal>

                            </>
                        )}


                        <AuthDetails />

                    </ContainerPage>
                </nav>
            </header>

            <ContainerPage>
                <Outlet />
            </ContainerPage>
        </>
    )
}