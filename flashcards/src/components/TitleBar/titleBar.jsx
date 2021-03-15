import React from 'react';
import {TemporaryDrawer, SetCurrentTitle} from '../Drawer/drawer';
import '../Drawer/drawer.css';
import './titleBar.css';

function TitleBar(props) { 

   return (
		<div className="titlebar">
			<div className="accentBarTop"></div>
			<div className='menuButton'>
			<TemporaryDrawer 
				allData={props.allData}
				collectionData={props.collectionData}
				selectCollection={props.selectCollection} 
				addCollection={props.addCollection} 
				editCollection={props.editCollection} 
				deleteCollection={props.deleteCollection}
				addCard={props.addCard}
				editCard={props.editCard}
				deleteCard={props.deleteCard}
			/>
			</div>
			<SetCurrentTitle />
		</div>
	);
}

export default TitleBar;