import Spinner from '../Spinner';
import { useDispatch } from 'react-redux';
import { logout } from '../../user/userSlice';

const LogOut = () => {
    const dispatch = useDispatch();

    const opts = {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'include',
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, opts)
        .then((res) => res.text())
        .then((text) => {
            if (!JSON.parse(text)?.success)
                alert(
                    'התנתקות מהמערכת נכשלה, ההתנתקות כבר בוצעה או שחלה שגיאה'
                );
            dispatch(logout());
            document.location.href = '/login';
        });
    return <Spinner />;
};

export default LogOut;
