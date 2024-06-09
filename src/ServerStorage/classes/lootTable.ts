import { ItemDict, getItem } from "ServerStorage/ItemDict";
import { Item, ItemStack } from "./item";

interface item{
    Item: ItemDict,
    Maximum: number,
    MaximumMultiplier: number
    Minimum: number,
    MinimumMultiplier: number
}

export class LootTable {
    private items: item[] = []

    public getItems() {
        const items: ItemStack[] = []
        const random = new Random()

        this.items.forEach((it) => {
            const amount = random.NextInteger(it.Minimum * it.MinimumMultiplier, it.Maximum * it.Maximum)

            const item = new (getItem(it.Item))()
            const itStack = item.getItemStack(amount)
            
            items.push(itStack)
        })

        return items
    }

    public setItem(item: item) {
        this.items.push(item)
    }
}