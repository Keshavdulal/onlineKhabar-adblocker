const wlo: String = window?.location?.origin
console.log(`Nepali Adblocker Loaded on - ${wlo}`)

type DomainFilters = '' | 'ratopati'

interface ConditionsProps {
  onlineKhabar: String[]
  // onlineKhabar: NodeListOf<HTMLElement>[]
  ekantipur: String[]
  setoPati: String[]
  hamroPatro: String[]
  himalayanTimes: String[]
  ratoPati: String[]
  kathmanduPost: String[]
  nagarikNews: String[]
}

const conditions: ConditionsProps = {
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
    "img[src^='https://assets-cdn.kathmandupost.com/uploads/source/ads/']", // Self hosted ads
    "ins[class*='adsbygoogle']", // Google Ads
  ],
  nagarikNews: ["div[class*='ads']", "div[class*='alert-dismissible']"],
}

const blockAdsOn = (conditionsArray: String[], domainFilter?: DomainFilters): void => {
  // Gaurav's Idea - https://stackoverflow.com/a/34001943/3556531
  // get concatenated string to run with querySelectorAll
  // console.log("Inside blockAdsOn")
  console.log(conditionsArray)

  // TODO: Remove this
  const genericConditionString: any = conditionsArray.reduce((acc, i) => acc + ', ' + i, '')

  console.log(`Generated blocking condition string - ${genericConditionString}`)

  // TODO: fix screaming TS compiler
  document.querySelectorAll(genericConditionString).forEach(i => {
    if (domainFilter) {
      const regexString = `^((?!${domainFilter}).)*$`
      const regex = new RegExp(regexString)

      // TODO: fix screaming TS compiler
      if (i.href.match(regex)) {
        // console.log(`regex block - ${i.href}`);
        i.style.setProperty('display', 'none', 'important')
      }

      return
    }

    // console.log(`blocking ${i} on ${wlo}`, i);
    i.style.setProperty('display', 'none', 'important')
  })
}

switch (wlo) {
  case 'https://www.onlinekhabar.com':
  case 'https://english.onlinekhabar.com':
    blockAdsOn(conditions?.onlineKhabar)
    break

  case 'https://www.setopati.com':
  case 'https://en.setopati.com':
    blockAdsOn(conditions?.setoPati)
    break

  case 'https://ekantipur.com':
    blockAdsOn(conditions?.ekantipur)
    break

  case 'https://www.hamropatro.com':
  case 'https://english.hamropatro.com':
    blockAdsOn(conditions?.hamroPatro)
    break

  case 'https://thehimalayantimes.com':
    // document.readyState==='complete'
    blockAdsOn(conditions?.himalayanTimes)
    break

  case 'https://ratopati.com':
    blockAdsOn(conditions?.ratoPati, 'ratopati')
    break

  case 'https://kathmandupost.com':
    blockAdsOn(conditions?.kathmanduPost)
    break

  case 'https://nagariknews.nagariknetwork.com':
    blockAdsOn(conditions?.nagarikNews)
    break

  default:
    break
}
