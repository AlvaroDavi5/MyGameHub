interface ISearchInputState {
	inputUsername: string;
	isButtonDisabled: boolean;
}

interface ISearchInputAction {
	value: string;
	type: 'SET_INPUT_USERNAME' | 'SET_BUTTON_DISABLED';
}

export function searchInputReducer(state: ISearchInputState, action: ISearchInputAction): ISearchInputState {
	const actionType = action.type;
	const newValue = action.value;

	switch (actionType) {
		case 'SET_INPUT_USERNAME':
			return { ...state, inputUsername: newValue };
		case 'SET_BUTTON_DISABLED':
			return { ...state, isButtonDisabled: newValue === 'true' };
		default:
			return state;
	}
}
