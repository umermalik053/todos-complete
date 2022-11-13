

let api = 'https://easy-teal-salamander-hose.cyclic.app'
// let api = (document.location.protocol === 'https:') ?
//     "https"
//     :
//     "http://localhost:3000";


function list() {
    // document.querySelector("#addData").innerHTML = ""
    let data = document.querySelector("#addData").value
    // console.log(data);
    axios.post(`${api}/todo`, {
        text: data
    })
        .then(function (response) {
            allList();
            console.log(response.data)

            document.querySelector("#message").innerHTML = response.data.message
            setTimeout(() => {
                document.querySelector("#message").innerHTML = "";
            }, 2000)
            // document.querySelector("#result").innerHTML = response.data.text
            console.log(response.data)
            response.data.data.map(eachTodo => {
                renderItems(eachTodo)
            })
        })
        .catch(function (error) {
            // document.querySelector("#Wdata").innerHTML = error
            console.log(error);
        })
    data.value = ''
}
function allList() {
    axios.get(`${api}/todos`)
        .then(function (response) {
            document.querySelector("#result").innerHTML = " ";
            // console.log(response.data)
            response.data.data.map(eachTodo => {
                document.querySelector("#result").innerHTML += `<span id='span-${eachTodo._id}'>${eachTodo.text}</span>`;
                document.querySelector("#result").innerHTML +=
                    `<form id='form-${eachTodo._id}' style="display: none;" onsubmit="updatetodo('${eachTodo._id} ');return false" '>
                <input id='input-${eachTodo._id}' value='${eachTodo.text}' />
                <button id="button1" type="submit"> 
                Update
</button>
 
 
 


                </form>`
            
                document.querySelector("#result").innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left:100px; display:flex; justify-content:flex-end; margin-bottom:10px; "><i id='delete-${eachTodo._id}'onclick="deleteone('${eachTodo._id}')" class="fa-solid fa-trash"style="color:red"></i>
                &nbsp;<i onclick="editTodo('${eachTodo._id}')" id='edit-${eachTodo._id}'  class="fa-solid fa-pen-to-square"></i></span>`
                document.querySelector("#result").innerHTML += "<br>"
                console.log("eachTodo", eachTodo);
                // renderItems(eachTodo)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}
let removelist = async () => {

    try {
        let response = await axios.delete(`${api}/todos`)
        let code = prompt("Enter Password ")
        if (code === "Malik") {
            document.querySelector("#message").innerHTML = response.data.message
            setTimeout(() => {
                document.querySelector("#message").innerHTML = ""
            }, 2000);

            document.querySelector("#result").innerHTML = "";
        } else alert("wrong password")
    } catch (error) {
        console.log("error: ", error);
    }


}

function renderItems(item) {
    if (item) {
        let todo = `<ul class="list-group list-group-horizontal rounded-0 bg-transparent">
    <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      <p class="lead fw-normal mb-0">${item}</p>
    </li>
        </ul>`
        document.querySelector("#result").innerHTML += todo
    } else {
        document.querySelector("#result").innerHTML = ''
    }

}
let deleteone = async (id) => {
    try {
        let response = await axios.delete(`${api}/todo/${id}`)

        document.querySelector("#message").innerHTML += response.data.message
        setTimeout(() => {
            document.querySelector("#message").innerHTML = ""
        }, 2000);
        allList();
    } catch (error) {
        console.log("error: ", error)
    }
}
let editTodo = async (id) => {

    console.log("edit id: ", id)
    document.querySelector(`#form-${id}`).style.display = "inline"

    document.querySelector(`#span-${id}`).style.display = "none"
    document.querySelector(`#delete-${id}`).style.display = "none"
    document.querySelector(`#edit-${id}`).style.display = "none"
}

let updatetodo = async (id) => {
    console.log("update id",id)
    let updated = document.querySelector(`#input-${id}`).value
    try {
        let response = await axios.put(`${api}/todo/${id}`,{
            text:updated
        })

        document.querySelector("#message").innerHTML += response.data.message
        setTimeout(() => {
            document.querySelector("#message").innerHTML = ""
        }, 2000);
        allList();
    } catch (error) {
        console.log("error: ", error)
    }
}
allList()
// setInterval(allList, 500)


// document.querySelector("#result").innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;<><button id='delete-${eachTodo._id}'onclick="deleteone('${eachTodo._id}')"><i class="fa-solid fa-trash"style="color:red"></i></button>
//                 &nbsp;<button id='edit-${eachTodo._id}'onclick="editone('${eachTodo.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`
//                 document.querySelector("#result").innerHTML += "<br>"
//                 console.log("eachTodo", eachTodo);
//                 // renderItems(eachTodo)