'strict'
console.log("funcionando");

const valueHour = 34500 - (34500*0.06);
const sections = document.querySelectorAll('.inversiones .section');
const totalHoursElements = document.querySelectorAll('.hour');
const totalHoursElement = document.querySelector('.hours-bar__total-hours');
const hoursBarElement = document.querySelector('.hours-bar');
const workTime = parseInt(document.querySelector('.work-time').textContent.split("h").join(""));

console.log(valueHour)

let totalHours = 0;
let count = 1;

sections.forEach(section => {
    totalSection(section);
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
    console.log(totalHours);
}

totalHoursElement.textContent = totalHours + "h";
hoursBarElement.style.setProperty('--total-hours', totalHours);
hoursBarElement.style.setProperty('--work-time', workTime);




