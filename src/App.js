import React from "react";
import styled from "@emotion/styled"
import "./App.css";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const PokemonRow = ({pokemon, selectItem}) => (
  <tr>
    <td>{pokemon.id}</td>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button 
          variant="outlined"
          color="success"
          onClick={() => (selectItem(pokemon))}>
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
  selectItem: PropTypes.func.isRequired
}


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

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired
  }),
  hideInfo: PropTypes.func.isRequired
}


const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #880000;
`;

const FilterInput = styled.input`
  width: 70%;
  font-size: x-large;
  padding: 0.2rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 0.2 rem;
`;

const TableHeader = styled.th`
  text-align: left;
  font-size: x-large;
  color: #000088;
`;


function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);
  const [filterLength, filterLengthSet] = React.useState(0);

  React.useEffect(() =>   {
    fetch("/cra-jh-project/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))
  }, []);

  React.useEffect(() => {
    filterLengthSet(filter.length)
  }, [filter]);

  const resetFilter = () => {
    console.log("resetFilter");
    filterSet("");
    selectedItemSet(null)
  };

  const resetSelectedItem = () => {
    console.log("resetSelectedItem");
    selectedItemSet(null)
  }

  return (
    <Container>

      <Title>Pokemon Search</Title>

      <FilterInput 
        value={filter}
        onChange={(evt) => filterSet(evt.target.value)} />

      <Button variant="outlined"
        size="small"
        color="error"
        onClick={resetFilter}>
        Reset Filter
      </Button>
      L={filterLength}

      <TwoColumnLayout>
        <div>
          <table width="100%">
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Food</TableHeader>
                <TableHeader>Select</TableHeader>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => (pokemon.name.english.toLowerCase().includes(filter.toLowerCase())))
                .slice(0, 20).map((pokemon) => (
                <PokemonRow key={pokemon.id}
                  pokemon={pokemon}
                  selectItem={(p) => (selectedItemSet(p)) } />
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <PokemonInfo {...selectedItem} hideInfo={resetSelectedItem} />
        )}
      </TwoColumnLayout>

    </Container>
  );
}

export default App;
