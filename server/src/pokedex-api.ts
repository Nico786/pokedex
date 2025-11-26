import { RESTDataSource } from '@apollo/datasource-rest';
import { type Pokemon } from './types.js';

class PokedexAPI extends RESTDataSource {
  override baseURL = 'https://tyradex.app/api/v1/';

  async getPokemons(): Promise<Pokemon[]> {
    return this.get<Pokemon[]>('gen/1');
  }

  async getPokemon(name: string): Promise<Pokemon> {
    return this.get<Pokemon>(`pokemon/${encodeURIComponent(name)}`);
  }
}

export { PokedexAPI };