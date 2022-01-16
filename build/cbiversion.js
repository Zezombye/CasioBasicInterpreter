var CBI_VERSION = 'r551((1642362651 - 1406844000))';
var CBI_BUILD_DATE = '2022-01-16';

function cbiGetVersion(withBuildDate) {
    toReturn = "Casio Basic Web Interpreter "+ CBI_VERSION;
    if (withBuildDate) {
      toReturn += ' (built: '+CBI_BUILD_DATE+')';
    }
    return toReturn;
}
