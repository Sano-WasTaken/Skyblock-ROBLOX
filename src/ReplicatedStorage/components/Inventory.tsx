import Roact, { Fragment } from "@rbxts/roact";

const binding = Roact.createBinding(false);

export const state = {
	value: binding[0],
	update: binding[1],
};

interface item {
	Name: string;
	Amount: number;
	ID: string;
	rendertype: string;
}

interface props {
	Items: item[];
}

class Item extends Roact.Component<{ i: number; item: item | undefined }> {
	public render(): Roact.Element {
		return (
			<frame
				BackgroundColor3={state.value.map(() => {
					return new Color3(1, 1, 1);
				})}
				Event={{
					MouseEnter: (frame) => {
						frame.BackgroundColor3 = new Color3(0.5, 0.5, 0.5);
					},
					MouseLeave: (frame) => {
						frame.BackgroundColor3 = new Color3(1, 1, 1);
					},
				}}
				LayoutOrder={this.props.i}
			>
				<textlabel
					Visible={this.props.item?.Amount ? true : false}
					Size={UDim2.fromScale(0.5, 0.3)}
					Position={UDim2.fromScale(0.5, 0.7)}
					Text={tostring(this.props.item?.Amount)}
					BackgroundTransparency={1}
				/>
			</frame>
		);
	}
}

class Inventory extends Roact.Component<props> {
	public render(): Roact.Element {
		const items: Roact.Element[] = [];

		for (let i = 0; i < 3 * 9; i++) {
			const item = this.props.Items[i];

			items.push(<Item i={i} item={item} />);
		}

		return (
			<screengui
				Enabled={state.value.map((value) => {
					return value;
				})}
			>
				<frame
					AnchorPoint={Vector2.one.div(2)}
					Size={UDim2.fromOffset(700, (610 / 9) * 3 + 30)}
					Position={UDim2.fromScale(0.5, 0.4)}
				>
					<uipadding
						PaddingTop={new UDim(0, 5)}
						PaddingBottom={new UDim(0, 5)}
						PaddingLeft={new UDim(0, 5)}
						PaddingRight={new UDim(0, 5)}
					/>
					<uigridlayout
						CellSize={UDim2.fromOffset(610 / 9, 610 / 9)}
						CellPadding={UDim2.fromOffset(10, 10)}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
					/>
					<Fragment>{...items}</Fragment>
				</frame>
			</screengui>
		);
	}
}

export const inventory = <Inventory Items={[]}></Inventory>;
