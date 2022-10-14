import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useContext } from "react";
import PokemonContext from "../PokemonContext";

import PokemonType from "../PokemonType";

const PokemonInfo = () => {
  const { selectedPokemon, 
    selectedPokemonReset 
  } = useContext(PokemonContext);

  const nameRef = useRef(null);

  React.useEffect(() => {
    document.title = selectedPokemon ? selectedPokemon.name.english : 'Pokemon Search';
    if (nameRef.current) {
      nameRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [selectedPokemon]);


  return selectedPokemon ? (
    <div>
      <h1 ref={nameRef}>{selectedPokemon.name.english}</h1>
      <table>
        <tbody>
          {Object.keys(selectedPokemon.base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{selectedPokemon.base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button 
          variant="contained"
          onClick={selectedPokemonReset}>
        Hide
      </Button>
    </div>
  ) : null;
};

PokemonInfo.propTypes = {
  selectedPokemon: PokemonType,
  selectedPokemonReset: PropTypes.func
}

export default PokemonInfo;
