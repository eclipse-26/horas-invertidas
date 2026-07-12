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
            <div class="item">  
                <div>
                    <span>Item:</span>
                    <span class="input">$0</span>
                </div>
                <span class="hour">0h</span>
            </div>
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