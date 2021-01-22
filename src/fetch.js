function reload() {
    fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (completed = data.acceptedbids));
  }




  
  const delPet = (name) => {
    //delete the pet
    fetch(`http://18.139.110.246:3000/pets/${name}/${username}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());
    //reload petsjson
  };




  const addNewPet = (e) => {
    //console.log(e.detail);
    const pet = e.detail;
    const petname = pet.petname;
    const petcategory = pet.petcategory;
    const petrequirements = pet.petrequirements;
    fetch(
      `http://18.139.110.246:3000/pets?petname=${petname}&pettype=${petcategory}&requirements=${petrequirements}&usernamepo=${username}`,
      {
        method: "POST",
        // METHOD NOT ALLOWED
      }
    )
      .then((resp) => resp.json())
      .then((data) => {})
      .then(() => reload())
      .catch((e) => alert("Can't use pet name!"));

  };