import { EmitWorldType, World } from "ServerStorage/classes/editableWorldGrid";
import StoneBlock from "ServerStorage/blocks/Stone";
import { Block } from "ServerStorage/classes/block";
import Iron_Ore from "ServerStorage/blocks/IronOre";

const stone1 = new StoneBlock()
const stone2 = new StoneBlock()
const ironOre1 = new Iron_Ore()

// listeners
World.getListener<Block>(EmitWorldType.BlockRemoved).Connect((block) => {
    print(block, "removed to world")
})

World.getListener<Block>(EmitWorldType.BlockAdded).Connect((block) => {
    print(block, "added to world")
})

// Blocks add to world
World.addBlock(stone1, new Vector3(0,8,0))
World.addBlock(stone2, new Vector3(0,9,0))
World.addBlock(ironOre1, new Vector3(1,8,0))

wait(1)

print(World.getNeighbors(stone1.getPosition()), "this are the neighbors of this block") // two blocks are neighbors

wait(5)

World.deleteBlock(stone2.getPosition())

wait(1)

print(World.getNeighbors(stone1.getPosition()), "this are the neighbors of this block") // now only one block