var _a;
var wlo = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin;
console.log("Nepali Adblocker Loaded on - ".concat(wlo));
var conditions = {
    onlineKhabar: ["div[class*='roadblock']", "div[class*='-ad']"],
    ekantipur: [
        "a[class*='static-sponsor']",
        "div[class*='ekans-wrapper']",
        "div[class*='daraz-sponser']",
    ],
    setoPati: ["div[class*='full-bigyaapan']", "div[class*='top-bigyaapan']"],
    hamroPatro: ["a[href*='https://creative.hamropatro.com/dest/']"],
    himalayanTimes: [
        "div[class*='fc-dialog-container']",
        "div[class*='full_ad']",
        "ins[class*='adsbygoogle']",
        "div[class*='ht-taboola-feed']",
        "div[class*='TABOULA']",
        "div[class*='ht-vertical-ad-sidebar']",
    ],
    ratoPati: ['a'],
    kathmanduPost: [
        "img[src^='https://assets-cdn.kathmandupost.com/uploads/source/ads/']",
        "ins[class*='adsbygoogle']", // Google Ads
    ],
    nagarikNews: ["div[class*='ads']", "div[class*='alert-dismissible']"]
};
var blockAdsOn = function (conditionsArray, domainFilter) {
    if (domainFilter === void 0) { domainFilter = ''; }
    // Gaurav's Idea - https://stackoverflow.com/a/34001943/3556531
    // get concatenated string to run with querySelectorAll
    // console.log("Inside blockAdsOn")
    console.log(conditionsArray);
    var genericConditionString = conditionsArray.reduce(function (i, acc) { return acc + ', ' + i; });
    console.log("Generated blocking condition string - ".concat(genericConditionString));
    document.querySelectorAll(genericConditionString).forEach(function (i) {
        if (domainFilter) {
            var regexString = "^((?!".concat(domainFilter, ").)*$");
            var regex = new RegExp(regexString);
            if (i.href.match(regex)) {
                // console.log(`regex block - ${i.href}`);
                i.style.setProperty('display', 'none', 'important');
            }
        }
        else {
            // console.log(`blocking ${i} on ${wlo}`, i);
            i.style.setProperty('display', 'none', 'important');
        }
    });
};
switch (wlo) {
    case 'https://www.onlinekhabar.com':
    case 'https://english.onlinekhabar.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.onlineKhabar);
        break;
    case 'https://www.setopati.com':
    case 'https://en.setopati.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.setoPati);
        break;
    case 'https://ekantipur.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.ekantipur);
        break;
    case 'https://www.hamropatro.com':
    case 'https://english.hamropatro.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.hamroPatro);
        break;
    case 'https://thehimalayantimes.com':
        // document.readyState==='complete'
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.himalayanTimes);
        break;
    case 'https://ratopati.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.ratoPati, 'ratopati');
        break;
    case 'https://kathmandupost.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.kathmanduPost);
        break;
    case 'https://nagariknews.nagariknetwork.com':
        blockAdsOn(conditions === null || conditions === void 0 ? void 0 : conditions.nagarikNews);
        break;
    default:
        break;
}
//# sourceMappingURL=index.js.map