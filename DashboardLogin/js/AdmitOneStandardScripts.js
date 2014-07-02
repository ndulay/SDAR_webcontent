// set document.domain to nth-level domain ( specified by AOCrossSiteDomainDepth )for x-site scripting workaround
function setDocumentDomain()
{
  try
  {
    if (!AOCrossSiteDomainDepth || (AOCrossSiteDomainDepth && AOCrossSiteDomainDepth < 2))
    {
      if (AOCrossSiteDomainDepth === 0)
      {
        return; // do not change the domain if depth is 0 (=off)
      }

      AOCrossSiteDomainDepth = 2;
    }
  }
  catch (eDomainDepth)
  {
    AOCrossSiteDomainDepth = 2;
  }

  var hostPartsArray = location.hostname.split("."),
          hostPartsLength = hostPartsArray.length,
          newDomain = "";

  if (hostPartsLength > 1 && hostPartsArray[hostPartsLength - 2] && hostPartsArray[hostPartsLength - 1] &&
            hostPartsArray[hostPartsLength - 2] !== "localhost" && hostPartsArray[hostPartsLength - 2] !== "localhost")
  {
    for (var i = AOCrossSiteDomainDepth; i > 1; i--)
    {
      newDomain += hostPartsArray[hostPartsLength - i];
      newDomain += ".";
    }

    newDomain += hostPartsArray[hostPartsLength - 1];
    document.domain = newDomain;
  }
}

setDocumentDomain();

var logonIframe = null,
    logonComponentTimeoutObj = null,
    logonIframeSrcUrl = null,
    logonComponentWaitMSecs = null;

function loadLocalLogonComponent()
{
  if (logonIframe && logonIframe.src != localLogonIframeSrcUrl)
  {
    logonIframe.src = localLogonIframeSrcUrl;
  }

  handleIframeOnload();
}

// try to load the hosted logon controls page.
function loadHostedLogonComponent()
{
  if (logonComponentTimeoutObj) { return; }

  if (logonIframe)
  {
    var hostedRegExpression = new RegExp(scoutKDPageUrl).ignoreCase,
        localRegExpression = new RegExp(localLogonIframeSrcUrl).ignoreCase;

    if (hostedRegExpression.exec(logonIframe.src) > 0 && localRegExpression.exec(logonIframe.src) > 0) { return; }
  }

  var frameElement = document.createElement('iframe');
  frameElement.setAttribute("id", "aoframe");
  frameElement.setAttribute("frameBorder", "0");
  frameElement.setAttribute("scrolling", "no");
  frameElement.setAttribute("src", scoutKDPageUrl);
  frameElement.setAttribute("allowTransparency", "true");

  // start new code per Kris

  //IE6 and IE7 break when using above syntax to set "style"
  //use browser sniffing to determine if IE or Opera
  var isOpera = false, isIE = false;
  if(typeof(window.opera) != 'undefined') {
  	isOpera = true;
  	}
  if(!isOpera && (navigator.userAgent.indexOf('MSIE') != -1)) {
  	isIE = true;
  	}
  
  var styleData = 'width: 210px; height: 60px;';
  
  if(!isIE){
    //use the correct DOM Method
    frameElement.setAttribute('style', styleData);
  } else {
    //use the .cssText hack
    frameElement.style.setAttribute('cssText', styleData);
  }
  
  // end new code per Kris

  document.getElementById(AOFrameContainerID).appendChild(frameElement);

  logonIframe = document.getElementById("aoframe");

  if (secondsToWaitForRemoteLogonControl && secondsToWaitForRemoteLogonControl >= 0)
  {
    logonComponentWaitMSecs = secondsToWaitForRemoteLogonControl * 1000; // set wait-time.
  }
  else
  {
    logonComponentWaitMSecs = 5000; // default to 5 seconds.
  }

  // wait [n] seconds before failing over to the local component.
  logonComponentTimeoutObj = window.setTimeout(loadLocalLogonComponent, logonComponentWaitMSecs);
}

// will be called by the iframe page when it has finished loading.
function handleIframeOnload()
{
  logonIframe = document.getElementById("aoframe");

  if (logonComponentTimeoutObj)
  {
    window.clearTimeout(logonComponentTimeoutObj);
    logonComponentTimeoutObj = null;
  }

  logonIframe.style.display = "";
}

function setAOFrameProperties(clientHeight, clientWidth)
{
  logonIframe.style.height = clientHeight ? (clientHeight + 0) + "px" : (logonIframe.contentWindow.document.body.scrollHeight + 0) + "px";
  logonIframe.style.width = clientWidth ? (clientWidth + 0) + "px" : (logonIframe.contentWindow.document.body.scrollWidth + 0) + "px";
  logonIframe.style.float = "none";
  logonIframe.style.overflow = "hidden";
}

function postScoutData()
{
//  document.getElementById("login").value = "Please Wait";
//  document.getElementById("login").disabled = true;
  logonIframe.contentWindow.document.getElementById('loginbutton').click();
}

// onload function
function genericOnload()
{
  loadHostedLogonComponent();
}

// This function registers an event that will fire when the page has completed loading, and will not interfere with other onload events already registered.
function setupGenericOnload()
{
  if (typeof window.addEventListener != 'undefined') { window.addEventListener('load', genericOnload, false); } //.. gecko, safari, konqueror and standard
  else if (typeof document.addEventListener != 'undefined') { document.addEventListener('load', genericOnload, false); } //.. opera?
  else if (typeof window.attachEvent != 'undefined') { window.attachEvent('onload', genericOnload); } //.. older? win/ie
}

setupGenericOnload();


