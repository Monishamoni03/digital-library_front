import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedIn, userLoggedIn } from '../../action/action'
import ValidateLogin from '../../shared/utils/ValidateLogin';

function NewLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("");

    const validate = () => {

        const error = ValidateLogin(email, password)
        console.log(error)

        let emailError = error.emailError;
        let passwordError = error.passwordError;

        if (emailError || passwordError) {
            return false;
        }

        return true
    }

    const navigate = useNavigate();

    let dispatch = useDispatch();
    const { errormessage } = useSelector(state => state.data)
    const { successmessage } = useSelector(state => state.data)
    const { isLogin } = useSelector((state) => state.data)

    useEffect(() => {
        if (successmessage) {
            setStatus(true)
            setType("success")
            setTitle(successmessage)
            dispatch(setLoggedIn())
        }
        else if (errormessage) {
            setStatus(true)
            setType("error")
            setTitle(errormessage)
        }
    }, [successmessage, errormessage])

    function handleSubmit(e){
        e.preventDefault();

        console.log('in handlesubmit', validate())

        const isValid = validate();
 
        if (isValid) {
            dispatch(userLoggedIn({ email: email, password: password }))
            if (errormessage) {
                setStatus(true)
                setType("error")
                setTitle(errormessage)
            }
        }
    }

    return (
        <>
            <main className='page-auth'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <section className='auth-wrapper'>
                                <Link to='/' className='btn btn-primary mb-5'><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Home</Link>
                                <div className='row'>
                                    <div className='col-md-6 mb-4 mb-md-0'>
                                        <h2 className='auth-section-title'>Log In</h2>
                                        <p className='auth-section-subtitle'>Sign in to your account to continue.</p>
                                       
                                        <form action='#'>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email<sup>*</sup></label>
                                                <input type='email' className='form-control' id='email' name='email' placeholder='Email' value={email || ""} onChange={e => setEmail(e.target.value)} />
                                                <strong className='invalid-feedback' >{emailError}</strong>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='password'>Password<sup>*</sup></label>
                                                <input type='password' className='form-control' id='password' name='password' placeholder='Password' value={password || ""} onChange={e => setPassword(e.target.value)} />
                                                <strong className='invalid-feedback' >{passwordError}</strong>
                                            </div>
                                            <button className="btn btn-primary btn-auth-submit" id='login-button' type="submit" onSubmit={handleSubmit}>Submit</button>
                                            <h4 className='invalid-feedback' >Login failed Check Email Id or Password</h4>
                                        </form>
                                        <p className="mb-0">
                                            <Link to='/register' className="text-dark font-weight-bold">New User? Sign Up</Link>
                                        </p>
                                    </div>
                        
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            
        </>
    )
}


// function NewLogin() {

//     const [ loginForm, setLoginForm ] = useState({
//         email: "",
//         password: "",
//     });
//     const { email, password } = loginForm;
//     // const [ error, setError ] = useState({
//     //     emailError: "",
//     //     passwordError: ""
//     // });

//     const handleChange = (e) => {
//         setLoginForm({
//             ...loginForm,
//             [e.target.email]: e.target.value
//         });
//     }

//     const loginValidate = () => {
//         const error = ValidateLogin(email, password);
//         console.log(error);
//     }

//     const navigate = useNavigate();
//     let dispatch = useDispatch();
//     const { errormessage } = useSelector(state => state.data)
//     const { successmessage } = useSelector(state => state.data)
//     // const { isLogin } = useSelector((state) => state.data)

//     useEffect(() => {
//         if (successmessage) {
//             setStatus(true)
//             setType("success")
//             setTitle(successmessage)
//             dispatch(setLoggedIn())
//         }
//         else if (errormessage) {
//             setStatus(true)
//             setType("error")
//             setTitle(errormessage)
//         }
//     }, [successmessage, errormessage])

//     const handleSubmit = (e) => {
//         console.log('Validating');
//         e.preventDefault();
//         const checkValid = loginValidate();

//         if(checkValid) {
//             dispatch(userLogin({ email: email, password: password}));
//             if(errormessage) {
//                 setStatus(true)
//                 setType("Error")
//                 setTitle(errormessage)
//             }
//         }
//     }

//     return (
//         <div className = 'register-student'>
//         <div className = 'register-container'>
//           <h3>Login</h3>
//           <form className = 'register-form' onSubmit = {(e) => handleSubmit(e)}>
//             <center>
//               <label htmlFor = 'email'>Email<sup>*</sup></label><br />
//               <input type = 'email' placeholder = 'Enter your email address' name ='email' value = {email} onChange = {(e) => handleChange(e)} />
//             </center>
//             <center>
//               <label htmlFor = 'password'>Password<sup>*</sup></label><br />
//               <input type = 'password' placeholder = 'Characters followed by special char' name ='password' value = {password} onChange = {(e) => handleChange(e)} />
//             </center>
//             <center>
//               <button type = 'submit' className = 'register-register'>Login</button>
//             </center>
//           </form>
//         </div>
//       </div> 
//     )
// }

export default NewLogin;