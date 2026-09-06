import type { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router';
import { Flex, Link as ChakraLink, Image, Heading, Box } from '@chakra-ui/react';
import { siteConfig } from '@configs/site';
import logo from '@assets/logo.svg';
import { MenuDrawer } from './menu-drawer';

interface PageHeaderProps {
	renderMenuDrawer?: boolean;
}

export function PageHeader({ renderMenuDrawer = true }: PageHeaderProps): ReactElement {
	const renderMenuDrawerComponent = renderMenuDrawer ? <MenuDrawer /> : <Box />;

	return (
		<Flex as="header" bg="bg.header" w="full" h="72px" px={4} align="center" justify="space-between" boxShadow="sm">
			<ChakraLink asChild display="flex" alignItems="center">
				<RouterLink to="/" aria-label="Ir para homepage">
					<Image src={logo} alt="Logo do site" boxSize="40px" />
				</RouterLink>
			</ChakraLink>

			<Heading as="h1" size="lg" color="fg.onAccent">
				{siteConfig.title}
			</Heading>

			{renderMenuDrawerComponent}
		</Flex>
	);
}
