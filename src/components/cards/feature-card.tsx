import type { ReactElement, ReactNode } from 'react';
import { Box, Card, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

interface FeatureCardProps {
	to: string;
	imgSrc: string;
	imgAlt: string;
	children: ReactNode;
	disabled?: boolean;
}

export function FeatureCard({ to, imgSrc, imgAlt, children, disabled = false }: FeatureCardProps): ReactElement {
	return (
		<LinkBox opacity={disabled ? 0.5 : 1} pointerEvents={disabled ? 'none' : 'auto'} aria-disabled={disabled}>
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
				_hover={disabled ? undefined : { bg: 'bg.card.hover' }}
			>
				<Image src={imgSrc} alt={imgAlt} filter={disabled ? 'grayscale(100%)' : 'none'} width="full" height="250px" objectFit="cover" />
				<Card.Body padding="5px">
					<Card.Title textAlign="center" textJustify="center" fontSize="lg">
						{!disabled && (
							<LinkOverlay asChild>
								<RouterLink to={to} />
							</LinkOverlay>
						)}
						<Box padding="20px">{children}</Box>
					</Card.Title>
				</Card.Body>
			</Card.Root>
		</LinkBox>
	);
}
