
import {AddContac} from "./contactForm/ContactForm";
import{ContactList} from './contactList/ContactList'
import { Filter } from "./filter/Filter";
import { Component } from 'react'; 
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter: '',
    
  }
  async componentDidMount() { 
    const savedContacts = await localStorage.getItem("contacts");
    
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    };
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    };
  };
  
  createContact = (values) => {
    const targetContact = this.state.contacts
      .map((cont) => cont.name.toLowerCase())
      .includes(values.name.toLowerCase());
  
      if (targetContact) {
        alert(`${values.name} is already in contacts`);
      } else {
        values.id = nanoid();
        this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, values],
          };
        });
    };
    
  };

changeFilter = searchValue => {
  this.setState({filter: `${searchValue.target.value}`});
}

handleDelete = contactId => {
  this.setState(prevState => {
    return {
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    };
  });
};

    render(){
      const { contacts, filter } = this.state;
    const actualContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
      // const actualContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <>
    
      <AddContac create={this.createContact} />
      <div>
        <Filter onFilter={this.changeFilter} initValue={this.state.filter}/>
        <ContactList actual={actualContacts} onDelete={this.handleDelete}/>
      </div>
    </>
  )
    }
 };

