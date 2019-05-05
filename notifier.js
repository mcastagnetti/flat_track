function notify(params) {
    browser.notifications.create(params.id, {
        type: 'basic',
        title: params.title,
        message: params.content,
    });
}

function handleClick(url) {
    browser.tabs.create({
        url: url,
    });
}

browser.runtime.onMessage.addListener(notify);
browser.notifications.onClicked.addListener(handleClick);
