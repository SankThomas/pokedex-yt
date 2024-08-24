"use client";

import Chart from "@/components/chart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [pokemonData, setPokemonData] = useState();

  async function getPokemon() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`,
    );
    const data = await res.json();
    setPokemonData(data);
  }

  useEffect(() => {
    getPokemon();
  }, [params]);

  return (
    <>
      {pokemonData ? (
        <div className="container mx-auto grid gap-8 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <article>
            <Button asChild>
              <Link href="/">&larr; Back</Link>
            </Button>

            <h1 className="mt-8 text-4xl font-bold capitalize">
              {pokemonData.name}
            </h1>
            {pokemonData.sprites && (
              <Image
                src={pokemonData.sprites.other.home.front_shiny}
                alt={pokemonData.name}
                width={400}
                height={400}
              />
            )}

            {pokemonData.types && (
              <ul className="mt-8 flex flex-wrap items-center justify-start gap-4">
                {pokemonData.types.map((t, index) => (
                  <li key={index}>
                    <Button variant="outline">{t.type.name}</Button>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article>
            <Chart pokemonData={pokemonData} />
          </article>
        </div>
      ) : (
        <p className="mt-8 text-center">Loading pokemon details</p>
      )}
    </>
  );
}
