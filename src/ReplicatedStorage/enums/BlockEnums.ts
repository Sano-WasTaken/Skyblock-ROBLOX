export enum BlockEnum {
	Air,
	Stone,
	Spawn_Block,
	Iron_Ore,
}

export interface Ids {
	Top: string;
	Bottom: string;
	Right: string;
	Left: string;
	Front: string;
	Back: string;
}

export enum EmitBlockType {
	"Position",
	"SetInWorld",
	"Destroyed",
}

export enum BlockRenderType {
	Block,
	Stairs,
}
