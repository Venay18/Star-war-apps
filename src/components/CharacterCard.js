import React from 'react';
import Link from 'next/link';

const CharacterCard = ({ character, isFavorite, toggleFavorite }) => (
  <div className="character-card">
    <h3>{character.name}</h3>
    <h1>vinay</h1>
    <Link href={`/character/${character.url.split('/')[5]}`}>
      <a>View Details</a>
    </Link>
    <button onClick={() => toggleFavorite(character)}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  </div>
);

export default CharacterCard;
