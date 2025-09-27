import PokemonDetail from "@/components/CardPokemon";
import type { Metadata } from "next";

interface PageProps {
  params: {
    pokemonID: string;
  };
}

export const metadata: Metadata = {
  title: "Detalle del Pokémon - PokeApp",
  description: "	Consulta información detallada de cada Pokémon: estadísticas, tipos, habilidades y otros datos relevantes de la primera generación.",
};


export default function PokemonDetailPage({ params }: PageProps) {
  return (
    <div>
      <PokemonDetail pokemonID={params.pokemonID} />
    </div>
  );
}
