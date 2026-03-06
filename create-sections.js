const sectionsWrapper = document.getElementById('sections');

fetch('get-sections.php')
.then(res => res.json())
.then(data => {
    console.log(data);
    data.sections.forEach( section =>{
        console.log("Seccion Info", section);
        sectionsWrapper.innerHTML += createSection(section.id, section.title);
    })
})
.catch(error => {
    console.log("Error", error);
});


function createSection(id,title){
    return `
    <div class="hogar section" section-id="${id}">
            <div class="section__header">
                <h2 contenteditable="true">${title}</h2>
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