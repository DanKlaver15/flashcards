import React, { Component } from 'react';
import TitleBar from './TitleBar/titleBar';
import "./app.css";


class App extends Component { 
	state={ }
	render() {
		return (
			<div id="main">
				<TitleBar />
			</div>
		);
	}
}

export default App;