import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from 'next/link';

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex>
        <NextLink href="/" passHref>
          <Link color="white" mr={4}>Home</Link>
        </NextLink>
        <NextLink href="/favorites" passHref>
          <Link color="white">Favorites</Link>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Navbar;
