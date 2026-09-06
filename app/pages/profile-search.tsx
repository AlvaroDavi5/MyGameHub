import { Box } from '@chakra-ui/react';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Busca de Perfis' }];
}

export default function ProfileSearch() {
	return <Box>Profile Search</Box>;
}
