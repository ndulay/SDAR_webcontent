/*
* Popup Calendar for the MLS webpages.
* The following line of code is required to be added to the merge form:
* <IFRAME ID="CalFrame" style="display:none;position:absolute;width:204;height:146;" marginheight=0 marginwidth=0 noresize frameborder=0 scrolling=no src="MLSCalendarIFrame.htm"></IFRAME>
* The calendarIFrame file will load this js file and do the rest.
* Only requirement is that the fields that the calendar should pop up for have 'date' in their name definition. 
* See the variable 'showCalEvent' to change the event that brings up the Calendar
*
* Note: Previous code considered differences between IE and NN so some variables may not be used anymore.
*
* Revisions:
* V1.00: 30-Nov-2001 FD initial Version
* V1.01: 03-Jan-2002 FD fixed display problem with different text size settings in browser by specifying point-size for fonts
*        also resized the entire IFrame to have everything a little more compact. Renamed some variables in JS file and the 
*        html file. Removed code that dynamically added the onClick event to certain field names, now this has to be done on 
         the form directly for better maintainability.
* V1.02: 11-Jan-2002 FD Changed the close button to not update the date in the field..
* V1.03: 15-Jan-2002 FD Added 'Today' button in top bar
* V1.04: 16-Jan-2002 'Today' button in left corner
* V1.05: 25-Jan-2002 FD Workaround implemented for leading zero problem when initializing the selected date to the field value
* V1.06: 05-Mar-2002 FD Fixed a bug that caused the month jump by 2 steps if the current month had a day selected that is invalid for the next month (e.g. Jan 30 would jump to March because Feb 30 is invalid) lines 188 ff
* V1.07: 02-Dec-2002 FD Fixed a bug that caused the days to not be updated correctly if day is invalid for month, L. 200 ff
*						Also fixed errror that came up when field value was not a valid date L. 123 ff
*/

var ppcDF = "m/d/Y";
var ppcMN = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var ppcWN = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var ppcER = new Array(4);
ppcER[0] = "Required DHTML functions are not supported in this browser.";
ppcER[1] = "Target form field is not assigned or not accessible.";
ppcER[2] = "Sorry, the chosen date is not acceptable.";
ppcER[3] = "Unknown error occured while executing this script.";
var ppcUC = false;
var doc = document;
var pDoc = parent.document;
var ppcIE=(navigator.appName == "Microsoft Internet Explorer");
var ppcTT="<table width=\"200\" cellspacing=\"1\" cellpadding=\"2\" border=\"1\" bordercolorlight=\"black\" bordercolordark=\"black\">\n";
var ppcYL=ppcTT;
var ppcMT=ppcTT;
var ppcCD=ppcTT;
var ppcWH = ppcTT; //WeekHeader
// fonts with specified point-size to have same appearance with different browser settings
// This will be overwritten by the 'TD' style applied in the html file
var fontMSnine = "<font face=\"MS Sans Serif, sans-serif\" point-size=\"9\">";
var fontMSten = "<font face=\"MS Sans Serif, sans-serif\" point-size=\"10\">";
var fontArEight = "<font face=\"arial\" point-size=\"8\" color=\"black\">";
var ppcFT="<font face=\"MS Sans Serif, sans-serif\" point-size=\"8\" color=\"black\">";
var rapBlue = "#0040A8";
var ppcFC=true; //firstCall?
var ppcTI=false;var ppcSV=null;var ppcRL=null;
var ppcML=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var ppcWE=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var ppcNow=new Date();
var ppcPtr=new Date();
var dF=pDoc.all.CalFrame;
var selectedDate=new Date();
var selectedYearCell, selectedMonthCell, selectedDayCell;
var selBgr="skyblue";
var showCalEvent = "onClick"; //  event that pops up the Cal
var dateSeparator = "/";
var iFrameWidth = 212;
var iFrameHeight = 214; // changes depending on how many rows are generated
var isForTaskManager = false;

/********************************************************************************************************************************** getCalendarFor
*/

function getCalendarFor(target,rules,isForTM) {
	ppcSV = target;
	//alert();
	// If date field is disabled then return without showing calendar.
	if(ppcSV != null && ppcSV.disabled==true)
	{
		return false;
	}
	isForTaskManager = isForTM;
	ppcFC=true;
	var pcdW = pDoc.body.clientWidth;
	var pcdH = pDoc.body.clientHeight;
	var dF=pDoc.all.CalFrame;
	var calWidth = parseInt( (dF.style.width).substr(0,(dF.style.width).indexOf("px") ), 10);
	var calHeight = parseInt( (dF.style.height).substr(0,(dF.style.width).indexOf("px") ), 10);
	initSelectedValues();
	ppcRL = rules;
	if (ppcFC) {setCalendar();ppcFC = false;} // call to setCalendar first time
	if ((ppcSV != null) &&(ppcSV)) {
		if (ppcIE) {
			var eL = target.offsetLeft;
			var eT = target.offsetTop+20;
			if(isForTaskManager)
			{
				eL = parent.window.document.all["Datelink"].offsetLeft;
				eT = parent.window.document.all["Datelink"].offsetTop+10;
			}

			//alert("PopUp Calendar (mlscalendar.js) debug, target eL"+eL+" eT "+eT);
			if(eL+calWidth > pDoc.body.clientWidth){
				eL=pcdW-calWidth-5;
			}
			if(eT-(pDoc.body.scrollTop) > pcdH-calHeight){
				eT = eT-calHeight-20;
			}
			dF.style.left=eL;
			dF.style.top=eT;
			if("none"==dF.style.display){
				dF.style.display="block";
				dF.style.visibility = "visible";
			}
		}
		else {
			showError(ppcER[0]);
		}
	}
	else {
		showError(ppcER[1]);
	}
}
/********************************************************* Separate function customized for the task manager calendar program
*/

function getTaskManagerCalendar(target,rules) {
	getCalendarFor(target,rules,true);
}

/********************************************************************************************************************************** initSelectedValues
*/

function initSelectedValues(){
	if(ppcSV.value != null && ppcSV.value.length > 1){
		var day, year, date;
		//alert("PopUp Calendar (mlscalendar.js) debug, val: "+ppcSV.value);
		// date is 6 separated digits
		if (isNaN(ppcSV.value)){
			//get the separator
			var lkp = 0;
			while ( (! isNaN(ppcSV.value.substr(lkp,1)) && lkp < ppcSV.value.length) ){
				lkp++;
			}
			if(lkp>0) dateSeparator = (ppcSV.value.substr(lkp,1));
			//alert('Dbg Calend. Sep:'+dateSeparator+'.'+lkp);
			//break;
			var arr   = ppcSV.value.split(dateSeparator);
			if(arr.length == 3)
			{	
				var month  = arr[0];
				//great, JS cannot parse leading zeros!! (Some it can, but does not like '08' and '09')
				if(month.substr(0,1)=="0") month=month.substr(1,1);
				date = arr[1];
				if(date.substr(0,1)=="0")date=date.substr(1,1);
				year = arr[2];
				if(year.substr(0,1)=="0") year=year.substr(1,1);
				day = parseInt(date, 10);
			}
		}
		//date is 8 digits, no separator
		else{
			//alert("PopUp Calendar (mlscalendar.js) debug, int: "+parseInt(ppcSV.value, 10));
			day = parseInt(ppcSV.value.substr(2,2), 10);
			month = parseInt(ppcSV.value.substr(0,2), 10);
			year = parseInt(ppcSV.value.substr(4,4), 10);
			//alert (" day "+day+" year "+year+" month "+month);
		}
		// 
		selectedDate.setDate( isNaN(parseInt(day, 10)) ? ppcNow.getDate() : (parseInt(day, 10)==0?1:day));
		selectedDate.setYear( isNaN(parseInt(year, 10)) ? getFullYear(ppcNow) : year);

		if (isNaN(parseInt(month, 10))){ 
		//alert("PopUp Calendar (mlscalendar.js) debug, month "+month+" NaN" ); 
		}
		selectedDate.setMonth( isNaN(parseInt(month, 10)) ? ppcNow.getMonth() : ""+(parseInt(month, 10)==0?1:(parseInt(month)-1)));
		// PENDING what to do with '10' as year, is that 1910 or 2010??
		if(selectedDate.getFullYear()+90<ppcNow.getFullYear()){
			selectedDate.setYear((parseInt(year, 10)+100*(Math.floor(ppcNow.getFullYear()/100))));
		}
	}
	else{
		selectedDate.setDate(ppcNow.getDate());
		selectedDate.setYear(getFullYear(ppcNow));
		selectedDate.setMonth(ppcNow.getMonth()) ;
	}
	ppcPtr = selectedDate;
	//alert("PopUp Calendar (mlscalendar.js) debug, sDM "+selectedDate.getMonth()+" sD "+selectedDate.getDate()+" sY "+getFullYear(selectedDate)+" date "+selectedDate );
}


/********************************************************************************************************************************** selectMonth
*/
function selectMonth(param) {
	var newYear = getFullYear(selectedDate);
	if(param==13){
		param=1;
		newYear++;
	}
	else if (param<1){
		param=12;
		newYear--;
	}
	selectDate(""+newYear+"|"+param+"|"+selectedDate.getDate(), false);
}
/********************************************************************************************************************************** selectYear
*/
	function selectYear(param) {
	selectDate(""+param+"|"+(selectedDate.getMonth()+1)+"|"+selectedDate.getDate(), false);
}
/********************************************************************************************************************************** selectDate
*/
function selectDate(param, boolHide, cell) {
	//alert("PopUp Calendar (mlscalendar.js) debug, select newDate: "+param+" Len "+param.length+" hide? "+boolHide+ "date "+selectedDate);
	var arr   = param.split("|");
	var year  = arr[0];
	var month = arr[1];
	var date  = arr[2];
	var ptr = parseInt(date, 10);
	// alert("PopUp Calendar (mlscalendar.js) debug, selectDate param "+param+" arr[0]"+arr[0]+"year "+year); 
	// alert("PopUp Calendar (mlscalendar.js) debug, selected Date "+selectedDate.getDate()+" arr[2]"+arr[2]+"ptr "+ptr);
	var prevSelMonth = selectedDate.getMonth();
	var prevSelYear = getFullYear(selectedDate);

	selectedDate.setDate(ptr);
	// if current day invalid for month set the day to highest valid day of month
	if (ppcML[(month-1)] < selectedDate.getDate() )
	{
		selectedDate.setDate(ppcML[(month-1)]);
		date = selectedDate.getDate();
		if(selectedDate.getDate() == 28 && isLeap(getFullYear(selectedDate)))
		{
			date = 29;
			selectedDate.setDate(29);
		}
	}
	selectedDate.setMonth(month-1);
	selectedDate.setYear(year);
	if ((ppcSV != null)&&(ppcSV)) {
		ppcSV.value = (month.length==1 ? "0"+month : month)+"/"+(date.length==1 ? "0"+date : date)+"/"+year.substring(2,4);
		updateDaysOfMonth();
	}
	else {
		showError(ppcER[1]);
	}
	// update the currMonth
	if (prevSelMonth!=selectedDate.getMonth()){
		var cM = doc.all['currMonth'];
		var oldInnerCode =  cM.innerHTML;
		var indexMonthName = oldInnerCode.indexOf(ppcMN[prevSelMonth])
		var newInnerCode = oldInnerCode.substr(0,indexMonthName)
		var restOld = oldInnerCode.substr(indexMonthName+(ppcMN[prevSelMonth]).length,oldInnerCode.length);
		newInnerCode = newInnerCode + ppcMN[selectedDate.getMonth()] + restOld;
		cM.innerHTML=newInnerCode;
	}
	// update the currYear
	if (prevSelYear!=getFullYear(selectedDate)){
	var cY = doc.all['currYear'];
	var oldInnerCode =  cY.innerHTML;
	var indexYear = oldInnerCode.indexOf(prevSelYear)
	var newInnerCode = oldInnerCode.substr(0,indexYear)
	var restOld = oldInnerCode.substr(indexYear+4,oldInnerCode.length);
	newInnerCode = newInnerCode +getFullYear(selectedDate) + restOld;
	cY.innerHTML=newInnerCode;
	}
	if(boolHide){
	//dF.close();
		hideCal();
	}
}
/********************************************************************************************************************************** updateCellBackground
*/
function updateCellBackground(){
	if(ppcFC){
		selectedDayCell = doc.all["DC"+selectedDate.getDate()];	
	}
	toggleColor(selectedDayCell);
}

/********************************************************************************************************************************** toggleColor
*/
function toggleColor(cell, background){
	var bgr = (background!=null) ? background : "lightgrey"
	//alert("PopUp Calendar (mlscalendar.js) debug, bgr "+bgr);
	if(cell!=selectedYearCell && cell!=selectedMonthCell && cell!=selectedDayCell){
		cell.style.backgroundColor=bgr;
	}
	else if(cell!=null){
		cell.style.backgroundColor=selBgr;
	}
}
/********************************************************************************************************************************** hideCal
*/
function hideCal() {
	//PENDING still need to solve cursor problem after frame is hidden
	if (ppcIE) {
			dF.style.display="none";
			dF.style.cursor="default";
			//dF.releaseEvents();
			//pDoc.style.cursor="default";
			dF.click();
			dF.style.visibility = "hidden";
	}
	ppcTI = false; // PENDING is this still needed?
	parent.window.focus();
	//alert("PopUp Calendar (mlscalendar.js) debug,  frame"+pDoc.frames[1]+" name"+pDoc.frames[1].name);
	//alert(isForTaskManager);
	if(isForTaskManager == null || isForTaskManager == false)
	{
		ppcSV.select();
		ppcSV.focus();
		ppcSV = null;
		//updateContent();
	}
	else
	{	
		selectDate(""+getFullYear(selectedDate)+"|"+(selectedDate.getMonth()+1)+"|"+selectedDate.getDate(), false);
		parent.window.refreshDate();
	}
}
/********************************************************************************************************************************** setCalendar
*/
function setCalendar() {
	var year = getFullYear(selectedDate);
	var month = selectedDate.getMonth();
	if (month == 1) {ppcML[1]  = (isLeap(year)) ? 29 : 28;}
	ppcPtr.setYear(year);
	ppcPtr.setMonth(month);
	updateContent();
}
/********************************************************************************************************************************** jumpToToday
*/

function jumpToToday() {
	selectDate(""+getFullYear(ppcNow)+"|"+(ppcNow.getMonth()+1)+"|"+ppcNow.getDate(), true);
}
/********************************************************************************************************************************** updateContent
*/
function updateContent() {
	// generate the table for the days of the month in the correct sequence
	generateDaysOfMonth(); 
	if (ppcIE) {
		doc.all['pickDays'].innerHTML = ppcCD;// update the content of the table
		generatePickMonthAndYear();
		doc.all['monthYearRow'].innerHTML = ppcMT;
		generateWeekHeader();
		doc.all['weekHeader'].innerHTML = ppcWH;
	}
	else {showError(ppcER[0]);}
	ppcYL = ppcTT;
	ppcWH = ppcTT;
	ppcCD = ppcTT;
	ppcMT = ppcTT;
	updateCellBackground();
}
/********************************************************************************************************************************** updateDaysOfMonth
*/
function updateDaysOfMonth() {
	var year = getFullYear(selectedDate);
	var month = selectedDate.getMonth();
	if (month == 1) {ppcML[1]  = (isLeap(year)) ? 29 : 28;}
	ppcPtr.setYear(year);
	ppcPtr.setMonth(month);
	generateDaysOfMonth();// PENDING do this once only?
	doc.all['pickDays'].innerHTML = ppcCD;
	ppcCD = ppcTT;
	selectedDayCell = doc.all["DC"+selectedDate.getDate()];
	toggleColor(selectedDayCell);
}

/********************************************************************************************************************************** generatePickMonthAndYear
*/
function generatePickMonthAndYear() {
	var bgr = "lightgrey";
	// PENDING use loop for this
	var tableOpen = "<table width=\"200\" cellspacing=\"0\" cellpadding=\"2\" bordercolorlight=\"black\" bordercolordark=\"black\" style=\"border-left: 1px solid black; border-right: 1px solid black\">\n";
	ppcMT = tableOpen;
	// the selection 'arrows'
	var tdOpen = "\t<td width=\"";
	var tdRest = "\"";//"\" bgcolor=\""+bgr+"\" ";
	var fontOpen = ''; //fontMSten+"<b>";
	var eC = "&nbsp;"
	var closeFontTd = "</td>\n";//"</font></b></td>\n";
	var openMouse = "onMouseOver=\"this.style.backgroundColor=\'#E7E7E7\'\" onMouseOut=\"toggleColor(this)\" onMouseUp=\"";
	var restMouse = "Style=\"cursor: hand\"> ";
	var closeFontSpanTd = "</span></td>\n";//"</font></span></td>\n";
//*
	// built the row with the month and year selector
	var tmp = tdOpen+"3%"+tdRest+">"
			+fontOpen
			+eC+closeFontTd
			
			//
			+tdOpen+"5%\""+" class=\"monthYearSelector\" id=\"MMinus"+tdRest
			+openMouse+"selectMonth(selectedDate.getMonth())\" "+restMouse
			+fontOpen+"<"+closeFontTd
			
			// the displayed Month
			+ tdOpen+"*\""+" class=\"monthYearSelector\" id=\"currMonth"+tdRest+">"
			+ fontOpen
			+ ppcMN[selectedDate.getMonth()]
			+ closeFontTd
	//PENDING are IDs needed here?
			//
			+tdOpen+"5%\""+" class=\"monthYearSelector\" id=\"MPlus"+tdRest
			+openMouse+"selectMonth((selectedDate.getMonth()+2))\" "+restMouse
			+fontOpen+">"+closeFontTd
			//
			+tdOpen+"3%"+tdRest+">"
			+fontOpen
			+eC+closeFontTd
			
			//
			+tdOpen+"5%\""+" class=\"monthYearSelector\" id=\"YMinus"+tdRest
			+openMouse+"selectYear((getFullYear(selectedDate)-1))\" "+restMouse
			+fontOpen+"<"+closeFontTd

			// colspan=\"2\"
			// the displayed year
			
			+ tdOpen+"30%\""+" class=\"monthYearSelector\" id=\"currYear"+tdRest+">"
			+ fontOpen
			+ getFullYear(selectedDate)
			+ closeFontTd
			/**/
			//
			+tdOpen+"5%\""+" class=\"monthYearSelector\" id=\"YPlus"+tdRest
			+openMouse+"selectYear((getFullYear(selectedDate)+1))\" "+restMouse
			+fontOpen+">"+closeFontTd

			//
			+tdOpen+"3%"+' '+tdRest+">"
			+fontOpen
			+eC+closeFontTd;

	var titleRow = //top row with 'close' in right corner
					"<tr height=\"14\" align=\"right\">\n" 
					// today button
					+"\t<td height=\"12\" width=\"30\" align=\"center\" style=\"padding: 1px\" "+" bgcolor=\""+bgr+"\" "
					+"onMouseOver=\"this.style.backgroundColor=\'#E7E7E7\'\" onMouseOut=\"toggleColor(this)\" onMouseUp=\"jumpToToday()\" "
					+"Style=\"cursor: hand;border-bottom: 1px solid black\"> "
					// border: 1px solid black
					+"Today"+"</font></td>\n"
					
					//+"<td colspan=\"4\" bgcolor=\""+rapBlue+"\"> "
					//+"&nbsp"+"</font></td>\n"
					+"\t<td colspan=\"4\" style=\"filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=#0167FC, EndColorStr=#0040A8\"> "
					+"&nbsp"+"</font></td>\n"

					//empty blue cell
					//+"\t<td colspan=\"5\" bgcolor=\""+rapBlue+"\"> "
					//+"&nbsp"+"</font></td>\n"
					// cancel button
					+"\t<td width=\"30\" height=\"12\" align=\"center\" "+" bgcolor=\""+bgr+"\" "
					+"onMouseOver=\"this.style.backgroundColor=\'#E7E7E7\'\" onMouseOut=\"toggleColor(this)\" onMouseUp=\"hideCal()\" "
					+"Style=\"cursor: hand; border-bottom: 1px solid black\"> "
					+"Close"+"</font></td>\n";

	ppcMT += titleRow+"</tr>\n</table>\n\n"+tableOpen+"<tr class=\"bgGray\" id=\"pickMonthRow\" align=\"center\">\n" + tmp + "</tr>\n";
	tmp = "";
	ppcMT += "</table>\n";
	//alert('Frank debug \n\n\n'+ppcMT);
	//parent.window.open(ppcMT);

}

/********************************************************************************************************************************** generateWeekHeader
*/
function generateWeekHeader() {
	var j = 0; //column counter
	var day=ppcWE;
	var dayTwoDigit;
	ppcWH += "<tr align=\"center\" bgcolor=\"lightgrey\">\n";
	for (j = 0; j < 7; ++j) {
		dayTwoDigit = ppcWE[j].substr(0,2);
		if( j == 0 || j == 6){
			// light yellow for Sunday and Saturday
			ppcWH += "<td width=\"20\" bgcolor=\"lightyellow\" ><b>"+fontMSnine+dayTwoDigit+"\n";
		}
		else{
			ppcWH += "<td width=\"20\" ><b>"+fontMSnine+dayTwoDigit+"\n";
		}
	}
	ppcWH += "</tr>\n</table>\n";
}
/********************************************************************************************************************************** generateDaysOfMonth
*/
function generateDaysOfMonth() {
	var year  = getFullYear(selectedDate);
	var month = selectedDate.getMonth();
	var date  = 1;
	var dF=pDoc.all.CalFrame;
	var tmpDte = new Date(ppcPtr);
	tmpDte.setDate(1); // need to know first weekday of the month
	var day   = tmpDte.getDay();
	var len   = ppcML[month];
	var bgr,cnt,tmp = "";
	var j,i = 0;
	for (j = 0; j < 7; ++j) {
		if (date > len) {break;}
		for (i = 0; i < 7; ++i) {
			bgr = ((i == 0)||(i == 6)) ? "lightyellow" : "white";
			if (((j == 0)&&(i < day))||(date > len)) {tmp  += makeDayCell(bgr,year,month,0);}
			else {tmp  += makeDayCell(bgr,year,month,date);++date;}
		}
		ppcCD += "<tr align=\"center\">\n" + tmp + "</tr>\n";tmp = "";
	}
	//alert('Frank debug '+dF.style.height+' '+j);
	
	// adjust the blue iFrame size 
	// NOTE!!!!!!!!! When making changes test with different windows fonts & DPI settings!!!!!!!!!!!!!
	if(j > 5) iFrameHeight = 214;
	else iFrameHeight = 192;
	dF.style.height = iFrameHeight;
	dF.style.width = iFrameWidth;
	ppcCD += "</table>\n";
}

/********************************************************************************************************************************** makeDayCell
*/
function makeDayCell(bgr,year,month,date) {
	var param = "\'"+year+"|"+(month+1)+"|"+date+"\'";
	var td0 = "<td width=\"20\" bgcolor=\""+bgr+"\" ";
	var td1 = "<td width=\"20\" id=\"DC"+date+"\" bgcolor=\""+bgr+"\" ";
	var td2 = (ppcIE) ? "</font></span></td>\n" : "</font></a></td>\n";
	var evt = "onMouseOver=\"this.style.backgroundColor=\'#A6BCDA\'\" onMouseOut=\"toggleColor(this,'"+bgr+"')\" onMouseUp=\"this.style.cursor=\'default\'; selectDate("+param+", true, this)\" ";
	var ext = "<span Style=\"cursor: hand\">";
	var lck = "<span Style=\"cursor: default\">";
	var cellValue = (date != 0) ? date+"" : "&nbsp;";
	if ((ppcNow.getDate() == date)&&(ppcNow.getMonth() == month)&&(getFullYear(ppcNow) == year)) {
		cellValue = "<b>"+cellValue+"</b>";
	}
	var cellCode = "";
	if (date == 0) {
		if (ppcIE) {cellCode = td0+"Style=\"cursor: default\">"+lck+ppcFT+cellValue+td2;}
		else {cellCode = td0+">"+ppcFT+cellValue+td2;}
	}
	else {
		if (ppcIE) {cellCode = td1+evt+"Style=\"cursor: hand\">"+ext+ppcFT+cellValue+td2;}
		else {
			if (date < 10) {cellValue = "&nbsp;" + cellValue + "&nbsp;";}
			cellCode = td1+">"+lnk+ppcFT+cellValue+td2;
		}
	}
	// if(date == 0 || date == 1)alert("PopUp Calendar (mlscalendar.js) debug, MakeDayCell "+date+" code "+cellCode);
	return cellCode;
}

/********************************************************************************************************************************** showError
*/
function showError(message) {
window.alert("PopUp Calendar (mlscalendar.js) debug, [ MLS JavaScript: PopUp Calendar ]\n\n" + message);}
/********************************************************************************************************************************** isLeap
*/
function isLeap(year) {
	if ((year%400==0)||((year%4==0)&&(year%100!=0))) {return true;}
	else {return false;}
}
/********************************************************************************************************************************** getFullYear
*/
function getFullYear(dt) {
	// originally different returns for IE or NN
	{return dt.getFullYear();}
}
/********************************************************************************************************************************** validDate
*/
function validDate(date) {
	var reply = true;
	if (ppcRL == null) {/* NOP */}
	else {
		var arr = ppcRL.split(":");
		var mode = arr[0];
		var arg  = arr[1];
		var key  = arr[2].charAt(0).toLowerCase();
	if (key != "d") {
		var day = ppcPtr.getDay();
		var orn = isEvenOrOdd(date);
		reply = (mode == "[^]") ? !((day == arg)&&((orn == key)||(key == "a"))) : ((day == arg)&&((orn == key)||(key == "a")));
	}
	else {reply = (mode == "[^]") ? (date != arg) : (date == arg);}}
	return reply;
}
/********************************************************************************************************************************** isEvenOrOdd
*/
function isEvenOrOdd(date) { //PENDING what's this?
	if (date - 21 > 0) {return "e";}
	else if (date - 14 > 0) {return "o";}
	else if (date - 7 > 0) {return "e";}
	else {return "o";}
}


