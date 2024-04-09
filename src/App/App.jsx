/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../components/Header';
import Page from '../components/Page';

function App() {
	const [searchQuery, setSearchQuery] = useState(""); // Search query state
	
  	return (
	<>
		<Router>
			<Header updateQuery={setSearchQuery}/>
			<Switch>
				<Route
					exact
					path="/"
				>
					<section className="lumx-spacing-padding-horizontal-huge" />
					<div className='main-page'>
						<div className='page-title'><h1>Search Results</h1></div>
						<Page search={searchQuery}/>
					</div>
				</Route>
			</Switch>
		</Router>
	</>
 	);
}

export default App;
