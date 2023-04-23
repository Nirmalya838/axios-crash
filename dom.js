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

        axios.post("https://crudcrud.com/api/cb75dd04e73042349200f7002a283b56/Data",cli)
        .then((response)=>{
            //showuser(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })



    // let res=JSON.stringify(cli)
    // localStorage.setItem(firstname, res)
    // console.log(localStorage)
    showuser(cli)
    }
    function showuser(cli)
    {   
        let parentElem= document.getElementById("listOfitems");
        let childElem = document.createElement("li");
        childElem.id=cli._id;
        childElem.textContent = cli.firstname + "-" + cli.city + "-" + cli.date + "-" + cli.phone
        parentElem.appendChild(childElem);
        
        let deletebutton = document.createElement("input");
        deletebutton.type = "button";
        deletebutton.value = "Delete";
        deletebutton.onclick = () => {
                deleteUser(cli._id); 

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


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/cb75dd04e73042349200f7002a283b56/Data")
        .then((response) => {
            console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                showuser(response.data[i]);
               
            }
        })
        .catch((err) => {
            console.log(err);
        })
});


function deleteUser(userId) 
{
    let parentElem = document.getElementById("listOfitems");
    let childElem = document.getElementById(userId);
    axios.delete(`https://crudcrud.com/api/cb75dd04e73042349200f7002a283b56/Data/${userId}`)
        .then(res => {
            parentElem.removeChild(childElem); // Remove the deleted item from the list on the web page
            console.log(res);
        })
        .catch(err => console.error(err));
}


