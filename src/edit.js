import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useCallback, useEffect, useMemo } from "@wordpress/element";
import { useSelect, select, subscribe } from "@wordpress/data";
import { debounce } from "lodash";

import "./editor.scss";

function createNavigationArray(blocks) {
	return filteredBlocks.map((block) => {
		return {
			anchor: block.attributes.anchor,
			name: block.attributes.navigationName,
		};
	});
}

function isValidBlockForNavigation(block) {
	return block.name === "core/group" && block.attributes.navigationName !== "";
}

export default function Edit({ attributes, setAttributes }) {
	const { navigation } = attributes;

	const blocks = useSelect(
		(select) => select("core/block-editor").getBlocks(),
		[]
	);

	const filterBlocks = (blocks) => {
		return blocks.filter((block) => {
			if (isValidBlockForNavigation(block)) {
				return block;
			}
		});
	};

	console.log(navigation);

	return (
		<div {...useBlockProps()}>
			-- start nav --
			{navigation.map(({ key, item }) => (
				<a href={`#${item.anchor}`} key={key}>
					{item.name}
				</a>
			))}
			-- end nav --
		</div>
	);
}
