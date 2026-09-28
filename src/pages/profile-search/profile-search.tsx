import type { ReactElement } from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { Route } from './+types/profile-search';
import { useProfileSearch } from './hooks/use-profile-search';
import { SearchForm } from '@components/forms/search-form';
import { ProfileView } from './components/profile-view';

export { profileSearchAction as action } from './profile-search.action';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Busca de Perfis' }];
}

export default function ProfileSearch(): ReactElement {
	const { isSearching, result, search } = useProfileSearch();

	return (
		<>
			<SearchForm isSearching={isSearching} onSearch={search} placeholder="Digite o username ou SteamID que deseja pesquisar" />

			<Box padding={4}>
				{isSearching && <Text>Pesquisando...</Text>}
				{!isSearching && result && 'data' in result && result.data && (
					<ProfileView
						personaName={result.data.personaName}
						realName={result.data.realName}
						profileUrl={result.data.profileUrl}
						avatarSrc={result.data.avatar}
						countryCode={result.data.countryCode}
					/>
				)}
			</Box>
		</>
	);
}
