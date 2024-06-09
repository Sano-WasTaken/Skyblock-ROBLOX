import Signal from "@rbxts/signal"
import { Materials } from "./materials"
import { LootTable } from "./lootTable"
import { World } from "./editableWorldGrid"

const BLOCK_SIZE = Vector3.one.mul(3)

interface Ids {
    Top?: string,
    Bottom?: string,
    Right?: string,
    Left?: string,
    Front?: string,
    Back?: string
}

export enum EmitBlockType {
    "Position",
    "SetInWorld",
    "Destroyed",
}

export abstract class Block
{
    private Instance: BasePart
    private Material: Materials
    private Textures = new Map<Enum.NormalId, Texture>()
    private update = new Signal<(emitType: EmitBlockType, ...args: unknown[]) => void>()
    private lootTable = new LootTable()

    constructor(material: Materials, instance: BasePart) {
        this.Instance = instance
        this.Material = material

        instance.Size = BLOCK_SIZE
        instance.Transparency = 1
        instance.Anchored = true
    }

    private emit<K extends EmitBlockType>(emitType: EmitBlockType | K, ...args: unknown[]) { this.update.Fire(emitType, ...args) }
   
    public getLootTable() { return this.lootTable }
    public getBlock() { return this.Instance }
    public getTextures() { return this.Textures }
    public getTexture(face: Enum.NormalId) { return this.Textures.get(face) }
    public getPosition() { return this.Instance.Position.div(BLOCK_SIZE) }

    public setTextures(ids: Ids) {
        Enum.NormalId.GetEnumItems().forEach((normalId) => {
            const texture = this.Textures.get(normalId)
            const id = ids[normalId.Name]
            if (texture) {
                texture.Texture = id || ""
            } else {
                const texture = new Instance("Texture", this.Instance)
                texture.Face = normalId
                texture.Texture = id || ""
                this.Textures.set(normalId, texture)
            }
        })
    }

    public getListener<T, K extends EmitBlockType>(emitType: EmitBlockType | K) {
        const newSignal = new Signal<(...args: unknown[]) => void>()

        this.update.Connect((et, ...args) => {
            if (et === emitType) { newSignal.Fire(...args as T[]) }
        })

        return newSignal
    }

    public setTexture(face: Enum.NormalId, id: string) {
        const texture = this.Textures.get(face)
        if (texture) {
            texture.Texture = id
        } else {
            const texture = new Instance("Texture", this.Instance)
            texture.Face = face
            texture.Texture = id
            this.Textures.set(face, texture)
        }
    }

    public setPosition(position: Vector3) {
        const block = World.getBlock(this.getPosition())
        if (block) return

        this.Instance.Position = position.mul(BLOCK_SIZE)
        this.emit(EmitBlockType.Position, position)
    }

    protected setTextureStuds(U: number, V: number) {
        this.Textures.forEach(texture => {
            texture.StudsPerTileU = U,
            texture.StudsPerTileV = V
        })
    }

    public destroy() {
        this.Instance.Destroy()
        this.emit(EmitBlockType.Destroyed)
    }
}