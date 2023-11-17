import {Link} from "react-router-dom";

let getTitle = (note) => {
    const title = note.body.split('\n')[0]
    if (title.length > 60){
        return title.slice(0, 60)+"..."
    }
    return title
}

let getDate = (note) => {
    // return new Date(note.updated).toString()
    return new Date(note.updated).toLocaleString(
        'en-US',
        {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
}

const ListItem = ({note}) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getDate(note)}</span></p>
            </div>
        </Link>
    )
}

export default ListItem;