import { ADD_NAVIGATION_ITEM } from "./types";

const DEFAULT_STATE = {
	items: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_NAVIGATION_ITEM:
			const newItems = state.items.filter((item) => item.id !== action.id);
			return {
				...state,
				items: [
					...newItems,
					{ id: action.id, anchor: action.anchor, name: action.name },
				],
			};
			break;
		default:
			return state;
	}
};

export default reducer;
