import { Col } from 'antd';
import { Link, Outlet } from "react-router-dom";


export default function MovieCard({ id, image, title }) {

  
    return (
        <>
            <Col span={24} md={4} >
                <div className="card h-100 shadow">
                    <Link to={`/movieList/${id}`} className="rounded poster">
                        <img src={image} width="100%" alt={title} />
                        <div className="item-title">
                            <h2>
                                {title}
                            </h2>
                        </div>
                    </Link>
                </div>
            </Col>
        </>
    )
}