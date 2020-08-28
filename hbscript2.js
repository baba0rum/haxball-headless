
window.onHBLoaded = () => {
 const room = window.HBInit({
roomName: "18-25 MARLOU-QLF AHI",
maxPlayers: 30,
password: "1825",
public: true,
noPlayer: true
});

room.setDefaultStadium("Big");
room.setScoreLimit(3);
room.setTimeLimit(0);

var tireur = "";

// If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() { 
 // Get all players
 var players = room.getPlayerList();
 if ( players.length == 0 ) return; // No players left, do nothing.
 if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
 room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

room.onPlayerJoin = function(player) {
 updateAdmins();
 room.sendAnnouncement("Salut " + player.name + " !");
 playernumer = playernumer + 1;
 
myTimer();
isok = 0;
}

room.onPlayerLeave = function(player) {
 updateAdmins();
playernumer = playernumer -1;

myTimer();
isok = 0;

}

room.onPlayerActivity = function(player) {

}

room.onPlayerBallKick = function(player) {

tireur = player.name;
}

room.onTeamGoal = function(team) {

if (tireur)
{
room.sendAnnouncement("Ayaaa " + tireur + " a marqué !");
tireur = "";
}
}

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {

}

room.onPlayerChat = function(player, message) {

var res = message.split(" ", 8); 
 

 if (message == "adminstp")
{
room.setPlayerAdmin(player.id, true);
return false;
}
if (message == "adminremove")
{
room.setPlayerAdmin(player.id, false);
return false;
}
document.getElementsByTagName("iframe")[0].contentDocument.getElementById("generalchat").value += player.name + ": " + message + '\r\n';
}


var myvar2 = setInterval(resetgeneralchat, 300000);

var add_input = function () {

 var count = 0;

 return function add_input() {
 count++;
 if (count >= 10) {
 return false;
 }
 var input = document.createElement('input');
 input.name = 'generated_input';
input.id = 'schatinput';
 document.getElementsByTagName("iframe")[0].contentDocument.getElementById("schat").appendChild(input);


document.getElementsByTagName("iframe")[0].contentDocument.getElementById("schatinput").addEventListener('keypress', function(e) {
if (e.keyCode == 13) {
room.sendAnnouncement("Admin: " + document.getElementsByTagName("iframe")[0].contentDocument.getElementById("schatinput").value);
document.getElementsByTagName("iframe")[0].contentDocument.getElementById("schatinput").value = "";
 }
 });
 }

}();

var myVar = setInterval(myTimer, 1000);
var isok = 0;
function myTimer() {

if (isok == 0)
{
if (document.getElementsByTagName("iframe")[0])
{
isok = 1;
if (!document.getElementsByTagName("iframe")[0].contentDocument.getElementById("playernum"))
{
document.getElementsByTagName("iframe")[0].contentDocument.getElementById("roomlink").innerHTML = document.getElementsByTagName("iframe")[0].contentDocument.getElementById("roomlink").innerHTML + '<div id="playernum" class="plnm">Players: </div> <br> <div id="schat"></div>'
if (document.getElementsByName("generated_input"))
{
add_input();
addtextarea();

}
}
}
if (document.getElementsByTagName("iframe")[0].contentDocument.getElementById("playernum").innerHTML)
{
document.getElementsByTagName("iframe")[0].contentDocument.getElementById("playernum").innerHTML = "Players: " + playernumer + '<br> <div id="schat"></div>';
isok = 2;
if (!document.getElementsByName("generated_input"))
{
add_input();
addtextarea();
}

}
}
} 


function resetgeneralchat() {

document.getElementsByTagName("iframe")[0].contentDocument.getElementById("generalchat").value = "";

} 

var playernumer =0;




var addtextarea = function () {

 var count = 0;

 return function addtextarea() {
 count++;
 if (count >= 10) {
 return false;
 }
 var input = document.createElement("TEXTAREA");
 input.name = 'generated_chat';
input.id = 'generalchat';
input.rows = 15;
input.cols = 60;
 document.getElementsByTagName("iframe")[0].contentDocument.getElementById("schat").appendChild(input);

}

}();





}
// To make sure room is initialized
if (typeof window.HBInit === 'function') 
{
window.onHBLoaded()
}

