import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function CreateModal(props) {

	const [title, setTitle] = React.useState('');

	const handleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const collectionName = {
			title: title
		}
		props.addcollection(collectionName);
		setTitle('');
		props.onHide();
	}

	const handleEnter = (event) => {
		if (event.which === 13) {
			const collectionName = {
				title: title
			}
			props.addcollection(collectionName);
			setTitle('');
			props.onHide();
		}
	 };

	return (
		<div onKeyDown={handleEnter}>
			<Modal {...props } onHide={props.onHide} addcollection={props.addCollection}>
				<Modal.Header closeButton onClick={props.onHide}></Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Title:</Form.Label>
						<Form.Control name="title" value={title} onChange={handleChange}></Form.Control>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateModal;