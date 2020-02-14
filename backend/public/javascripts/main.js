/*
 * This files holds all the code to for your card game
 */

//Run once broswer has loaded everything
window.onload = function () {
    function get_session() {
      
        return fetch('/Session', {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        })
            .then(function(response)  {
                console.log(response)

                return response
            })

    }
    function get_user(){
        return fetch('/User', {
            headers: { 'Content-Type': 'application/json' },
            method: 'get'
        })
            .then(function(response)  {
                console.log(response)

                return response.json()
                .then(data => {
                    console.log(data)
                    document.getElementById("in_game_username").innerHTML = data['Username']
                    let counters = data['countArray']
                    console.log(`in get_user with counters of type ${typeof(counters)} with value ${counters}`)
                    
                    let counter_table = document.getElementById("counter_table");
                    counters.forEach( count => {
                        let table_row = document.createElement("tr");
                        counter_table.appendChild(table_row);

                                                //COUNT VALUE
                        let count_col = document.createElement("td");
                        count_col.innerHTML = count;
                        count_col.className = "count_cell";
                        table_row.appendChild(count_col);

                        //DEC BUTTON
                        let dec_col = document.createElement("td");
                        let dec_button = document.createElement("button");
                        dec_button.innerHTML = "-";
                        dec_col.className = "count_cell";
                        dec_col.appendChild(dec_button);
                        table_row.appendChild(dec_col);

                        //INC BUTTON
                        let inc_col = document.createElement("td");
                        let inc_button = document.createElement("button");
                        inc_button.innerHTML = "+";
                        inc_col.className = "count_cell";
                        inc_col.appendChild(inc_button);
                        table_row.appendChild(inc_col);



                        


                        

                    })

                  })
            })
          
    }

    get_session()
    .then(function (res) {
        console.log(res)
        if (res["status"] == 200) {
            get_user().then(function(res){
                console.log(res)
            })
            table_1.style.display = "none"
            table_3.style.display = "block"
            log_out.style.display = "block"
            table_4.style.display = "block"
        }
    })

    function add_win(userName) {
        let payload = {
            Username: userName
        }
        return fetch('/win', {
            headers: { 'Content-Type': 'application/json' },
            method: 'put',
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                return response.json()
            })
            .then(data => {
                // Work with JSON data here
                console.log(data['Win'])
                document.getElementById("win_score").value = data['Win']
              })
    }
    function add_lose(userName) {
        let payload = {
            Username: userName
        }
        return fetch('/lose', {
            headers: { 'Content-Type': 'application/json' },
            method: 'put',
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                return response.json()
            })
            .then(data => {
                // Work with JSON data here
               
                document.getElementById("lose_score").value = data['lose']
              })
    }
    function add_tie(userName) {
        let payload = {
            Username: userName
        }
        return fetch('/tie', {
            headers: { 'Content-Type': 'application/json' },
            method: 'put',
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                return response.json()
            })
            .then(data => {
                // Work with JSON data here
                console.log(data['Tie'])
                document.getElementById("tie_score").value = data['Tie']
              })
    }

    function signUp(userName, password, initCounter) {
        console.log(`Passed ${initCounter} to signUp`)
        let counterArray = []
        console.log(`Type of initCounter: ${typeof(initCounter)}`)
        counterArray.push(Number(initCounter))
        let payload = {
            Username: userName,
            password: password,
            countArray: counterArray
        };

        console.log(payload)

        //console.log(payload)
        return fetch('/SignUp', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                //console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    window.alert("Error:  Signup Failed")
                }
            })
            
    }

    function signIn(userName, password) {
        let payload = {
            Username: userName,
            password: password
        };
        return fetch('/SignIn', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                //  console.log(res)
                if (res['status'] == 409) {
                    window.alert('Error:  Account Doesnt Exist or Incorrect Credentials')
                }
                get_user().then(function(res){
                    console.log(res)
                })
                return res

            })
    }


    function log_off(){
        return fetch('/LogOff', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        })
            .then(function(response)  {
                console.log("here")
                return response
            })
    }


    var username_in = document.getElementById("sg_up_us");
    var table1 = document.getElementById("table_1");
    //table_2 is for the sign up table
    var table_2 = document.getElementById("table_2")
    //table_3 is for the main play page
    var table_3 = document.getElementById("table_3")
    var log_out = document.getElementById("log_out")
    var table_4 = document.getElementById("table_4")
    table_2.style.display = "none"
    table_3.style.display = "none"
    log_out.style.display = "none"
    table_4.style.display = "none"

    //after clicking signUp button
    document.getElementById("sup_btn")
        .addEventListener("click", function (e) {
            table1.style.display = "none"
            table_2.style.display = "block"
        })
    //after clicking submit button in signUp page
    document.getElementById("submit_sg_up")
        .addEventListener("click", function (e) {
            pass_1 = document.getElementById("sg_up_ps").value
            pass_2 = document.getElementById("sg_up_ps_2").value
            counter = document.getElementById("sg_up_counter").value
            if (pass_1 == pass_2 && pass_1 != "" && pass_2 != "" && counter !="") {
                console.log(`Counter Value: ${counter}`)
                signUp(username_in.value, pass_1, counter)
                    .then(function (res) {
                        console.log(res)
                
                        if (res == undefined) {
                            window.alert('username already registered')
                        }
                        else{
                            table_1.style.display = "block"
                            table_2.style.display = "none"
                        }
                    })
            }
            else {
                window.alert("two password doesnt match")
            }

        })

        //after clicking signIn button
    document.getElementById("sin_btn")
        .addEventListener("click", function (e) {
            username = document.getElementById("sg_in_us")
            pass = document.getElementById("sg_in_ps")
            console.log(username.value)
            console.log(pass.value)

            signIn(username.value, pass.value)
                .then(function (res) {

                    //if res.status = success
                    if (res['status'] == 200) {
                        table_1.style.display = "none"
                        table_3.style.display = "block"
                        log_out.style.display = "block"
                        table_4.style.display = "block"
                        //display name
                        document.getElementById("in_game_username").value = username.value
                        console.log(username.countArray);

                    }
                })

        })

        //after clicking log_out, delele session
    document.getElementById("log_out")
        .addEventListener("click", function (e) {
            log_off().then(function(res){
                table_3.style.display = "none"
                table_1.style.display = "block"
                table_4.style.display = "none"
        })
            
        })
        //win
    document.getElementById('win_btn')
        .addEventListener("click", function (e) {
            console.log("add_win")
            username = document.getElementById("sg_in_us")
            console.log(username.value)
            add_win(username.value)

        })
//lose
    document.getElementById("lose_btn")
        .addEventListener("click", function (e) {
            console.log("add_lose");
            username = document.getElementById("sg_in_us")
            add_lose(username.value)
        })
//tie
    document.getElementById("tie_btn")
        .addEventListener("click", function (e) {
            console.log("add_tie");
            username = document.getElementById("sg_in_us")
            add_tie(username.value)
        })


};
