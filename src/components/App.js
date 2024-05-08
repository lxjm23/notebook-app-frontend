import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BACKEND_URL } from "../api";

function App() {

  const [notes, setNotes] = useState([])
  const [noteToEdit, setNoteToEdit] = useState(null)
  useEffect(() =>{
    fetchNotes()
  }, [notes])

  

  const fetchNotes = async() =>{
    const response = await fetch(`${BACKEND_URL}notes`)
    const result = await response.json()
    setNotes(result)
  }

  
  

   const AddNote = (newNote) =>{
    
    fetch(`${BACKEND_URL}newNote`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: newNote.title, content: newNote.content})
    })
    .then(res =>{
      if(!res.ok){
        throw new Error("Network response was not ok");
      }return res.json()
    })
  }


  const DeleteNote = (id) =>{
    const confirmation = window.confirm("Are you sure you want to delete this note?")
    if(confirmation){
      fetch(`${BACKEND_URL}delete`,{
        method: "DELETE",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({id})
      }).then(res=>{
        if(!res.ok){
          throw new Error("Network response was not okay");
        }return res.json()
      })
    }
  }

  const Edit = (id) =>{
    const noteToEdit = notes.find(note => note._id === id);
    setNoteToEdit(noteToEdit)
  }

  const UpdateNote = (updatedNote) =>{
    fetch(`${BACKEND_URL}update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: updatedNote._id, updatedNote })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
  };
 

  return (
    <div>
      <Header />
      <CreateArea onAdd={AddNote}/>
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
      <Footer />
    </div>
  );
}

export default App;
