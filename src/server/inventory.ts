import Signal from "@rbxts/signal";
import { Item, ItemStack } from "./item";

const HttpService = game.GetService("HttpService");

export class Inventory {
	container: ItemStack[];
	id: string;
	columns: number;
	rows: number;
	maxSlots: number;
	updated: Signal<(item: ItemStack) => void>;

	constructor(rows: number, columns: number) {
		this.container = [];
		this.id = HttpService.GenerateGUID(false);
		this.columns = columns;
		this.rows = rows;
		this.maxSlots = rows * columns;
		this.updated = new Signal();
	}

	private isMaxReached() {
		return this.maxSlots >= this.container.size();
	}

	private isCorrectIndex(index: number) {
		return index < this.maxSlots;
	}

	public set(index: number, item: ItemStack) {
		if (this.isMaxReached() && !this.isCorrectIndex(index)) return;
		if (this.getByIndex(index)) return

	}

	public getByIndex(index: number) {
		return this.container[index];
	}

	public delete(index: number) {
		this.container.remove(index);
	}

	public addToStack(item: ItemStack) {
		const searchedStack = this.findFirstStack(item)

		searchedStack
	}

	public findFirstStack(item: ItemStack) {
		const itemStack = this.container.find(itStack => !itStack.isFull() && itStack.item.name === item.item.name && )

	}

	public swap(indexA: number, indexB: number) {
		if (!this.isCorrectIndex(indexA) && !this.isCorrectIndex(indexB)) return;

		const itemA = this.getByIndex(indexA);
		const itemB = this.getByIndex(indexB);

		this.delete(indexA);
		this.delete(indexB);

		this.set(indexB, itemA);
		this.set(indexA, itemB);
	}
}
