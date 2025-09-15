
/* XML parser for populating "writing" section of webpage */

var doubleLineBreak = "<br><br>";

/* returns an xml object for the given fileName*/
function loadXml(fileName) {
	var xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		populateHtml(this);
	};
	xhttp.open("GET", fileName, true);
	xhttp.send();
}

/* populates document's writings section */
function populateHtml(xml) {
	var xmlDoc = xml.responseXML;
	const completeText = listBlocks(xmlDoc);

	document.getElementById("writings").innerHTML = completeText;
}

/* parses given xmlDoc into individual blocks to generate full html */
function listBlocks(xmlDoc) {
	const blockNodes = xmlDoc.getElementsByTagName("block");

	let completeText = "";
	let yearLine = "";
	let blockText = "";

	for (let i = 0; i < blockNodes.length; i++) {
		yearLine = "<b>" + blockNodes[i].attributes.year.value + "</b>" + doubleLineBreak + "\n";
		blockText = listArticles(blockNodes[i]);
		completeText += yearLine + blockText;
	}

	return completeText;
}

/* parses given xml block node into individual articles */
function listArticles(blockNode) {
	const articleNodes = blockNode.getElementsByTagName("article");

	let completeText = "";

	for (let j = 0; j < articleNodes.length; j++) {
		completeText = completeText + articleText(articleNodes[j]);
	}

	return completeText;
}

/* parses given xml article node into html text */
function articleText(articleNode) {
	const articleTitle = articleNode.getElementsByTagName("title")[0].textContent;
	const articleLink = articleNode.getElementsByTagName("link")[0];

	let titleText = "&#x201C;" + articleTitle +"&#x201D;";
	let linkText = " <a href=\"" + articleLink.attributes.url.value + "\" target=\"_blank\"><i>" + articleLink.textContent + "</i></a>." + doubleLineBreak;

	return titleText + linkText;
}

loadXml("./writing.xml");
