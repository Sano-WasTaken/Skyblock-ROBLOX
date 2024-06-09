import { ItemDict } from "ServerStorage/ItemDict";
import { Block } from "ServerStorage/classes/block";
import { Materials } from "ServerStorage/classes/materials";

export class Iron_Ore extends Block {

    constructor() {
        super(Materials.Stone, new Instance("Part"))
        const id = "rbxassetid://17790820382"

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
            MinimumMultiplier: 1,
            MaximumMultiplier: 1,
            Maximum: 1,
            Minimum: 1
        })
    }
}