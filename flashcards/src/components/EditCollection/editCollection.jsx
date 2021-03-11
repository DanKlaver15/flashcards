import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditModal(props) {

	const [title, setTitle] = React.useState('');

	const handleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleSubmit = (editid) => (event) => {
		event.preventDefault();
		const collectionName = {
			title: title
		}
		props.editcollection(editid, collectionName);
		setTitle('');
		props.onHide();
	}

	const handleEnter = (editid) => (event) => {
		if (event.which === 13) {
			const collectionName = {
				title: title
			}
			props.editcollection(editid, collectionName);
			setTitle('');
			props.onHide();
		}
	 };

	return (
		<div onKeyDown={handleEnter(props.editid)}>
			<Modal {...props } onHide={props.onHide} editcollection={props.editCollection} edittitle={props.editTitle} editid={props.editID}>
				<Modal.Header closeButton onClick={props.onHide}></Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Please enter a new title for collection:  "{props.edittitle}".</Form.Label>
						<Form.Control name="title" value={title} onChange={handleChange}></Form.Control>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit(props.editid)}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EditModal;