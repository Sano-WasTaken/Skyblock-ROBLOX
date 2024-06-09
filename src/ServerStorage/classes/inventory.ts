import Signal from "@rbxts/signal";
import { ItemStack } from "./item";

const HttpService = game.GetService("HttpService");

export class Inventory {
	slots: ItemStack[];
	id: string;
	maxSlots: number;
	updated: Signal<(item: ItemStack) => void>;

	constructor(slotNumber: number) {
		this.slots = [];
		this.id = HttpService.GenerateGUID(false);
		this.maxSlots = slotNumber;
		this.updated = new Signal();
	}

	private getEmptySlot() {
		return this.slots.findIndex(itStack => itStack === undefined)
	}

	public addItem(item: ItemStack) {
		const itemStack = this.slots.find(
			itStack => itStack.getItemMeta().toolTip === item.getItemMeta().toolTip &&
			itStack.getItem().name === item.getItem().name &&
			itStack.getSize() + item.getSize() <= itStack.getItemMeta().maxStackSize
		)

		if (itemStack) {
			itemStack.addToStack(item)
		} else {
			const newIndex = this.getEmptySlot()
			this.slots[newIndex] = item
		}
	}
}
