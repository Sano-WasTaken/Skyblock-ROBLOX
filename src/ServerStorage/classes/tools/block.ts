import Signal from "@rbxts/signal-ts";
import { Materials } from "../../../ReplicatedStorage/enums/materials";
import { LootTable } from "../lootTable";
import { World } from "../editableWorldGrid";
import { BlockMeta } from "../blockMeta";
import { BlockEnum, BlockRenderType, EmitBlockType, Ids } from "ReplicatedStorage/enums/BlockEnums";

export const BLOCK_SIZE = Vector3.one.mul(3);

const NONEID = "rbxassetid://17869810803";

export abstract class Block {
	private instance?: BasePart;
	private material: Materials;
	protected textures = {
		Top: NONEID,
		Bottom: NONEID,
		Right: NONEID,
		Left: NONEID,
		Front: NONEID,
		Back: NONEID,
	};
	private rendererType: BlockRenderType;
	private orientation = new Vector3();
	private position = new Vector3();
	private update = new Signal<(emitType: EmitBlockType, ...args: unknown[]) => void>();
	private lootTable = new LootTable();
	private blockMeta = new BlockMeta();
	protected renderMesh: BasePart;
	protected blockID = BlockEnum.Air;
	public isMachine = false;

	constructor(material: Materials, rendererType: BlockRenderType, renderMesh: BasePart) {
		this.material = material;
		this.rendererType = rendererType;

		renderMesh.Size = BLOCK_SIZE;
		renderMesh.Transparency = 1;
		renderMesh.Anchored = true;
		renderMesh.SetAttribute("Block", true);

		this.renderMesh = renderMesh;
	}

	protected emit<K extends EmitBlockType>(emitType: EmitBlockType | K, ...args: unknown[]) {
		this.update.Fire(emitType, ...args);
	}

	public getLootTable() {
		return this.lootTable;
	}
	public getTextures() {
		return this.textures;
	}
	public getTexture(face: Enum.NormalId) {
		return this.getMesh()
			.GetChildren()
			.find((instance) => instance.IsA("Texture") && instance.Face === face);
	}
	public getPosition() {
		return this.position;
	}
	public getOrientation() {
		return this.orientation;
	}
	public getMesh() {
		return this.renderMesh;
	}
	public getBlockMeta() {
		return this.blockMeta;
	}

	public getListener<T, K extends EmitBlockType>(emitType: EmitBlockType | K) {
		const newSignal = new Signal<(...args: unknown[]) => void>();

		this.update.Connect((et, ...args) => {
			if (et === emitType) {
				newSignal.Fire(...(args as T[]));
			}
		});

		return newSignal;
	}

	public getCFrame() {
		return new CFrame(this.getPosition()).add(this.getOrientation());
	}

	public setTextures(ids: Ids) {
		this.textures = ids;

		this.getMesh()
			.GetChildren()
			.forEach((instance) => {
				if (instance.IsA("Texture")) {
					const id = ids[instance.Face.Name];
					if (id) instance.Texture = id;
				}
			});
	}

	public setTexture(face: Enum.NormalId, id: string) {
		this.textures[face.Name] = id;

		const texture = this.getMesh()
			.GetChildren()
			.find((instance) => instance.IsA("Texture") && instance.Face === face) as Texture;

		if (texture) texture.Texture = id;
	}

	public setPosition(position: Vector3) {
		const block = World.getBlock(this.getPosition());
		if (block) return;

		this.renderMesh.Position = position.mul(BLOCK_SIZE);
		this.position = position;

		this.emit(EmitBlockType.Position, position);
	}

	public destroy() {
		this.renderMesh.Destroy();

		this.emit(EmitBlockType.Destroyed);
	}

	public getID() {
		return this.blockID;
	}

	public getName() {
		return BlockEnum[this.blockID];
	}

	public getBlock() {
		return {
			Ids: this.getTextures(),
			Name: this.getName(),
			CFrame: this.getCFrame(),
		};
	}
}
