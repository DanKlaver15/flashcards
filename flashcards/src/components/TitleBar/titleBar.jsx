import React from 'react';
import './titleBar.css';

function TitleBar(props) { 
   return (
		<div className="titlebar">
			<button className="selectCollection">Select Collection Placeholder</button>
			<button className="createCollection">Create New Collection Placeholder</button>
			<div className="collection">Placeholder for Collection (React, C#, ...)</div>
		</div>
	);
}

export default TitleBar;