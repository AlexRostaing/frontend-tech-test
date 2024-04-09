import React from 'react';
import { FlexBox, Alignment } from '@lumx/react';
import Search from '../Search';

const Header = ({updateQuery}) => (
	<header className="lumx-spacing-padding-big header">
		<h1 className='header-title'>Marvel Characters</h1>
		<FlexBox vAlign={Alignment.right}>
			<Search 
			searchQuery={updateQuery}/>
		</FlexBox>
	</header>
);

export default Header;
