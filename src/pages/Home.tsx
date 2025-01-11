import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POKEMON } from "@/graphql/queries";
import InputField from "@/components/InputField";
import CardDetails from "@/components/CardDetails";
import List from "@/components/List";

const Home: React.FC = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
  };

  useEffect(() => {
    if (data && data.pokemon) {
      setModalShow(true);
    }
  }, [data]);

  return (
    <div className="mt-5">
      <h2 className="text-center">
        Rechercher par nom ou en cliquant sur une carte !
      </h2>
      <InputField onSubmit={handleSearch} />
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
