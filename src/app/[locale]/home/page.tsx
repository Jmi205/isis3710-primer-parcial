import PokemonList from "@/components/ListPokemon";
import {useTranslations} from 'next-intl';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pokedex Nacional - PokeApp",
  description: "Explora la Pokédex de la primera generación: un listado completo de Pokémon con sus características y detalles principales.",
};





export default function HomePage() {
  const t = useTranslations('pokemonList');

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">{t("title")}</h1>
      <PokemonList />
    </div>
  );
}
