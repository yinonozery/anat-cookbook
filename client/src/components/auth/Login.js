import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import '../../css/Login.css';

const Login = () => {
    const email = useRef('');
    const password = useRef('');

    const [isLoading, setIsLoading] = useState(false);
    const [Msg, setMsg] = useState({});

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo?.id) document.location.href = '/recipes';
    }, [userInfo]);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const formData = {
            email: email.current.value,
            password: password.current.value,
        };

        const opts = {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(formData),
            credentials: 'include',
        };

        await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
            opts
        )
            .then((res) => res.text())
            .then((text) => {
                const result = JSON.parse(text);
                if (!result.token) {
                    // unsuccessful login
                    setMsg(result);
                    setIsLoading(false);
                } else {
                    // successful login
                    setMsg(result);
                    console.log(text);
                    // setInterval(() => {
                    //     window.location.href = '/recipes';
                    // }, 2000);
                }
                setMsg(result);
            });
    };

    return (
        <div className='login_form'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>התחברות</h1>
                {/* Email */}
                <label htmlFor='email'>כתובת אימייל</label>
                <input
                    type='email'
                    ref={email}
                    id='email'
                    autoComplete='on'
                    required
                />

                {/* Password */}
                <label htmlFor='email'>סיסמה</label>
                <input
                    type='password'
                    minLength={6}
                    ref={password}
                    id='password'
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
                    <button className='button_add_recipe'>התחברות</button>
                )}
            </form>
        </div>
    );
};

export default Login;
