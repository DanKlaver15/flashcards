import React, { Component } from 'react';
import TitleBar from './TitleBar/titleBar';
import "./app.css";

class App extends Component { 
	state={ }
	render() {
		return (
			<body>
				<div id="main">
					<TitleBar />
				</div>
			</body>
		);
	}
}

export default App;