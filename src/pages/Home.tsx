import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import InputField from "@/components/InputField";
import { GET_POKEMON } from "@/graphql/queries";
import CardDetails from "@/components/CardDetails";

const Home = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
    setModalShow(true);
  };

  return (
    <div>
      <h1>Pokedex App</h1>
      <InputField onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Pokemon not found - Error: {error.message}</p>}
      {data && (
        <CardDetails
          show={modalShow}
          onHide={() => setModalShow(false)}
          pokemon={data.pokemon}
        />
      )}
    </div>
  );
};

export default Home;
