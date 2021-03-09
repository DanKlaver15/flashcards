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

	let connectionURI = "http://localhost:5000/api/collections/"

	function getAllCards(uri) {
		axios.get(uri)
		.then(data => setAllData(data.data), setDataReady(true));
	}

	function selectCollection(collectionID) {
		axios.get(`http://localhost:5000/api/collections/${collectionID}/cards`)
		.then(data =>	setCollectionData(data.data), setDataReady(true));
	}

	useEffect(() => {
		getAllCards(connectionURI);
	}, [connectionURI]);

	return (
		dataReady ?
			<div id="main">
				<TitleBar allData={allData} selectCollection={selectCollection} collectionData={collectionData}/>
				<CardViewer collectionData={collectionData} />
				<Footer />
			</div>
		: null
	);
}

export default App;