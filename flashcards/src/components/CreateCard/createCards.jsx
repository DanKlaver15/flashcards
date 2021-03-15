import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddCardModal(props) {

	const [word, setWord] = useState('');
	const [definition, setDefinition] = useState('');

	const handleChange = (event) => {
		if (event.target.name === 'word') {
			setWord(event.target.value)
		}
		else {
			setDefinition(event.target.value)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const cardInfo = {
			word: word,
			definition: definition
		}
		props.addcard(props.collectionid, cardInfo);
		setWord('');
		setDefinition('');
		props.onHide();
	}

	const handleEnter = (event) => {
		if (event.which === 13) {
			event.preventDefault();
			const cardInfo = {
				word: word,
				definition: definition
			}
			props.addcard(props.collectionid, cardInfo);
			setWord('');
			setDefinition('');
			props.onHide();
		}
	 };

	return (
		<div onKeyDown={handleEnter}>
			<Modal {...props } onHide={props.onHide} addcard={props.addCard} collectionid={props.currentID} currentitle={props.currentTitle}>
				<Modal.Header closeButton onClick={props.onHide}>Please enter the information for the new card to be added in the {props.currentitle} collection.</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Word:</Form.Label>
						<Form.Control name="word" value={word} onChange={handleChange}></Form.Control>
						<Form.Label>Definition:</Form.Label>
						<Form.Control name="definition" value={definition} onChange={handleChange}></Form.Control>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddCardModal;