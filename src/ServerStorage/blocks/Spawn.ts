import { BlockEnum } from "ReplicatedStorage/enums/BlockEnum";
import { Materials } from "ReplicatedStorage/enums/materials";
import { Block, BlockRenderType } from "ServerStorage/classes/tools/block";

const id = "rbxassetid://18207763754";

export = class SpawnBlock extends Block {
	protected blockID = BlockEnum.Spawn_Block;

	constructor() {
		super(Materials.Stone, BlockRenderType.Blocked, new Instance("SpawnLocation"));

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
