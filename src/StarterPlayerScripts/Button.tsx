import Roact from "@rbxts/roact";

const binding = Roact.createBinding(false);

export let state = {
	update: binding[1],
	value: binding[0],
};

export class Button extends Roact.Component {
	public render(): Roact.Element {
		return (
			<screengui>
				<textbutton
					Text={state.value.map((value) => {
						return `Builder mode: ${value}`;
					})}
					Position={UDim2.fromScale(0, 0.9)}
					Size={UDim2.fromScale(0.1, 0.1)}
					BackgroundColor3={state.value.map((value) => {
						return value ? new Color3(1, 0, 0) : new Color3(1, 1, 1);
					})}
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextSize={22}
					TextScaled={true}
					Event={{
						MouseButton1Click: (rbx) => {
							state.update(!state.value.getValue());
						},
					}}
				/>
			</screengui>
		);
	}
}
