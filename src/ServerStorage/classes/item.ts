import { Materials } from "./materials";
import { ItemMeta } from "./itemMeta";

export class Item {
	material?: Materials;
	name = "";
	sprite: string;
	private itemMeta: ItemMeta;

	constructor() {
		this.sprite = "Sprite";
		this.itemMeta = new ItemMeta();
	}

	public getItemMeta() {
		return this.itemMeta;
	}

	public getItemStack(amount = 1) {
		const itemStack = new ItemStack(
			this, amount
		)

		return itemStack
	}
}

export class ItemStack {
	private item: Item
	private itemMeta: ItemMeta
	private size: number

	constructor(item: Item, size = 1) {
		this.item = item
		this.itemMeta = item.getItemMeta()
		this.size = (size < this.itemMeta.maxStackSize) ? size : this.itemMeta.maxStackSize
	}

	public getItemMeta() { return this.itemMeta }
	public getItem() { return this.item }
	public getSize() { return this.size }

	public addToStack(item: ItemStack) {
		if (item.item.name === this.item.name && this.size + item.size <= this.itemMeta.maxStackSize) this.size += item.size
	}

	public isFull() {
		return (this.size === this.getItemMeta().maxStackSize)
	}
}
