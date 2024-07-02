import Roact, { Tree } from "@rbxts/roact";
import { Players, UserInputService } from "@rbxts/services";
import { createInventory } from "ReplicatedStorage/components/Inventory";
import { SpriteRenderType } from "ReplicatedStorage/enums/RenderType";

const player = Players.LocalPlayer;

const [stateInv, inventory] = createInventory({
	Items: [],
	Position: UDim2.fromScale(0.5, 0.65),
	Scale: 0.85,
	Rows: 9,
	Columns: 4,
});

const [stateSlots, slots] = createInventory({
	Items: [{ Amount: 1, Name: "test", ID: "rbxassetid://17790749739", rendertype: SpriteRenderType.SingleSprite }],
	Position: UDim2.fromScale(0.5, 0.9),
	Scale: 1,
	Rows: 9,
	Columns: 1,
});

let toggle = false;
let tree_inv: Tree | undefined = undefined;
let tree_slots: Tree | undefined = undefined;

player.CharacterAdded.Connect((character) => {
	tree_slots = Roact.mount(slots, player.WaitForChild("PlayerGui"), "HotBar");
	toggle = false;
});

UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode === Enum.KeyCode.E) {
		toggle = !toggle;
		if (toggle) {
			tree_inv = Roact.mount(inventory, player.WaitForChild("PlayerGui"), "Inventory");

			if (tree_slots) {
				Roact.unmount(tree_slots);
			}
		} else if (tree_inv) {
			Roact.unmount(tree_inv);

			tree_slots = Roact.mount(slots, player.WaitForChild("PlayerGui"), "HotBar");
		}
	}
});
