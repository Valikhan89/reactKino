import { Flex, Spin } from 'antd';
import ContainerPage from '../ContainerPage';


export default function Loader() {

    return (
        <ContainerPage>
            <div className="preloader">
                <Spin tip="Загрузка" size="large" />
            </div>
        </ContainerPage>

    )
}