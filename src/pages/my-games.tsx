import { Box } from '@chakra-ui/react';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Meus Jogos' }];
}

export default function MyGames() {
	return <Box>My Games</Box>;
}
