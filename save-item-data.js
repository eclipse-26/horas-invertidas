
function readItems(){

    const itemEls = document.querySelectorAll('.item');

    console.log(itemEls);

    itemEls.forEach(item =>{
        const itemTitleEl = item.querySelector('.item__title');
        if(itemTitleEl){
            console.log(itemTitleEl);
            itemTitleEl.addEventListener('focusout', (title) =>{
                console.log(item.dataset.itemId);
                console.log(title.target.textContent);
                updateItemTitle(item.dataset.itemId, title.target.textContent);
            })
        }
        const itemAmountEl = item.querySelector('.item__amount');
        if(itemAmountEl){
            console.log(itemAmountEl);
            itemAmountEl.addEventListener('focusout', (amount) =>{
                console.log(item.dataset.itemId);
                console.log(amount.target.textContent);
                updateItemAmount(item.dataset.itemId, parseInt(amount.target.textContent));
            })
        }
    })
}
    

function updateItemTitle(id, title){
    fetch('save-item-title.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: id, 
            title: title
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Titulo de Item guardado en bd:", data);
    })
}

function updateItemAmount(id, amount){
    fetch('save-item-amount.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
            id: id, 
            amount: amount
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Valor de Item guardado en bd:", data);
        calculateTime();
    })
}