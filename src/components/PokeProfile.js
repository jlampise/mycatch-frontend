import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const PokeProfile = ({ pokemon }) => {
  // if (!pokemon) {
  //   return null;
  // }

  let typeStr = '';
  let src = '';
  let name = '';
  let id = '';
  if (pokemon) {
    pokemon.types.forEach(type => {
      typeStr += type.type.name + ' ';
    });
  
    src = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
      pokemon.name
    }.png`;
    name = pokemon.name;
    id = 'ID: ' + pokemon.id;
  }

  

  return (
    <Card>

      <Image
        src={src}
      />
      {/* <Image src={pokemon.sprites.front_default} /> */}
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span>{id}</span>
        </Card.Meta>
        <Card.Description>
          {pokemon ? pokemon.stats.map(stat => {
            return (
              <p key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            );
          }) : null }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>{typeStr}</p>
      </Card.Content>
    </Card>
  );
};

export default PokeProfile;
