const sectionsWrapper = document.getElementById('sections');

const res = fetch('get-sections.php')
.then(res => res.json())
.then(data => {
    console.log("BD", data);
    data.sections.forEach( section =>{
        console.log("Seccion Info BD", section);
        sectionsWrapper.innerHTML += createSection(section.id, section.title);
    })
}).then(()=>{
    console.log("¡Todas las secciones han sido creadas!");
    readSections();
}

)
.catch(error => {
    console.log("Error", error);
});


function createSection(id,title){
    return `
    <div class="section" data-section-id="${id}">
        <div class="section__header">
            <h2 class="section__name" contenteditable="true">${title}</h2>
        </div>
        <div class="items">
            <button id="add-item-${id}" class="add-item">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M16.5 3.5a.5.5 0 0 0-1 0v12h-12a.5.5 0 0 0 0 1h12v12a.5.5 0 0 0 1 0v-12h12a.5.5 0 0 0 0-1h-12z"/></svg>
            </span>
            Agregar item</button>
        </div>
        <div class="section__footer">
            <div>
                <span>Total:</span>
                <span class="total-input">$0</span>
            </div>
            <span class="total-hours">0h</span>
        </div>
    </div>
    `;
}