import React, { useEffect, useState } from 'react';
import { TextField, Theme } from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

const Search = ({searchQuery}) => {
	const [finalQuery, setFinalQuery] = useState(""); // Delayed search

	// Delays the search for 200ms to account for typing
	useEffect(() => {
		const timeOutId = setTimeout(() => searchQuery(finalQuery), 200);
		return () => clearTimeout(timeOutId);
	}, [finalQuery, searchQuery]);

	return (
		<TextField value={finalQuery} theme={Theme.dark} placeholder="Search..." icon={mdiMagnify} onChange={(e)=>{setFinalQuery(e)} } />
	)
};

export default Search;
