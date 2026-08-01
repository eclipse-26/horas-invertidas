function readAddItemButtons(){
    const addItemButtons = document.querySelectorAll(".add-item");

    addItemButtons.forEach( addItemButton =>{
        console.log(addItemButton);
        addItemButton.addEventListener('click', ()=>{
            const sectionId = addItemButton.dataset.addItemId;
            fetch('add-item.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Nombre de item",
                    amount: 34500,
                    section_id: sectionId
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Item Guardado:", data);
                location.reload();
            })
        })
    })
}

function addItem(target){
    // <div class="item">  
    //     <div>
    //         <span>Eventos:</span>
    //         <span class="input">$100.000</span>
    //     </div>
    //     <span class="hour">3h</span>
    // </div>

    // Creamos el nuevo elemento que queremos insertar

    console.log(target.id)

    const newItem = document.createElement("div");
    newItem.classList.add("item");
   
    const newItemDiv = document.createElement("div");
    
    const newItemText = document.createElement("span");
    newItemText.textContent = "Nombre de item";
    newItemText.setAttribute('contenteditable', 'true');

    const newItemDots = document.createElement("span");
    newItemDots.textContent = ": ";

    const newItemSymbol = document.createElement("span");
    newItemSymbol.textContent = "$";
    
    const newItemInput = document.createElement("span");
    newItemInput.textContent = "34.500";
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

    target.before(newItem);
}