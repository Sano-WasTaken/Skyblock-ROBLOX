import { Item, ItemStack } from "./item";

interface item<T>{
    Item: string,
    Maximum: number,
    MaximumMultiplier: number
    Minimum: number,
    MinimumMultiplier: number
}

export class LootTable<T extends typeof Item> {
    private items: item<T>[] = []

    public getItems() {
        const items: ItemStack[] = []
        const random = new Random()

        this.items.forEach((it) => {
            
            //const amount = random.NextInteger(it.Minimum * it.MinimumMultiplier, it.Maximum * it.Maximum)

            //const item = new it.Item()
            //const itStack = item.getItemStack(amount)
            
            //items.push(itStack)
        })

        return items
    }

    public setItem<T extends typeof Item>(item: item<T>) {
        
    }
}