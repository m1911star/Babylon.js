import { DeviceType, PointerInput } from "./deviceEnums";
import { Observable } from "../../Misc/observable";
import { DeviceInput } from "./deviceTypes";
import { IDeviceInputSystem } from "./inputInterfaces";
import { IUIEvent } from "../../Events/deviceInputEvents";

/**
 * Subset of DeviceInput that only handles pointers and keyboard
 */
type DeviceEventInput<T extends DeviceType> = T extends DeviceType.Keyboard | DeviceType.Generic
    ? number
    : T extends DeviceType.Mouse | DeviceType.Touch
    ? Exclude<PointerInput, PointerInput.Horizontal | PointerInput.Vertical>
    : never;

/**
 * Class that handles all input for a specific device
 */
export class DeviceSource<T extends DeviceType> {
    // Public Members
    /**
     * Observable to handle device input changes per device
     */
    public readonly onInputChangedObservable = new Observable<IUIEvent & { inputIndex: DeviceEventInput<T> }>();

    // Private Members
    private readonly _deviceInputSystem: IDeviceInputSystem;

    /**
     * Default Constructor
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     */
    constructor(
        deviceInputSystem: IDeviceInputSystem,
        /** Type of device */
        public readonly deviceType: DeviceType,
        /** "Slot" or index that device is referenced in */
        public readonly deviceSlot: number = 0
    ) {
        this._deviceInputSystem = deviceInputSystem;
    }

    /**
     * Get input for specific input
     * @param inputIndex index of specific input on device
     * @returns Input value from DeviceInputSystem
     */
    public getInput(inputIndex: DeviceInput<T>): number {
        return this._deviceInputSystem.pollInput(this.deviceType, this.deviceSlot, inputIndex);
    }
}
