/**
 * Path state holder for graphics.
 *
 * @ignore
 * @cat display
 */
export class GraphicsPath {
	public bounds: any;
	public points: any;
	public maxLineWidth: any;
	public lastLineWidth: any;
	public lineMul: any;

  /**
   * Creates new instance of GraphicsPath
   */
  constructor() {
    /** @type {Recblack-engine~tangle|null} */
    this.bounds = null;

    /** @type {Array<number>} */
    this.points = [];

    /** @type {number} */
    this.maxLineWidth = 0;

    /** @type {number} */
    this.lastLineWidth = 0;

    /** @type {number} */
    this.lineMul = 0.5;
  }
}
