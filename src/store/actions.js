import { ADD_NAVIGATION_ITEM } from "./types";

export const addNavigationItem = (id, anchor, name) => {
	return {
		type: ADD_NAVIGATION_ITEM,
		id,
		anchor,
		name,
	};
};
