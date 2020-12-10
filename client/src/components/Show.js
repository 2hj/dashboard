import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import Icon from '@material-ui/core/Icon';
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Show = (props) => {
    const {author, title, content} = props.showVal;

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [updateVal, setUpdateVal] = useState({
        title: title,
        content: content,
        author: author
    });
    console.log(updateVal);
  
    const handelInputChange = e => {
        // console.log(e.target.value);
        var name = e.target.name; 
        var value = e.target.value;

        setUpdateVal({
            ...updateVal,
            [name]: value
        });
    }

    var modalClose = false;
    const handleSubmitModalForm = e => {
        e.preventDefault();
        // console.log(updateVal);
        props.update(updateVal);
        alert('글을 수정했습니다.');
        modalClose = true;
        console.log(modalClose);
    }

    const handleOpen = () => {
        setUpdateVal({
            title: title,
            content: content,
            author: author
        });
      setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <form autoComplete="off" onSubmit={handleSubmitModalForm}>
            <h3>글 수정</h3>
            <input placeholder="Title" type="text" name="title" value={updateVal.title} onChange={handelInputChange}/>
            <br/>
            <textarea placeholder="Content" name="content" value={updateVal.content} onChange={handelInputChange}></textarea>
            <br/>
            <input type="submit" value="수정하기"/>
        </form>
      </div>
    );

    return (
        <div className="post">
            <div className="article">
                <div><p>작성자: {author}</p></div>
                <div><h2>{title}</h2></div>
                <div><hr className="hr"/></div>
                <div><p>{content}</p></div>
            </div>

            <div className="post-btn-group">
                <Button type="button" onClick={handleOpen} variant="outlined">글 수정</Button>
            
                <Button
                    onClick={props.deletePost}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    글 삭제
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default Show;
