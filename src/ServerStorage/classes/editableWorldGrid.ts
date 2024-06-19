import { Server } from "@rbxts/red";
import { Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal-ts";
import { Block } from "ServerStorage/classes/tools/block";

const blockFolder = new Instance("Folder", Workspace);
blockFolder.Name = "BlockFolder";

const neights = [
	new Vector3(0, 1, 0),
	new Vector3(0, -1, 0),
	new Vector3(1, 0, 0),
	new Vector3(-1, 0, 0),
	new Vector3(0, 0, -1),
	new Vector3(0, 0, 1),
];

const normals = new Map<Vector3, Enum.NormalId>();

normals.set(neights[0], Enum.NormalId.Top);
normals.set(neights[1], Enum.NormalId.Bottom);
normals.set(neights[2], Enum.NormalId.Right);
normals.set(neights[3], Enum.NormalId.Left);
normals.set(neights[4], Enum.NormalId.Front);
normals.set(neights[5], Enum.NormalId.Back);

export enum EmitWorldType {
	BlockAdded,
	BlockRemoved,
}

function createTexture(face: Enum.NormalId) {
	const texture = new Instance("Texture");

	texture.StudsPerTileU = 3;
	texture.StudsPerTileV = 3;
	texture.Face = face;

	return texture;
}

function convertVectorToNormal(normal: Vector3) {
	return normals.get(normal);
}

export abstract class World {
	private static grid: (Block | undefined)[][][] = [];
	private static update = new Signal<(emitType: EmitWorldType, ...args: unknown[]) => void>();

	private static emit(emitType: EmitWorldType, ...args: unknown[]) {
		this.update.Fire(emitType, ...args);
	}

	public static getListener<T>(emitType: EmitWorldType) {
		const signal = new Signal<(...args: T[]) => void>();

		this.update.Connect((et, ...args) => {
			if (et === emitType) {
				signal.Fire(...(args as T[]));
			}
		});

		return signal;
	}

	public static addBlock(block: Block, pos: Vector3) {
		if (this.getBlock(pos)) return;

		if (!this.grid[pos.X]) this.grid[pos.X] = [];
		if (!this.grid[pos.X][pos.Y]) this.grid[pos.X][pos.Y] = [];

		block.setPosition(pos);
		block.getMesh().Parent = blockFolder;

		this.grid[pos.X][pos.Y][pos.Z] = block;

		this.updateTextures(pos);

		this.emit(EmitWorldType.BlockAdded, block);
	}

	public static getBlock(pos: Vector3) {
		if (!this.grid[pos.X]) return;
		if (!this.grid[pos.X][pos.Y]) return;
		if (!this.grid[pos.X][pos.Y][pos.Z]) return;

		return this.grid[pos.X][pos.Y][pos.Z];
	}

	public static getNeighbors(pos: Vector3) {
		const neighbors = new Map<Vector3, Block>();

		neights.forEach((direction) => {
			const block = this.getBlock(pos.add(direction));

			if (block) neighbors.set(direction, block);
		});

		return neighbors;
	}

	public static getNeighbor(pos: Vector3, direction: Vector3) {
		return this.getBlock(pos.add(direction));
	}

	public static deleteBlock(pos: Vector3) {
		const block = this.getBlock(pos);

		if (block) {
			block.destroy();
			delete this.grid[pos.X][pos.Y][pos.Z];
			this.updateTextures(pos);
			this.emit(EmitWorldType.BlockRemoved, block);
		}
	}

	public static getGrid() {
		return this.grid;
	}

	public static updateTextures(position: Vector3) {
		const block = this.getBlock(position);

		if (block) {
			const neighbors = this.getNeighbors(position);
			neights.forEach((neight) => {
				const neighbor = neighbors.get(neight);

				const normalB = convertVectorToNormal(neight);
				const normalN = convertVectorToNormal(neight.mul(-1));

				if (!normalB) return;
				if (!normalN) return;

				const textureB = block.getTexture(normalB);

				if (neighbor) {
					const textureN = neighbor.getTexture(normalN);

					if (textureN) textureN.Destroy();
				} else if (!textureB) {
					const textureB = createTexture(normalB);
					const id = block.getTextures()[normalB.Name];

					if (id) textureB.Texture = id;
					textureB.Parent = block.getMesh();
				}
			});
		} else {
			const neighbors = this.getNeighbors(position);
			neights.forEach((neight) => {
				const neighbor = neighbors.get(neight);

				const normalN = convertVectorToNormal(neight.mul(-1));

				if (!normalN) return;

				if (neighbor) {
					const textureN = createTexture(normalN);
					const id = neighbor.getTextures()[normalN.Name];

					if (id) textureN.Texture = id;
					textureN.Parent = neighbor.getMesh();

					//print("texture created", textureN, textureN.Parent !== undefined, textureN.Parent)
				}
			});
		}
	}
}
