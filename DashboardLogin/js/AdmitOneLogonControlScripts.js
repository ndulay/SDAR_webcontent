/* * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                 */
/*   THIS SCRIPT IS INTENDED FOR USE IN A LOCAL    */ 
/*   LOGON-CONTROL FAILOVER SCENARIO. IT SHOULD    */
/*   BE CUSTOMIZED WHERE APPROPRIATE.              */
/*                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * */


/**** CHANGE THESE STRINGS to match the id="..." attributes 
      of the <input...> fields on the parent login page. ****/
var parentUsernameFieldID = "j_username",
    parentPasswordFieldID = "j_password",
    parentThirdFieldID = "j_logintype",
    parentTransactionidFieldID = "j_transactionid",
    parentLogonButtonID = "j_submitHidden";

/**** These variables should generally NOT be modified. ****/
var parentUsernameElement = null,
    parentPasswordElement = null,
    parentThirdElement = null,
    parentTransactionidElement = null,
    parentLogonButtonElement = null;
    
var scoutLogonButtonID = 'loginbutton';

var scoutField1Element = null,
    scoutField2Element = null,
    scoutField3Element = null,
    scoutLogonButtonElement = null;

// send a null transaction id so clareity does not submit it for local
var transactionID = "";

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

handleIframeOnload();

function hasParent()
{
  return parent.document.URL != document.URL;
}

function handleIframeOnload()
{
  if (hasParent() && parent.handleIframeOnload)
  {
    parent.handleIframeOnload();
  }
}

function aoSetFocus()
{
  if (!scoutField1Element)
  {
    scoutField1Element = document.getElementById(scoutInputField1ID);
  }

  scoutField1Element.focus();
}

function disableLoginButton()
{
  if (!scoutLogonButtonElement)
  {
    scoutLogonButtonElement = document.getElementById(scoutLogonButtonID);
  }

  if (scoutLogonButtonElement)
  {
    scoutLogonButtonElement.disabled = true;
  }
}

function enableLoginButton()
{
  if (!scoutLogonButtonElement)
  {
    scoutLogonButtonElement = document.getElementById(scoutLogonButtonID);
  }

  if (scoutLogonButtonElement)
  {
    scoutLogonButtonElement.disabled = false;
  }
}

function OnAOPassiveLogon(field1, field2, field3)
{
  disableAOClient();
  disableLoginButton();

  field1 = field1.replace("<", "&lt;").replace(">", "&gt;");
  field2 = field2.replace("<", "&lt;").replace(">", "&gt;");
  field3 = field3.replace("<", "&lt;").replace(">", "&gt;");

  parentUsernameElement = parent.document.getElementById(parentUsernameFieldID);
  parentPasswordElement = parent.document.getElementById(parentPasswordFieldID);
  parentTransactionidElement = parent.document.getElementById(parentTransactionidFieldID);
  parentLogonButtonElement = parent.document.getElementById(parentLogonButtonID);

  parentUsernameElement.value = field1;
  parentPasswordElement.value = field2;
  parentTransactionidElement.value = transactionID;

  if (parentThirdFieldID && parentThirdFieldID !== "" && field3 && field3 !== "")
  {
    parentThirdElement = parent.document.getElementById(parentThirdFieldID);

    if (parentThirdElement)
    {
      parentThirdElement.value = field3;
    }
  }

  parentLogonButtonElement.click();

  return false;
}

function htmlLogon()
{
  var returnVal = null;

  disableLoginButton();

  if (!scoutField1Element)
  {
    scoutField1Element = document.getElementById(scoutInputField1ID);
  }

  if (!scoutField2Element)
  {
    scoutField2Element = document.getElementById(scoutInputField2ID);
  }

  if (scoutInputField3ID && scoutInputField3ID !== "")
  {
    if (!scoutField3Element)
    {
      scoutField3Element = document.getElementById(scoutInputField3ID);
    }

    if (scoutField3Element)
    {
      returnVal = OnAOPassiveLogon(scoutField1Element.value, scoutField2Element.value, scoutField3Element.value);
    }
    else
    {
      returnVal = OnAOPassiveLogon(scoutField1Element.value, scoutField2Element.value);
    }
  }
  else
  {
    returnVal = OnAOPassiveLogon(scoutField1Element.value, scoutField2Element.value);
  }

  return returnVal;
}

function disableAOClient(targetWindow)
{
}

function enableAOClient(targetWindow)
{
}

function showLogon()
{
  document.getElementById('htmllogin').style.display = "";
}

function hideLogon()
{
  document.getElementById('htmllogin').style.display = "none";
}

function checkEnter(e)
{
  var characterCode;

  characterCode = e.keyCode;

  if (characterCode == 13)
  { //if generated character code is equal to ascii 13 (if enter key)
    htmlLogon();
    return false;
  }
}

// onload function
function genericOnload()
{
  if (parent && parent.setAOFrameProperties)
  {
    parent.setAOFrameProperties(clientHeight, clientWidth);
  }
  
  aoSetFocus();
}

// This function registers an event that will fire when the page has completed loading, and will not interfere with other onload events already registered.
function setupGenericOnload()
{
  if (typeof window.addEventListener != 'undefined') { window.addEventListener('load', genericOnload, false); } //.. gecko, safari, konqueror and standard
  else if (typeof document.addEventListener != 'undefined') { document.addEventListener('load', genericOnload, false); } //.. opera?
  else if (typeof window.attachEvent != 'undefined') { window.attachEvent('onload', genericOnload); } //.. older? win/ie
}

setupGenericOnload();
      