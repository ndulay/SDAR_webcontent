// CheckEmail.js
//******************************************************************************************//
// FUNCTION:																				//
//	CheckEmail(sEmail,bBlankAllowed,sLabel)													//
//		In above function if 4th parameter is not sent, the field is validated for single	//
//		email address.																		//
//																							//
//	CheckEmail(sEmail,BBlankAllowed,sLabel,sEmailType)										//
//		IF sEmailType is passed as 'M' then the field is validated from multiple emails.	//
//		IF the sEmail contains more then 1 emails seperated by semicolons, the semicolons	//
//		are replaced by comma. This is done because BLAT DLL looks for emails speerated by	//
//		commas.																				//
//	Shridhar Kulkarni - Modified 03/04/2004													//
// PURPOSE:																					//
//	check if field contains a valid email													//
//																							//
//																							//
//																							//
//																							//
//																							//
//******************************************************************************************//

function CheckEmail(sEmail,bBlankAllowed,sLabel,sEmailType,sLabelSuffix)
{
	if (sLabelSuffix == null ) { sLabelSuffix = '' }
	if (bBlankAllowed == null) { bBlankAllowed = true }
	(sLabel == null || sLabel == '') ? sLabel = '' : sLabel = ' for '+sLabel;

	if (sEmail.value.replace(/\s*/g, "")=='')
	{
		if (bBlankAllowed)
		{
			return true
		}
		else
		{
			alert("E-mail address"+sLabel+" cannot be blank"+sLabelSuffix+".")
			return false
		}
	}
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	
	if (sEmailType == null)
	{
		if (!filter.test(sEmail.value))
		{
			alert("Please enter a valid E-mail address"+sLabel+".")
			return false
		}
		return true
	}
	else if (sEmailType == 'M')
	{
//			The following Regular Expression is copied from the above RegExp. The only difference is,
//			filter2 does not include the '^'(Begining of the Input String) and '$'(End of the Input String)
		var filter2=/([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/i

//		If string comtains semicolons, replace semicolons with commas.
		repSemiColon = /\;/g ;
		sEmailTmp = sEmail.value.replace(repSemiColon,",");
		sEmail.value = sEmailTmp;
	
//		Split multiple emails into seperate array elements.
		var EmailArray = new Array(80);
		EmailArray = sEmail.value.split(",");
	
//		Loop for each email and filter out the invalid one.
		for(i=0; i<EmailArray.length; i++)
		{
			if (!filter2.test(EmailArray[i]))
			{
				emailerror = true;
				break;
			}
			else
			{
				emailerror = false;
			}
		}

		if( emailerror == true)
		{
			alert("Please enter a valid E-mail address"+sLabel+".");
		}
		else
		{
			return true;
		}
	} 
	
}
