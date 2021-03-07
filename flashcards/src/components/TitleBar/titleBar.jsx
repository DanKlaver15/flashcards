import React from 'react';
import TemporaryDrawer from '../Drawer/drawer';
import '../Drawer/drawer.css';
import './titleBar.css';

function TitleBar(props) { 
   return (
		<div className="titlebar">
			<div className='menuButton'>
			<TemporaryDrawer />
			</div>
			<div className="collection">{props.cardData.title}</div>
		</div>
	);
}

export default TitleBar;