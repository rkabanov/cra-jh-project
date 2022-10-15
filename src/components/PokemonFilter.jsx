import React from "react";
import styled from "@emotion/styled";

import { Button } from "@mui/material";
import { useContext } from "react";
import PokemonContext from "../PokemonContext";

const FilterInput = styled.input`
  width: 70%;
  font-size: x-large;
  padding: 0.2rem;
`;

const PokemonFilter = () => {
  const { state: { filter }, dispatch } = useContext(PokemonContext);

  return (
    <div>
      <FilterInput
        value={filter}
        onChange={(evt) => dispatch({ type: 'SET_FILTER', payload: evt.target.value })} />

      <Button sx={{ ml: 1, mb: 1 }}
        variant="outlined"
        size="small"
        color="error"
        onClick={() => dispatch({ type: 'SET_FILTER', payload: '' })}>
        Reset Filter ({filter.length})
      </Button>
    </div>
  );
};

export default PokemonFilter;

