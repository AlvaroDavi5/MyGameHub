import type { ReactElement, ReactNode } from 'react';
import { PageHeader } from './page-header';
import type { Route } from '../../+types/root';
import { siteConfig } from '@configs/site';

interface PageBaseProps {
	children: ReactNode;
}

export function meta(_args: Route.MetaArgs) {
	return [{ title: siteConfig.title }, { name: 'description', content: 'Central de busca de jogos e perfis de jogadores.' }];
}

export function PageBase({ children }: PageBaseProps): ReactElement {
	return (
		<>
			<PageHeader />
			<main>{children}</main>
		</>
	);
}
