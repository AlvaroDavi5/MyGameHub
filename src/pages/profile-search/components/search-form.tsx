import { useState, type ChangeEvent, type ReactElement } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

interface SearchFormProps {
	isSearching?: boolean;
	onSearch: (username: string) => void;
}

export function SearchForm({ isSearching = false, onSearch }: SearchFormProps): ReactElement {
	const [lastSearchedUsername, setLastSearchedUsername] = useState<string>('');
	const [inputUsername, setInputUsername] = useState<string>('');
	const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

	const wasChanged = !!inputUsername.trim() && inputUsername.trim() !== lastSearchedUsername.trim();
	const isSearchButtonDisabled = !wasChanged || wasSubmitted || isSearching;

	const changeInputUsername = (event: ChangeEvent<HTMLInputElement>): void => {
		setWasSubmitted(false);
		setInputUsername(event.target.value);
	};

	const submitSearch = (): void => {
		setWasSubmitted(true);
		setLastSearchedUsername(inputUsername.trim());
		onSearch(inputUsername.trim());
	};

	return (
		<Flex
			aria-label="input-element"
			direction={['column', 'row']}
			alignItems={['flex-start', 'center']}
			justifyContent={['flex-start', 'center']}
			gap={[2, 4]}
			padding={4}
		>
			<Input
				data-testid="search-input"
				value={inputUsername}
				onChange={changeInputUsername}
				placeholder="Digite o username ou SteamID"
				width={['100%', '600px']}
			/>
			<Button data-testid="search-button" onClick={submitSearch} disabled={isSearchButtonDisabled}>
				Pesquisar
			</Button>
		</Flex>
	);
}
