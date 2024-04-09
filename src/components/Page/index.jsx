import React, { useEffect, useRef, useReducer } from 'react';
import './index.scss';
import Card from '../Card';
import Pagination from '../Pagination';
import {get} from '../../api';
import md5 from 'md5';

const PAGE_LIMIT = 4; // Results per page

// Reducer to manage page changes
const managePageChanges = (context, action) => {
	switch (action.type) {
		case 'page_change': {
			return {
				searchResults: action.data.results,
				currentPageNb: action.data.page
			};
		}
		case 'search_results_update': {
			return {
				searchResults: action.data,
				currentPageNb: 0
			};
		}
		case 'reset_search_result': {
			return {
				searchResults: null,
				currentPageNb: 0
			};
		}
	}
	throw Error('Unknown page action: ' + action.type);
}

const Page = ({search}) => {
	const [pageContext, pageChangeDispatch] = useReducer(managePageChanges, {currentPageNb: 0, searchResults: null});

	const currentSearch = useRef(null); // Ref to verify if query has updated

	const isSearchValid = search && search !== ""; // Is the search string valid

	const isResultsValid = pageContext.searchResults != null && pageContext.searchResults.results.length > 0; // Is the result valid

	const tabCount = Math.ceil(pageContext.searchResults?.total/PAGE_LIMIT||0); // number of pages of results

	// If search updates, check if valid before making the api request
	if (search !== currentSearch.current){
		if (isSearchValid) {
			currentSearch.current = search;
			getCharacters(0, (data) =>
				pageChangeDispatch({type: 'search_results_update', data: data})
			);
		}
		else if (isResultsValid){
			currentSearch.current = null;
			pageChangeDispatch({type: 'reset_search_result'});
		}
	}

	// Retrieves character listed based on searched name.
	async function getCharacters (page, callback) {
		const date = Date.now();
		const url = '/characters';
		const params = {
			ts: date,
			hash: md5(date+process.env.REACT_APP_MARVEL_API_PRIVATE_KEY+process.env.REACT_APP_MARVEL_API_PUBLIC_KEY),
			nameStartsWith: search,
			limit: PAGE_LIMIT,
			offset: page*PAGE_LIMIT,
		};

		return get(url, params).then((response) => {
			callback(response.data.data);
		}).catch((error) => {
			console.log('error', error);
			pageChangeDispatch({type: 'reset_search_result'});
		});
	};

	// Pgae change handler
	const pageChangeHandler = (action) => getCharacters(action.data, (data) => pageChangeDispatch({type: action.type, data: {results: data, page: action.data}}));

	// Displays 4 results and the pagination to change pages, or an empty search result.
	return (
		<>
			{
				isResultsValid ? 
				<>
					<div className='results-page'>
						{ 
							pageContext.searchResults.results.map((character, cardIndex) => <Card key={"card"+cardIndex} character={character}/>)
						}
					</div>
					<div className='pagination-zone'>
						<Pagination currentPage={pageContext.currentPageNb} changePageNb={pageChangeHandler} tabCount={tabCount}/>
					</div>
				</> :
				<div className='empty-results'><h4>No Results</h4></div>
			}
		</>
	);
};

export default Page;