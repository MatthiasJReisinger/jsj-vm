/**
 * Screen is a singleton
 */
jsjvm.Screen = {
    htmlElement : null
};

jsjvm.Screen.init = function(htmlElement) {
    this.htmlElement = htmlElement;
}

jsjvm.Screen.println = function(message) {
    this.htmlElement.innerHTML += "> " + message + "</br>";
}
