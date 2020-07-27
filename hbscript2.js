window.onHBLoaded = () => {
  const room = window.HBInit({
	roomName: "18-25 JVC ISSOU",
	maxPlayers: 30,
	password: "1825",
	public: true,
	noPlayer: true
});
var afks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


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

room.onPlayerJoin = function(player) {
  updateAdmins();
  room.sendAnnouncement("Salut " + player.name + " !");
  afks[player.id] = 0;
}

room.onPlayerLeave = function(player) {
  updateAdmins();
  afks[player.id] = 0;

}

room.onPlayerActivity = function(player) {

}

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
	if (afks[changedPlayer.id] == 1)
	{
		changedPlayer.team = 0;
		room.setPlayerTeam(changedPlayer.id, 0);

	}
}

setInterval(spectheafk, 1000);



function spectheafk(){

	var players = room.getPlayerList();

	for (i2 = 0; i2 < afks.length; i2++) {
	if (afks[i2] == 1)
		for (i = 0; i < players.length; i++) {
		
		  room.setPlayerTeam(players[i].id, 0);

		}
	}
}




room.onPlayerChat = function(player, message) {
var res = message.split(" ", 8); 
 

	if (res[0] == "afk")
	{	
		if (player.admin)
		{
			if (res[1] == "list")
			{
				var players2 = room.getPlayerList();
				var playernames = "";
				for (i2 = 0; i2 < players2.length; i2++)
				{
					playernames = playernames + players2[i2].name + " " + players2[i2].id.toString() + " ";
				}
				if (playernames.lenght > 100)
				{
					room.sendAnnouncement(playernames.slice(0, 100), player.id);
					room.sendAnnouncement(playernames.slice(100, playernames.lenght), player.id);
				}
				else
				{
					room.sendAnnouncement(playernames, player.id);

				}	
				return false;					

			}	
			var players = room.getPlayerList();
			for (i = 0; i < players.length; i++)
			{
				if (res[1] == players[i].name)
				{
					if (afks[i] == 0)
					{
						afks[i] = 1;
						room.sendAnnouncement(players[i].name + " est maintenant afk");
						return false;	

					}
					else
					{
						afks[i] = 0;
						room.sendAnnouncement(players[i].name + " n'est plus afk");
						return false;	
					}
				}
				else if (res[1] == players[i].id)
				{
					if (afks[i] == 0)
						{
							afks[i] = 1;
							room.sendAnnouncement(players[i].name + " est maintenant afk");
							return false;	

						}
						else
						{
							afks[i] = 0;
							room.sendAnnouncement(players[i].name + " n'est plus afk");
							return false;	
						}
				}
				
				
			}
			
			
		
		}
		else
		{
			if (afks[player.id] == 1)
			{
				afks[player.id] = 0;
				room.sendAnnouncement(player.name + " n'est plus afk");
				return false;

			}
			else 
			{
				afks[player.id] = 1;
				room.sendAnnouncement(player.name + " est maintenant afk");
				return false;
			}
		
		}
	}
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


}
// To make sure room is initialized
if (typeof window.HBInit === 'function') 
{
window.onHBLoaded()
}
