import { Nullable } from "core/types";
import { Observer } from "core/Misc/observable";
import { Vector3 } from "core/Maths/math.vector";
import { Epsilon } from "core/Maths/math.constants";
import { Camera } from "core/Cameras/camera";
import { AbstractMesh } from "core/Meshes/abstractMesh";

import { MultiLine } from "./controls/multiLine";
import { ValueAndUnit } from "./valueAndUnit";
import { Control } from "./controls/control";

/**
 * Class used to store a point for a MultiLine object.
 * The point can be pure 2D coordinates, a mesh or a control
 */
export class MultiLinePoint {
    private _multiLine: MultiLine;

    private _x: ValueAndUnit;
    private _y: ValueAndUnit;
    private _control: Nullable<Control>;
    private _mesh: Nullable<AbstractMesh>;

    private _controlObserver: Nullable<Observer<Control>>;
    private _meshObserver: Nullable<Observer<Camera>>;

    /** @hidden */
    public _point: Vector3;

    /**
     * Creates a new MultiLinePoint
     * @param multiLine defines the source MultiLine object
     */
    constructor(multiLine: MultiLine) {
        this._multiLine = multiLine;

        this._x = new ValueAndUnit(0);
        this._y = new ValueAndUnit(0);

        this._point = new Vector3(0, 0, 0);
    }

    /** Gets or sets x coordinate */
    public get x(): string | number {
        return this._x.toString(this._multiLine._host);
    }

    public set x(value: string | number) {
        if (this._x.toString(this._multiLine._host) === value) {
            return;
        }

        if (this._x.fromString(value)) {
            this._multiLine._markAsDirty();
        }
    }

    /** Gets or sets y coordinate */
    public get y(): string | number {
        return this._y.toString(this._multiLine._host);
    }

    public set y(value: string | number) {
        if (this._y.toString(this._multiLine._host) === value) {
            return;
        }

        if (this._y.fromString(value)) {
            this._multiLine._markAsDirty();
        }
    }

    /** Gets or sets the control associated with this point */
    public get control(): Nullable<Control> {
        return this._control;
    }

    public set control(value: Nullable<Control>) {
        if (this._control === value) {
            return;
        }

        if (this._control && this._controlObserver) {
            this._control.onDirtyObservable.remove(this._controlObserver);

            this._controlObserver = null;
        }

        this._control = value;

        if (this._control) {
            this._controlObserver = this._control.onDirtyObservable.add(this._multiLine.onPointUpdate);
        }

        this._multiLine._markAsDirty();
    }

    /** Gets or sets the mesh associated with this point */
    public get mesh(): Nullable<AbstractMesh> {
        return this._mesh;
    }

    public set mesh(value: Nullable<AbstractMesh>) {
        if (this._mesh === value) {
            return;
        }

        if (this._mesh && this._meshObserver) {
            this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver);
        }

        this._mesh = value;

        if (this._mesh) {
            this._meshObserver = this._mesh.getScene().onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate);
        }

        this._multiLine._markAsDirty();
    }

    /** Resets links */
    public resetLinks(): void {
        this.control = null;
        this.mesh = null;
    }

    /**
     * Gets a translation vector with Z component
     * @returns the translation vector
     */
    public translate(): Vector3 {
        this._point = this._translatePoint();

        return this._point;
    }

    private _translatePoint(): Vector3 {
        if (this._mesh != null) {
            return this._multiLine._host.getProjectedPositionWithZ(this._mesh.getBoundingInfo().boundingSphere.center, this._mesh.getWorldMatrix());
        } else if (this._control != null) {
            return new Vector3(this._control.centerX, this._control.centerY, 1 - Epsilon);
        } else {
            const host: any = this._multiLine._host as any;

            const xValue: number = this._x.getValueInPixel(host, Number(host._canvas.width));
            const yValue: number = this._y.getValueInPixel(host, Number(host._canvas.height));

            return new Vector3(xValue, yValue, 1 - Epsilon);
        }
    }

    /** Release associated resources */
    public dispose(): void {
        this.resetLinks();
    }
}
