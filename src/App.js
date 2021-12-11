import React, {useState, useEffect} from 'react';
import {uuid} from 'uuidv4';
import './App.css';
import Header from './Components/Header.js';
import AddContact from './Components/AddContact.js';
import ContactList from './Components/ContactList.js';

function App() {
  const LOCAL_STORAGE_KEY ="contacts";
  const [contacts, setContacts] = useState([]); 

  const addContactHandler =(contact)=>{
    setContacts([...contacts, {id: uuid(), ...contact}]); 
  }

  const removeContactHandler =(id)=>{
    const newContact = contacts.filter((contact)=>{
      return contact.id !== id;
    });
    
    setContacts(newContact);
  }

  useEffect( ()=>{
    const mycontacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(mycontacts) setContacts(mycontacts);
  }, [])

  useEffect( ()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return ( <>
  <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
      </div>
      </>
  );
}

export default App;
