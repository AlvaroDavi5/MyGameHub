import type { ReactElement } from 'react';
import { Button, Drawer, IconButton, Link as ChakraLink, Portal } from '@chakra-ui/react';
import { siteConfig } from '@configs/site';
import { DiGithubBadge } from 'react-icons/di';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

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
					<Drawer.Content bg="bg.drawer">
						<Drawer.Header display="flex" justifyContent="flex-end">
							<Drawer.CloseTrigger asChild>
								<IconButton aria-label="Fechar menu" variant="ghost" color="fg.onAccent" _hover={{ bg: 'whiteAlpha.300' }}>
									<RxCross2 />
								</IconButton>
							</Drawer.CloseTrigger>
						</Drawer.Header>
						<Drawer.Title display="none" />
						<Drawer.Body>
							<ChakraLink href={siteConfig.githubUrl} target="_blank" rel="noreferrer" _hover={{ textDecoration: 'none' }}>
								<Button variant="surface" w="full">
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
