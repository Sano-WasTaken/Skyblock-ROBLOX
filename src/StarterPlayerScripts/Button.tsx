import Roact from "@rbxts/roact";

export class Button extends Roact.Component {

    buildmode: Roact.Binding<boolean>
    updateBM: (newValue: boolean) => void

    constructor() {
        super({})
        const binding = Roact.createBinding(false)

        this.buildmode = binding[0]
        this.updateBM = binding[1]
    }

    public render(): Roact.Element {
        return (
            <screengui>
                <textbutton
                    Text={`Builder mode: ${this.buildmode.getValue()}`}
                    Position={UDim2.fromScale(0, 0.9)}
                    Size={UDim2.fromScale(0.1, 0.1)}
                    BackgroundColor3={new Color3(1, 1, 1)}
                    TextColor3={Color3.fromRGB(0, 0, 0)}
                    TextSize={22}
                    TextScaled={true}
                    Event={
                        { MouseButton1Click: (rbx) => {
                            this.updateBM(!this.buildmode.getValue())
                            if (this.buildmode.getValue()) {
                                rbx.BackgroundColor3 = new Color3(1, 1, 1)
                            } else {
                                rbx.BackgroundColor3 = new Color3(1, 0, 0)
                            }
                            
                        }}
                    }
                />
            </screengui>
        )
    }
}