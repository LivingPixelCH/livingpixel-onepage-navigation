import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { navigation } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{navigation.map((item, key) => (
				<a href={`#${item.anchor}`} key={key}>
					{item.name}
				</a>
			))}
		</div>
	);
}
