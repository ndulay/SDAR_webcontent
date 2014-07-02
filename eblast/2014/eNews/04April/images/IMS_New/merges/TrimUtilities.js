// Trim Utilities
// MR 9/22/01

//******************************************************************************************//
// FUNCTION:																				//
//	TrimSpaces																				//
//																							//
// PURPOSE:																					//
//	Remove spaces from the left and right side of a string									//
//																							//
// INPUT:																					//
//	strString:(string)- string to be trimmed												//
//																							//
// OUTPUT:																					//
//	Trimed string																			//
//																							//
// NOTES:																					//
//	Called Functions - LTrimSpaces, RTrimSpaces												//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function TrimSpaces(strString)
{
	return LTrimSpaces(RTrimSpaces(strString))
}

//******************************************************************************************//
// FUNCTION:																				//
//	RTrimSpaces																				//
//																							//
// PURPOSE:																					//
//	Remove spaces from the right side of a string											//
//																							//
// INPUT:																					//
//	strString:(string)- string to be trimmed												//
//																							//
// OUTPUT:																					//
//	Trimed string																			//
//																							//
// NOTES:																					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function RTrimSpaces(strString)
{
	return strString.replace(/\s*$/, "");
}

//******************************************************************************************//
// FUNCTION:																				//
//	LTrimSpaces																				//
//																							//
// PURPOSE:																					//
//	Remove spaces from the left side of a string											//
//																							//
// INPUT:																					//
//	strString:(string)- string to be trimmed												//
//																							//
// OUTPUT:																					//
//	Trimed string																			//
//																							//
// NOTES:																					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function LTrimSpaces(strString)
{
	return strString.replace(/^\s*/, "");
}

//******************************************************************************************//
// FUNCTION:																				//
//	RemoveSpaces																			//
//																							//
// PURPOSE:																					//
//	Remove all spaces from a string															//
//																							//
// INPUT:																					//
//	strString:(string)- string to be modified												//
//																							//
// OUTPUT:																					//
//	Modified string																			//
//																							//
// NOTES:																					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function RemoveSpaces(strString)
{
	return strString.replace(/\s*/g, "");
}

//******************************************************************************************//
// FUNCTION:																				//
//	autoTab																					//
//																							//
// PURPOSE:																					//
//	Make the cursor auto jump to new field when field is full								//
//																							//
// INPUT:																					//
//	current object, Next Object																//
//																							//
// OUTPUT:																					//
//	None																					//
//																							//
// Example:																					//
//	autoTab(this, document.InputForm.Phone_Number)											//
//																							//
// Thomas Gluckman - 10/13/03																//
//******************************************************************************************//
function autoTab(currentPos,NextPos)
{
	//alert (window.event.keyCode);
	// KeyCode 9 = Tab Key
	// Keycode 16 = Shift Key
	if (currentPos.value.length == currentPos.getAttribute("maxlength") && window.event.keyCode != 9 && window.event.keyCode != 16)
	{
		NextPos.focus();
		NextPos.select();
	}
}

function replaceCommas(strString, strSeparator)
{
	if (strSeparator == null)
	{
		strSeparator = '|'
	}
	var strTemp = "";

	for(var i = 0; i < strString.length; i++)
	{
		if(strString.substr(i, 1) != ",")
		{
			strTemp = strTemp + strString.substr(i,1);
		}
		else
		{
			strTemp = strTemp + strSeparator;
		}

	}

	return strTemp;
}