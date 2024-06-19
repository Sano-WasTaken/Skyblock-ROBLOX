import StoneBlock from "ServerStorage/blocks/Stone";
import { BlockItem } from "ServerStorage/classes/tools/blockItem";
import { SpriteRenderType } from "ServerStorage/classes/tools/item";

export = class Stone extends BlockItem {
	public name = "Stone";

	constructor() {
		super();
		const id = "rbxassetid://17790815768";

		this.setBlock(StoneBlock);
		this.setSpriteRenderType(SpriteRenderType.Blocked);
		this.setSprite({
			Top: id,
			Bottom: id,
			Right: id,
			Left: id,
			Front: id,
			Back: id,
		});
	}
};
