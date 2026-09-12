import type { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router';
import { Button, Drawer, IconButton, Link as ChakraLink, List, Portal } from '@chakra-ui/react';
import { siteConfig } from '@configs/site';
import { DiGithubBadge } from 'react-icons/di';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

interface FeatureListItemProps {
	to: string;
	label: string;
	children: React.ReactNode;
}

function FeatureListItem(props: FeatureListItemProps): ReactElement {
	return (
		<List.Item borderBottom="1px solid" borderColor="border" _last={{ borderBottom: 'none' }}>
			<ChakraLink
				asChild
				display="block"
				width="full"
				paddingBlock={3}
				textAlign="center"
				_hover={{ background: 'blackAlpha.500', transition: 'backgrounds 0.2s ease', textDecoration: 'none' }}
			>
				<RouterLink to={props.to} aria-label={props.label}>
					{props.children}
				</RouterLink>
			</ChakraLink>
		</List.Item>
	);
}

export function MenuDrawer(): ReactElement {
	return (
		<Drawer.Root placement="end">
			<Drawer.Trigger asChild>
				<IconButton aria-label="Abrir menu" variant="ghost" color="fg.onAccent" _hover={{ bg: 'whiteAlpha.300' }}>
					<RxHamburgerMenu />
				</IconButton>
			</Drawer.Trigger>

			<Portal>
				<Drawer.Backdrop />

				<Drawer.Positioner>
					<Drawer.Content background="bg.drawer">
						<Drawer.Title display="none" />

						<Drawer.Header display="flex" justifyContent="flex-end">
							<Drawer.CloseTrigger asChild>
								<IconButton aria-label="Fechar menu" variant="ghost" color="fg.onAccent" _hover={{ bg: 'whiteAlpha.300' }}>
									<RxCross2 />
								</IconButton>
							</Drawer.CloseTrigger>
						</Drawer.Header>

						<Drawer.Body display="flex" flexDirection="column" gap={4}>
							<List.Root width="full" listStyle="none">
								<FeatureListItem to="/profile-search" label="Pesquisar usuários">
									Pesquisar Usuários
								</FeatureListItem>

								<FeatureListItem to="/game-search" label="Pesquisar jogos">
									Pesquisar Jogos
								</FeatureListItem>

								<FeatureListItem to="/my-games" label="Consultar meus jogos">
									Consultar Meus Jogos
								</FeatureListItem>
							</List.Root>

							<ChakraLink href={siteConfig.githubUrl} target="_blank" rel="noreferrer" _hover={{ textDecoration: 'none' }} mt="auto">
								<Button variant="surface" width="full">
									<DiGithubBadge width={20} height={20} fill="currentColor" />
									Repositório do Projeto
								</Button>
							</ChakraLink>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
}
