import React, { useState} from 'react';
import styled from 'styled-components';
import db  from '../firebase/firebaseConfig';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';


const Contact = ({ id, name='defaultName', email='defaulEmail' }) => {

    const [editingContact, setEditingContact] = useState(false);
    const [inputForm, setInputForm] = useState({ name, email });


    const toggleEditContact= () => setEditingContact( !editingContact );

    const newInputValue = (e) => {
        ( e.target.name === 'name' ) ?
            setInputForm({ ...inputForm, name: e.target.value })
        :
            setInputForm({ ...inputForm, email: e.target.value });
    }
 
    const updateContact = async(e) => {
        e.preventDefault();
        try {
            const newContact = {
                name: inputForm.name,
                email: inputForm.email
            }
            await updateDoc( doc(db, 'users', id), newContact )
            setEditingContact(false)
        } catch(error) {
            console.error('Hubo un error al actualizar el usuario');
            console.log( error);
        }
    }

    const deleteContact = async( id ) => {
        try {
            await deleteDoc( doc(db, 'users', id) )
        } catch(error) {
            console.error('Hubo un error al eliminar el usuario');
            console.log( error);
        }
    }

    return (
        <ContactContainer>
            {editingContact ?
                <form action="" onSubmit={ updateContact }>
                    <Input 
                        type='text'
                        name='name'
                        value={ inputForm.name }
                        onChange={ newInputValue }
                        placeholder='Name'
                    />
                    <Input 
                        type='email'
                        name='email'
                        value={ inputForm.email }
                        onChange={ newInputValue }
                        placeholder='Email'
                    />
                    <Button type='submit'>Update contact</Button>
                </form>
            :
                <>
                    <Name>{name}</Name>
                    <Email>{email}</Email>
                    <Button onClick={ toggleEditContact }>Edit</Button>
                    <Button onClick={ ()=>deleteContact(id) }>Delete</Button>
                </>
            }
        </ContactContainer>
    );
}


const ContactContainer = styled.div`
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0, .2);
`;

const Name = styled.p`
    font-weight: bold;
`;

const Email = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;

const Button = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;

    &:hover {
        background: #3D76E9;
    }
`;

const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0, .2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;

    &:focus {
        border: 2px solid #3D76E9;
    }
`;


 
export default Contact;
