"use client";
import { useEffect, useState } from "react";

interface Pokemon {
    id: number;
  name: string;
  weight: number;
  height: number;
  types: string[];
  abilities: string[];
}

const BgColorTypes = {
        bug: 'bg-[#a8b820]',
        dark: 'bg-[#705848]',
        dragon: 'bg-[#7038f8]',
        electric: 'bg-[#f8d030]',
        fairy: 'bg-[#f0a6f7]',
        fighting: 'bg-[#c03028]',
        fire: 'bg-[#f08030]',
        flying: 'bg-[#a890f0]',
        ghost: 'bg-[#705898]',
        grass: 'bg-[#78c850]',
        ground: 'bg-[#e0c068]',
        ice: 'bg-[#98d8d8]',
        normal: 'bg-[#a8a878]',
        poison: 'bg-[#a040a0]',
        psychic: 'bg-[#f85888]',
        rock: 'bg-[#b8a038]',
        water: 'bg-[#6890f0]',
    }
    //Colores del Border para Tailwind
    const BorderColorTypes = {
        bug: 'border-[#a8b820]',
        dark: 'border-[#705848]',
        dragon: 'border-[#7038f8]',
        electric: 'border-[#f8d030]',
        fairy: 'border-[#f0a6f7]',
        fighting: 'border-[#c03028]',
        fire: 'border-[#f08030]',
        flying: 'border-[#a890f0]',
        ghost: 'border-[#705898]',
        grass: 'border-[#78c850]',
        ground: 'border-[#e0c068]',
        ice: 'border-[#98d8d8]',
        normal: 'border-[#a8a878]',
        poison: 'border-[#a040a0]',
        psychic: 'border-[#f85888]',
        rock: 'border-[#b8a038]',
        water: 'border-[#6890f0]',
    }

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(detailed);
      } catch (error) {
        console.error("Error al traer pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Cargando pokemons...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className={"rounded-2xl bg-white border border-<type>"}
        >
          <img
            src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/<idPoke>.png".replace("<idPoke>", pokemon.id)}
            alt={pokemon.name}
            className="mx-auto w-20 h-20"
          />
          <p className="font-bold text-center">{pokemon.height}</p>
         
        </div>
      ))}
    </div>
  );
}

