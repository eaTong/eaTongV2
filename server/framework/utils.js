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

function getCoverImage(content) {
  const imageCovert = content.match(/!\[.*\].*\)\s/);
  if(imageCovert){
    return imageCovert[0].replace(/.*\(/,'').replace(/\)\s?$/,'');
  }
  return null;
}

module.exports = {extractDescription,getCoverImage};
