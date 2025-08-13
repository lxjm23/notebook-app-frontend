import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { apiUrl, API_BASE } from "../api";

function App() {

  const [notes, setNotes] = useState([])
  const [noteToEdit, setNoteToEdit] = useState(null)

  useEffect(() =>{
    console.log('API_BASE:', API_BASE);
    fetchNotes()
  }, [notes])

  

  const fetchNotes = async () => {
    try {
      const res = await fetch(apiUrl('/notes'));
      if (!res.ok) throw new Error(`GET /notes ${res.status}`);
      const data = await res.json();
      setNotes(data);
    } catch (e) {
      console.error(e);
      alert('Failed to load notes.');
    }
  };

  
  

   const AddNote = async(newNote) =>{
    
    try {
      const res = await fetch(apiUrl('/newNote'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newNote.title, content: newNote.content })
      });
      if (!res.ok) throw new Error(`POST /newNote ${res.status}`);
      await fetchNotes(); // refresh list
    } catch (e) {
      console.error(e);
      alert('Could not save note.');
    }
  }


  const DeleteNote = async(id) =>{
    const confirmation = window.confirm("Delete this note?");
    if (!confirmation) return;
    try {
      const res = await fetch(apiUrl('/delete'), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error(`DELETE /delete ${res.status}`);
      await fetchNotes();
    } catch (e) {
      console.error(e);
      alert('Could not delete note.');
    }
  }

  const Edit = (id) =>{
    const selected = notes.find(n => n._id === id);
    setNoteToEdit(selected || null);
  }

  const UpdateNote = async(updatedNote) =>{
    try {
      const res = await fetch(apiUrl('/update'), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: updatedNote._id, updatedNote })
      });
      if (!res.ok) throw new Error(`PATCH /update ${res.status}`);
      await fetchNotes();
    } catch (e) {
      console.error(e);
      alert('Could not update note.');
    }
  };
 

  return (
    <div className="container">
      <Header />
      
      <main className="content">
      <CreateArea onAdd={AddNote}/>
      <div className="notes">
      {notes.map((noteItem, index) =>{
        return <Note 
        key = {index}
        id = {noteItem._id}
        title={noteItem.title} 
        content={noteItem.content}
        onDelete={DeleteNote}
        onEdit={Edit}
        onUpdate={UpdateNote}
        />
      } )}
      
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
