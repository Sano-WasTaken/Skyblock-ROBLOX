import { ItemDict } from "ServerStorage/ItemDict";
import { Block, BlockRenderType } from "ServerStorage/classes/tools/block";
import { Materials } from "ReplicatedStorage/enums/materials";

export = class Iron_Ore extends Block {

    public blockName = "Iron Ore"

    constructor() {
        super(Materials.Stone, BlockRenderType.Blocked, new Instance("Part"))
        const id = "rbxassetid://17790820382"

        const lootTable = this.getLootTable()

        this.setTextures({
            Top: id,
            Bottom: id,
            Right: id,
            Left: id,
            Front: id,
            Back: id,
        })

        lootTable.setItem({
            Item: ItemDict.Stone,
            MinimumMultiplier: 1,
            MaximumMultiplier: 1,
            Maximum: 1,
            Minimum: 1
        })
    }
}