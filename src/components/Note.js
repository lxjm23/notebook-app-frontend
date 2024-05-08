import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

function Note(props) {
  const [editMode, setEditMode] =useState(false)
  const [updatedNote, setUpdatedNote] = useState({
    title: props.title,
    content: props.content
  })

  const handleDelete= () =>{
    props.onDelete(props.id)
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };
  
  const handleEdit = () =>{
    props.onEdit(props.id)
    setEditMode(true)
  }
  const handleUpdate = () => {
    props.onUpdate({
      _id: props.id,
      title: updatedNote.title,
      content: updatedNote.content
    });
    setEditMode(false);
  };


  return (
    <div className="note">
    {editMode ? (
      <React.Fragment>
        <input type="text" className="edit" name="title" value={updatedNote.title} onChange={handleChange} />
        <textarea
          className="edit"
            name="content"
            value={updatedNote.content}
            onChange={handleChange}
            rows={3}
          />
          <button onClick={handleUpdate}><SaveIcon/></button>
      </React.Fragment>
    ) : (
      <React.Fragment>
      <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEdit}><EditIcon /></button>
      </React.Fragment>
    )
    }
     
      <button onClick={handleDelete}><DeleteIcon/></button>
      
      
    </div>
  );
}

export default Note;
