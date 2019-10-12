/**
 * created by eaTong at 2019/10/12
 */

function extractDescription(content) {

  // remove image
  content = content.replace(/!\[[^(]*\]\([^)]+\)/g, '');
  // remove operator
  content = content.replace(/[-`#$%^&*()_<>?:"|\/;'[\]↵]|\n|\r|\s/g, '');
  return content;
}

module.exports = {extractDescription};
