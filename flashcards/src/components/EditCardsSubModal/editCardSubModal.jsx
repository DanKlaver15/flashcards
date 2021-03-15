import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditCardSubModal(props) {

	const [word, setWord] = useState('');
	const [definition, setDefinition] = useState('');	

	const handleChange = (event) => {
		setWord(props.cardinfo.word);
		setDefinition(props.cardinfo.definition);
		if (event.currentTarget.name === 'word') {
			setWord(event.currentTarget.value);
		}
		else {
			setDefinition(event.currentTarget.value);
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const newInfo = {
			word: word,
			definition: definition
		}
		props.editcard(props.collectionid, props.cardinfo._id, newInfo);
		setWord('');
		setDefinition('');
		props.onHide();
	}

	const handleEnter = (event) => {
		if (event.which === 13) {
			event.preventDefault();
			const newInfo = {
				word: word,
				definition: definition
			}
			props.editcard(props.collectionid, props.cardinfo._id, newInfo);
			setWord('');
			setDefinition('');
			props.onHide();
		}
	 };

	return (
		<div onKeyDown={handleEnter}>
			<Modal {...props } onHide={props.onHide} collectionid={props.collectionid} cardinfo={props.cardinfo} editcard={props.editcard}>
				<Modal.Header closeButton onClick={props.onHide}>Please update the informtion below.</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Word:</Form.Label>
						<Form.Control name="word" defaultValue={props.cardinfo.word} onChange={handleChange}></Form.Control>
						<Form.Label>Definition:</Form.Label>
						<Form.Control name="definition" defaultValue={props.cardinfo.definition} onChange={handleChange}></Form.Control>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EditCardSubModal;