import React from 'react';
import './cardViewer.css';

const initialState = {
	slideIndex: 0,
	prevShowFront: true,
	currentShowFront: true,
	setClick: 1
};

let slides = [];
let slideNumber = 0;

function Slide({ slide, offset, state, flipFunction }) {
  	const active = offset === 0 ? true : null;
	
  	return (
		state.currentShowFront ?
		<div
			className="slide"
			data-active={active}
			style={{
			"--offset": offset,
			"--dir": offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
			"--blur": offset !== 0 ? 1 : 0
			}}
		>
			<div className="slideContent" onClick={flipFunction}>
					<div className="slideContentInner">
						<h2 className="slideTitle">{slide.word}</h2>
					</div>
			</div>
		</div>
	: 
		<div
			className="slide"
			data-active={active}
			style={{
			"--offset": offset,
			"--dir": offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
			"--blur": offset !== 0 ? 1 : 0
			}}
		>
			<div className="slideContent" onClick={flipFunction}>
					<div className="slideContentInner">
						<h2 className="slideDescription">{slide.definition}</h2>
					</div>
			</div>
		</div>
  )
}

export function CardViewer(props) {
	slides = props.collectionData;

	const slidesReducer = (state, event) => {
		if (event.type === "NEXT") {
		  return {
			 ...state,
			 slideIndex: (state.slideIndex + 1) % slides.length,
			 currentShowFront: true,
			 prevShowFront: true

		  };
		}
		if (event.type === "PREV") {
		  return {
			 ...state,
			 slideIndex: state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
			 currentShowFront: true,
			 prevShowFront: true
		  };
		}
		if (event.type === "CLICK") {

			return {
				...state,
				currentShowFront: !state.prevShowFront,
				prevShowFront: !state.currentShowFront
			};
		}
	 };

  	const [state, dispatch] = React.useReducer(slidesReducer, initialState);

	return (
		<div className="slides">
			<button onClick={() => dispatch({ type: "PREV" })}>‹</button>

			{[...slides, ...slides].map((slide, i) => {
			let offset = slides.length + (state.slideIndex - i);
			return (
				<Slide 
				slide={slide}
				offset={offset} 
				key={i} 
				state={state}
				flipFunction={() => dispatch({ type: "CLICK" })}
				>
				</Slide>
			)
			})}
			<button onClick={() => dispatch({ type: "NEXT" })}>›</button>
		</div>
	);
}

export function SetSlideCount() {
	return (
		<div className="slideCount">Slide {slideNumber} of {slides.length}</div>
	)
}
