import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import CardViewer from './CardViewer/cardViewer';
import Footer from './Footer/footer';
import "./app.css";

function App() {
	const [cardData, setCardData] = useState([]);
	const [dataReady, setDataReady] = useState(false);

	// let temp = "603e7562a7b8813da19a7d40";
	// function getCardsFromCollection(collectionID) {
	// 	axios.get(`http://localhost:5000/api/collections/${collectionID}/cards`)
	// 	.then(data =>	setCardData(data.data), setDataReady(true));
	// }

	let connectionURI = "http://localhost:5000/api/collections/"

	function getAllCards(uri) {
		axios.get(uri)
		.then(data => setCardData(data.data), setDataReady(true));
	}

	useEffect(() => {
		getAllCards(connectionURI);
	}, [connectionURI]);

	return (
		dataReady ?
			<div id="main">
				<TitleBar cardData={cardData}/>
				<CardViewer cardData={cardData} />
				<Footer />
			</div>
		: null
	);
}

export default App;