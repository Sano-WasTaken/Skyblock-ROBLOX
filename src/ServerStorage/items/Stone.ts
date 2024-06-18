import StoneBlock from "ServerStorage/blocks/Stone";
import { BlockItem } from "ServerStorage/classes/tools/blockItem";

export = class Stone extends BlockItem
{
    constructor() {
        super()
        
        this.name = "Stone"

        this.setBlock(StoneBlock)
    }
}