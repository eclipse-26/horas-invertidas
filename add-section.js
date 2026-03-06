const addSectionButton = document.getElementById("add-section");

addSectionButton.addEventListener("click", ()=>{
        fetch('add-section.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: "Nombre..."
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Sección guardada:", data);
        })
})