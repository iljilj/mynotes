// import notes from '../assets/data'
import {useEffect, useState} from 'react'
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {

    let [notes, setNotes] = useState([]);

    let getNotes = async () => {
        let response = await fetch('http://localhost:8000/notes/')
        let data = await response.json()
        setNotes(data)
    }

    // only on first load
    useEffect(() => {
        getNotes()
    }, []);


    return (
        <div className="notes-list">
            <div className="note-header">
                <h2 className="notes-title">☰ Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}/>
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage;