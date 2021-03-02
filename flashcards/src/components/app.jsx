import React, { Component } from 'react';
import TitleBar from './TitleBar/titleBar';
import Footer from './Footer/footer';
import "./app.css";

class App extends Component { 
	state={ }
	render() {
		return (
				<div id="main">
					<TitleBar />
					<Footer />
				</div>
		);
	}
}

export default App;