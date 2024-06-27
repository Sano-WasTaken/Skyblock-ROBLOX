import Roact from "@rbxts/roact";
import { Players, UserInputService } from "@rbxts/services";
import { inventory, state } from "ReplicatedStorage/components/Inventory";

const player = Players.LocalPlayer;

player.CharacterAdded.Connect(() => Roact.mount(inventory, player.WaitForChild("PlayerGui"), "Inventory"));

UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode === Enum.KeyCode.E) state.update(!state.value.getValue());
});
