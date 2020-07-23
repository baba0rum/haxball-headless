var room = HBInit({
	roomName: "18-25 JVC ISSOU",
	maxPlayers: 30,
	password: "1825",
	public: true,
	noPlayer: true
});
room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);

// If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() { 
  // Get all players
  var players = room.getPlayerList();
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

function updateAdmins() { 
  // Get all players
  var players = room.getPlayerList();
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

room.onPlayerJoin = function(player) {
  updateAdmins();
  room.sendAnnouncement("Salut " + player.name);
}

room.onPlayerLeave = function(player) {
  updateAdmins();
}

room.onPlayerChat = function(player, message) {
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
	
}
