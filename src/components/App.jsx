import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContactBtn = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  checkContact = newContact => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.handleAddContactBtn(newContact);
  };
  handleDeleteContactBtn = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filtredData = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <div className={css.mainContainer}>
          <h1>Phonebook</h1>
          <ContactForm handleAddContactBtn={this.checkContact} />
          <Filter filter={filter} onSearch={this.handleFilterChange} />{' '}
          <h2>Contacts</h2>
          <ContactList
            contacts={filtredData}
            onDeleteBtn={this.handleDeleteContactBtn}
          />
        </div>
      </>
    );
  }
}
