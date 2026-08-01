function readSectionForItems(){
    const sectionElements = document.querySelectorAll('.section');

    const resItems = fetch('get-items.php')
    .then(resItems => resItems.json())
    .then(data => {
        console.log("BD Items", data);
        data.items.forEach( item =>{
        console.log("Item Info BD", item);
        const sectionFinded = document.getElementById('section-'+item.section_id);
        console.log(sectionFinded);
        sectionFinded.querySelector('.items').appendChild(createItem(item.id, item.title, item.amount, item.section_id));
        })
    }).then(()=>{
        console.log("¡Todos los Items han sido creados!");
        readAddItemButtons();
    })
    .catch(error => {
        console.log("Error", error);
    });
}


function createItem(id, title, amount, section_id){

    console.log(id)

    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.setAttribute('data-item-id', id);
   
    const newItemDiv = document.createElement("div");
    
    const newItemText = document.createElement("span");
    newItemText.textContent = title;
    newItemText.setAttribute('contenteditable', 'true');

    const newItemDots = document.createElement("span");
    newItemDots.textContent = ": ";

    const newItemSymbol = document.createElement("span");
    newItemSymbol.textContent = "$";
    
    const newItemInput = document.createElement("span");
    newItemInput.textContent = amount;
    newItemInput.classList.add("input");
    newItemInput.setAttribute('contenteditable', 'true');
    
    newItemDiv.appendChild(newItemText);
    newItemDiv.appendChild(newItemDots);
    newItemDiv.appendChild(newItemSymbol);
    newItemDiv.appendChild(newItemInput);

    newItem.appendChild(newItemDiv);

    const newItemHours = document.createElement("span");
    newItemHours.textContent = "1h";
    newItemHours.classList.add('hour');

    newItem.appendChild(newItemHours);

    return newItem;
}