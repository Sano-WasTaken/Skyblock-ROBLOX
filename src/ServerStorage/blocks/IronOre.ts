import { ItemDict } from "ServerStorage/ItemDict";
import { Block, BlockRenderType, Ids } from "ServerStorage/classes/tools/block";
import { Materials } from "ReplicatedStorage/enums/materials";
import { BlockEnum } from "ReplicatedStorage/enums/BlockEnum";

const id = "rbxassetid://17790820382";

export = class Iron_Ore extends Block {
	public blockID = BlockEnum.Iron_Ore;
	protected textures = {
		Top: id,
		Bottom: id,
		Right: id,
		Left: id,
		Front: id,
		Back: id,
	};

	constructor() {
		super(Materials.Stone, BlockRenderType.Blocked, new Instance("Part"));

		const lootTable = this.getLootTable();

		lootTable.setItem({
			Item: ItemDict.Stone,
			MinimumMultiplier: 1,
			MaximumMultiplier: 1,
			Maximum: 1,
			Minimum: 1,
		});
	}
};
