document.addEventListener('DOMContentLoaded', ()=>{
    const expenseInput = document.getElementById("expense-input")
    const amountInput = document.getElementById("amount-input")
    const addExpensebtn = document.getElementById("Add-expense-btn")
    const total = document.getElementById("total")
    const expenseList = document.getElementById("expense-list")

    const list = {}
    addExpensebtn.addEventListener('click', ()=>{
        const Item = expenseInput.value.trim();
        const amount = amountInput.value.trim();
        if(!Item || !amount){
            alert("invalid")
        }
        list[Item]=amount;
        renderItems(Item)
        expenseInput.value = ""
        amountInput.value = ""
    console.log(list);    

    })
    function renderItems(item){
        const li = document.createElement('li')
        li.innerHTML = `
    <span>${item.text}</span>
    <button>Delete</button>
    `;
    expenseList.appendChild(li)
    }
})
