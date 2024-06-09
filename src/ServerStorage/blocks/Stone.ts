import { ItemDict } from "ServerStorage/ItemDict";
import { Block } from "ServerStorage/classes/block";
import { Materials } from "ServerStorage/classes/materials";

export class StoneBlock extends Block {

    constructor() {
        super(Materials.Stone, new Instance("Part"))
        const id = "rbxassetid://17790815768"
        
        this.setTextures({
            Top: id,
            Bottom: id,
            Right: id,
            Left: id,
            Back: id,
            Front: id
        })

        const lootTable = this.getLootTable()

        lootTable.setItem({
            Item: ItemDict.Stone,
            MaximumMultiplier: 1,
            MinimumMultiplier: 1,
            Maximum: 1,
            Minimum: 1
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