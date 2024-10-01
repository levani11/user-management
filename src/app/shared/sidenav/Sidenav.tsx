import './Sidenav.scss';
import logo from '../../../assets/images/tbc-logo.png';
import ButtonComponent from '../../core/common/button/ButtonComponent';
import { Link } from 'react-router-dom';
import { AppUrlEnum } from '../../core/const/route.enums';

export default function Sidenav() {
    return (
        <>
            <div className='sidenav__logo-block'>
                <Link to='/'>
                    <img src={logo} alt="TBC Bank Logo" className='sidenav__logo' />
                </Link>
            </div>
            <div className='sidenav__btn-block'>
                <Link to={`/${AppUrlEnum.USER}/${AppUrlEnum.ADD}`}>
                    <ButtonComponent title="Add New User" bgcolor="#04a2e1"/>
                </Link>
            </div>
        </>
    );
}
