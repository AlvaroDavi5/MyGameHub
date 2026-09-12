import type { ReactElement, ReactNode } from 'react';
import { Box, Card, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

interface FeatureCardProps {
	to: string;
	imgSrc: string;
	imgAlt: string;
	children: ReactNode;
}

export function FeatureCard({ to, imgSrc, imgAlt, children }: FeatureCardProps): ReactElement {
	return (
		<LinkBox>
			<Card.Root
				minHeight="250px"
				maxHeight="350px"
				width="50vw"
				minWidth="250px"
				maxWidth="400px"
				borderWidth="1px"
				borderColor="border.subtle"
				background="bg.card"
				borderRadius="2xl"
				overflow="hidden"
				transition="background-color 0.2s ease"
				_hover={{ bg: 'bg.card.hover' }}
			>
				<Image src={imgSrc} alt={imgAlt} width="full" h="250px" objectFit="cover" />
				<Card.Body padding="5px">
					<Card.Title textAlign="center" textJustify="center" fontSize="lg">
						<LinkOverlay asChild>
							<RouterLink to={to} />
						</LinkOverlay>
						<Box padding="20px">{children}</Box>
					</Card.Title>
				</Card.Body>
			</Card.Root>
		</LinkBox>
	);
}
