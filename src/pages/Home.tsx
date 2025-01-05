import { useLazyQuery } from "@apollo/client";
import InputField from "@/components/InputField";
import { GET_POKEMON } from "@/graphql/queries";

const Home = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <InputField onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Pokemon not found - Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.pokemon.name.fr}</h2>
          <img src={data.pokemon.sprites.regular} alt={data.pokemon.name.fr} />
        </div>
      )}
    </div>
  );
};

export default Home;
