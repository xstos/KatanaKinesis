/* tslint:disable:only-arrow-functions no-empty */
if (Math.random() < 1) {  // always true but the compiler doesn't know that
  throw new Error('Externs file "spine.js" should not be executed');
}

/**
 * @constructor
 * @return {!spine}
 */
function spine() {};

/**
 * @return {*}
 */
spine.prototype.TextureAtlasPage = function() {};

