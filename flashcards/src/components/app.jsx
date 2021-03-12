import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import {CardViewer} from './CardViewer/cardViewer';
import Footer from './Footer/footer';
import "./app.css";

function App() {
	const [allData, setAllData] = useState([]);
	const [collectionData, setCollectionData] = useState([]);
	const [dataReady, setDataReady] = useState(false);

	let connectionURI = "http://localhost:5000/api/collections/";

	function getAllCards(uri) {
		debugger;
		axios.get(uri)
		.then(data => setAllData(data.data), setDataReady(true))
	}

	function selectCollection(collectionID) {
		axios.get(`http://localhost:5000/api/collections/${collectionID}/cards`)
		.then(data =>	setCollectionData(data.data), setDataReady(true));
	}

	function addCollection(title) {
		axios.post(connectionURI, title)
		.then(setDataReady(false))
		.then(() => getAllCards(connectionURI));
	}

	function editCollection(collectionID, title) {
		axios.put(`http://localhost:5000/api/collections/${collectionID}`, title)
		.then(setDataReady(false))
		.then(() => getAllCards(connectionURI));
	}

	function deleteCollection(collectionID) {
		axios.delete(`http://localhost:5000/api/collections/${collectionID}`)
		.then(data =>	setCollectionData(data.data), setDataReady(false))
		.then(() => getAllCards(connectionURI));
	}

	useEffect(() => {
		getAllCards(connectionURI);
	}, [connectionURI]);

	return (
		dataReady ?
			<div id="main">
				<TitleBar allData={allData} getAllCards={getAllCards} selectCollection={selectCollection} collectionData={collectionData} addCollection={addCollection} editCollection={editCollection} deleteCollection={deleteCollection}/>
				<CardViewer collectionData={collectionData} />
				<Footer />
			</div>
		: null
	);
}

export default App;