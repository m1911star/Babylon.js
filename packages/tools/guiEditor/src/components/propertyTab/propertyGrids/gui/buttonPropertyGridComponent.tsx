import * as React from "react";
import { Observable } from "core/Misc/observable";
import { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { Rectangle } from "gui/2D/controls/rectangle";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { CommandButtonComponent } from "../../../commandButtonComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import { ContainerPropertyGridComponent } from "./containerPropertyGridComponent";

import conerRadiusIcon from "shared-ui-components/imgs/conerRadiusIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import addImageButtonIcon from "shared-ui-components/imgs/addImageButtonIcon.svg";
import addTextButtonIcon from "shared-ui-components/imgs/addTextButtonIcon.svg";

interface IButtonPropertyGridComponentProps {
    rectangles: Rectangle[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onAddComponent: (newComponent: string) => void;
}

export class ButtonPropertyGridComponent extends React.Component<IButtonPropertyGridComponentProps> {
    constructor(props: IButtonPropertyGridComponentProps) {
        super(props);
    }

    render() {
        const { rectangles, lockObject, onPropertyChangedObservable, onAddComponent } = this.props;

        return (
            <div className="pane">
                <CommonControlPropertyGridComponent lockObject={lockObject} controls={rectangles} onPropertyChangedObservable={onPropertyChangedObservable} />
                <hr />
                <TextLineComponent label="RECTANGLE" value=" " color="grey"></TextLineComponent>
                <div className="ge-divider">
                    <FloatLineComponent
                        iconLabel="Stroke Weight"
                        icon={strokeWeightIcon}
                        lockObject={lockObject}
                        label=""
                        target={makeTargetsProxy(rectangles, onPropertyChangedObservable)}
                        propertyName="thickness"
                        onPropertyChangedObservable={onPropertyChangedObservable}
                    />
                    <FloatLineComponent
                        iconLabel="Corner Radius"
                        icon={conerRadiusIcon}
                        lockObject={lockObject}
                        label=""
                        target={makeTargetsProxy(rectangles, onPropertyChangedObservable)}
                        propertyName="cornerRadius"
                        onPropertyChangedObservable={onPropertyChangedObservable}
                    />
                </div>
                <ContainerPropertyGridComponent containers={rectangles} onPropertyChangedObservable={onPropertyChangedObservable} />
                <hr />
                <TextLineComponent label="BUTTON" value=" " color="grey"></TextLineComponent>
                <div className="ge-divider">
                    <CommandButtonComponent
                        tooltip="Add TextBlock"
                        icon={addTextButtonIcon}
                        shortcut=""
                        isActive={false}
                        onClick={() => {
                            onAddComponent("Text");
                        }}
                    />
                    <CommandButtonComponent
                        tooltip="Add Image"
                        icon={addImageButtonIcon}
                        shortcut=""
                        isActive={false}
                        onClick={() => {
                            onAddComponent("ButtonImage");
                        }}
                    />
                </div>
            </div>
        );
    }
}
