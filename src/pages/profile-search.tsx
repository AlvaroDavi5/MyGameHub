import { useEffect, useState } from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Busca de Perfis' }];
}

export default function ProfileSearch() {
	const [inputUsername, setInputUsername] = useState<string | null>(null);
	const [inputUsernameValue, setInputUsernameValue] = useState<string>('');
	const [disableSearchButton, setDisableSearchButton] = useState<boolean>(true);

	useEffect(() => {
		if (inputUsername) {
			console.log('Usuário pesquisado:', inputUsername);
		}

		return () => {
			setDisableSearchButton(true);
		};
	}, [inputUsername]);

	const inputUsernameChange = (inputValue: string): void => {
		const trimmedValue = inputValue.trim();
		const wasChanged = trimmedValue !== inputUsername?.trim() && trimmedValue !== '';

		setInputUsernameValue(inputValue);
		setDisableSearchButton(!wasChanged);
	};
	const submitSearch = (): void => {
		setInputUsername(inputUsernameValue);
	};

	return (
		<>
			<Flex
				aria-label="input-element"
				direction={['column', 'row']}
				alignItems={['flex-start', 'center']}
				justifyContent={['flex-start', 'center']}
				gap={[2, 4]}
				padding={4}
			>
				<Input value={inputUsernameValue} onChange={(e) => inputUsernameChange(e.target.value)} placeholder="Digite o username" width={['100%', '600px']} />
				<Button onClick={submitSearch} disabled={disableSearchButton}>
					Pesquisar
				</Button>
			</Flex>

			<Box>Resultados da pesquisa: {inputUsername}</Box>
		</>
	);
}
