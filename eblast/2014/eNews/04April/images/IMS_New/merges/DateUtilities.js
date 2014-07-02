// Date Utilities
// MR 6/9/02

//******************************************************************************************//
// FUNCTION:																				//
//	isValidDate																				//
//																							//
// PURPOSE:																					//
//	Checks for the following valid date formats:											//
//		MM/DD/YY, MM/DD/YYYY, MM-DD-YY, MM-DD-YYYY, MMDDYY, MMDDYYYY						//
//																							//
// INPUT:																					//
//	strDate:(string)- string to validate													//
//	strReturnType:(string)- (Optional). specifies type of value returned					//
//		'B' = true/false (Default)															//
//		'D' = Date Object/null																//
//																							//
// OUTPUT:																					//
//	See INPUT:strReturnType for specifics													//
//																							//
// NOTES:																					//
//	Two digit years(YY):																	//
//		If YY is greater than 50 then the previous century is used							//
//		If YY is less than or equal to 50 then the current century is used					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function isValidDate(strDate, strReturnType)
{
	// Create Date object for current date (Date constructor defaults to current date)
	var dtCurrentDate = new Date();

	// Array for Month, Day, Year values
	var aMonthDayYear = new Array(3);

	// Initialize Regular Expression objects with date format patterns
	var reDatePatternSeparators = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
	var reDatePatternMMDDYYYY = /^\d{8}$/;
	var reDatePatternMMDDYY = /^\d{6}$/;

	// Valid date separators
	var strSlashSeparator = "/";
	var strDashSeparator = "-";
	var strDateSeparator = "";

	// Parse Date
	if(reDatePatternSeparators.test(strDate))
	{
		strDateSeparator = strDate.indexOf(strDashSeparator) != -1 ? strDashSeparator : strSlashSeparator
		aMonthDayYear = strDate.split(strDateSeparator);
	}
	else if(reDatePatternMMDDYYYY.test(strDate) ||
			reDatePatternMMDDYY.test(strDate))
	{
		aMonthDayYear[0] = strDate.substr(0, 2);
		aMonthDayYear[1] = strDate.substr(2, 2);
		aMonthDayYear[2] = strDate.substr(4);
	}
	else
	{
		return strReturnType = "D" ? null : false;
	}

	// Valid Month and Day values
	if((parseInt(aMonthDayYear[0], 10) >= 1 && parseInt(aMonthDayYear[0], 10) <= 12) &&
		(parseInt(aMonthDayYear[1], 10) >= 1 || parseInt(aMonthDayYear[0], 10) <= 31))
	{
		// Convert two digit year to four digit year (adjust century if needed)
		if(aMonthDayYear[2].length == 2)
		{
			aMonthDayYear[2] = dtCurrentDate.getFullYear().toString().substr(0,2) + aMonthDayYear[2];
			if(parseInt(aMonthDayYear[2].substr(2), 10) > 50)
				aMonthDayYear[2] = parseInt(aMonthDayYear[2],10) - 100;
		}

		// Valid Day for February
		if(parseInt(aMonthDayYear[0], 10) == 2)
		{
			if(parseInt(aMonthDayYear[1], 10) > 29 ||
				(!isLeapYear(aMonthDayYear[2]) && parseInt(aMonthDayYear[1], 10) > 28))
			{
				return strReturnType = "D" ? null : false;
			}
		}// Valid Day for April, June, September, November
		else if(parseInt(aMonthDayYear[0], 10) == 4 ||
				parseInt(aMonthDayYear[0], 10) == 6 ||
				parseInt(aMonthDayYear[0], 10) == 9 ||
				parseInt(aMonthDayYear[0], 10) == 11)
		{
			if(parseInt(aMonthDayYear[1], 10) > 30)
			{
				return strReturnType = "D" ? null : false;
			}
		}
	}
	else
	{
		return strReturnType = "D" ? null : false;
	}

	return strReturnType = "D" ? new Date(aMonthDayYear[0] + "/" + aMonthDayYear[1] + "/" + aMonthDayYear[2]) : true;
}

//******************************************************************************************//
// FUNCTION:																				//
//	isLeapYear																				//
//																							//
// PURPOSE:																					//
//	Determine if year value is a leap year													//
//																							//
// INPUT:																					//
//	intYear:(integer)- year to validate														//
//																							//
// OUTPUT:																					//
//	Boolean value true/false																//
//																							//
// NOTES:																					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function isLeapYear(intYear)
{
	return intYear % 400 == 0 ||(intYear % 4 == 0 && intYear % 100 != 0) ? true : false
}

//******************************************************************************************//
// FUNCTION:																				//
//	dateToString																			//
//																							//
// PURPOSE:																					//
//	Return a string in the form MM/DD/YY													//
//																							//
// INPUT:																					//
//	dtDate:(Date object)- date object to convert											//
//																							//
// OUTPUT:																					//
//	String in the form MM/DD/YY																//
//																							//
// NOTES:																					//
//																							//
// Michael Redding - 6/9/02																	//
//******************************************************************************************//
function dateToString(dtDate)
{
	return "0".substr((dtDate.getMonth() + 1).toString().length - 1) + (dtDate.getMonth() + 1) + "/" +
			"0".substr(dtDate.getDate().toString().length - 1) + dtDate.getDate() + "/" +
			dtDate.getYear().toString().substr(2);
}


// Validate task start and end time
function IsValidTime(timeStr)
{
	if (TrimSpaces(timeStr) == ""){return true} // allow blank values for time
	
	var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;
	var matchArray = timeStr.match(timePat);
	if (matchArray == null)
	{
		alert("Time is not in a valid format (hh:mm).");
		return false;
	}
	hour = matchArray[1];
	minute = matchArray[2];
	second = matchArray[4];
	ampm = matchArray[6];
	if (second=="") { second = null; }
	if (ampm=="") { ampm = null }
	if (hour < 0 || hour > 12)
	{
		alert("Hour must be between 1 and 12.");
		return false;
	}
	if (minute<0 || minute > 59)
	{
		alert ("Minute must be between 0 and 59.");
		return false;
	}
	if (second != null && (second < 0 || second > 59))
	{
		alert ("Second must be between 0 and 59.");
		return false;
	}
	return true;
}
function IsTimeStartLessEnd(timeStrStart,timeStrEnd)
// This function will compare two time fields and return an error message if Start is more than end
// If any of the fields are blank, no error is returned
{
	if (TrimSpaces(timeStrStart)=='' || TrimSpaces(timeStrEnd)=='')
	{
		return true
	}
	if (timeStrStart > timeStrEnd)
	{
		alert ("Start time must be prior to end time.");
		return false
	}
	return true;
}	
function setMinutes(oHour,sMinuteFieldName)
// This function will Disable and set the Minute Field to Blank when Hour field is Blank
{
	if (oHour.selectedIndex == 0)
		{
			document.getElementsByName(sMinuteFieldName)[0].selectedIndex = 0
			document.getElementsByName(sMinuteFieldName)[0].disabled = true
		}
	else 
		{
			document.getElementsByName(sMinuteFieldName)[0].disabled = false
		}
}
