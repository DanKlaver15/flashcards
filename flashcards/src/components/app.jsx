import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import CardViewer from './CardViewer/cardViewer';
import Footer from './Footer/footer';
import "./app.css";

function App() {
	const [cardData, setCardData] = useState([]);
	const [dataReady, setDataReady] = useState(false);

	let temp = "603e7562a7b8813da19a7d40";
	function getCardsFromCollection(collectionID) {
		axios.get(`http://localhost:5000/api/collections/${collectionID}/cards`)
		.then(data =>	setCardData(data.data), setDataReady(true));
	}

	useEffect(() => {
		getCardsFromCollection(temp);
	}, [temp]);

	return (
		dataReady ?
			<div id="main">
				<TitleBar />
				<CardViewer cardData={cardData} />
				<Footer />
			</div>
		: null
	);
}

export default App;