import React from 'react';
import {TemporaryDrawer, SetCurrentTitle} from '../Drawer/drawer';
import '../Drawer/drawer.css';
import './titleBar.css';

function TitleBar(props) { 
   return (
		<div className="titlebar">
			<div className='menuButton'>
			<TemporaryDrawer allData={props.allData} selectCollection={props.selectCollection}/>
			</div>
			<SetCurrentTitle />
		</div>
	);
}

export default TitleBar;