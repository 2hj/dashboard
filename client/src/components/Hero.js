import React, {useState, useEffect} from 'react';
import Post from './Post';
import fire from '../fire'; // eslint-disable-line no-unused-vars
import {Route, Link, Switch} from 'react-router-dom';
import List from './List';
import Show from './Show';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


var presentPostId = '';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const Hero = (props) => {
    const classes = useStyles();
    const { handleLogout, user } = props;

    const [postObjects, setPostObjects] = useState({});// eslint-disable-line no-unused-vars
    const [showVal, setShowVal] = useState({author: '', title: '', content: ''});

    // 첫 렌더링 후 가장 최근 포스트 값으로 state 초기화
    useEffect(() => {
        fire.database().ref().child('post').on('value', snapshot => {
            if(snapshot.val() != null){
                setPostObjects({
                    ...snapshot.val()
                })

                console.log(snapshot.val());
                // console.log(snapshot.val()[Object.keys(snapshot.val())[0]].author );
                presentPostId = Object.keys(snapshot.val())[0];
                setShowVal({
                    author: snapshot.val()[Object.keys(snapshot.val())[0]].author,
                    title: snapshot.val()[Object.keys(snapshot.val())[0]].title,
                    content: snapshot.val()[Object.keys(snapshot.val())[0]].content
                })
            }
        });

    }, []);
    
    const createOrEdit = obj => {
        fire.database().ref().child('post').push(
            obj,
            err => {
                if(err) console.log(err)
            }
        );
        console.log('글 저장 후');        
    }

    const update = obj => {
        console.log(obj);
        console.log(presentPostId);
        fire.database().ref().child('post').child(presentPostId).set(
            obj,
            err => {
                if(err) console.log(err)
            }
        );
    }

    const deletePost = () => {
        alert('글을 삭제 하시겠습니까?');
        fire.database().ref('post/'+presentPostId).remove();
        alert('글삭 완료');
    }

    // 목록 누르면 R
    const showPost = id => {
        console.log(id);
        presentPostId = id;
        console.log(presentPostId);
        fire.database().ref().child('post').on('value', snapshot => {
            if(snapshot.val() != null){
                // console.log(snapshot.val()[id]);
                setShowVal({
                    author: snapshot.val()[id].author,
                    title: snapshot.val()[id].title,
                    content: snapshot.val()[id].content
                });
            }
        });
    }

    const presentUrl = window.location.href;
    useEffect(() => {
        console.log(presentUrl);
    });

    return(
        <section className="hero">
            <div className="head">
                <Link to='/'>
                    <button className="myHome" onClick={()=> {window.location.reload()}}>Home</button>
                </Link>
                <Route path='/'/>
            </div>


            <div className="main">
                <nav>
                    <div>
                        <p>현재 사용자는</p>
                        <p>{user.displayName ? user.displayName : user.email} 님 입니다.</p>
                    </div>

                    <Link to='/write'><Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        글 작성
                    </Button></Link>
                

                    <button onClick={() => handleLogout()}>Logout</button>
                </nav>
                
                <div className="read">
                    <div className="show">
                        <Show 
                            showVal={showVal}
                            update={update} 
                            deletePost={deletePost}/>
                    </div>

                    <div>
                        <List postObjects={postObjects} showPost={showPost}/>
                    </div>
                </div>

                <Switch>                
                    <Route 
                        path='/write'
                        render={(props) => <Post createOrEdit={createOrEdit} user={user} {...props}/>}/>
                </Switch>
            </div>

        </section>
    )
}

// 리액트 라우터로 컴포넌트에 props 전달하기: 
// <Route path='/...' component={() => <컴포넌트 props={props}/>}   ===> 퍼포먼스 측면에서 좋지 않다고 함
// 렌더링 할 때마다 새로운 컴포넌트를 생성하기 때문에
// 즉) 원래라면 컴포넌트가 이미 마운트 한 번 되고, 그 후로는 업데이트 되어야 하는데,
// 이 컴포넌트를 언마운트 시킨 후 매번 불필요하게 >재생성<하여 마운트 하기 때문

// 이를 해결하기 위해 <Route/> 컴포넌트의 component prop 대신 render prop 을 사용하자 
// render prop은 함수형 컴포넌트를 수용하고, 불필요하게 다시 마운트 되지 않는다

export default Hero;