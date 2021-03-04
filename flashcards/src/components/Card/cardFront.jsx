import React from 'react';
import './carousel.css';

function SlideFront(props) {
	return (
		<div className = "front">
			<div className="slideContent">
			<div className="slideContentInner">
				<h2 className="word">{props.word}</h2>
			</div>
			</div>
		</div>
	)
}

export default SlideFront;