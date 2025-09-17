
/* XML parser for populating "talks" section of webpage */

/* returns an xml object for the given fileName*/
function loadTalks(fileName) {
	var xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		populateTalks(this);
	};
	xhttp.open("GET", fileName, true);
	xhttp.send();
}

/* populates document's writings section */
function populateTalks(xml) {
	var xmlDoc = xml.responseXML;
	const completeText = listTalks(xmlDoc);

	document.getElementById("talks").innerHTML = completeText;
}

/* parses given xmlDoc into individual talk to generate full html */
function listTalks(xmlDoc) {
	const talkNodes = xmlDoc.getElementsByTagName("talk");

	let completeText = "";
	let titleLine = "";
	let locationList = "";

	for (let i = 0; i < talkNodes.length; i++) {
		/* generate html for title and list of events */
		let currentNode = talkNodes[i];
		titleLine = "<p>\n&#x201C;" + currentNode.getElementsByTagName("title")[0].textContent + "&#x201D;<br>\n</p>\n";
		locationList = listLocations(currentNode);
		completeText += titleLine + locationList;

		/* generate html for video iframe */
		/* currently configured to only add one video link */
		/*
		let videoNodes = currentNode.getElementsByTagName("video");
		if (videoNodes.length == 1) {
			completeText += videoIFrame(videoNodes[0]);
		}
		*/
	}

	return completeText;
}

/* parses given video node into an iframe */
function videoIFrame(videoNode) {
	const videoLink = videoNode.textContent;

	return "<iframe class=\"video\" src=\"" + videoLink + "\"></iframe>";
}

/* parses given xml talk node into unordered list of locations */
function listLocations(talkNode) {
	const locationNodes = talkNode.getElementsByTagName("location");

	let completeText = "<ul>\n";

	for (let j = 0; j < locationNodes.length; j++) {
		completeText += locationItem(locationNodes[j]);
	}

	completeText += "</ul>\n";

	return completeText;
}

/* parses given xml location node into list item html text */
function locationItem(locationNode) {
	let eventName = locationNode.getElementsByTagName("event")[0].textContent;
	const physicalLocation = locationNode.getElementsByTagName("physical")[0].textContent;
	const eventYear = locationNode.getElementsByTagName("year")[0].textContent;

	if (locationNode.getElementsByTagName("event")[0].hasAttribute("link")) {
		eventName = "<a href=\"" + locationNode.getElementsByTagName("event")[0].attributes.link.value + "\" target=\"_blank\">"
			+ eventName + "</a>";
	}

	const itemText = "<li><i>" + eventName + "</i>. " + physicalLocation + ". " + eventYear + ". </li>\n";

	return itemText;
}

loadTalks("./talks.xml");
