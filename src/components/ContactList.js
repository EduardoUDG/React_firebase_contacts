import React, { useState, useEffect } from 'react';
import db from './../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import Contact from './Contact';


const ContactList = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(()=>{

        onSnapshot( collection(db, 'users'), (snapshot) => {
            const users = snapshot.docs.map( user => {
                return { ...user.data(), id:user.id }
            });
            setContacts( users );
        }, (error) => {
            console.log( error );
        });

    }, []);

    return (
         contacts.length > 0 &&
        <ContainerContact>
            {contacts.map( contact => (
                <Contact
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    email={contact.email}
                />
            ))}
        </ContainerContact>
    );
}

const ContainerContact = styled.div`
    margin-top: 40px;
`;

 
export default ContactList;