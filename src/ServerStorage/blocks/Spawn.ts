import { BlockEnum, BlockRenderType } from "ReplicatedStorage/enums/BlockEnums";
import { Materials } from "ReplicatedStorage/enums/materials";
import { Block } from "ServerStorage/classes/tools/block";

const id = "rbxassetid://18207763754";

export = class SpawnBlock extends Block {
	protected blockID = BlockEnum.Spawn_Block;

	constructor() {
		super(Materials.Stone, BlockRenderType.Block, new Instance("SpawnLocation"));

		this.getBlockMeta().unbreakable = true;

		this.setTextures({
			Top: id,
			Bottom: id,
			Right: id,
			Left: id,
			Front: id,
			Back: id,
		});
	}
};
