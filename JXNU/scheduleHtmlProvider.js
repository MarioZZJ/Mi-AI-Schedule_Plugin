function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    return dom.querySelector('#_ctl0').outerHTML.replace(/\\/g,"%5c")
}