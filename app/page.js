import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function getPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000");

  if (!res.ok) {
    throw new Error("Failed to fetch at line 2");
  }

  return res.json();
}

export default async function Home() {
  const pokemon = await getPokemon();

  return (
    <div className="container mx-auto pb-20">
      <article className="mx-auto max-w-lg py-20 text-center">
        <h1 className="text-3xl font-bold text-neutral-800 lg:text-4xl">
          Pokedex
        </h1>
        <p className="leading-6 text-neutral-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, odit
          iusto accusantium cumque iure voluptate labore tenetur veritatis
          earum. Eaque.
        </p>
      </article>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pokemon.results.map((poke) => (
          <Link href={`/${poke.name}`} key={poke.name}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{poke.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
