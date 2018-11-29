// Type definitions for react-native-bluetooth-serial-next 1.0.0
// Project: https://github.com/nuttawutmalee/react-native-bluetooth-serial-next
// Definitions by: Nuttawut Malee <https://github.com/nuttawutmalee>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1.6

import * as ReactNative from "react-native";
import * as React from "react";

export type Buffer = (data: number[]) => void;

/**
 * High order component that will
 * attach native event emitter and
 * send it as a props named subscription.
 *
 * It will create an emitter when component did mount
 * and remove all listeners when component will unmount.
 *
 * @param options
 */
export function withSubscription(options: {
  subscriptionName?: string;
  destroyOnWillUnmount?: boolean;
}): (WrappedComponent: React.Component) => React.Component;

// tslint:disable-next-line:export-just-namespace
export = BluetoothSerial;
export as namespace BluetoothSerial;

declare namespace BluetoothSerial {
  interface CommonDevice extends Object {
    id: string;
    name: string;
  }

  interface AndroidBluetoothDevice extends CommonDevice {
    address: string;
    class: string | undefined;
  }

  interface iOSBluetoothDevice extends CommonDevice {
    uuid: string;
    rssi: string | undefined;
  }

  /**
   * Prompts user device to enable bluetooth adapter.
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function.
   */
  export function requestEnable(): Promise<boolean>;

  /**
   * Enable bluetooth adapter service.
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function enable(): Promise<boolean>;

  /**
   * Disable bluetooth adapter service.
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function disable(): Promise<boolean>;

  /**
   * Indicates bluetooth adapter service status.
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function isEnabled(): Promise<boolean>;

  /**
   * Connect to certain bluetooth device / peripheral.
   *
   * @param id Device id or uuid
   *
   * @throws this will throws an error if android bluetooth adapter
   *         is missing.
   */
  export function connect(
    id: string
  ): Promise<AndroidBluetoothDevice | iOSBluetoothDevice>;

  /**
   * Disconnect from connected bluetooth device / peripheral.
   *
   * @param id Device id or uuid
   *
   * @throws this will throws an error if android bluetooth adapter
   *         is missing.
   */
  export function disconnect(id?: string): Promise<boolean>;

  /**
   * Indicates if you are connected to the active bluetooth device / peripheral or not.
   *
   * @param id Device id or uuid
   */
  export function isConnected(id?: string): Promise<boolean>;

  /**
   * List all paired (android) / connected (ios) bluetooth devices.
   */
  export function list(): Promise<
    Array<AndroidBluetoothDevice> | Array<iOSBluetoothDevice>
  >;

  /**
   * List all unpaired bluetooth devices.
   *
   * @alias discoverUnpairedDevices
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function.
   */
  export function listUnpaired(): Promise<
    Array<AndroidBluetoothDevice> | Array<iOSBluetoothDevice>
  >;

  /**
   * List all unpaired bluetooth devices.
   *
   * @alias listUnpaired
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function.
   */
  export function discoverUnpairedDevices(): Promise<
    Array<AndroidBluetoothDevice> | Array<iOSBluetoothDevice>
  >;

  /**
   * Cancel bluetooth device discovery.
   *
   * @alias stopScanning
   *
   * @throws this will throws an error if android bluetooth adapter
   *         is missing.
   */
  export function cancelDiscovery(): Promise<boolean>;

  /**
   * Cancel bluetooth device discovery.
   *
   * @alias cancelDiscovery
   *
   * @throws this will throws an error if android bluetooth adapter
   *         is missing.
   */
  export function stopScanning(): Promise<boolean>;

  /**
   * Pair with certain bluetooth device.
   *
   * @param id Device id
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function pairDevice(
    id: string
  ): Promise<AndroidBluetoothDevice | iOSBluetoothDevice>;

  /**
   * Unpair from certain bluetooth device.
   *
   * @param id Device id
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function unpairDevice(
    id: string
  ): Promise<AndroidBluetoothDevice | iOSBluetoothDevice>;

  /**
   * Listen and read data from connected device.
   *
   * @param callback
   * @param delimiter
   */
  export function read(
    callback: (
      data: string,
      subscription: ReactNative.EmitterSubscription
    ) => {},
    delimiter?: string
  ): void;

  /**
   * Read data from connected device once.
   *
   * @param delimiter
   */
  export function readOnce(delimiter?: string): Promise<string>;

  /**
   * Read data from connected device every n ms.
   *
   * @param callback
   * @param ms
   * @param delimiter
   */
  export function readEvery(
    callback: (data: string, intervalId: number) => {},
    ms?: number,
    delimiter?: string
  ): void;

  /**
   * Read all buffer data from connected device.
   *
   * @param id Device id or uuid
   */
  export function readFromDevice(id?: string): Promise<string>;

  /**
   * Read all buffer data up to particular delimiter
   * from connected device.
   *
   * @param delimiter
   * @param id Device id or uuid
   */
  export function readUntilDelimiter(
    delimiter: string,
    id?: string
  ): Promise<string>;

  /**
   * Write data to device, you can pass string or buffer,
   * We must convert to base64 in React Native
   * because there is no way to pass buffer directly.
   *
   * @param data
   * @param id Device id or uuid
   */
  export function write(data: Buffer | string, id?: string): Promise<boolean>;

  /**
   * Write string to device.
   *
   * @param data
   * @param id Device id or uuid
   */
  export function writeToDevice(data: string, id?: string): Promise<boolean>;

  /**
   * Clear all buffer data.
   *
   * @param id Device id or uuid
   */
  export function clear(id?: string): Promise<boolean>;

  /**
   * Get length of buffer data.
   *
   * @param id Device id or uuid
   */
  export function available(id?: string): Promise<number>;

  /**
   * Set bluetooth adapter a new name.
   *
   * @param name
   *
   * @throws this will throws an error in iOS because it does not
   *         support this function or if android bluetooth adapter
   *         is missing.
   */
  export function setAdapterName(name: string): Promise<string>;

  /**
   * Set delimiter split the buffer data
   * when you are reading from device.
   *
   * @param delimiter
   * @param id Device id or uuid
   */
  export function withDelimiter(
    delimiter: string,
    id?: string
  ): Promise<boolean>;

  /**
   * Select a specific bluetooth device and
   * give you the ability to read / write from
   * that device.
   *
   * @param {String} id Device id or uuid
   */
  export function device(
    id?: string
  ): {
    /**
     * Connect to certain bluetooth device / peripheral.
     *
     * @throws this will throws an error if android bluetooth adapter
     *         is missing.
     */
    connect(): Promise<AndroidBluetoothDevice | iOSBluetoothDevice>;

    /**
     * Disconnect from the selected bluetooth device / peripheral.
     *
     * @throws this will throws an error if android bluetooth adapter
     *         is missing.
     */
    disconnect: () => Promise<boolean>;

    /**
     * Indicates if you are connected to the selected bluetooth device / peripheral or not.
     */
    isConnected: () => Promise<boolean>;

    /**
     * Clear all buffer data of the selected bluetooth device / peripheral.
     */
    clear: () => Promise<boolean>;

    /**
     * Get length of buffer data from the selected bluetooth device / peripheral.
     */
    available: () => Promise<number>;

    /**
     * Set delimiter split the buffer data
     * when you are reading from the selected device.
     *
     * @param delimiter
     */
    withDelimiter: (delimiter: string) => Promise<boolean>;

    /**
     * Listen and read data from the selected device.
     *
     * @param callback
     * @param delimiter
     */
    read: (
      callback: (
        data: string,
        subscription: ReactNative.EmitterSubscription
      ) => {},
      delimiter?: string
    ) => void;

    /**
     * Read data from the selected device once.
     *
     * @param delimiter
     */
    readOnce: (delimiter?: string) => Promise<string>;

    /**
     * Read data from the selected device every n ms.
     *
     * @param callback
     * @param ms
     * @param delimiter
     */
    readEvery: (
      callback: (data: string, intervalId: number) => {},
      ms?: number,
      delimiter?: string
    ) => void;

    /**
     * Read all buffer data up to particular delimiter
     * from the selected device.
     *
     * @param delimiter
     */
    readUntilDelimiter: (delimiter: string) => Promise<string>;

    /**
     * Read all buffer data from connected device.
     */
    readFromDevice: () => Promise<string>;

    /**
     * Write data to the selected device, you can pass string or buffer,
     * We must convert to base64 in RN there is no way to pass buffer directly.
     *
     * @param data
     */
    write: (data: Buffer | string) => Promise<boolean>;

    /**
     * Write string to the selected device.
     *
     * @param data
     */
    writeToDevice: (data: string) => Promise<boolean>;
  };

  /**
   * Similar to addListener, except that the listener is removed after it is
   * invoked once.
   *
   * @param eventName - Name of the event to listen to
   * @param listener - Function to invoke only once when the
   *   specified event is emitted
   * @param context - Optional context object to use when invoking the
   *   listener
   */
  export function once(
    eventName: string,
    listener: (...args: any[]) => any,
    context: any
  ): ReactNative.EmitterSubscription;

  /**
   * Attach listener to a certain event name.
   *
   * @param eventName - Name of the event to listen to
   * @param listener - Function to invoke only once when the
   *   specified event is emitted
   * @param context - Optional context object to use when invoking the
   *   listener
   */
  export function on(
    eventName: string,
    listener: (...args: any[]) => any,
    context?: any
  ): ReactNative.EmitterSubscription;

  /**
   * Attach listener to a certain event name.
   *
   * @param eventName - Name of the event to listen to
   * @param listener - Function to invoke only once when the
   *   specified event is emitted
   * @param context - Optional context object to use when invoking the
   *   listener
   */
  export function addListener(
    eventName: string,
    listener: (...args: any[]) => any,
    context?: any
  ): ReactNative.EmitterSubscription;

  /**
   * Removes the given listener for event of specific type.
   *
   * @param eventName - Name of the event to emit
   * @param listener - Function to invoke when the specified event is
   *   emitted
   *
   * @example
   *   emitter.removeListener('someEvent', export function(message) {
   *     console.log(message);
   *   }); // removes the listener if already registered
   *
   */
  export function off(
    eventName: string,
    listener: (...args: any[]) => any
  ): void;

  /**
   * Removes the given listener for event of specific type.
   *
   * @param eventName - Name of the event to emit
   * @param listener - Function to invoke when the specified event is
   *   emitted
   *
   * @example
   *   emitter.removeListener('someEvent', export function(message) {
   *     console.log(message);
   *   }); // removes the listener if already registered
   *
   */
  export function removeListener(
    eventName: string,
    listener: (...args: any[]) => any
  ): void;

  /**
   * Removes all of the registered listeners, including those registered as
   * listener maps.
   *
   * @param eventName - Optional name of the event whose registered
   *   listeners to remove
   */
  export function removeAllListeners(eventName?: string): void;

  /**
   * Removes a specific subscription. Called by the `remove()` method of the
   * subscription itself to ensure any necessary cleanup is performed.
   */
  export function removeSubscription(
    subscription: ReactNative.EmitterSubscription
  ): void;
}
