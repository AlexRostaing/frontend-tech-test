import React from 'react';
import './index.scss';
import classNames from 'classnames';

const Pagination = ({currentPage, changePageNb, tabCount}) => {
    
    const paginationButtons = []; // Array containing the page buttons
    for (let i=0; i<tabCount; i++) {
        const isCurrent = i === currentPage;
        paginationButtons.push(
            <button key={"button"+i} className={classNames('page-button', 'pag-btn', isCurrent ? 'current-page':'')} id={"page-button-"+i} name={"page-button-"+i} onClick={()=>changePageNb({type: 'page_change', data: i})}>{i+1}</button>)
    }

    // Set new page value when using the previous/next buttons
	const changePage = (n) => {
		if ((n>0 && currentPage+1 < tabCount) || (n<0 && currentPage-1 > 0))
            changePageNb({type: 'page_change', data: currentPage+n});
	};

    // Displays the previous/next buttons and the buttons for individual pages
	return (
		<>
            <div className='pagination-button'><button className='change-page-button pag-btn' name="previous" value="previous" onClick={()=>changePage(-1)}>Previous</button></div>
            <div id='page-buttons'>
            {
                paginationButtons
            }
            </div>
            <div className='pagination-button'><button className='change-page-button pag-btn' name="next" value="next" onClick={()=>changePage(1)}>Next</button></div>
		</>
	);
};

export default Pagination;