import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";

function CreateArea(props) {

  const [isExpanded, setExpanded] = useState(false)

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  function handleChange(event){
    const {value, name} = event.target
    setNote(prevNote =>{
      return {
        ...prevNote,
        [name] : value
      }
    })
  }

  function handleAdd(event){
    if (note.title.trim() === "" || note.content.trim() === "") {
      alert("Please enter both title and content.");
      return;
    }
    props.onAdd(note)
    setNote({
      title: "",
      content: ""
    })
    event.preventDefault()
  }

  function expand(){
    setExpanded(true)
  }

  

  return (
    <div>
       <form className="create-note">
        {isExpanded? <input onChange={handleChange} value={note.title} name="title" placeholder="Title" /> : null}
        <textarea onChange={handleChange} onClick={expand} value={note.content}name="content" rows={isExpanded? 3 : 1}placeholder="Take a note..."  />
        <Zoom in={isExpanded}>
        <Fab onClick={handleAdd}><AddIcon/></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
