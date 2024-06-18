import { Materials } from "ReplicatedStorage/enums/materials";
import { Block, BlockRenderType } from "ServerStorage/classes/tools/block";

export = class SpawnBlock extends Block {
    constructor() {
        const mesh = new Instance("SpawnLocation")

        const id = "rbxassetid://17869810803"

        super(Materials.Stone, BlockRenderType.Blocked, mesh)

        this.setTextures({
            Top: id,
            Bottom: id,
            Right: id,
            Left: id,
            Front: id,
            Back: id,
        })

        this.getBlockMeta().unbreakable = true
    }
}