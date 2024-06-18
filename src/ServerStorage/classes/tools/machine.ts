import Signal from "@rbxts/signal-ts";
import { Block, BlockRenderType } from "./block";
import { Materials } from "../../../ReplicatedStorage/enums/materials";
import { IOType, ItemType } from "../../../ReplicatedStorage/enums/elementType";

// Describe if the I/O is open or closed
interface IO {
    Type: IOType
    ItemType?: ItemType
    Active: boolean
}

interface IOs {
    Top?: IO,
    Bottom?: IO,
    Right?: IO,
    Left?: IO,
    Front?: IO,
    Back?: IO,
}

enum IOEmitType {
    
}

class MachineryIO {
    private inputs: IOs = {}
    private outputs: IOs = {}
    private update = new Signal<(IOEType: IOEmitType, ...args: unknown[]) => void>()

    private emit(IOEType: IOEmitType, ...args: unknown[]) {
        this.update.Fire(IOEType, ...args)
    }

    public getInputs() {return this.inputs}
    public getOutputs() {return this.outputs}

    public getListerner<T>(IOEType: IOEmitType) {
        const signal = new Signal<(...args: T[]) => void>()

        this.update.Connect((IOET, ...args) => {
            if (IOET === IOEType) { signal.Fire(...args as T[]) }
        })

        return signal
    }

    public setInputs(io: IOs) {
        
    }
}

export abstract class Machine extends Block {
    
    private IO = new MachineryIO()

    constructor(renderMesh: BasePart) {
        super(Materials.Stone, BlockRenderType.Blocked, renderMesh)

        this.IO.setInputs({
            Top: {
                Type: IOType.Item,
                ItemType: ItemType.Fuel,
                Active: true
            }
        })
    }

}