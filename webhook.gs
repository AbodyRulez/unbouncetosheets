//You need to enter your own spreadsheetID below. See the documentation for instructions on where to find it.
var spreadsheetID = "1y83FoYH92oc3nnJQgoFCPiKxlNaA6PDrnMYhiqWVo8I";

function doPost(e) {

	try {
		var sh = SpreadsheetApp.openById(spreadsheetID).getSheets()[0]
			sh.setFrozenRows(1);

		  //sh.appendRow([JSON.stringify(e)]);
		if (sh.getLastRow() > 0) {
			var titles = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
		} else {
			var titles = [];
		}

		if (e.parameter["data.json"]) {

			var obj = JSON.parse(e.parameter["data.json"]);
			//sh.appendRow([JSON.stringify(obj)]);
			var arrNames = [];

			for (i = 0; i < titles.length; i++) {
				arrNames[i] = "";
			}

			var flag = false
				for (var nam in obj) {
               //sh.appendRow(obj[nam]);
					var flag1 = true;
					for (i = 0; i < titles.length; i++) {
						if (titles[i] == ('' + nam).replace("_", " ")) {
							arrNames[i] = obj[nam][0];
							flag1 = false;
							break;
						}
					}

					if (flag1 == true) {
						titles.push(('' + nam).replace("_", " "));
						arrNames[titles.length - 1] = obj[nam][0];
						flag = true;
					}

				}
				var lock = LockService.getScriptLock();
			var success = lock.tryLock(10000);
			if (!success) {
				throw 'Could not obtain lock after 10 seconds.';
			}

			if (flag == true) {
				sh.getRange(1, 1, 1, titles.length).setValues([titles]);
			}

			if (sh.getLastRow() == 1) {
				sh.appendRow(["'"]);
			}
			sh.appendRow(arrNames);

			lock.releaseLock();

		} else {
			throw "Object not found";
		}

       return HtmlService.createHtmlOutput('<div>'+ 'Processed successfully!' + '</div>');
       //return ContentService.createTextOutput('Processed successfully!');

	} catch (e) {
         return HtmlService.createHtmlOutput('<div>'+ e + '</div>');
		//return ContentService.createTextOutput(e);
	}

}

function doNothing(){
  
}  
