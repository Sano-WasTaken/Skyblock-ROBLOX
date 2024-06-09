import { StoneBlock } from "ServerStorage/blocks/Stone";
import { BlockItem } from "ServerStorage/classes/blockItem";

export class Stone extends BlockItem
{
    static name = "Stone"

    constructor() {
        super()

        this.setBlock(StoneBlock)
    }
}