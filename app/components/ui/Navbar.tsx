import { Spacer, Text, Box } from "@chakra-ui/react"
import { Link, useNavigate } from "remix"

type Props = {}

const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const redirectToHome = () => {
    navigate("/")
  }
  return (
    <Box
      display="flex"
      w="100%"
      flexDir="row"
      justifyContent="start"
      alignItems="center"
      px="30px"
      bg="gray.900"
      as="nav"
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/151.png"
          alt="Greninja"
          width={70}
          height={70}
          onClick={redirectToHome}
        />

        <Text fontWeight="bold" onClick={redirectToHome} fontSize="4xl">
          P
        </Text>
        <Text fontWeight="semibold" fontSize="2xl" onClick={redirectToHome}>
          okemon
        </Text>
      </Link>

      <Spacer flex="1" />
      <Link to="/favorites">
        <Text>Favoritos</Text>
      </Link>
    </Box>
  )
}

export default Navbar
