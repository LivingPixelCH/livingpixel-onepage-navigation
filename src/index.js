import { registerBlockType } from "@wordpress/blocks";

import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, TextControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import slugify from "react-slugify";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

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
							onChange={(navigationName) =>
								props.setAttributes({
									navigationName,
									anchor: slugify(navigationName),
								})
							}
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
});
