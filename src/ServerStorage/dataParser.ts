import { HttpService, ServerStorage } from "@rbxts/services";
import { World } from "./classes/editableWorldGrid";
import { Block } from "./classes/tools/block";
import { Machine } from "./classes/tools/machine";
import { Inventory } from "./classes/inventory";

interface blockData {
	CFrame: number[];
	Name: string;
	IO?: {};
	container?: Inventory;
	result?: Inventory;
	Inventory?: Inventory;
}

export function getBlock(name: string) {
	const module = ServerStorage.FindFirstChild("blocks")?.FindFirstChild(name) as ModuleScript;

	assert(module, `no module found for ${name} [It can be a Block Item].`);

	return require(module) as typeof Block;
}

export function parseBlock(block: Block | Machine) {
	const blockData: blockData = {
		CFrame: [],
		Name: "",
	};

	const position = block.getPosition();

	blockData.CFrame = [position.X, position.Y, position.Z];
	blockData.Name = block.getName();

	if (block.isMachine) {
		blockData.IO = (block as Machine).getIO();
		blockData.container = (block as Machine).container;
		blockData.result = (block as Machine).result;
	}

	return blockData;
}

export function extractWorld() {
	const grid = World.getGrid();
	const fakeGrid: blockData[] = [];

	grid.forEach((columns, X) => {
		columns.forEach((rows, Y) => {
			rows.forEach((block, Z) => {
				const blockData = parseBlock(block);

				fakeGrid.push(blockData);
			});
		});
	});

	return fakeGrid;
}
