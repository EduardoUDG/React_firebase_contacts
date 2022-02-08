import React from 'react';
import styled from 'styled-components';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {

    return (
        <Container>
            <Title>Contact List</Title>
            <ContactForm/>
            <ContactList/>
        </Container>
    );
}
 

const Container = styled.div`
    margin: 40px;
    width: 90%;
    max-width: 400px;
    background: #fff;
    padding: 40px;
    border-radius: 5px;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 10px;
`;


export default App;

