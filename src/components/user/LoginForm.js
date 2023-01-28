import { useDispatch } from "react-redux"
import { useState } from "react"
import { login } from "../auth/authSlice"

function LoginForm(){

    const [email,setEmail] = useState('')
    const [password,setPasswrod] = useState('')
    const [requestStatus,setRequestStatus] = useState('idle')

    const onEmailInputChange = e => setEmail(e.target.value)
    const onPasswordInputChange = e => setPasswrod(e.target.value)

    const canLogin = [email,password].every(Boolean) && requestStatus === 'idle'
    
    const dispatch = useDispatch()

    const onLoginSubmit = (event) =>{
        event.preventDefault()

        if(canLogin)
            setRequestStatus('pending')
        try{
            dispatch(login({
                username:email,
                password
            })).unwrap()
        }catch(error){
            console.error(error)
        }finally{
            setRequestStatus('idle')
            setEmail('')
            setPasswrod('')
        }
            
    }


    return(
        <div className="login">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <form onSubmit={onLoginSubmit}>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className="form-control form-control-lg" 
                                placeholder="Email Address" 
                                value={email}
                                onChange = {onEmailInputChange}
                                />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                placeholder="Password" 
                                value={password}
                                onChange = {onPasswordInputChange}
                                />
                        </div>
                        <input 
                            type="submit" 
                            className="btn btn-info btn-block mt-4" 
                            disabled={!canLogin}
                            />
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default LoginForm