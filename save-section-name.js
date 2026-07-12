
function readSections(){

    const sectionsEls = document.querySelectorAll('.section');

    console.log(sectionsEls);

    sectionsEls.forEach(section =>{

        const sectionNameEl = section.querySelector('.section__name');
        if(sectionNameEl){
            console.log(sectionNameEl);
            sectionNameEl.addEventListener('focusout', (name) =>{
                console.log(section.dataset.sectionId);
                console.log(name.target.textContent);
                updateSectionName(section.dataset.sectionId, name.target.textContent)
            })
        }

    })

function updateSectionName(id, name){
    fetch('save-section-name.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: id, 
                name: name 
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("Guardado en bd:", data);
        })
    }
}