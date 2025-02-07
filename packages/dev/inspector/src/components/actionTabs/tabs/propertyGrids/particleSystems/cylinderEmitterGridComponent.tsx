import * as React from "react";

import { Observable } from "core/Misc/observable";
import { GlobalState } from "../../../../globalState";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CylinderParticleEmitter } from "core/Particles/EmitterTypes/cylinderParticleEmitter";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";

interface ICylinderEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: CylinderParticleEmitter;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CylinderEmitterGridComponent extends React.Component<ICylinderEmitterGridComponentProps> {
    constructor(props: ICylinderEmitterGridComponentProps) {
        super(props);
    }

    render() {
        const emitter = this.props.emitter;
        return (
            <>
                <FloatLineComponent
                    lockObject={this.props.lockObject}
                    label="Radius"
                    target={emitter}
                    propertyName="radius"
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                />
                <FloatLineComponent
                    lockObject={this.props.lockObject}
                    label="Height"
                    target={emitter}
                    propertyName="height"
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                />
                <SliderLineComponent
                    label="Radius range"
                    target={emitter}
                    propertyName="radiusRange"
                    minimum={0}
                    maximum={1}
                    step={0.01}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                />
                <SliderLineComponent
                    label="Direction randomizer"
                    target={emitter}
                    propertyName="directionRandomizer"
                    minimum={0}
                    maximum={1}
                    step={0.01}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                />
            </>
        );
    }
}
