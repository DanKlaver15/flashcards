import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import CardViewer from './CardViewer/cardViewer';
import Footer from './Footer/footer';
import "./app.css";

function App() {
	const [allData, setAllData] = useState([]);
	const [collectionData, setCollectionData] = useState([]);
	const [dataReady, setDataReady] = useState(false);

	let connectionURI = "http://localhost:5000/api/collections/";

	function getAllCards(uri) {
		axios.get(uri)
		.then(data => setAllData(data.data), setDataReady(true))
	}

	function selectCollection(collectionID) {
		setCollectionData([]);
		axios.get(`http://localhost:5000/api/collections/${collectionID}/cards`)
		.then(data =>	setCollectionData(data.data), setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}

	function addCollection(title) {
		axios.post(connectionURI, title)
		.then(setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}

	function editCollection(collectionID, title) {
		axios.put(`http://localhost:5000/api/collections/${collectionID}`, title)
		.then(setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}

	function deleteCollection(collectionID) {
		axios.delete(`http://localhost:5000/api/collections/${collectionID}`)
		.then(setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}

	function addCard(collectionID, cardInfo) {
		axios.post(`http://localhost:5000/api/collections/${collectionID}/cards`, cardInfo)
		.then(setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}

	function editCard(collectionID, cardID, cardInfo) {
		axios.put(`http://localhost:5000/api/collections/${collectionID}/cards/${cardID}`, cardInfo)
		.then(setDataReady(true))
		.then(() => getAllCards(connectionURI));
	}
	
	function deleteCard(collectionID, cardID) {
		axios.delete(`http://localhost:5000/api/collections/${collectionID}/cards/${cardID}`)
		.then(setDataReady(false))
		.then(() => getAllCards(connectionURI));
	}

	useEffect(() => {
		getAllCards(connectionURI);
	}, [connectionURI]);

	return (
		dataReady ?
			<div id="main">
				<TitleBar 
					allData={allData} 
					selectCollection={selectCollection} 
					collectionData={collectionData} 
					addCollection={addCollection} 
					editCollection={editCollection} 
					deleteCollection={deleteCollection}
					addCard={addCard}
					editCard={editCard}
					deleteCard={deleteCard}
				/>
				<CardViewer collectionData={collectionData} />
				<Footer />
			</div>
		: null
	);
}

export default App;