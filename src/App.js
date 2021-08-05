import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import 'modern-normalize/modern-normalize.css';
import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) || '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const { name } = contact;
    const isAvailable = contacts.some(
      contactItem => contactItem.name.toLowerCase() === name.toLowerCase(),
    );
    if (isAvailable) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const hendelFindeInputChange = event => {
    setFilter(event.currentTarget.value);
  };
  const contactsFiltred = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
  );

  return (
    <div className={styles.container}>
      <h2>Phonebook</h2>
      <ContactForm contacts={contacts} onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={hendelFindeInputChange} />
      <ContactList contacts={contactsFiltred} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
