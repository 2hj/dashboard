import React from 'react';
import Button from '@material-ui/core/Button';

const Login = (props) => {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        
        // 로그인 핸들링
        handleLogin, // eslint-disable-line no-unused-vars

        // 회원가입 핸들링
        handleSignup, // eslint-disable-line no-unused-vars

        hasAccount, // eslint-disable-line no-unused-vars
        setHasAccount, // eslint-disable-line no-unused-vars

        emailError, 
        passwordError,

        handleGoogleLogin
    } = props;  // eslint-disable-line no-unused-vars

// <input> 태그 속성
// autofocus : 문서가 로드되면 autofocus 가 설정된 <input>에 자동focus를 준다.
// required : required 가 설정된 <input>에 입력값이 없을때 <form>을 submit하게 되면 해당 <input>으로 focus를 넘긴다.

// <input> 태그 update 관리
// onChange : input 값이 바뀔 때마다 실행되는 이벤트
// event.target.value : input태그에 입력된 값을 가져옴
//  input 태그값이 바뀔 때마다 onChange 실행돼서 -> setEmail 실행돼서 -> email state의 값 변경 

    return(
        <section className="login">
            <div className="loginContainer">
                <label>E-Mail</label>
                <input 
                    type="text" 
                    autoFocus required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <p className="errorMsg"> {emailError} </p>

                <label>Password</label>
                <input
                    type="password"
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="errorMsg"> {passwordError} </p>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <Button variant="outlined" onClick={() => handleLogin()}>로그인</Button>
                        <p>계정이 없으신가요? <span onClick={() => setHasAccount(!hasAccount)}>회원가입</span></p>
                        </>
                    ) : (
                        <>
                        <Button variant="outlined" onClick={() => handleSignup()}>회원가입</Button>
                        <p>이미 계정이 있나요? <span onClick={() => setHasAccount(!hasAccount)}>로그인</span></p>
                        </>
                    )}
                    <Button variant="outlined" onClick={() => handleGoogleLogin()}>구글로 로그인하기</Button>
                </div>
            </div>
        </section>
    )
}

export default Login;