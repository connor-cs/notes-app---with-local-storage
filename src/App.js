import React from "react";
import NotesContainer from "./components/NotesContainer";
import Search from "./components/Search";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "wagmi",
      date: "1/1/2023",
    },
    {
      id: nanoid(),
      text: "note text",
      date: "1/1/2023",
    },
    {
      id: nanoid(),
      text: "1k EOY",
      date: "1/1/2023",
    },
  ]);

  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if (data) {
      setNotes(data)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id) => {
    console.log(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  return (
    <div className="container">
      <Header />
      <Search setSearch={setSearch} />
      <NotesContainer
        notes={notes.filter((n) => n.text.toLowerCase().includes(search))}
        addNote={addNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}
