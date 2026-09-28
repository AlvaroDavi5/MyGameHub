import { useEffect, type ReactElement } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppSelector } from '@store/hooks';
import { selectHasSteamUser } from '@store/steam-user.selectors';

/**
 * Layout route guard: pages nested under this route only render once a
 * SteamID has been resolved into the global store (see `home.tsx`). Until
 * then, navigating here (directly or via a stale link) bounces back home.
 *
 * The redirect runs from an effect (not `<Navigate>`) so it never fires
 * during the initial SSR pass — there `hasSteamUser` is always false (the
 * store starts empty on the server), and `<Navigate>` is a documented no-op
 * on that first render anyway. It bounces back home right after hydration.
 **/
export default function RequireSteamUser(): ReactElement | null {
	const hasSteamUser = useAppSelector(selectHasSteamUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!hasSteamUser) {
			navigate('/', { replace: true });
		}
	}, [hasSteamUser, navigate]);

	if (!hasSteamUser) {
		return null;
	}

	return <Outlet />;
}
