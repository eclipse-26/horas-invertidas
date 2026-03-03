'strict'
console.log("funcionando");

const valueHour = 34500 - (34500*0.06);
const sections = document.querySelectorAll('.inversiones .section');
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
        const hourValue = Math.round(inputValue / valueHour);

        
        
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