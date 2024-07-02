import { ItemDict } from "ServerStorage/ItemDict";
import { Block } from "ServerStorage/classes/tools/block";
import { Materials } from "ReplicatedStorage/enums/materials";
import { BlockEnum, BlockRenderType } from "ReplicatedStorage/enums/BlockEnums";

const id = "rbxassetid://17790815768";

export = class StoneBlock extends Block {
	public blockID = BlockEnum.Stone;

	protected textures = {
		Top: id,
		Bottom: id,
		Right: id,
		Left: id,
		Front: id,
		Back: id,
	};

	constructor() {
		super(Materials.Stone, BlockRenderType.Block, new Instance("Part"));

		const lootTable = this.getLootTable();

		lootTable.setItem({
			Item: ItemDict.Stone,
			MaximumMultiplier: 1,
			MinimumMultiplier: 1,
			Maximum: 1,
			Minimum: 1,
		});
	}
};

/**
 * 
            {
                Item:,
                MinimumMultiplier: 0,
                MaximumMultiplier: 3, 
                Maximum: 1,
                Minimum: 0
            }
 */
