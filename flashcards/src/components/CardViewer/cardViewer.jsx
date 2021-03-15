import React, { useEffect } from 'react';
import './cardViewer.css';

const initialState = {
	slideIndex: 0,
	prevShowFront: true,
	currentShowFront: true,
	animate: 0
};

function Slide({ slide, offset, state, flipFunction, slideNumber, slides, onAnimationEnd}) {
  	const active = offset === 0 ? true : null;

  	return (
		state.currentShowFront ?
		<div
			className="slide"
			data-active={active}
			onClick={flipFunction}
			animateflip={state.animate}
			onAnimationEnd={onAnimationEnd}
			style={{
			"--offset": offset,
			"--dir": offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
			"--blur": offset !== 0 ? 1 : 0
			}}
		>
			<div className="slideContent">
				<div className="slideContentInner">
					<h2 className="slideTitle">{slide.word}</h2>
				</div>
				<p className="slideCount">Slide {slideNumber} out of {slides.length}</p>
			</div>
		</div>
	: 
		<div
			className="slide"
			data-active={active}
			onClick={flipFunction}
			animateflip={state.animate}
			onAnimationEnd={onAnimationEnd}
			style={{
			"--offset": offset,
			"--dir": offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
			"--blur": offset !== 0 ? 1 : 0
			}}
		>
			<div className="slideContent">
				<div className="slideContentInner">
					<h2 className="slideDescription">{slide.definition}</h2>
				</div>
				<p className="slideCount">Slide {slideNumber} out of {slides.length}</p>
			</div>
		</div>
  )
}

function CardViewer(props) {

	const [slides, setSlides] = React.useState([]);

	useEffect(() => {
		setSlides(props.collectionData);
	}, [props.collectionData])

	const slidesReducer = (state, event) => {
		if (event.type === "NEXT") {
			return {
				...state,
				slideIndex: (state.slideIndex + 1) % slides.length,
				currentShowFront: true,
				prevShowFront: true,
				animate: 0
			};
		}
		if (event.type === "PREV") {
			return {
				...state,
				slideIndex: state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
				currentShowFront: true,
				prevShowFront: true,
				animate: 0
			};
		}
		if (event.type === "CLICK") {
			return {
				...state,
				animate: 1,
				currentShowFront: !state.prevShowFront,
				prevShowFront: !state.currentShowFront,
			}; 
		}
		if (event.type === "STOP") {
			return {
				...state,
				animate: 0
			}; 
		}
	};

  	const [state, dispatch] = React.useReducer(slidesReducer, initialState);

	return (
		<div className="slides">
			<button onClick={() => dispatch({ type: "PREV" })}>‹</button>

			{[...slides, ...slides, ...slides].map((slide, i) => {
			let offset = slides.length + (state.slideIndex - i);
			return (
				<Slide 
				slide={slide}
				offset={offset}
				slideNumber={i - 2}
				slides={slides}
				key={i} 
				state={state}
				flipFunction={() => dispatch({ type: "CLICK" })}
				animateflip={state.animate}
				onAnimationEnd={() => dispatch({ type: "STOP" })}
				>
				</Slide>
			)
			})}
			<button onClick={() => dispatch({ type: "NEXT" })}>›</button>
		</div>
	);
}

export default CardViewer;
