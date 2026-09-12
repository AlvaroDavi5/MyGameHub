import type { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router';
import { Flex, Link as ChakraLink, Image, Heading } from '@chakra-ui/react';
import { siteConfig } from '@configs/site';
import logo from '@assets/logo.svg';
import { MenuDrawer } from './menu-drawer';

interface PageHeaderProps {
	renderTitle?: boolean;
	renderMenuDrawer?: boolean;
}

export function PageHeader({ renderMenuDrawer = true, renderTitle = true }: PageHeaderProps): ReactElement {
	const titleComponent = renderTitle ? (
		<Heading as="h1" size="lg" color="fg.onAccent">
			{siteConfig.title}
		</Heading>
	) : undefined;
	const menuDrawerComponent = renderMenuDrawer ? <MenuDrawer /> : undefined;

	return (
		<Flex as="header" background="bg.header" width="full" height="72px" paddingInline={4} align="center" justify="space-between" boxShadow="sm">
			<ChakraLink asChild display="flex" alignItems="center">
				<RouterLink to="/" aria-label="Ir para homepage">
					<Image src={logo} alt="Logo do site" boxSize="40px" />
				</RouterLink>
			</ChakraLink>

			{titleComponent}

			{menuDrawerComponent}
		</Flex>
	);
}
