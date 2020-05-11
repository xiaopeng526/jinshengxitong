/**
 * 将换行符变为br
 *
 * @param {string} o
 * @param {string} s
 * @returns
 */
function linebreak(o: string = "") {
  return o.replace(/\n/g, "<br/>");
}

export default linebreak;
