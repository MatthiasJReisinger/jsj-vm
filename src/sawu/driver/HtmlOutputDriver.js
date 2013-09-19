/**
 * @param Object htmlElement the html element that is used to print the output
 */
sawu.driver.HtmlOutputDriver = function(htmlElement) {
    this.htmlElement = htmlElement;
}

inherit("sawu.driver.HtmlOutputDriver", "sawu.driver.OutputDriver");

sawu.driver.HtmlOutputDriver.prototype.println = function(message) {
    var line = document.createElement("div");
    line.innerHTML = "> " + message;
    this.outputElement.appendChild(line);
}
