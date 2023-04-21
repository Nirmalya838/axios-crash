function savedata(event)
{
    event.preventDefault();
    let firstname = event.target.fname.value;
    let lastname = event.target.lname.value;
    let address = event.target.add.value;
    let city = event.target.city.value;
    let state = event.target.state.value;
    let pincode = event.target.pin.value;
    let phone = event.target.ph.value;
    let date = event.target.date.value;

    // localStorage.setItem("Firstname", firstname);
    // localStorage.setItem("Lastname", lastname);
    // localStorage.setItem("Address", address);
    // localStorage.setItem("City", city);
    // localStorage.setItem("State", state);
    // localStorage.setItem("Pincode", pincode);
    // localStorage.setItem("Phone", phone);
    // localStorage.setItem("Date", date);

    let cli ={
        firstname,
        lastname,
        address,
        city,
        state,
        pincode,
        phone,
        date
    }

        axios.post("https://crudcrud.com/api/eab0b5aec660402f9149fb8096fefebe/Data",cli)
        .then((response)=>{
            //showuser(response.data)
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })



    // let res=JSON.stringify(cli)
    // localStorage.setItem(firstname, res)
    // console.log(localStorage)
    showuser(cli)

    function showuser(cli)
    {   
        let parentElem= document.getElementById("listOfitems");
        let childElem = document.createElement("li");
        childElem.textContent = cli.firstname + "-" + cli.city + "-" + cli.date + "-" + cli.phone
        parentElem.appendChild(childElem);
        
        let deletebutton = document.createElement("input");
        deletebutton.type = "button";
        deletebutton.value = "Delete";
        deletebutton.onclick = () => {
            localStorage.removeItem(cli.email);
            parentElem.removeChild(childElem);
        }
        let editbutton = document.createElement("input")
        editbutton.type = "button";
        editbutton.value = "Edit";
        editbutton.onclick = () => {
            localStorage.removeItem(cli.phone)
            parentElem.removeChild(childElem)
            document.getElementById("phoneInputTag").value = cli.phone
        }
        
        childElem.appendChild(deletebutton)
        childElem.appendChild(editbutton)
        parentElem.appendChild(childElem)
    }
}