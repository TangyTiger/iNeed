function login() {
    email = document.getElementById('email').value
    pass = document.getElementById('pass').value
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/login')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange =  function() {
        if (this.readyState == 4 && this.status == 200) {
            xhr2 = new XMLHttpRequest;
            xhr2.open('GET', '/ineed')
            xhr2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var newpage = this.responseText
                    document.getElementById('body').innerHTML = newpage
                }
            }
            xhr2.send()
        }
    }
    xhr.send(JSON.stringify({'email': email, 'pass': pass}))
}
function createaccount() {
    email = document.getElementById('email').value
    pass = document.getElementById('pass').value
    xhr = new XMLHttpRequest;
    xhr.open('PUT', '/createaccount')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onreadystatechange =  function() {
        if (this.readyState == 4 && this.status == 200) {
            xhr2 = new XMLHttpRequest;
            xhr2.open('GET', '/ineed')
            xhr2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById('body').innerHTML = this.responseText
                }
            }
            xhr2.send()
        }
    }
    xhr.send(JSON.stringify({'email': email, 'pass': pass}))
}

function create_account() {
    xhr = new XMLHttpRequest
    xhr.open('GET', '/get-create')
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var newpage = this.responseText
            document.getElementById('body').innerHTML = newpage
        }
    }
    xhr.send()
}

function homepage() {
    xhr = new XMLHttpRequest
    xhr.open('GET', '/ineed')
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var newpage = this.responseText
            document.getElementById('body').innerHTML = newpage
        }
    }
    xhr.send()
}
