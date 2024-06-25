import Signal from "@rbxts/signal-ts";
import { Block, BlockRenderType } from "./block";
import { Materials } from "../../../ReplicatedStorage/enums/materials";
import { IOType, ItemType } from "../../../ReplicatedStorage/enums/elementType";
import { RunService } from "@rbxts/services";
import { Inventory } from "../inventory";

// Describe if the I/O is open or closed
interface IO {
	Type: IOType;
	ItemType?: ItemType;
	Active: boolean;
}

interface IOs {
	Top?: IO;
	Bottom?: IO;
	Right?: IO;
	Left?: IO;
	Front?: IO;
	Back?: IO;
}

enum IOEmitType {
	Send,
	Recieve,
}

class MachineryIO {
	private inputs: IOs = {};
	private outputs: IOs = {};
	private update = new Signal<(IOEType: IOEmitType, ...args: unknown[]) => void>();

	protected emit(IOEType: IOEmitType, ...args: unknown[]) {
		this.update.Fire(IOEType, ...args);
	}

	public getInputs() {
		return this.inputs;
	}
	public getOutputs() {
		return this.outputs;
	}

	public getListerner<T>(IOEType: IOEmitType) {
		const signal = new Signal<(...args: T[]) => void>();

		this.update.Connect((IOET, ...args) => {
			if (IOET === IOEType) {
				signal.Fire(...(args as T[]));
			}
		});

		return signal;
	}

	public setInputs(io: IOs) {
		this.inputs = io;
	}

	public setOutputs(io: IOs) {
		this.outputs = io;
	}

	public setInput(face: Enum.NormalId, io: IO) {
		this.inputs[face.Name] = io;
	}

	public setOutput(face: Enum.NormalId, io: IO) {
		this.outputs[face.Name] = io;
	}

	public send() {}
}

export abstract class Machine extends Block {
	private IO = new MachineryIO();
	private loop = (tick: number) => error(`${this.getID()} has no init function, ${1 / tick}`);
	public container = new Inventory(1);
	public result = new Inventory(1);
	public isMachine = true;

	constructor(renderMesh: BasePart) {
		super(Materials.Machine, BlockRenderType.Block, renderMesh);

		this.IO.setInputs({
			Back: {
				Type: IOType.Item,
				ItemType: ItemType.Fuel,
				Active: true,
			},
			Top: {
				Type: IOType.Item,
				ItemType: ItemType.Smeltable,
				Active: true,
			},
		});

		this.IO.setOutputs({
			Bottom: {
				Type: IOType.Item,
				ItemType: ItemType.Undefined,
				Active: true,
			},
		});

		RunService.Heartbeat.Connect(this.loop);
	}

	public getIO() {
		return this.IO;
	}
}
