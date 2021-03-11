import React from 'react';
import { SetSlideCount } from '../CardViewer/cardViewer';
import './footer.css';

function Footer(props) { 
   return (
		<div className="footer">
			<SetSlideCount />
		</div>
	);
}

export default Footer;