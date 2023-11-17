import {Link, useNavigate, useParams} from 'react-router-dom';
// import notes from "../assets/data";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import {useEffect, useState} from 'react'

const NotePage = () => {
    const {id} = useParams();

    let [note, setNote] = useState(null);

    let navigate = useNavigate()
    let getNote = async () => {
        if (id !== "new") {
            let response = await fetch(`http://localhost:8000/notes/${id}`)
            let data = await response.json()
            setNote(data)
        }
    }

    useEffect(() => {
        getNote()
    }, [id]);

    let createNote = async () => {
        await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note, "updated": new Date()})
        })
    }

    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${id}`, {
          method: 'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({...note, "updated": new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (id !== "new" && !note.body){
            deleteNote()
        } else if (id !== "new") {
            updateNote()
        } else if (note !== null){
            createNote()
        }
        navigate('/')
    }

    // let getBack = () => {
    //     navigate('/')
    // }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    {/*<Link to="/">*/}
                    {/*    /!*<ArrowLeft />*!/*/}
                    {/*    <ArrowLeft onClick={handleSubmit} />*/}
                    {/*</Link>*/}
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id!=="new" ? <button onClick={deleteNote} >Delete</button> : null}
                {/*<button onClick={id==="new" ? deleteNote : getBack} >Delete</button>*/}
                {/*<button onClick={deleteNote} >Delete</button>*/}
            </div>
            <textarea onChange={(e) =>
            setNote({...note, 'body' : e.target.value})
            } value={note?.body}>
            </textarea>
        </div>
    )
}

export default NotePage;