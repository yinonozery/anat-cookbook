import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../user/userSlice';

const GetAuth = () => {
    const dispatch = useDispatch();
    const getAuth = useCallback(async (controller) => {
        const opts = {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
            signal: controller.signal,
        };
        try {
            await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`,
                opts
            )
                .then((res) => res.text())
                .then((text) => {
                    const result = JSON.parse(text);
                    console.log(result);
                    dispatch(login(result?.userInfo));
                    result?.message === 'Authorized'
                        ? localStorage.setItem(
                              'userInfo',
                              JSON.stringify(result?.userInfo)
                          )
                        : localStorage.clear();
                });
        } catch (error) {
            if (error.name === 'AbortError') console.log('Request aborted');
        } finally {
            if (!controller.signal.aborted) console.log('Auth success');
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController(0);
        getAuth(controller);
        return () => controller.abort();
    }, [getAuth]);
};

export default GetAuth;
