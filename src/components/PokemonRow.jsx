import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

// import PokemonType from '../PokemonType';

const PokemonRow = ({pokemon, selectPokemon}) => (
  <tr>
    <td>{pokemon.id}</td>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button 
          variant="outlined"
          color="success"
          onClick={() => (selectPokemon(pokemon))}>
        Select
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    name: PropTypes.shape({
      english: PropTypes.string.isRequired
    })
  }),
  selectPokemon: PropTypes.func.isRequired
}

export default PokemonRow;
