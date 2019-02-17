import * as vars from "./vars";

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
	var successful = document.execCommand('copy');
	var msg = successful ? 'successful' : 'unsuccessful';
	console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
	console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
	fallbackCopyTextToClipboard(text);
	return;
    }
    navigator.clipboard.writeText(text).then(function() {
	console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
	console.error('Async: Could not copy text: ', err);
    });
}

// this is the map() function from processing
export default function scale(num, in_min, in_max, out_min, out_max){
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
