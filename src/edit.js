import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useState, useEffect, useCallback, useMemo } from "@wordpress/element";
import { useSelect, select, subscribe } from "@wordpress/data";
import { debounce, isEqual } from "lodash";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { navigation } = attributes;

	const navigationStore = useSelect((select) => {
		return select("livingpixel-onepage/navigation").getNavigation();
	}, []);

	useEffect(() => {
		if (!isEqual(navigationStore, navigation)) {
			setAttributes({ navigation: navigationStore });
		}
	});

	return (
		<div {...useBlockProps()}>
			{navigationStore.map((item, key) => (
				<a href={`#${item.anchor}`} key={key}>
					{item.name}
				</a>
			))}
		</div>
	);
}
