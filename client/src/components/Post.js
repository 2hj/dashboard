import React, {useState} from 'react';
// import { useHistory } from 'react-router-dom';
// import fire from '../fire';

const Post = (props) => {
    const iniValues = {
        title: '',
        content: '',
        author: props.user.email,
    };

    console.log(iniValues.author);
    const [values, setValues] = useState(iniValues); // eslint-disable-line no-unused-vars
    console.log(values);
    const handelInputChange = e => {
        var name = e.target.name; 
        var value = e.target.value;

        setValues({
            ...values,
            [name]: value
        });

    }

    // const history = useHistory();

    const handleSubmitForm = e => {
        e.preventDefault();
        props.createOrEdit(values);
        alert('글이 db에 저장되었어용');

        setValues({
            title: '',
            content: '',
        });
        // props.history.push('/');
        console.log(props);
        console.log(props.history);

        props.history.push('/');
    }

    return(
        <div className="create">
            <form autoComplete="off" onSubmit={handleSubmitForm}>
                <h2>글을 등록 해보세용</h2>
                <input placeholder="Title" type="text" name="title" value={values.title} onChange={handelInputChange} />
                <br/>
                <textarea rows='10' placeholder="Content" name="content" value={values.content} onChange={handelInputChange}></textarea>
                <br/>
               <input className="submit" type="submit" value="글 저장"/>
            </form>
        </div>
    );
}

export default Post;