var CBI_VERSION = 'r963((1642652702 - 1406844000))';
var CBI_BUILD_DATE = '2022-01-20';

function cbiGetVersion(withBuildDate) {
    toReturn = "Casio Basic Web Interpreter "+ CBI_VERSION;
    if (withBuildDate) {
      toReturn += ' (built: '+CBI_BUILD_DATE+')';
    }
    return toReturn;
}
