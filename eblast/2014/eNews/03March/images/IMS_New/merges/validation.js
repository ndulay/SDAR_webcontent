 Validations 
--------------------------------------------------------------------------------
[Toolbox]  [Example]  [Source]  

Source File: Save As...

// ===================================================================
// Author: Matt Kruse <mkruse@netexpress.net>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download. Instead,
// please just point to my URL to ensure the most up-to-date versions
// of the files. Thanks.
// ===================================================================
//-------------------------------------------------------------------
// Trim functions
//   Returns string with whitespace trimmed
//-------------------------------------------------------------------
function LTrim(str) {
	for (var i=0; str.charAt(i)==" "; i++);
	return str.substring(i,str.length);
	}
function RTrim(str) {
	for (var i=str.length-1; str.charAt(i)==" "; i--);
	return str.substring(0,i+1);
	}
function Trim(str) {
	return LTrim(RTrim(str));
	}

//-------------------------------------------------------------------
// isNull(value)
//   Returns true if value is null
//-------------------------------------------------------------------
function isNull(val) {
	if (val == null) { return true; }
	return false;
	}

//-------------------------------------------------------------------
// isBlank(value)
//   Returns true if value only contains spaces
//-------------------------------------------------------------------
function isBlank(val) {
	if (val == null) { return true; }
	for (var i=0; i < val.length; i++) {
		if ((val.charAt(i) != ' ') && (val.charAt(i) != "\t") && (val.charAt(i) != "\n")) { return false; }
		}
	return true;
	}

//-------------------------------------------------------------------
// isInteger(value)
//   Returns true if value contains all digits
//-------------------------------------------------------------------
function isInteger(val) {
	for (var i=0; i < val.length; i++) {
		if (!isDigit(val.charAt(i))) { return false; }
		}
	return true;
	}

//-------------------------------------------------------------------
// isNumeric(value)
//   Returns true if value contains a positive float value
//-------------------------------------------------------------------
function isNumeric(val) {
	var dp = false;
	for (var i=0; i < val.length; i++) {
		if (!isDigit(val.charAt(i))) { 
			if (val.charAt(i) == '.') {
				if (dp == true) { return false; } // already saw a decimal point
				else { dp = true; }
				}
			else {
				return false; 
				}
			}
		}
	return true;
	}
	
//-------------------------------------------------------------------
// isDigit(value)
//   Returns true if value is a 1-character digit
//-------------------------------------------------------------------
function isDigit(num) {
	var string="1234567890";
	if (string.indexOf(num) != -1) {
		return true;
		}
	return false;
	}

//-------------------------------------------------------------------
// isMonth(string)
//   Returns true if string is either a full month name or a month
//   abbreviation.
//-------------------------------------------------------------------
function isMonth(val) {
	val = val+"";
	val = val.toLowerCase();
	if ((val=="jan") || (val=="feb") || (val=="mar") || (val=="apr") || (val=="may") || (val=="jun") ||
	    (val=="jul") || (val=="aug") || (val=="sep") || (val=="oct") || (val=="nov") || (val=="dec")) {
			return true;
			}
	if ((val=="january") || (val=="february") || (val=="march") || (val=="april") || (val=="may") ||
	    (val=="june") || (val=="july") || (val=="august") || (val=="september") || (val=="october") ||
	    (val=="november") || (val=="december")) {
	    	return true;
	    	}
	return false;
	}

//-------------------------------------------------------------------
// isStateAbbr(string)
//   Returns true if string is a US state abbreviation or one of 
//   the canadian provinces
//-------------------------------------------------------------------
function isStateAbbr(val) {
	if (val.length != 2) { return false; }
	val = val+"";
	if (val.charAt(0) == ' ' || val.charAt(1) == ' ') { return false; }
	if (isUSStateAbbr(val)) { return true; }
	if (isCanadianStateAbbr(val)) { return true; }
	return false;
	}
	
//-------------------------------------------------------------------
// isUSStateAbbr(string)
//   Returns true if string is a US State Abbreviation
//-------------------------------------------------------------------
function isUSStateAbbr(val) {
	val = val+"";
        if (val.length != 2) { return false; }
        if (val.charAt(0) == ' ' || val.charAt(1) == ' ') { return false; }
	var string="AK AL AR AZ CA CO CT DC DE FL GA HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA PR RI SC SD TN TX UT VA VI VT WA WI WV WY";
	if (string.indexOf(val.toUpperCase()) != -1) {
		return true;
		}
	return false;
	}

//-------------------------------------------------------------------
// isCanadianStateAbbr(string)
//   Returns true if string is a Canadian State (Province) Abbreviation
//-------------------------------------------------------------------
function isCanadianStateAbbr(val) {
	val = val+"";
        if (val.length != 2) { return false; }
        if (val.charAt(0) == ' ' || val.charAt(1) == ' ') { return false; }
	var string="AB BC EI MB NB NF NS NT NU ON PQ SK YK";
	if (string.indexOf(val.toUpperCase()) != -1) {
		return true;
		}
	return false;
	}

//-------------------------------------------------------------------
// setNullIfBlank(input_object)
//   Sets a form field to "" if it isBlank()
//-------------------------------------------------------------------
function setNullIfBlank(obj) {
	if (isBlank(obj.value)) {
		obj.value = "";
		}
	}

//-------------------------------------------------------------------
// setFieldsToUpperCase(input_object)
//   Sets value of form field toUpperCase() for all fields passed
//-------------------------------------------------------------------
function setFieldsToUpperCase() {
	for (var i=0; i<arguments.length; i++) {
		var obj = arguments[i];
		obj.value = obj.value.toUpperCase();
		}
	}

//-------------------------------------------------------------------
// disallowBlank(input_object[,message[,true]])
//   Checks a form field for a blank value. Optionally alerts if 
//   blank and focuses
//-------------------------------------------------------------------
function disallowBlank(obj) {
	var msg;
	var dofocus;
	if (arguments.length>1) { msg = arguments[1]; }
	if (arguments.length>2) { dofocus = arguments[2]; } else { dofocus=false; }
	if (isBlank(obj.value)) {
		if (!isBlank(msg)) {
			alert(msg);
			}
		if (dofocus) {
			obj.select();
			obj.focus();
			}
		return true;
		}
	return false;
	}

//-------------------------------------------------------------------
// disallowModify(input_object[,message[,true]])
//   Checks a form field for a value different than defaultValue. 
//   Optionally alerts and focuses
//-------------------------------------------------------------------
function disallowModify(obj) {
	var msg;
	var dofocus;
	if (arguments.length>1) { msg = arguments[1]; }
	if (arguments.length>2) { dofocus = arguments[2]; } else { dofocus=false; }
	if (getInputValue(obj) != getInputDefaultValue(obj)) {
		if (!isBlank(msg)) {
			alert(msg);
			}
		if (dofocus) {
			obj.select();
			obj.focus();
			}
		setInputValue(obj,getInputDefaultValue(obj));
		return true;
		}
	return false;
	}

//-------------------------------------------------------------------
// isChanged(input_object)
//   Returns true if input object's state has changed since it was
//   created.
//-------------------------------------------------------------------
function isChanged(obj) {
	if ((typeof obj.type != "string") && (obj.length > 0) && (obj[0] != null) && (obj[0].type=="radio")) {
		for (var i=0; i<obj.length; i++) {
			if (obj[i].checked != obj[i].defaultChecked) { return true; }
			}
		return false;
		}
	if ((obj.type=="text") || (obj.type=="hidden") || (obj.type=="textarea"))
		{ return (obj.value != obj.defaultValue); }
	if (obj.type=="checkbox") {
		return (obj.checked != obj.defaultChecked);
		}
	if (obj.type=="select-one") { 
		if (obj.options.length > 0) {
			var x=0;
			for (var i=0; i<obj.options.length; i++) {
				if (obj.options[i].defaultSelected) { x++; }
				}
			if (x==0 && obj.selectedIndex==0) { return false; }
			for (var i=0; i<obj.options.length; i++) {
				if (obj.options[i].selected != obj.options[i].defaultSelected) {
					return true;
					}
				}
			}
		return false;
		}
	if (obj.type=="select-multiple") {
		if (obj.options.length > 0) {
			for (var i=0; i<obj.options.length; i++) {
				if (obj.options[i].selected != obj.options[i].defaultSelected) {
					return true;
					}
				}
			}
		return false;
		}
	// return false for all other input types (button, image, etc)
	return false;
	}

//-------------------------------------------------------------------
// getInputValue(input_object)
//   Get the value of any form input field
//   Multiple-select fields are returned as comma-separated values
//   (Doesn't support input types: button,file,password,reset,submit)
//-------------------------------------------------------------------
function getInputValue(obj) {
	if ((typeof obj.type != "string") && (obj.length > 0) && (obj[0] != null) && (obj[0].type=="radio")) {
		for (var i=0; i<obj.length; i++) {
			if (obj[i].checked == true) { return obj[i].value; }
			}
		return "";
		}
	if (obj.type=="text") 
		{ return obj.value; }
	if (obj.type=="hidden") 
		{ return obj.value; }
	if (obj.type=="textarea") 
		{ return obj.value; }
	if (obj.type=="checkbox") {
		if (obj.checked == true) {
			return obj.value;
			}
		return "";
		}
	if (obj.type=="select-one") { 
		if (obj.options.length > 0) {
			return obj.options[obj.selectedIndex].value; 
			}
		else {
			return "";
			}
		}
	if (obj.type=="select-multiple") { 
		var val = "";
		for (var i=0; i<obj.options.length; i++) {
			if (obj.options[i].selected) {
				val = val + "" + obj.options[i].value + ",";
				}
			}
		if (val.length > 0) {
			val = val.substring(0,val.length-1); // remove trailing comma
			}
		return val;
		}
	return "";
	}

//-------------------------------------------------------------------
// getInputDefaultValue(input_object)
//   Get the default value of any form input field when it was created
//   Multiple-select fields are returned as comma-separated values
//   (Doesn't support input types: button,file,password,reset,submit)
//-------------------------------------------------------------------
function getInputDefaultValue(obj) {
	if ((typeof obj.type != "string") && (obj.length > 0) && (obj[0] != null) && (obj[0].type=="radio")) {
		for (var i=0; i<obj.length; i++) {
			if (obj[i].defaultChecked == true) { return obj[i].value; }
			}
		return "";
		}
	if (obj.type=="text") 
		{ return obj.defaultValue; }
	if (obj.type=="hidden") 
		{ return obj.defaultValue; }
	if (obj.type=="textarea") 
		{ return obj.defaultValue; }
	if (obj.type=="checkbox") {
		if (obj.defaultChecked == true) {
			return obj.value;
			}
		return "";
		}
	if (obj.type=="select-one") {
		if (obj.options.length > 0) {
			for (var i=0; i<obj.options.length; i++) {
				if (obj.options[i].defaultSelected) {
					return obj.options[i].value;
					}
				}
			}
		return "";
		}
	if (obj.type=="select-multiple") { 
		var val = "";
		for (var i=0; i<obj.options.length; i++) {
			if (obj.options[i].defaultSelected) {
				val = val + "" + obj.options[i].value + ",";
				}
			}
		if (val.length > 0) {
			val = val.substring(0,val.length-1); // remove trailing comma
			}
		return val;
		}
	return "";
	}
	
//-------------------------------------------------------------------
// setInputValue()
//   Set the value of any form field. In cases where no matching value
//   is available (select, radio, etc) then no option will be selected
//   (Doesn't support input types: button,file,password,reset,submit)
//-------------------------------------------------------------------
function setInputValue(obj,val) {
	if ((typeof obj.type != "string") && (obj.length > 0) && (obj[0] != null) && (obj[0].type=="radio")) {
		for (var i=0; i<obj.length; i++) {
			if (obj[i].value == val) { 
				obj[i].checked = true;
				}
			else {
				obj[i].checked = false;
				}
			}
		}
	if (obj.type=="text") 
		{ obj.value = val; }
	if (obj.type=="hidden") 
		{ obj.value = val; }
	if (obj.type=="textarea") 
		{ obj.value = val; }
	if (obj.type=="checkbox") {
		if (obj.value == val) { obj.checked = true; }
		else { obj.checked = false; }
		}
	if ((obj.type=="select-one") || (obj.type=="select-multiple")) {
		for (var i=0; i<obj.options.length; i++) {
			if (obj.options[i].value == val) {
				obj.options[i].selected = true;
				}
			else {
				obj.options[i].selected = false;
				}
			}
		}
	}
	
//-------------------------------------------------------------------
// isFormModified(form_object,hidden_fields,ignore_fields)
//   Check to see if anything in a form has been changed. By default
//   it will check all visible form elements and ignore all hidden 
//   fields. 
//   You can pass a comma-separated list of field names to check in
//   addition to visible fields (for hiddens, etc).
//   You can also pass a comma-separated list of field names to be
//   ignored in the check.
//-------------------------------------------------------------------
function isFormModified(theform, hidden_fields, ignore_fields) {
	if (hidden_fields == null) { hidden_fields = ""; }
	if (ignore_fields == null) { ignore_fields = ""; }
	
	var hiddenFields = new Object();
	var ignoreFields = new Object();
	var i,field;
	
	var hidden_fields_array = hidden_fields.split(',');
	for (i=0; i<hidden_fields_array.length; i++) {
		hiddenFields[Trim(hidden_fields_array[i])] = true;
		}
	var ignore_fields_array = ignore_fields.split(',');
	for (i=0; i<ignore_fields_array.length; i++) {
		ignoreFields[Trim(ignore_fields_array[i])] = true;
		}
	for (i=0; i<theform.elements.length; i++) {
		var changed = false;
		var name = theform.elements[i].name;
		if (!isBlank(name)) {
			var type = theform[name].type;
			if (!ignoreFields[name]) {
				if (type=="hidden" && hiddenFields[name]) {
					changed = isChanged(theform[name]);
					}
				else if (type=="hidden") {
					changed = false;
					}
				else {
					changed = isChanged(theform[name]);
					}
				}
			}
		if (changed) { 
			return true;
			}
		}
		return false;
	}

 
