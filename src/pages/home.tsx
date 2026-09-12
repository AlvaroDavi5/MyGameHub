import { Flex } from '@chakra-ui/react';
import { FeatureCard } from '@components/cards/feature-card';
import gameSearchImg from '@assets/cards/game-search.jpg';
import myGamesImg from '@assets/cards/my-games.jpg';
import profileSearchImg from '@assets/cards/profile-search.png';
import { siteConfig } from '@configs/site';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
	return [{ title: `Homepage - ${siteConfig.title}` }, { name: 'description', content: 'Central de busca de jogos e perfis de jogadores.' }];
}

export default function Home() {
	return (
		<Flex wrap="wrap" justify="center" align="center" gap={8} padding={8} minH="calc(100vh - 72px)">
			<FeatureCard to="/profile-search" imgSrc={profileSearchImg} imgAlt="Pesquisar usuários">
				Pesquisar Usuários
			</FeatureCard>
			<FeatureCard to="/game-search" imgSrc={gameSearchImg} imgAlt="Pesquisar jogos">
				Pesquisar Jogos
			</FeatureCard>
			<FeatureCard to="/my-games" imgSrc={myGamesImg} imgAlt="Consultar meus jogos">
				Consultar Meus Jogos
			</FeatureCard>
		</Flex>
	);
}
