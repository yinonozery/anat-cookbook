import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import '../../css/Login.css';

const Login = () => {
    const email = useRef('');
    const password = useRef('');

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState();

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo?.id) window.location = '/recipes';
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
                if (!result.success) {
                    // unsuccessful login
                    setIsLoading(false);
                } else {
                    // successful login
                    window.setTimeout(() => {
                        window.location = '/recipes';
                    }, 2000);
                }
                setMsg(result?.message);
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
                        msg?.success
                            ? 'login_msg success_msg'
                            : 'login_msg failed_msg'
                    }>
                    {msg}
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
