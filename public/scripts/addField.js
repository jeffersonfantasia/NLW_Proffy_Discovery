//procurar o botao
document.querySelector('#add-time')
//quando clicar no botão
    .addEventListener('click', cloneField)

//executar uma ação
function cloneField(){
    
    //duplicar os campos. Quais campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //pegar os campos. Quais campos?
    const fields = newFieldContainer.querySelectorAll('input')

    //para cada campo, limpar
   fields.forEach(function(field){
       //pegar o campo do momento e limpar ele
       field.value = ""
   })

    //colocar na pagina. Aonde?
     document.querySelector('#schedule-items').appendChild(newFieldContainer)
}