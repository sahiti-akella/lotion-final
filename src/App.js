import './index.css';
import Side from "./Side";
import MainNote from "./MainNote";
import Header from "./Header";
import {useState, useEffect} from "react";
import uuid from "react-uuid";

function App() {
 function onAddNote() {
   const newNote = {
     id: uuid(),
     title: "Untitled",
     body: "",
     date: Date.now(),
   };
   setNotes([newNote, ...notes]);
   setActiveNote(newNote.id);
   setNoteAdded(true);
 }

 const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
 const [activeNote, setActiveNote] = useState(false);
 const [noteAdded, setNoteAdded] = useState(false);

 const onUpdateNote = (updatedNote) => {
   const updatedNotesArray = notes.map((note) => {
     if (note.id === updatedNote.id){
       return {
        ...note,
        ...updatedNote
       };
     }
      return note;
   });
   setNotes(updatedNotesArray);
 };

 function getActiveNote () {
  return notes.find((note) => note.id === activeNote);
};

 const onDeleteNote = (noteIdDelete) => {
   const answer = window.confirm("Are you sure?");
   localStorage.removeItem(activeNote.id);
   if (answer) {
     setNotes((notes) => notes.filter((note) => note.id !== noteIdDelete));
}
};

useEffect(() => {
 localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

 return (
   <div>
     <Header/>
     <div className='components'>
       <Side notes = {notes} onAddNote = {onAddNote} activeNote = {getActiveNote()} setActiveNote = {setActiveNote} onDeleteNote = {onDeleteNote} />
       <MainNote activeNote = {getActiveNote()} onUpdateNote = {onUpdateNote} onDeleteNote = {onDeleteNote} getActiveNote={getActiveNote}/>
     </div>
   </div>
 );
}

export default App;


