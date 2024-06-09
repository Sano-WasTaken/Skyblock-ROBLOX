import { ServerStorage } from "@rbxts/services";
import { Item } from "./classes/item";

export enum ItemDict {
    Stone
}

export function getItem(name: ItemDict) {
    const module = ServerStorage.FindFirstChild("items")?.FindFirstChild(name) as ModuleScript

    return require(module) as typeof Item
}