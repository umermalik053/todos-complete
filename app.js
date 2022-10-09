

// let api = 'https://amethyst-caterpillar-boot.cyclic.app/'
let api = 'https://easy-teal-salamander-hose.cyclic.app';
function Classid() {
    let id = document.querySelector("#classid").value
    axios.post('/id', {
        classid: id


    })
        .then(function (response) {
            console.log(response)
        })




}
function list() {
    document.querySelector("#addData").innerHTML = ""
    let data = document.querySelector("#addData")
    // console.log(data);
    axios.post(`${api}/todo`, {
        text: data.value
    })
        .then(function (response) {
            document.querySelector("#result").innerHTML = ""
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
            // document.querySelector("#result").innerHTML = "Data";
            // console.log(response.data)
            response.data.data.map(eachTodo => {
                document.querySelector("#result").innerHTML += eachTodo.text
                document.querySelector("#result").innerHTML += "<br>"
                console.log("eachTodo",eachTodo);
                // renderItems(eachTodo)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}
function removelist() {
    let code = prompt("Enter Password ")
    if (code === "Malik") {
        axios.delete(`${api}/todos`)
        document.querySelector("#addData").value = ""
        renderItems()
    } else alert("Worng Password")
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
allList()
// setInterval(allList, 5000)