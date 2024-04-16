import { Row } from 'antd';
export default function ContainerPage({ children }) {

    return (
        <div className="container">
            <Row gutter={16}>
                {children}
            </Row>
        </div>
    )
}