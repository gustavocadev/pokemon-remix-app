import { useEffect, useState } from "react"
import { useNavigate } from "remix"
import { Text, Container, Grid, Box, Image, GridItem } from "@chakra-ui/react"
import { Pokemon } from "~/interfaces"
export default function Favorites() {
  const [favoritesPokemons, setFavoritesPokemons] = useState<Pokemon[]>([])

  const navigate = useNavigate()

  const handleLinkToPokemon = (name: string) => {
    navigate(`/pokemon/${name}`)
  }

  useEffect(() => {
    const initialFavoritesPokemons =
      localStorage.getItem("favoritesPokemons") ?? "[]"
    setFavoritesPokemons(JSON.parse(initialFavoritesPokemons))
  }, [])
  return (
    <Container maxW="container.xl" as="main">
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
        {favoritesPokemons.map((pokemon) => (
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
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
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
