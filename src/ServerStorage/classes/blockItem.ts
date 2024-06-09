import { Block } from "./block";
import { Item } from "./item";

export abstract class BlockItem extends Item {
    private block?: typeof Block

    public setBlock(block: typeof Block) {
        this.block = block
    }

    public getBlock() {
        return this.block
    }

}