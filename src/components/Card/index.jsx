import React from 'react';
import './index.scss';

const Card = ({character}) => {
	const imageVariant = "/standard_amazing."; //image size (180x180)

	return (
		<div key={character.id} id={character.id} className="character-card">
			<div className='character-image'><img src={character.thumbnail.path+imageVariant+character.thumbnail.extension} alt="Character Thumbnail Profile" /></div>
			<div className='character-name'><h2>{character.name}</h2></div>
			<div className='character-description'>{character.description}</div>
			<div className='character-stats'>
				<div className='character-comics'><b># comics:</b> {character.comics.available}</div>
				<div className='character-series'><b># series:</b> {character.series.available}</div>
				<div className='character-stories'><b># stories:</b> {character.stories.available}</div>
			</div>
        </div>
	);
};

export default Card;
