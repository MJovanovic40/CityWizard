import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { logout } from '../actions/userActions'

export default function Login({ location, history }) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            dispatch(logout())
            history.push("/");
        }
        else {
            history.push("/");
        }
    }, [history, userInfo])
    return (
        <div></div>
    );
}
