import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import Carousel from './Carousel/carousel';
import Footer from './Footer/footer';
import "./app.css";

class App extends Component { 
	constructor(props) {
		super(props);
		this.state={ }
	}

	getAllCards() {
		axios.get()
		.then(data =>
			this.setState({
				music: data.data,
				dataReady: true
			})
		)
	}

	render() {
		return (
				<div id="main">
					<TitleBar />
					<Carousel />
					<Footer />
				</div>
		);
	}
}

export default App;