import React from 'react';
import EnhancedTable from '../CreateTable/createTable';
import Modal from 'react-bootstrap/Modal';

function EditDeleteCardModal(props) {

	return (
		<Modal {...props } onHide={props.onHide} size='lg' deletecard={props.deletecard} editcard={props.editcard} collectionid={props.collectionid}>
			<Modal.Header closeButton onClick={props.onHide}>Cards in the {props.currentitle} collection.</Modal.Header>
			<Modal.Body>
				<EnhancedTable {...props} collectiondata={props.collectiondata} deletecard={props.deletecard} editcard={props.editcard} collectionid={props.collectionid}/>
			</Modal.Body>
		</Modal>
	);
}

export default EditDeleteCardModal;