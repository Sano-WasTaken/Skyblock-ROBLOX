import Signal from "@rbxts/signal-ts";
import { ItemStack } from "./tools/item";

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
			itStack.getItem().getName() === item.getItem().getName() &&
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
