import { Box } from '@chakra-ui/react';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Busca de Jogos' }];
}

export default function GameSearch() {
	return <Box>Game Search</Box>;
}
