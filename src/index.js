import { registerBlockType } from "@wordpress/blocks";

import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, TextControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { useSelect, useDispatch, select, subscribe } from "@wordpress/data";
import slugify from "react-slugify";

import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";

import "./store";

import "./style.scss";

const ENABLE_ON_BLOCKS = ["core/group"];

const addAttributes = (settings, name) => {
	if (!ENABLE_ON_BLOCKS.includes(name)) {
		return settings;
	}

	if (typeof settings.attributes !== "undefined") {
		settings.attributes = Object.assign(settings.attributes, {
			navigationName: {
				type: "string",
			},
		});
	}

	return settings;
};

addFilter(
	"blocks.registerBlockType",
	"livingpixel-onepage-navigation/add-attributes",
	addAttributes
);

const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!ENABLE_ON_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const attributes = props.attributes;
		const { navigationName } = attributes;

		const store = useDispatch("livingpixel-onepage/navigation");

		if (navigationName !== "") {
			store.addNavigationItem(
				props.clientId,
				slugify(navigationName),
				navigationName
			);
		}

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						icons="visibility"
						title={__("Navigation Settings", "livingpixel-onepage-navigation")}
					>
						<TextControl
							label={__("Navigation Name", "livingpixel-onepage-navigation")}
							value={navigationName}
							onChange={(navigationName) => {
								const anchor = slugify(navigationName);

								store.addNavigationItem(props.clientId, anchor, navigationName);

								props.setAttributes({
									navigationName,
									anchor,
								});
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, "withInspectorControl");

addFilter(
	"editor.BlockEdit",
	"livingpixel-onepage-navigation/with-advance-controls",
	withInspectorControl
);

registerBlockType(metadata.name, {
	edit: Edit,
	save: Save,
});
