import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import './PokeProfile.css';

const PokeProfile = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }

  let typeStr = '';
  pokemon.types.forEach(type => {
    typeStr += (type.type.name + ' ');
  });

  return (
    <Card>
      <Image src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`} alt={pokemon.name}/>
      {/* <Image src={pokemon.sprites.front_default} /> */}
      <Card.Content>
        <Card.Header>{pokemon.name}</Card.Header>
        <Card.Meta>
          <span>ID: {pokemon.id}</span>
        </Card.Meta>
        <Card.Description>
          {pokemon.stats.map(stat => {
            return (
              <p key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            );
          })}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          {typeStr}
        </p>
      </Card.Content>
    </Card>
  );
};

export default PokeProfile;