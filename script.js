'strict'
console.log("funcionando");

const valueHour = 34500 - (34500*0.06);
const sections = document.querySelectorAll('.section');
const totalHoursElements = document.querySelectorAll('.hour');
const totalHoursElement = document.querySelector('.hours-bar__total-hours');
const hoursBarElement = document.querySelector('.hours-bar');
const workTimeElement = document.getElementById('work-time');

let workTime = 0;
let totalHours = 0;
let count = 1;


fetch('get-last-hours.php')
.then(res => res.json())
.then(data => {
    console.log(data);
    console.log(data.last_hours);
    workTime = data.last_hours;

    workTimeElement.textContent = workTime;
    
    sections.forEach(section => {
        totalSection(section);
    });

    totalHoursElement.textContent = totalHours + "h";
    hoursBarElement.style.setProperty('--total-hours', totalHours);
    hoursBarElement.style.setProperty('--work-time', workTime);
})
.catch(error => {
    console.log("Error", error);
});


function totalSection(section){
    const items = section.querySelectorAll('.item');
    const totalHoursElement = section.querySelector('.total-hours');
    const totalInputElement = section.querySelector('.total-input');
    let totalHoursSection = 0;
    let totalInputsSection = 0;

    items.forEach(item => {
        const hourElement = item.querySelector('.hour');
        const inputElement = item.querySelector('.input');
        
        const inputValue = parseInt(inputElement.textContent.split(".").join("").split("$").join(""));
        const result = inputValue / valueHour;
        const hourValue = Math.ceil(result * 2) / 2;

        
        
        hourElement.textContent = hourValue + "h";
        totalHoursSection += hourValue;
        totalInputsSection += inputValue;
        totalHoursFunc(hourValue);
        item.setAttribute('title', 'Horas:' + totalHours + "h");
        item.setAttribute('accumulated-time', totalHours);

        if(totalHours <= workTime){
            item.classList.add('completed')
        }else if(count > 0){
            item.classList.add('current');
            count -=1;
        }
    });

    if(totalHoursElement){
       totalHoursElement.textContent = totalHoursSection + "h";
    }

    if(totalInputElement){
         totalInputElement.textContent = "$" + totalInputsSection.toLocaleString('es-ES');
     }
}

function totalHoursFunc(hour){
    totalHours += hour;
}

workTimeElement.addEventListener('focusout', (el)=>{
    workTime = parseFloat(document.querySelector('.work-time').textContent.split("h").join(""));
    count = 1;

    hoursBarElement.style.setProperty('--work-time', workTime);
    const items = document.querySelectorAll('.item');

    items.forEach(item =>{

        let accumulatedTime = item.getAttribute('accumulated-time');
        item.classList.remove('current');
        item.classList.remove('completed');

        if(accumulatedTime <= workTime){
            item.classList.add('completed');
        }else if(count > 0){
            item.classList.add('current');
            count -=1;
        }
    })
    

    fetch('save-hours.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hours: workTime }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Guardado en bd:", data);
    })
})

function readAddItemButtons(){
    const addItemButtons = document.querySelectorAll(".add-item");

    addItemButtons.forEach( addItemButton =>{
        console.log(addItemButton);
        addItemButton.addEventListener('click', ()=>{
            
            addItem(addItemButton);
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