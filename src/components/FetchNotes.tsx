import { useState, useEffect } from "react"
import RenderNotes from "./RenderNotes";


interface Notes {
  content: string,
  id: number
}

export default function FetchNotes() {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [value, setValue] = useState('');
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return;

    const fetchNotes = async () => {
      const response = await fetch('http://localhost:7070/notes');
      const data = await response.json();

      console.log(data);
  
      setNotes(data);
      setLoaded(true);
    }
    
    fetchNotes();
  }, [loaded]);

  const addNote = (note: string) => {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "content": note })
    });

    setLoaded(false);
  };

  const deleteNote = (id: number) => {
    fetch(`http://localhost:7070/notes/${ id }`, {
      method: 'DELETE'
    });

    setLoaded(false);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    addNote(value);

    setValue('');
  };

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

  return (
    <>
      <div className="header">
        <h2>Notes</h2>
        <button className="update" onClick={ () => setLoaded(false) }>Update</button>
      </div>
      <div className="notes">
        { notes.map((note) => {
          return <RenderNotes content={ note.content } key={ note.id } deleteNote={ () => deleteNote(note.id) } /> 
        })}
      </div>
      <form className='form' onSubmit={ submitHandler }>
        <textarea
          className='note_area' 
          name='note_area' 
          id='note_area'
          value={ value }
          onChange={ changeHandler }
        >
        </textarea>
        <button className='add_btn'>Add Note</button>
      </form>
    </>
  )
}
