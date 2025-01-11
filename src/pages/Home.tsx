import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_POKEMON } from "@/graphql/queries";
import InputField from "@/components/InputField";
import CardDetails from "@/components/CardDetails";
import List from "@/components/List";

const Home: React.FC = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
    if (data && data.pokemon) {
      setModalShow(true);
    }
  };

  return (
    <div className="mt-5">
      <InputField onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Pokemon not found - Error: {error.message}</p>}
      {data && (
        <div>
          <CardDetails
            show={modalShow}
            onHide={() => setModalShow(false)}
            pokemon={data.pokemon}
          />
        </div>
      )}
      <List pokemons={[]} />
    </div>
  );
};

export default Home;
