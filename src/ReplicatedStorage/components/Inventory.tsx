import Roact, { Children, Element, Ref } from "@rbxts/roact";
import { Ids } from "ReplicatedStorage/enums/BlockEnums";
import { SpriteRenderType } from "ReplicatedStorage/enums/RenderType";

export interface item {
	Name: string;
	Amount: number;
	ID: string | Ids;
	rendertype: SpriteRenderType;
}

interface props {
	Items: item[];
	Slots: number;
	Scale: number;
	Position: UDim2;
}

const camera = new Instance("Camera");
camera.CFrame = CFrame.lookAt(new Vector3(3, 1.8, 3).mul(1.2), new Vector3(0, 0, 0));
camera.FieldOfView = 65;

function createBlock(ids: Ids | string) {
	const part = new Instance("Part");
	part.Size = new Vector3(3, 3, 3);

	Enum.NormalId.GetEnumItems().forEach((normal) => {
		const texture = new Instance("Texture");
		texture.StudsPerTileU = 3;
		texture.StudsPerTileV = 3;
		texture.Texture = typeOf(ids) === "table" ? (ids as Ids)[normal.Name] : (ids as string);
		texture.Face = normal;
		texture.Parent = part;
	});

	return part;
}

export class Item extends Roact.Component<{ i: number; item: item | undefined }> {
	public render(): Roact.Element {
		const item = this.props.item;

		let renderElement = undefined;

		switch (item?.rendertype) {
			case SpriteRenderType.Blocked:
				const part = createBlock(item.ID as Ids);
				renderElement = (
					<viewportframe
						Size={UDim2.fromScale(1, 1)}
						Transparency={1}
						CurrentCamera={camera}
						Ref={(instance) => {
							part.Parent = instance;
						}}
					/>
				);
				break;
			case SpriteRenderType.SingleSprite:
				renderElement = (
					<imagelabel
						Image={item.ID as string}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={UDim2.fromScale(0.8, 0.8)}
					/>
				);
				break;
		}

		return (
			<frame
				BackgroundColor3={new Color3(1, 1, 1)}
				Event={{
					MouseEnter: (frame) => {
						frame.BackgroundColor3 = new Color3(0.5, 0.5, 0.5);
					},
					MouseLeave: (frame) => {
						frame.BackgroundColor3 = new Color3(1, 1, 1);
					},
					InputBegan: (frame, input) => {
						if (input.UserInputType === Enum.UserInputType.MouseButton1) {
							print(this.props.i, this.props.item, input.UserInputType);
						} else if (input.UserInputType === Enum.UserInputType.MouseButton2) {
							print(this.props.i, this.props.item, input.UserInputType);
						}
					},
				}}
				LayoutOrder={this.props.i}
				Transparency={0.5}
				BorderSizePixel={0}
			>
				<Roact.Fragment>{renderElement}</Roact.Fragment>
				<textlabel
					Visible={item?.Amount ? true : false}
					Size={UDim2.fromScale(0.5, 0.3)}
					Position={UDim2.fromScale(0.5, 0.7)}
					Text={tostring(item?.Amount)}
					BackgroundTransparency={1}
				/>
			</frame>
		);
	}
}

class Inventory extends Roact.Component<
	props & { binding: LuaTuple<[Roact.Binding<boolean>, (newValue: boolean) => void]> }
> {
	public render(): Roact.Element {
		const items: Roact.Element[] = [];

		for (let i = 0; i < this.props.Slots; i++) {
			const item = this.props.Items[i];

			items.push(<Item i={i} item={item} />);
		}

		return (
			<screengui Enabled={true}>
				<frame
					AnchorPoint={Vector2.one.div(2)}
					Size={UDim2.fromOffset(
						9 * 70 + 10 * 8 + 2 * 5,
						(this.props.Slots / 9) * 70 + 10 * (this.props.Slots / 9 - 1) + 2 * 5,
					)}
					Position={this.props.Position}
					BorderSizePixel={0}
				>
					<uipadding
						PaddingTop={new UDim(0, 5)}
						PaddingBottom={new UDim(0, 5)}
						PaddingLeft={new UDim(0, 5)}
						PaddingRight={new UDim(0, 5)}
					/>
					<uigridlayout
						CellSize={UDim2.fromOffset(70, 70)}
						CellPadding={UDim2.fromOffset(10, 10)}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					<uiscale Scale={this.props.Scale} />
					<Roact.Fragment>{items}</Roact.Fragment>
				</frame>
			</screengui>
		);
	}
}

export function createInventory(
	props: props,
): [binding: LuaTuple<[Roact.Binding<boolean>, (newValue: boolean) => void]>, inventory: Element] {
	const binding = Roact.createBinding(false);

	return [
		binding,
		<Inventory
			Items={props.Items}
			Position={props.Position}
			Scale={props.Scale}
			Slots={props.Slots}
			binding={binding}
		/>,
	];
}
