import * as React from "react";

import { Observable } from "core/Misc/observable";
import { GlobalState } from "../../../../globalState";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { ConeParticleEmitter } from "core/Particles/EmitterTypes/coneParticleEmitter";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";

interface IConeEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: ConeParticleEmitter;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class ConeEmitterGridComponent extends React.Component<IConeEmitterGridComponentProps> {
    constructor(props: IConeEmitterGridComponentProps) {
        super(props);
    }

    render() {
        const emitter = this.props.emitter;
        return (
            <>
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
                    label="Height range"
                    target={emitter}
                    propertyName="heightRange"
                    minimum={0}
                    maximum={1}
                    step={0.01}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                />
                <CheckBoxLineComponent
                    label="Emit from spawn point only"
                    target={emitter}
                    propertyName="emitFromSpawnPointOnly"
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
