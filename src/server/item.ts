import { Materials } from "./materials";
import { ToolTip } from "./tooltips";

class ItemMeta {
	maxStackSize = 0;
	canBeAnchanted = false;
	unbreakable = false;
	toolTip = ToolTip.Undefined;
	displayName = "DisplayName";
	durability = 0;
	lore = "";
}

export abstract class Item {
	name: Materials;
	sprite: string;
	itemMeta: ItemMeta;

	constructor() {
		this.name = Materials.Air;
		this.sprite = "Sprite";
		this.itemMeta = new ItemMeta();
	}

	public getItemMeta() {
		return this.itemMeta;
	}
}

export class ItemStack {
	item: Item
	itemMeta: ItemMeta
	size: number

	constructor(item: Item, size = 1) {
		this.item = item
		this.itemMeta = item.getItemMeta()
		this.size = (size < this.itemMeta.maxStackSize) ? size : this.itemMeta.maxStackSize
	}

	public getItemMeta() {
		return this.itemMeta;
	}

	public addToStack(item: ItemStack) {
		if (item.item.name === this.item.name && this.size + item.size <= this.itemMeta.maxStackSize) this.size += item.size
	}

	public isFull() {
		return (this.size === this.getItemMeta().maxStackSize)
	}
}
