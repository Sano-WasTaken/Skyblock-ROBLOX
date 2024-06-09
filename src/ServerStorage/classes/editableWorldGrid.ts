import { Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Block } from "ServerStorage/classes/block";

const blockFolder = new Instance("Folder", Workspace)
blockFolder.Name = "BlockFolder"

const neights = [
    new Vector3(0, 1, 0),
    new Vector3(0, -1, 0),
    new Vector3(-1, 0, 0),
    new Vector3(-1, 0, 0),
    new Vector3(0, 0, 1),
    new Vector3(0, 0, -1),
]

export enum EmitWorldType {
    BlockAdded,
    BlockRemoved,
}

export abstract class World {
    private static world: Block[][][] = []
    private static update = new Signal<(emitType: EmitWorldType, ...args: unknown[]) => void>()

    private constructor() {}

    private static emit(emitType: EmitWorldType, ...args: unknown[]) {
        this.update.Fire(emitType, ...args)
    }

    public static getListener<T>(emitType: EmitWorldType) {
        const signal = new Signal<(...args: T[]) => void>()

        this.update.Connect((et, ...args) => {
            if (et === emitType) { signal.Fire(...args as T[]) }
        })

        return signal
    }

    public static addBlock(block: Block, pos: Vector3) {
        
        if (this.getBlock(pos)) return

        if (!this.world[pos.X]) { this.world[pos.X] = [] }
        if (!this.world[pos.X][pos.Y]) { this.world[pos.X][pos.Y] = [] }
        this.world[pos.X][pos.Y][pos.Z] = block

        block.setPosition(pos)
        block.getBlock().Parent = blockFolder

        this.emit(EmitWorldType.BlockAdded, block)
    }

    public static getBlock(pos: Vector3) {
        if (!this.world[pos.X]) return
        if (!this.world[pos.X][pos.Y]) return
        if (!this.world[pos.X][pos.Y][pos.Z]) return

        return this.world[pos.X][pos.Y][pos.Z]
    }

    public static getNeighbors(pos: Vector3) {
        const neighbors = new Map<Vector3, Block>()

        neights.forEach((direction) => {
            const block = this.getBlock(pos.add(direction))

            if (block) neighbors.set(direction, block)
        })

        return neighbors
    }

    public static getNeighbor(pos: Vector3, direction: Vector3) {
        return this.getBlock(pos.add(direction))
    }

    /**
    public static deleteBlock(pos: Vector3) {
        const block = this.getBlock(pos)

        if (block) {
            block.destroy()
            this.world[pos.X][pos.Y].clear()
            this.emit(EmitWorldType.BlockRemoved, block)
        }
    }*/
}