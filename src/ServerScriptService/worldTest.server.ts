import { EmitWorldType, World } from "ServerStorage/classes/editableWorldGrid";
import StoneBlock from "ServerStorage/blocks/Stone";
import { Block } from "ServerStorage/classes/tools/block";
import Iron_Ore from "ServerStorage/blocks/IronOre";
import SpawnBlock from "ServerStorage/blocks/Spawn";
import { Workspace } from "@rbxts/services";
import { Server } from "@rbxts/red";
import { extractWorld } from "ServerStorage/dataParser";

const server = Server("Block");

function raycast(player: Player, ray: Ray): [BasePart, Vector3] | undefined {
	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
	raycastParams.FilterDescendantsInstances = [player.Character as Model];

	const raycastResult = Workspace.Raycast(ray.Origin, ray.Direction.mul(100), raycastParams);

	const instance = raycastResult?.Instance;

	if (instance && instance.IsA("BasePart") && instance.GetAttribute("Block")) {
		return [instance, raycastResult.Normal];
	}
}

World.addBlock(new SpawnBlock(), new Vector3(0, 2, 0));

for (let x = -15; x <= 15; x++) {
	for (let y = -15; y <= 15; y++) {
		const b = new StoneBlock();

		World.addBlock(b, new Vector3(x, 3, y));
	}
}

server.On("RaycastBlockDelete", (player: Player, ray: Ray) => {
	const result = raycast(player, ray);

	if (result) {
		const [instance, normal] = result;

		const newPos = instance.Position.div(3);

		const block = World.getBlock(newPos);

		if (block && !block.getBlockMeta().unbreakable) {
			World.deleteBlock(newPos);
		}
	}
});

server.On("RaycastBlockCreate", (player: Player, ray: Ray) => {
	const result = raycast(player, ray);

	if (result) {
		const [instance, normal] = result;

		const newPos = instance.Position.div(3).add(normal);

		const collidingParts = Workspace.GetPartBoundsInBox(
			new CFrame(instance.Position.add(normal.mul(Vector3.one.mul(3)))),
			Vector3.one.mul(2.5),
		);

		if (collidingParts.size() === 0) {
			const b = new StoneBlock();

			World.addBlock(b, newPos);
		}
	}
});

game.BindToClose(function () {
	print(extractWorld());
});
