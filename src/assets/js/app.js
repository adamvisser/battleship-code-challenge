//==================================================
//           The Back End of the Front end
//==================================================
angular.module("battle.Board", [])
	.service('Board', function () {
		var BoardReturn = {
			//this array is a bunch of 1s and 0s. 1 if the player has taken a shot at that x,y value
			playerOneShots: [[]],
			playerTwoShots: [[]],
			//in this array we have 0s, 1s, and 2s. 0 is empty, 1 is unharmed ship, 2 is a ship already hit.
			playerOneShips: [[]],
			playerTwoShips: [[]],
			playerOneHitCount: 0,
			playerTwoHitCount: 0,
			isSetup: false
		};
		//these functions do the same thing, but to different arrays... should probs clean this up someway or another
		BoardReturn.playerOneShot = function(y,x){
			//returns a 0 if nothing happens, 1 if its a hit, and -1 if the player already shot there
			var alreadyShot = BoardReturn.playerOneShots[y][x];
			var shipIsThere = BoardReturn.playerTwoShips[y][x];
			if (alreadyShot) {
				return -1;
			} else if(shipIsThere){
				BoardReturn.playerTwoShips[y][x] = 2;
				BoardReturn.playerTwoHitCount++;
				return 1;
			}
			return 0;
		}
		BoardReturn.playerTwoShot = function(y,x){
			//returns a 0 if nothing happens, 1 if its a hit, and -1 if the player already shot there
			var alreadyShot = BoardReturn.playerTwoShots[y][x];
			var shipIsThere = BoardReturn.playerOneShips[y][x];
			if (alreadyShot) {
				return -1;
			} else if(shipIsThere){
				BoardReturn.playerOneShips[y][x] = 2;
				BoardReturn.playerOneHitCount++;
				return 1;
			}
			return 0;
		}
		BoardReturn.setupBoards = function(){
			//8x8 field just like the actual battleship
			//however, [0,0] is actually in the upper left rather than bottom left..... another commong thing to happen while game designing.....
			var width = 8;
			var height = 8;
			for (y = 0; y < height; i++) { 
				for (x = 0; x < width; i++) { 
					BoardReturn.playerOneShots[y][x] = 0;
					BoardReturn.playerOneShips[y][x] = 0;
					BoardReturn.playerTwoShots[y][x] = 0;
					BoardReturn.playerTwoShips[y][x] = 0;
				}
			}
			//at this point all the boards are empty, now its time to place the ships
			//1 ship takes 3 hits, 3 ships take 4 hits, and 1 ship takes 5 hits.
			//rather than write a smart algorithm that will check if all the ships have been hit.... lets just keep track of how many times each player ends up hit...
			//if a player takes 20 hits, hes most certainly out.
		}
		return BoardReturn;
	})




//==================================================
//           The Front End of the Front end
//==================================================
var battle = angular.module("battle", ['ngAnimate', 'ngRoute', 'battle.Board']).
	config(function ($routeProvider) {
		$routeProvider
		.when('/', {templateUrl: '/views/welcome.html', controller: homeController})
		.when('/instructions', {templateUrl: '/views/instructions.html', controller: instructionController})
		.when('/playerOne', {templateUrl: '/views/playerView.html', controller: playerOneController})
		.when('/playerTwo', {templateUrl: '/views/playerView.html', controller: playerTwoController})
	});

function homeController($scope, $location, Board){
	//If needed, anything that gets loaded would get loaded up here first and foremost...
	//pleae note that I could probably clean this up some to only have a single board instead of the 4 I am about to create
	//create player ones shots taken board
	//create player twos shots taken board
	//create player ones ships board
	//create player twos ships board
	//otherwise just display some cool "hey welcome, find a friend and play the game" type text

	$scope.onReady = function(){
		$location.path( "/instructions" );
	}
}

function instructionController($scope, $location){
	//display some instructions on how to fire, how you can tell where you have shot before, and how to tell wehre you have been shot at before. 
	$scope.onReady = function(){
		$location.path( "/playerOne" );
	}
}

function playerOne($scope, Board){
	//first we need to update the ships to show player ones ships
	//this just changes the current display shots to player ones shots
	//this just changes the current diplay shot at to player twos shots taken
}

function playerTwo($scope){
	//first we need to update the ships to show player twos ships
	//this just changes the current display shots to player twos shots
	//this just changes the current diplay shot at to player ones shots takend
}