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

        axios.post("https://crudcrud.com/api/4a068296960e4ed88fc2886095e0f964/Data",cli)
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
                editUser(cli._id);
        }
        
        childElem.appendChild(deletebutton)
        childElem.appendChild(editbutton)
        parentElem.appendChild(childElem)
    }


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/4a068296960e4ed88fc2886095e0f964/Data")
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
    axios.delete(`https://crudcrud.com/api/4a068296960e4ed88fc2886095e0f964/Data/${userId}`)
        .then(res => {
            parentElem.removeChild(childElem); // Remove the deleted item from the list on the web page
            console.log(res);
        })
        .catch(err => console.error(err));
}

function editUser(userId) {
    let parentElem = document.getElementById("listOfitems");
    let childElem = document.getElementById(userId);

    let firstname = childElem.querySelector(".fname").value;
    let lastname = childElem.querySelector(".lname").value;
    let address = childElem.querySelector(".add").value;
    let city = childElem.querySelector(".city").value;
    let state = childElem.querySelector(".state").value;
    let pincode = childElem.querySelector(".pin").value;
    let phone = childElem.querySelector(".ph").value;
    let date = childElem.querySelector(".date").value;

    let cli = {
        firstname,
        lastname,
        address,
        city,
        state,
        pincode,
        phone,
        date
    }

    axios.put(`https://crudcrud.com/api/4a068296960e4ed88fc2886095e0f964/Data/${userId}`, cli)
        .then(res => {
            childElem.textContent = cli.firstname + "-" + cli.city + "-" + cli.date + "-" + cli.phone ;
            // Update the displayed user information with edited data
            childElem.querySelector(".fname").value = cli.firstname;
            childElem.querySelector(".lname").value = cli.lastname;
            childElem.querySelector(".add").value = cli.address;
            childElem.querySelector(".city").value = cli.city;
            childElem.querySelector(".state").value = cli.state;
            childElem.querySelector(".pin").value = cli.pincode;
            childElem.querySelector(".ph").value = cli.phone;
            childElem.querySelector(".date").value = cli.date;
            console.log(res);
        })
        .catch(err => console.error(err));
}
