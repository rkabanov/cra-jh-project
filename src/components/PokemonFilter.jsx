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
  const {filter, filterSet, filterReset} = useContext(PokemonContext)

  return (
    <div>
      <FilterInput 
        value={filter}
        onChange={(evt) => filterSet(evt.target.value)} />

      <Button sx={{ml: 1, mb: 1}}
        variant="outlined"
        size="small"
        color="error"
        onClick={filterReset}>
        Reset Filter ({filter.length})
      </Button>    
    </div>
  );
};

export default PokemonFilter;

