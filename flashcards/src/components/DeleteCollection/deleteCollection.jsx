import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function DeleteModal(props) {

	function handleSubmit(deleteid) {
		props.deletecollection(deleteid);
		props.onHide();
	}

	const handleEnter = (deleteid) => (event) => {
		event.preventDefault();
		if (event.which === 13) {
			event.preventDefault();
			props.deletecollection(deleteid);
			props.onHide();
		}
	 };

	return (
		<div onKeyDown={handleEnter(props.deleteid)}>
			<Modal {...props } onHide={props.onHide} deletecollection={props.deleteCollection} deletetitle={props.deleteTitle} deleteid={props.deleteID}>
				<Modal.Header closeButton onClick={props.onHide}></Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Are you sure you want to delete {props.deletetitle}?</Form.Label><br></br>
						<Button variant="secondary" onClick={() => handleSubmit(props.deleteid)}>Submit</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default DeleteModal;