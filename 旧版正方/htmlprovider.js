function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  return dom.querySelector('#iframeautoheight').contentWindow.document.body.innerHTML;
}