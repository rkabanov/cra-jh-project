import React from "react";
import { Button } from "@mui/material";

const PokemonInfo = ({name, base, hideInfo}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button 
        variant="contained"
        onClick={hideInfo}>
      Hide
    </Button>
  </div>
)

export default PokemonInfo;
