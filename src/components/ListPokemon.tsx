"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";


interface Pokemon {
  name: string;
  url: string;
}

// Colores del Background para Tailwind
const BgColorTypes: Record<string, string> = {
  bug: "bg-[#a8b820]",
  dark: "bg-[#705848]",
  dragon: "bg-[#7038f8]",
  electric: "bg-[#f8d030]",
  fairy: "bg-[#f0a6f7]",
  fighting: "bg-[#c03028]",
  fire: "bg-[#f08030]",
  flying: "bg-[#a890f0]",
  ghost: "bg-[#705898]",
  grass: "bg-[#78c850]",
  ground: "bg-[#e0c068]",
  ice: "bg-[#98d8d8]",
  normal: "bg-[#a8a878]",
  poison: "bg-[#a040a0]",
  psychic: "bg-[#f85888]",
  rock: "bg-[#b8a038]",
  water: "bg-[#6890f0]",
};

// Colores del Border para Tailwind
const BorderColorTypes: Record<string, string> = {
  bug: "border-[#a8b820]",
  dark: "border-[#705848]",
  dragon: "border-[#7038f8]",
  electric: "border-[#f8d030]",
  fairy: "border-[#f0a6f7]",
  fighting: "border-[#c03028]",
  fire: "border-[#f08030]",
  flying: "border-[#a890f0]",
  ghost: "border-[#705898]",
  grass: "border-[#78c850]",
  ground: "border-[#e0c068]",
  ice: "border-[#98d8d8]",
  normal: "border-[#a8a878]",
  poison: "border-[#a040a0]",
  psychic: "border-[#f85888]",
  rock: "border-[#b8a038]",
  water: "border-[#6890f0]",
};

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("pokemonList");


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
        const data = await res.json();

        // Para cada pokemon hacemos fetch de sus detalles
        const details = await Promise.all(
          data.results.map(async (poke: Pokemon) => {
            const pokeRes = await fetch(poke.url);
            return await pokeRes.json();
          })
        );

        setPokemons(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p> {t("loading")} </p>;

  return (
    <div className="grid grid-cols-3 gap-12 p-4 ">
      {pokemons.map((poke) => {
        const firstType = poke.types[0]?.type?.name || "normal"; 
        const borderColor = BorderColorTypes[firstType] || "border-gray-300";
        const bgColor = BgColorTypes[firstType] || "bg-gray-200";

        return (
          <Link
            key={poke.id}
            href={`/details/${poke.id}`}
            className={`p-4 rounded-xl shadow hover:scale-105 transition border-4 ${borderColor} bg-white`}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
              alt={poke.name}
              className="w-32 h-32 mx-auto"
            />
            <h3 className="text-center font-bold capitalize mt-2">{poke.name}</h3>
            <div className="flex justify-center mt-2">
              <span
                className={`text-white px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}
              >
                {firstType}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
