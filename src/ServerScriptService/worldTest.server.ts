import { EmitWorldType, World } from "ServerStorage/classes/editableWorldGrid";
import { StoneBlock } from "ServerStorage/blocks/Stone";
import { Block } from "ServerStorage/classes/block";

const stone1 = new StoneBlock()
const stone2 = new StoneBlock()

World.getListener<Block>(EmitWorldType.BlockAdded).Connect((block) => {
    print(block, "added to world")
})

World.getListener<Block>(EmitWorldType.BlockRemoved).Connect((block) => {
    print(block, "removed to world")
})

World.addBlock(stone1, new Vector3(0,8,0))
World.addBlock(stone2, new Vector3(0,9,0))

print(World.getNeighbors(stone1.getPosition()))

wait(5)

//World.deleteBlock(stone2.getPosition())