import { ItemMeta } from "../itemMeta";

export enum SpriteRenderType {
	Blocked,
	SingleSprite,
	CustomMesh,
}

interface Ids {
	Top?: string;
	Bottom?: string;
	Right?: string;
	Left?: string;
	Front?: string;
	Back?: string;
}

export class Item {
	public name = "Item";
	private sprite: string | Ids;
	private itemMeta: ItemMeta;
	private spriteRenderType: SpriteRenderType;

	constructor() {
		this.sprite = "Sprite";
		this.itemMeta = new ItemMeta();
		this.spriteRenderType = SpriteRenderType.SingleSprite;
	}

	public getItemMeta() {
		return this.itemMeta;
	}

	public getName() {
		return this.name;
	}

	public getItemStack(amount = 1) {
		const itemStack = new ItemStack(this, amount);

		return itemStack;
	}

	public getSprite() {
		return this.sprite;
	}

	protected setSprite(sprite: string | Ids) {
		assert(
			this.spriteRenderType === SpriteRenderType.Blocked && typeOf(sprite) === "table",
			"invalid Sprite Render Type for using Ids",
		);

		this.sprite = sprite;
	}

	protected setSpriteRenderType(spriteRenderType: SpriteRenderType) {
		this.spriteRenderType = spriteRenderType;
	}
}

export class ItemStack {
	private item: Item;
	private itemMeta: ItemMeta;
	private size: number;

	constructor(item: Item, size = 1) {
		this.item = item;
		this.itemMeta = item.getItemMeta();
		this.size = size < this.itemMeta.maxStackSize ? size : this.itemMeta.maxStackSize;
	}

	public getItemMeta() {
		return this.itemMeta;
	}
	public getItem() {
		return this.item;
	}
	public getSize() {
		return this.size;
	}

	public addToStack(item: ItemStack) {
		if (item.item.getName() === this.item.getName() && this.size + item.size <= this.itemMeta.maxStackSize)
			this.size += item.size;
	}

	public isFull() {
		return this.size === this.getItemMeta().maxStackSize;
	}

	public getInfoForSending() {
		return {
			Amount: this.size,
			Sprite: this.getItem().getSprite(),
		};
	}

	public hasBlock() {
		return false;
	}
}
