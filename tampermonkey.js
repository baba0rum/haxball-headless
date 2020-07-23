// ==UserScript==
// @name         haxball
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://html5.haxball.com/headless
// @grant        none
// ==/UserScript==

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://rawcdn.githack.com/baba0rum/haxball-headless/41bac69fb79f2bdaa05b53f3ea1e8d0f4c36cc34/hbscript.js";
    document.body.appendChild( scriptElement );
})();
