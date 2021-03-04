import React from 'react';
import './carousel.css';

function SlideBack(props) {
	return (
		<div className = "front">
			<div className="slideContent">
			<div className="slideContentInner">
				<h2 className="definition">{props.definition}</h2>
			</div>
			</div>
		</div>
	)
}

export default SlideBack;