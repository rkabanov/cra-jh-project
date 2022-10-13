import React from "react";
import styled from "@emotion/styled";
import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #880000;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 0.2 rem;
`;


function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() =>   {
    fetch("/cra-jh-project/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))
  }, []);

  const filterReset = () => {
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

      <PokemonFilter filter={filter} filterSet={filterSet} filterReset={filterReset} />

      <TwoColumnLayout>
        <div>
          <PokemonTable pokemon={pokemon} filter={filter} selectedItemSet={selectedItemSet} />
        </div>

        {selectedItem && (
          <PokemonInfo {...selectedItem} hideInfo={resetSelectedItem} />
        )}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
