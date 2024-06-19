import { ServerStorage } from "@rbxts/services";
import { Item } from "./classes/tools/item";

export enum ItemDict {
	Stone,
}

export function getItem(name: ItemDict) {
	const module = ServerStorage.FindFirstChild("items")?.FindFirstChild(name) as ModuleScript;

	assert(module, `no module found for ${name} [It can be a Block Item].`);

	return require(module) as typeof Item;
}
