function getuser() {
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/bsgetuser')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            window.user = resp.user
            document.getElementById('heading').innerHTML = 'Hello, ' + user
        }
    }
    xhr.send()
}
function login() {
    var user = document.getElementById('user').value
    var passwd = document.getElementById('pass').value
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/bslogin')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var loggedin = JSON.parse(this.responseText)
            if (loggedin.login == false) {
                document.getElementById('incorrect').innerHTML = 'The username or password you have entered is incorrect.'
            }
            if (loggedin.login == true) {
                xhr = new XMLHttpRequest;
                xhr.open('GET', '/bshomepage')
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById('body').innerHTML = this.responseText
                        document.getElementById('heading').innerHTML = 'Hello, ' + user
                    }
                }
                xhr.send()
            }
        }
    }
    xhr.send(JSON.stringify({'username': user, 'password': passwd}))
}
function createaccount() {
    xhr = new XMLHttpRequest;
    xhr.open('GET', '/bscreateaccount')
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var newpage = this.responseText
            document.getElementById('body').innerHTML = newpage
        }
    }
    xhr.send()
}
function newaccount() {
    window.user = document.getElementById('user').value;
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    if (pass1 != pass2) {
        document.getElementById('p').innerHTML = 'The passwords you have entered do not match'
        return false;
    }
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/newaccount')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = JSON.parse(this.responseText)
            if (resp.created == false) {
                document.getElementById('p').innerHTML = 'This username is taken. Please chose another.'
            }
            if (resp.created == true) {
                xhr = new XMLHttpRequest;
                xhr.open('GET', '/bshomepage')
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById('body').innerHTML = this.responseText
                        document.getElementById('heading').innerHTML = 'Hello, ' + user
                    }
                }
                xhr.send()
            }
        }
    }
    xhr.send(JSON.stringify({'username': user, 'password': pass1}))
}
function creategame() {
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/bscreategame')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.game = JSON.parse(this.responseText)
            setInterval(getgamestatus, 100)
            getnewgameboard()
        }
    }
    xhr.send()
}
function getjoingame() {
    xhr = new XMLHttpRequest;
    xhr.open('GET', '/bsgetjoingame')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('body').innerHTML = this.responseText
            document.getElementById('header').innerHTML = 'Hello, ' + user
        }
    }
    xhr.send()
}
function joingame() {
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/bsjoingame')
    xhr.setRequestHeader('content-type', 'application/json')
    var gid = document.getElementById('gameID').value
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 'No game with this ID') {
                document.getElementById('no-game').innerHTML = 'No game with this ID.'
            }
            else if (this.responseText == 'Game is full'){
                document.getElementById('no-game').innerHTML = 'The game you are trying to join is full.'
            }
            else {
                window.game = JSON.parse(this.responseText)
                setInterval(getgamestatus, 100)
                getnewgameboard()
            }
        }
    }
    xhr.send(JSON.stringify({'gameID': gid}))
}
function getnewgameboard() {
    xhr = new XMLHttpRequest;
    xhr.open('GET', '/bsgetnewgameboard')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('body').innerHTML = this.responseText
            setTimeout(loadTable(), 100)
        }
    }
    xhr.send()
}
function loadTable() {
    for (i = 0; i < 10; i++) {
        var board1 = document.getElementById('board1')
        var board2 = document.getElementById('board2')
        var row = document.createElement('tr')
        var row2 = document.createElement('tr')
        row.id = i
        row2.id = "1" + i
        board1.appendChild(row)
        board2.appendChild(row2)
        for (g = 0; g < 10; g++) {
            var cell = document.createElement('td')
            var cell2 = document.createElement('td')
            cell2.id = "1" + i + g
            cell.id = i.toString(10) + g
            cell2.onclick = function() {fire(this.id)}
            cell.style.backgroundColor = '#111188'
            cell2.style.backgroundColor = '#111188'
            row.appendChild(cell)
            row2.appendChild(cell2)
        }
    }
    document.getElementById('gid').innerHTML = 'The Game ID is: ' + game.gameID
    var ships = game.board[0]
    for (ship of ships) {
        if (ship[0] == 'ver') {
            for (i = 0; i < ship[1]; i++) {
                var xpos = ship[2][0]
                var ypos = ship[2][1] + i
                document.getElementById(ypos.toString() + xpos.toString()).style.backgroundColor = 'grey'
            }
        } else {
            for (i = 0; i < ship[1]; i++) {
                var xpos = ship[2][0] + i
                var ypos = ship[2][1]
                document.getElementById(ypos.toString() + xpos.toString()).style.backgroundColor = 'grey'
            }

        }
    }
}
function fire(id) {
    console.log('pllooop')
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/bsfire')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(JSON.stringify({'gameID': game.gameID, 'xpos': id.charAt(2), 'ypos': id.charAt(1)}))
}
function getgamestatus() {
    xhr = new XMLHttpRequest;
    xhr.open('PUT','/bsgetgamestatus')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange =  function() {
        if (this.readyState == 4 && this.status == 200){
            gamestate = JSON.parse(this.responseText)
            if (gamestate.winner) {
                document.getElementById('winner').innerHTML = gamestate.winner + ' wins!'
            }
            board = gamestate.board[1]
            ships = gamestate.board[0]
            for (i = 0; i < 10; i++){
                for (j = 0; j < 10; j++){
                    if (board[i][j] == 0) {
                        document.getElementById('1' + i + j).style.backgroundColor = '#111188'
                    } else if (board[i][j] == 1){
                        document.getElementById('1' + i + j).style.backgroundColor = 'white'
                    } else if (board[i][j] == 2){
                        document.getElementById('1' + i + j).style.backgroundColor = 'orange'
                    } else {
                        document.getElementById('1' + i + j).style.backgroundColor = 'red'
                    }
                }
            }
            var players = gamestate.players
            if (players.length != 2) {
                var turn = 'Waiting for Opponent...'
            } else {
                var turn = gamestate.turn + "'s turn..."
            }
            document.getElementById('turn').innerHTML = turn
            if (gamestate.shot) {
                if (gamestate.shot[0] != gamestate.user) {
                    var shotat = document.getElementById(gamestate.shot[2].toString() + gamestate.shot[1].toString())
                    if (gamestate.shot[3] == 'miss') {
                        shotat.style.backgroundColor = 'white'
                    } else {
                        shotat.style.backgroundColor = 'orange'
                    }
                }
            }
        }
    }
    xhr.send(JSON.stringify({'gameID': game.gameID}))
}
function logout() {
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/logout')
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xhr = new XMLHttpRequest;
            xhr.open('GET', '/battleship')
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById('body').innerHTML = this.responseText
                }
            }
            xhr.send()
        }
    }
    xhr.send()
}