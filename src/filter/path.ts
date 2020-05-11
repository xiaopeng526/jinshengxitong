//find prop by path
/**
 *
 * @param {*} o target object
 * @param {Array<any>} p prop array
 * @returns
 */
function path(o: any, p: Array<any>) {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
}

export default path;
