"use client";

import { useEffect, useState } from "react";
import {useTranslations} from 'next-intl';


interface PokemonDetailProps {
  pokemonID: string;
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

export default function PokemonDetail({ pokemonID }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations('detail');


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };

    fetchPokemon();
  }, [pokemonID]);

  if (loading) return <p>{t("loading")}</p>;
  if (!pokemon) return <p>{t("noFound")}</p>;

  const firstType = pokemon.types[0]?.type?.name || "normal";
  const borderColor = BorderColorTypes[firstType] || "border-gray-300";

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h2 className="text-2xl font-bold capitalize mb-6">
        {pokemon.name} - {t("detail")}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">

        <div className={`p-4 rounded-xl border-4 ${borderColor} bg-white`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="w-64 h-64"
          />
        </div>


        <div className="text-left">
          <p>
            <span className="font-semibold">{t("height")}:</span> {pokemon.height * 10} cm
          </p>
          <p>
            <span className="font-semibold">{t("weight")}:</span> {pokemon.weight / 10} kg
          </p>

          <div className="mt-2">
            <h3 className="font-semibold">{t("abilities")}:</h3>
            <ul className="list-disc list-inside">
              {pokemon.abilities.map((a: any) => (
                <li key={a.ability.name} className="capitalize">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h3 className="font-semibold">{t("types")}:</h3>
            <div className="flex gap-2 mt-1">
              {pokemon.types.map((t: any) => {
                const bgColor = BgColorTypes[t.type.name] || "bg-gray-300";
                return (
                  <span
                    key={t.slot}
                    className={`text-white px-3 py-1 rounded-full text-sm font-medium capitalize ${bgColor}`}
                  >
                    {t.type.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
