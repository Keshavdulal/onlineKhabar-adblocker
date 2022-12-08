const origin = window?.location?.origin;

const conditions = {
  onlineKhabar: ["div[class*='roadblock']", "div[class*='-ad']"],
  ekantipur: [
    "a[class*='static-sponsor']",
    "div[class*='ekans-wrapper']",
    "div[class*='daraz-sponser']",
  ],
  setoPati: ["div[class*='full-bigyaapan']", "div[class*='top-bigyaapan']"],
  hamroPatro: ["a[href*='https://creative.hamropatro.com/dest/']"],
  himalayanTimes: ["div[class*='fc-dialog-container']"],
  ratoPati: ["a"],
  kathmanduPost: [
    "img[src^='https://assets-cdn.kathmandupost.com/uploads/source/ads/']", // Self hosted ads
    "ins[class*='adsbygoogle']" // Google Ads
  ],
  nagarikNews: [
    "div[class*='ads']",
    "div[class*='alert-dismissible']"
  ]
};

const blockAdsOn = (conditionsArray, domainFilter = "") => {
  // Gaurav's Idea - https://stackoverflow.com/a/34001943/3556531
  // get concatenated string to run with querySelectorAll
  const genericConditionString = conditionsArray.reduce(
    (i, acc) => acc + ", " + i
  );

  // console.log(`Generated blocking condtion string - ${genericConditionString}`);

  document.querySelectorAll(genericConditionString).forEach((i) => {
    if (domainFilter) {
      const regexString = `^((?!${domainFilter}).)*$`;
      const regex = new RegExp(regexString);

      if (i.href.match(regex)) {
        // console.log(`regex block - ${i.href}`);
        i.style.setProperty("display", "none", "important");
      }
    } else {
      // console.log(`blocking ${i} on ${origin}`, i);
      i.style.setProperty("display", "none", "important");
    }
  });
};

switch (origin) {
  case "https://www.onlineKhabar.com/":
  case "https://english.onlinekhabar.com/":
    blockAdsOn(conditions?.onlineKhabar);
    break;

  case "https://www.setopati.com":
  case "https://en.setopati.com/":
    blockAdsOn(conditions?.setoPati);
    break;

  case "https://ekantipur.com/":
    blockAdsOn(conditions?.ekantipur);
    break;

  case "https://www.hamropatro.com":
  case "https://english.hamropatro.com":
    blockAdsOn(conditions?.hamroPatro);
    break;

  case "https://thehimalayantimes.com":
    // document.readyState==='complete'
    blockAdsOn(conditions?.himalayanTimes);
    break;

  case "https://ratopati.com":
    blockAdsOn(conditions?.ratoPati, "ratopati");
    break;

  case "https://kathmandupost.com/":
    blockAdsOn(conditions?.kathmanduPost,);
    break;

  case "https://nagariknews.nagariknetwork.com/":
    blockAdsOn(conditions?.nagarikNews,);
    break;

  default:
    break;
}
