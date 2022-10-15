import React, { useContext } from "react";
import styled from "@emotion/styled";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

const TableHeader = styled.th`
  text-align: left;
  font-size: x-large;
  color: #000088;
`;

const PokemonTable = () => {
  const {state: {pokemon, filter}, dispatch} = useContext(PokemonContext);

  return (
    <table width="100%">
    <thead>
      <tr>
        <TableHeader>ID</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Select</TableHeader>
      </tr>
    </thead>
    <tbody>
      {pokemon
        .filter((pokemon) => (pokemon.name.english.toLowerCase().includes(filter.toLowerCase())))
        .slice(0, 20)
        .map((pokemon) => (
          <PokemonRow key={pokemon.id}
            pokemon={pokemon}
            selectPokemon={(p) => dispatch({type: 'SET_SELECTED_POKEMON', payload: p}) }
          />
      ))}
    </tbody>
    </table>
  );
};


export default PokemonTable;
