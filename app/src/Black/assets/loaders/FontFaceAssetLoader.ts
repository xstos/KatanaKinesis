import { AssetLoader } from "./AssetLoader";
import { FontMetrics } from "../../display/text/FontMetrics";

/**
 * Responsible for loading local or Google fonts.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
export class FontFaceAssetLoader extends AssetLoader {
	public mName: any;
	public mTestingFontName: any;
	public mIsLocal: any;
	public mTestingString: any;
	public mCheckDelay: any;
	public mTestingElement: any;
	public metrics: any;
	public mLoaderElement: any;
	public mDefaultFontWidth: any;
	public mTimeoutHandle: any;

  /**
   * Creates new FontFaceAssetLoader instance.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   */
  constructor(name, url, isLocal) {
    super(url);

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {string}
     */
    this.mTestingFontName = 'Courier New';

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLocal = isLocal;

    /**
     * @private
     * @type {string}
     */
    this.mTestingString = '~ GHBDTN,.#$Mlck';

    /**
     * @private
     * @type {number}
     */
    this.mCheckDelay = 50;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mTestingElement = this.__getTestingElement();

    /**
     * @private
     * @type {black-engine~FontMetrics|null}
     */
    this.metrics = null;

    /**
     * @private
     * @type {Element}
     */
    this.mLoaderElement = this.__getLoaderElement(this.mIsLocal);
    this.mTestingElement.style.fontFamily = this.mTestingFontName;

    /**
     * @private
     * @type {number}
     */
    this.mDefaultFontWidth = this.mTestingElement.offsetWidth;
    this.mTestingElement.style.fontFamily = '"' + name + '",' + this.mTestingFontName;

    /**
     * @private
     * @type {number}
     */
    this.mTimeoutHandle = -1;


  }

  load() {
    if (this.mIsLocal)
      this.mLoaderElement.innerHTML += (`\n @font-face {font-family: "${this.mName}"; src: url(${this.mUrl});}`);
    else
      this.mLoaderElement.href = this.mUrl;

    this.__checkLoadingStatus();
  }

  onAbort() {
    clearTimeout(this.mTimeoutHandle);
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);
  }

  /**
   * @ignore
   * @private
   * @return {Element}
   */
  __getLoaderElement(local) {
    const loaderElement = document.createElement(local ? 'style' : 'link');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    // @ts-ignore
    loaderElement.rel = 'stylesheet';
    loaderElement.onerror = () => { this.onError(); };
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
    return loaderElement;
  }

  /**
   * @ignore
   * @private
   * @return {HTMLElement}
   */
  __getTestingElement() {
    const testingElement = /** @type {HTMLElement} */ (document.createElement('span'));
    testingElement.style.position = 'absolute';
    testingElement.style.top = '-9999px';
    testingElement.style.left = '-9999px';
    testingElement.style.visibility = 'hidden';
    testingElement.style.fontSize = '250px';
    testingElement.innerHTML = this.mTestingString;
    document.body.appendChild(testingElement);

    return testingElement;
  }

  /**
   * @private
   * @return {void}
   */
  __checkLoadingStatus() {
    if (this.mDefaultFontWidth === this.mTestingElement.offsetWidth) {
      this.mTimeoutHandle = setTimeout(this.__checkLoadingStatus.bind(this), this.mCheckDelay);
      return;
    }

    this.metrics = FontMetrics.get(this.mName);
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);

    this.onLoad();
  }
}