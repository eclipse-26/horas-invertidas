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

