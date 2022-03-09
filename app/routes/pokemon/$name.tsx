import { Box, Button, Grid, GridItem, Heading, Image } from "@chakra-ui/react"
import { LoaderFunction, useLoaderData } from "remix"
import { Pokemon } from "~/interfaces"
import { Text, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export const loader: LoaderFunction = async ({ request, params }) => {
  const { name } = params

  console.log(name)

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const pokemon: Pokemon = await res.json()

  return {
    ...pokemon,
  }
}

export default function PokemonName() {
  const pokemon = useLoaderData<Pokemon>()
  const [favoritesPokemons, setFavoritesPokemons] = useState<any[]>([])

  const saveInFavorites = () => {
    setFavoritesPokemons([...favoritesPokemons, pokemon])
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 170,
      angle: -100,
      origin: {
        x: 1,
        y: 0.2,
      },
    })
  }
  const removeFromFavorites = () => {
    setFavoritesPokemons(
      favoritesPokemons.filter((poke) => poke.id !== pokemon.id)
    )
  }

  useEffect(() => {
    const initialFavoritesPokemons =
      localStorage.getItem("favoritesPokemons") ?? "[]"
    setFavoritesPokemons(JSON.parse(initialFavoritesPokemons))
  }, [])

  useEffect(() => {
    localStorage.setItem("favoritesPokemons", JSON.stringify(favoritesPokemons))
  }, [favoritesPokemons])
  return (
    <Container maxW="container.xl" as="main" py="6">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(12, 1fr)",
        }}
        gap={6}
      >
        <GridItem
          bg="gray.900"
          borderRadius={12}
          colSpan={{
            base: 12,
            lg: 4,
          }}
          p="30"
        >
          <Image
            src={pokemon.sprites.other?.dream_world.front_default ?? ""}
            alt={pokemon.name}
            width="100%"
            height={200}
          />
        </GridItem>
        <GridItem
          bg="gray.900"
          borderRadius={12}
          colSpan={{
            base: 12,
            lg: 8,
          }}
          p="30"
        >
          <Box display="flex" justifyContent="space-between">
            <Heading
              textTransform="capitalize"
              pb="6"
              fontWeight="bold"
              fontSize="5xl"
            >
              {pokemon.name}
            </Heading>
            {favoritesPokemons.find((poke) => poke.name === pokemon.name) ? (
              <Button
                colorScheme="purple"
                size="md"
                variant="outline"
                onClick={removeFromFavorites}
              >
                Quitar de favoritos
              </Button>
            ) : (
              <Button
                colorScheme="purple"
                size="md"
                variant="outline"
                onClick={saveInFavorites}
              >
                Agregar a favoritos
              </Button>
            )}
          </Box>
          <Text fontSize="3xl">Sprites:</Text>
          <Container
            display="flex"
            flexDir={{
              base: "column",
              lg: "row",
            }}
            justifyContent="space-between"
            alignItems="center"
            as="figure"
          >
            <Image
              src={pokemon.sprites.front_default ?? ""}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.back_default ?? ""}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.front_shiny ?? ""}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.back_shiny ?? ""}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          </Container>
        </GridItem>
      </Grid>
    </Container>
  )
}
