import React, { useState } from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const ContactForm = () => {

    const [initialInput, setInitialInput] = useState({ name:'', email:''});
    const { name, email } = initialInput;
    const handleOnChange = (e) => {
        (e.target.name === 'name') 
        ? setInitialInput( { ...initialInput, name:e.target.value  } )
        : setInitialInput( { ...initialInput, email:e.target.value  } )
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            // save in db
            await addDoc( collection(db, 'users'), {
                name, 
                email
            });
        } catch( error ) {
            console.log('Hubo un error al guardar contacto');
            console.log( error );;
        }
        // reset inputs
        setInitialInput({ name:'', email:''});
    };

    return (
        <form action='' onSubmit={ handleSubmit }>
            <Input 
                type="text"
                name="name"
                value={ name }
                onChange={ handleOnChange }
                placeholder="Name"
            />

            <Input 
                type="email"
                name="email"
                value={ email }
                onChange={ handleOnChange }
                placeholder="Email"
            />
            <Button type='submit'>Add contact</Button>
        </form>
    );
}
 

const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0, 0.2);
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

const Button = styled.button`
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .3 ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;

    &:hover {
        background: #3D76E9;
    }
`;




export default ContactForm;