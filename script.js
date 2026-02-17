'strict'
console.log("funcionando");

const valueHour = 34000;
const sections = document.querySelectorAll('.inversiones .section');
const totalHoursElements = document.querySelectorAll('.hour');
const totalHoursElement = document.querySelector('.hours-bar__total-hours');
const hoursBarElement = document.querySelector('.hours-bar');

let totalHours = 0;

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
        const hourValue = Math.round((inputValue / valueHour));
        
        hourElement.textContent = hourValue + "h";
        totalHoursSection += hourValue;
        totalInputsSection += inputValue;
        totalHoursFunc(hourValue);
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
    console.log(totalHours)
}

totalHoursElement.textContent = totalHours + "h";
hoursBarElement.style.setProperty('--total-hours', totalHours)




