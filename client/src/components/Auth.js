import React, { useState, useEffect } from 'react';
import fire from '../fire';
import firebase from 'firebase';

import Login from './Login';  // eslint-disable-line no-unused-vars
import Hero from './Hero'; // eslint-disable-line no-unused-vars

const Auth = (props) => {
    const [user, setUser] = useState(props.user);  // eslint-disable-line no-unused-vars
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');  // eslint-disable-line no-unused-vars
    const [passwordError, setPasswordError] = useState('');  // eslint-disable-line no-unused-vars
    const [hasAccount, setHasAccount] = useState(false);  // eslint-disable-line no-unused-vars
  
  // 입력한 내용 다 지우기
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    // 에러 표시 지우기
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    // 로그인
    const handleLogin = () => {  // eslint-disable-line no-unused-vars
        clearErrors();

        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log('로그인완료- 현재 사용자: ');
            console.log(user)
        }) // 로그인 처리
        .catch(err => { // 로그인 시 에러
            switch(err.code){
            case "auth/invaild-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
                setEmailError(err.message);
                break;
            case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
        })
    }

    // 회원가입
    const handleSignup = () => {  // eslint-disable-line no-unused-vars
        clearErrors();

        fire
        .auth()
        .createUserWithEmailAndPassword(email, password) // create user (유저 생성) = 회원가입 처리
        .catch(err => { // 회원가입 시 에러
            switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                setEmailError(err.message);
                break;
            case "auth/weak-password":
                setPasswordError(err.message);
                break;
            }
        });

        
    }

    // 로그아웃
    const handleLogout = () => {  // eslint-disable-line no-unused-vars
        fire.auth().signOut()
        .catch(err => {
        console.log(err.message);
        });
    }


    // 구글 로그인
    const googleProvider = new firebase.auth.GoogleAuthProvider(); // import firebase from 'firebase';

    const handleGoogleLogin = () => { // eslint-disable-line no-unused-vars
        fire.auth()
        .signInWithPopup(googleProvider)
        .catch(err => {
        console.log('error code: '+ err.code + '\n error message: '+ err.message);
        });
    }

    // 사용자의 인증 상태를 파악
    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
        if(user){
            clearInputs();
            setUser(user);
            console.log(user);
        } else {
            setUser("");
        }
        })
    }
  
    // 최초 렌더링 후 사용자가 인증된 사용자인지 검사하기
    useEffect(() => {
        authListener();
        
        return () => {
            setUser(user);
        }

        // 
    }, []);

    return (
        <div className="App">
        {user ? (
            <Hero
                handleLogout={handleLogout}
                user={user}
            />
        ) : (
            <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
                handleGoogleLogin={handleGoogleLogin}
            />
        )}
        </div>
    );
}

export default Auth;