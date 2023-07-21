import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import '../../css/Register.css';

const Register = () => {
    // Form
    const username = useRef('');
    const email = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const [Msg, setMsg] = useState({});
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    // Loading spinner
    const [isLoading, setIsLoading] = useState(false);

    // Auth
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        if (userInfo?.id) document.location.href = '/recipes';
    }, [userInfo]);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        setMsg({});

        // Password pattern check
        if (!PWD_REGEX.test(password.current.value)) {
            setMsg({
                message:
                    'אורך הסיסמה חייב להיות 8-24 תווים ולכלול לפחות: אות קטנה ואות גדולה באנגלית, סימן מיוחד',
                success: false,
            });
            setIsLoading(false);
            return;
        }

        if (password.current.value !== confirmPassword.current.value) {
            setMsg({
                message: 'הסיסמאות אינן תואמות, נסה/י שנית',
                success: false,
            });
            setIsLoading(false);
            return;
        }
        const formData = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            isAdmin: false,
            token: '',
        };

        const opts = {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify(formData),
        };

        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, opts)
            .then((res) => res.text())
            .then((text) => {
                setMsg({
                    message: 'רישום בוצע בהצלחה, הינך מועבר/ת לדף הראשי',
                    success: true,
                });
                setInterval(() => {
                    document.location.href = '/login';
                }, 1500);
            });
        setIsLoading(false);
    };

    return (
        <div className='register_form'>
            <h1>הרשמה</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* Username */}
                <label htmlFor='username'>שם משתמש</label>
                <input
                    type='text'
                    ref={username}
                    id='username'
                    minLength={3}
                    maxLength={25}
                    required
                />

                {/* Email */}
                <label htmlFor='email'>כתובת אימייל</label>
                <input type='email' ref={email} id='email' required />

                {/* Password */}
                <label htmlFor='email'>סיסמה</label>
                <input type='password' ref={password} id='password' required />

                {/* ConfirmPassword */}
                <label htmlFor='confirmPassword'>אימות סיסמה</label>
                <input
                    type='password'
                    ref={confirmPassword}
                    id='confirmPassword'
                    required
                />
                <p
                    id='msg'
                    className={
                        Msg?.success
                            ? 'login_msg success_msg'
                            : 'login_msg failed_msg'
                    }>
                    {Msg.message}
                </p>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <button className='button_add_recipe'>רישום</button>
                )}
            </form>
        </div>
    );
};

export default Register;
