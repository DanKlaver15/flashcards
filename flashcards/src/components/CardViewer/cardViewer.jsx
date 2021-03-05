import React from 'react';
// import CardFront from '../Card/cardFront';
// import CardBack from '../Card/cardBack';
import './cardViewer.css';

const initialState = {
  slideIndex: 0,
//   showFront: true,
//   showBack: false,
//   setClick: 1
};

function Slide({ slide, offset }) {
  	const active = offset === 0 ? true : null;

  	return (
		<div
			className="slide"
			data-active={active}
			style={{
			"--offset": offset,
			"--dir": offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
			"--blur": offset !== 0 ? 1 : 0
			}}
		>
			<div className="slideContent">
			<div className="slideContentInner">
				<h2 className="Word">{slide.word}</h2>
				<p className="Definition">{slide.definition}</p>
			</div>
			</div>
		</div>
  );
}

function CardViewer(props) {
	let slides = props.cardData;

	const slidesReducer = (state, event) => {
		if (event.type === "NEXT") {
		  return {
			 ...state,
			 slideIndex: (state.slideIndex + 1) % slides.length
		  };
		}
		if (event.type === "PREV") {
		  return {
			 ...state,
			 slideIndex:
				state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
		  };
		}
		if (event.type === "CLICK") {
				if (state.setClick % 2 !== 0) {
				 return {
					 ...state,
					 showBack: true,
					 setClick: state.setClick++
				 };
				} else if (state.setClick % 2 === 0) {
				 return {
					 ...state,
					 showFront: false,
					 setClick: state.setClick++
				 };
			 }
			}
	 };

  	const [state, dispatch] = React.useReducer(slidesReducer, initialState);

	return (
		<div className="slides">
			<button onClick={() => dispatch({ type: "PREV" })}>‹</button>

			{[...slides, ...slides, ...slides].map((slide, i) => {
			let offset = slides.length + (state.slideIndex - i);
			return <Slide slide={slide} offset={offset} key={i} state={state} onClick={() => dispatch({ type: "CLICK" })} />;
			})}
			<button onClick={() => dispatch({ type: "NEXT" })}>›</button>
		</div>
	);
}

export default CardViewer;