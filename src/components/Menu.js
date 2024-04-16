import { Link} from "react-router-dom";

export default function Menu(){


    return(
       <>
        <ul className="navbar-nav">
            <li>
            <Link to={'/'}  className="nav-link">Главная</Link> 
            </li>
           <li>
           <Link to={'/favorites'} className="nav-link">Избранное</Link>
            </li>
        </ul>
        </>
    )
}
