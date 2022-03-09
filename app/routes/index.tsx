import { Container, Grid, Box, GridItem, Text } from "@chakra-ui/react"
import { LoaderFunction, useLoaderData, useNavigate } from "remix"
import { PokemonListResponse, SmallPokemon } from "~/interfaces"
import { Image } from "@chakra-ui/react"

export const loader: LoaderFunction = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
  const data: PokemonListResponse = await res.json()

  const pokemons: SmallPokemon[] = data.results.map((pokemon, idx) => {
    return {
      ...pokemon,
      id: idx + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        idx + 1
      }.svg`,
    }
  })
  return pokemons
}

export default function Index() {
  const pokemons = useLoaderData<SmallPokemon[]>()

  const navigate = useNavigate()

  const handleLinkToPokemon = (name: string) => {
    navigate(`/pokemon/${name}`)
  }
  return (
    <Container maxW="container.1xl" as="main">
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={6}
        py="3"
        px="3"
        as="section"
      >
        {pokemons.map((pokemon) => (
          <Box
            key={pokemon.id}
            bg="gray.900"
            w="100%"
            p={4}
            borderRadius={12}
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
            }}
            onClick={() => handleLinkToPokemon(pokemon.name)}
            cursor="pointer"
            as="figure"
          >
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width="100%"
              height={140}
            />
            <GridItem
              display="flex"
              justifyContent="space-between"
              alignItems="start"
            >
              <Text textTransform="capitalize">{pokemon.name}</Text>
              <Text textTransform="capitalize">#{pokemon.id}</Text>
            </GridItem>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}
