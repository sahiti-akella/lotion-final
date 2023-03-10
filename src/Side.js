import "react-quill/dist/quill.snow.css";

function Side (
 {notes,
  onAddNote,
  activeNote,
  setActiveNote,
  }) {

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

   if(!activeNote && notes.length === 0){
     return(
       <div id = "sidebar-no-note" className="sidebar-no-note">
         <div className="sidebar-heading-no-note">
             <h2>Notes</h2>
             <button onClick={onAddNote}>&#43;</button>
         </div>
         <div className="no-note">No Note Yet</div>
       </div>
     )
   }
    if (notes.length === 0) {
     return (
       <div id = "sidebar-no-note" className="sidebar-no-note">
         <div className="sidebar-heading-no-note">
             <h2>Notes</h2>
             <button onClick={onAddNote}>&#43;</button>
         </div>
         <div className="no-note">No Note Yet</div>
       </div>
     
     );
   }



   return (
   <div id = "sidebar" className="sidebar">
   <div className="sidebar-heading">
   <h2> Notes </h2>
   <button onClick = {onAddNote}> &#x2b;</button>
   </div>
  
   <div className="sidebar-notes">
   {notes.map((note) => (
<div key={note.id} className={`sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}  >
  <div className="sidebar-note-title">
    <strong>{note.title} </strong>
  </div>
  <small id="note-modification-info">
{new Date(note.date).toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true
})}
</small>
  <div className = "preview-text" dangerouslySetInnerHTML={{__html: note.body && note.body.substr(0,30) + "..."}}></div>
</div>
))}

   </div>
</div>
);
};

export default Side;

