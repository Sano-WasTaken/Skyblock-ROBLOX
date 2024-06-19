import { Client } from "@rbxts/red";
import { ContextActionService, Players, RunService, UserInputService, Workspace } from "@rbxts/services";
import { Button, state } from "./Button";
import Roact from "@rbxts/roact";

const client = Client("Block");

const RenderStepped = RunService.Stepped;
const camera = Workspace.CurrentCamera as Camera;

const player = Players.LocalPlayer as Player;
const mouse = player.GetMouse();

function RaycastBlock() {
	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
	raycastParams.FilterDescendantsInstances = [player.Character as Model];

	const ray = camera.ScreenPointToRay(mouse.X, mouse.Y);

	const raycastResult = Workspace.Raycast(ray.Origin, ray.Direction.mul(100), raycastParams);

	return raycastResult;
}

const selectionBox = new Instance("SelectionBox");
selectionBox.Transparency = 0.5;
selectionBox.LineThickness = 0.035;
selectionBox.Color3 = new Color3(0, 0, 0);
selectionBox.SurfaceTransparency = 1;

RenderStepped.Connect(() => {
	const raycastResult = RaycastBlock();
	if (!raycastResult) return;

	const instance = raycastResult.Instance;

	if (instance && instance.IsA("BasePart") && instance.GetAttribute("Block")) {
		selectionBox.Parent = instance;
		selectionBox.Adornee = instance;
	} else selectionBox.Parent = undefined;
});

ContextActionService.BindAction(
	"BreakBlock",
	(action, inputState, inputObject) => {
		if (inputState === Enum.UserInputState.Begin && state.value.getValue()) {
			const raycastResult = RaycastBlock();

			if (!raycastResult) return Enum.ContextActionResult.Pass;

			const instance = raycastResult.Instance;

			if (instance && instance.IsA("BasePart") && instance.GetAttribute("Block")) {
				client.Fire("RaycastBlockDelete", camera.ScreenPointToRay(mouse.X, mouse.Y));
			}
		}
		return Enum.ContextActionResult.Pass;
	},
	false,
	Enum.UserInputType.MouseButton1,
);

ContextActionService.BindAction(
	"PlaceBlock",
	(action, inputState, inputObject) => {
		if (inputState === Enum.UserInputState.Begin && state.value.getValue()) {
			const raycastResult = RaycastBlock();

			if (!raycastResult) return Enum.ContextActionResult.Pass;

			const instance = raycastResult.Instance;

			if (instance && instance.IsA("BasePart") && instance.GetAttribute("Block")) {
				client.Fire("RaycastBlockCreate", camera.ScreenPointToRay(mouse.X, mouse.Y));
			}
		} else return Enum.ContextActionResult.Pass;
	},
	false,
	Enum.UserInputType.MouseButton2,
);

UserInputService.InputBegan.Connect((object) => {
	if (object.KeyCode === Enum.KeyCode.B) {
		state.update(!state.value.getValue());
	}
});

const button = Roact.createElement(Button);

player.CharacterAdded.Connect((character) => {
	Roact.mount(button, player.WaitForChild("PlayerGui"), "Build Mode Button");
});
