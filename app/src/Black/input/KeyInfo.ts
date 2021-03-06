/**
 * Holds information about keyboard event.
 *
 * @cat input
 */
export class KeyInfo {
	public keyCode: any;
	public code: any;
	public char: any;
	public shiftKey: any;
	public altKey: any;
	public ctrlKey: any;

  /**
   * Create new instance of KeyInfo
   *
   * @param {KeyboardEvent} nativeEvent Native touch event.
   * @return {void}
   */
  constructor(nativeEvent) {
    this.keyCode = nativeEvent.keyCode;
    this.code = nativeEvent.code;
    this.char = nativeEvent.key;
    this.shiftKey = nativeEvent.shiftKey;
    this.altKey = nativeEvent.altKey;
    this.ctrlKey = nativeEvent.ctrlKey;
  }
}
