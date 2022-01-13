var CBI_VERSION = 'r1225((1642113571 - 1406844000))';
var CBI_BUILD_DATE = '2022-01-13';

function cbiGetVersion(withBuildDate) {
    toReturn = "Casio Basic Web Interpreter "+ CBI_VERSION;
    if (withBuildDate) {
      toReturn += ' (built: '+CBI_BUILD_DATE+')';
    }
    return toReturn;
}
