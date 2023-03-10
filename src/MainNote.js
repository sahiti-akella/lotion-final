import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";

function MainNote ({ activeNote, onUpdateNote, onDeleteNote})  {
 const [date, setDate] = useState(Date.now());
 const [title, setTitle] = useState("");
 const [noteContent, setNoteContent] = useState("");
 const [editing, setEditing] = useState(false);
 
 useEffect(() => {
  setNoteContent(activeNote?.body || "");
  setTitle(activeNote?.title || "");
 }, [activeNote]);

 useEffect(() => {
   localStorage.setItem("noteContent", noteContent);
 }, [noteContent]);

 const editField = (key,value) => {
  onUpdateNote({
    ...activeNote,
    [key]:value,
  })
 }

 const titleChange = (e) => {
   setTitle(e.target.value);
 };

 const handleChange = (value) => {
  setNoteContent(value);
 };

 const handleEdit = () => {
   setEditing(false);
 };

 const saveNote = () => {
   editField("body", noteContent);
   setEditing(true);
  localStorage.setItem('noteContent', activeNote.body)
 };

 if (!activeNote) {
   return <div className="no-active-note">Select a note, or create a new one. </div>;
 }

 return (
   <div id="main-notes" className="main-notes">
     <div className="main-notes-heading">
       <div className="main-notes-titles">
         {!editing ? (
           <input
             type="text"
             id="title"
             placeholder="Untitled"
             value={title}
             onChange={titleChange}
             autoFocus
           ></input>
     ) : (
       <input
       type="text"
       id="title"
       placeholder="Untitled"
       value={title}
       onChange={titleChange}
       autoFocus
       readOnly
     ></input>
     )}
         <input
           type="datetime-local"
           step="1"
           className="datetime-header"
           onChange={(e) => setDate(Date.parse(e.target.value))}
         />
       </div>

       <div className="main-notes-buttons">
       {editing ? (
             <button onClick={handleEdit} class="edit-note">
               Edit
             </button>
           ) : (
             <button onClick={saveNote}  id="save-note">
               Save
             </button>
       
           )}
         <button onClick={() => onDeleteNote(activeNote.id)}> Delete </button>
       </div>
     </div>

      {!editing ? (
         <div id="noteEdit" >
           <ReactQuill id = "ReactQuill"
             placeholder="Your Note Here"
             value={noteContent}
             onChange={handleChange}
           ></ReactQuill>
         </div>
       ) : (<div id="newNoteContent" dangerouslySetInnerHTML={{__html: noteContent}}></div>)}
 
   </div>
 );
};

export default MainNote;



