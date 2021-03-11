import React from 'react';
import {TemporaryDrawer, SetCurrentTitle} from '../Drawer/drawer';
import '../Drawer/drawer.css';
import './titleBar.css';

function TitleBar(props) { 

   return (
		<div className="titlebar">
			<div className='menuButton'>
			<TemporaryDrawer allData={props.allData} selectCollection={props.selectCollection} addCollection={props.addCollection} editCollection={props.editCollection} deleteCollection={props.deleteCollection}/>
			</div>
			<SetCurrentTitle />
		</div>
	);
}

export default TitleBar;