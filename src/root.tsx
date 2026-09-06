import type { ReactElement } from 'react';
import { Box, Code, Container, Heading, Text } from '@chakra-ui/react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { AppChakraProvider } from '@components/chakra/chakra_provider';
import { PageBase } from '@components/base/page-base';
import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

export function Layout({ children }: { children: React.ReactNode }): ReactElement {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<AppChakraProvider>{children}</AppChakraProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App(): ReactElement {
	return (
		<PageBase>
			{/* The outlet component renders the child routes */}
			<Outlet />
		</PageBase>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): ReactElement {
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? 'Page Not Found' : 'Error';
		details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Container as="main" pt={16} p={4} mx="auto">
			<Heading as="h1">{message}</Heading>
			<Text>{details}</Text>
			{stack && (
				<Box as="pre" w="full" p={4} overflowX="auto">
					<Code>{stack}</Code>
				</Box>
			)}
		</Container>
	);
}
