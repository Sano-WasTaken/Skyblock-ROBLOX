import { ItemDict } from "ServerStorage/ItemDict";
import { Block, BlockRenderType } from "ServerStorage/classes/tools/block";
import { Materials } from "ReplicatedStorage/enums/materials";

export = class StoneBlock extends Block {
    public blockName = "Stone"

    constructor() {
        super(Materials.Stone, BlockRenderType.Blocked, new Instance("Part"))
        const id = "rbxassetid://17790815768"

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
            MaximumMultiplier: 1,
            MinimumMultiplier: 1,
            Maximum: 1,
            Minimum: 1,
        })
    }

}

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