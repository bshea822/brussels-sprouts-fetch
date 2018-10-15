import React from 'react';
import SproutTile from './SproutTile';

const SproutsIndex = props => {

  let sprouts = props.recipes.map(recipe => {
    return(
      <SproutTile
        key={recipe}
        recipe={recipe}
      />
    )
  })
  return(
    <div>
      <ul>
        {sprouts}
      </ul>
    </div>
  );
}

export default SproutsIndex;
