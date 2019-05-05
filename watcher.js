var localStorageKey = 'flatwatch';
var secondsBeforeRefresh = 120;

var offerElementSelectors = {
    'www.leboncoin.fr': 'li[itemtype="http://schema.org/Offer"]',
    'www.seloger.com': '.liste_resultat > div',
};

function notify(currentDomain) {
    browser.runtime.sendMessage({ title: 'New offer', content: 'On ' + currentDomain, id: window.location.href });
}

function watchOffers() {
    var currentDomain = window.location.hostname;

    var lastOfferElement = document.querySelector(offerElementSelectors[currentDomain]);

    if (!lastOfferElement) {
        return;
    }

    var href = document.querySelector(offerElementSelectors[currentDomain] + ' a').href;

    // Only for the exact same search
    var localStorageKeyForDomain = 'flatwatch_' + window.location.href;
    var gettingLastItem = browser.storage.local.get(localStorageKeyForDomain);

    gettingLastItem.then(function(lastItem) {
        var toSetInStorage = {};

        if (lastItem[localStorageKeyForDomain] === href) {
            return;
        }

        toSetInStorage[localStorageKeyForDomain] = href;

        browser.storage.local.set(toSetInStorage).then(function(value) {
            notify(currentDomain);
        });
    });
}

function refresh() {
    window.location.reload(true);
}

setTimeout(refresh, secondsBeforeRefresh * 1000);

watchOffers();
