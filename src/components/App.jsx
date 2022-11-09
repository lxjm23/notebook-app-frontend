import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([])

  function AddNote(newNote){
    setNotes(prevNotes =>{
      return [...prevNotes, newNote]
    })
  }

  function DeleteNote(id){
    setNotes(prevNotes=>{
     return prevNotes.filter((noteItem, index)=>{
        return index !== id
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={AddNote}/>
      {notes.map((noteItem, index) =>{
        return <Note 
        key = {index}
        id = {index}
        title={noteItem.title} 
        content={noteItem.content}
        onDelete={DeleteNote}/>
      } )}
      <Footer />
    </div>
  );
}

export default App;
