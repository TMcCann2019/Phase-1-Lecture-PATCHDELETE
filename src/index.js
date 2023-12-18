fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then((data) => renderCharacters(data))

function renderCharacters(charArr) {

    const ul = document.querySelector('ul')

    ul.textContent = ""

    charArr.forEach((charObj) => {

        const li = document.createElement('li')

        const p = document.createElement('p')
        let name = charObj.name
        p.textContent = name
        p.style.color = '#7a2d96'

        const img = document.createElement('img')
        let imgURL = charObj.image
        img.src = imgURL
        img.style.margin = '5px'
        img.style.border = 'solid 2px #7a2d96'

        li.appendChild(p)
        li.appendChild(img)

        //create update form

        const form = document.createElement('form')
        //console.log(form)
        const btn = document.createElement('button')
        const input = document.createElement('input')
        input.placeholder = "character name"
        input.name = "name"
        btn.innerText = "Submit"
        
        //console.log(input)
        form.append(input, btn)
        //if used appendChild would need to have made 2
        li.appendChild(form)

        form.addEventListener('submit', (e) => handleUpdateChar(e))

        function handleUpdateChar(e){
            e.preventDefault()

            //console.log(e.target.name.value)

            let newCharNameObj = {
                name : e.target.name.value
            }
            console.log(e.target.name.value)

            fetch(`http://localhost:3000/characters/${charObj.id}`,
                {
                    method : 'PATCH',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(newCharNameObj)
                }
            )
            .then((resp) => resp.json())
            .then((newCharObj) => renderCharacters(charArr.map((eachCharObj) => eachCharObj.id == charObj.id ? newCharObj : eachCharObj)))
            // .then((newCharObj) => {
            //     const newCharArr = charArr.map((eachCharObj) => {
            //         if(eachCharObj.id == charObj.id){
            //             return newCharObj
            //         }
            //         else {
            //             return eachCharObj
            //         }
            //     })
            //     renderCharacters(newCharArr)
            // })
        }

        const btn2 = document.createElement('button')
        btn2.textContent = "Delete"

        li.appendChild(btn2)
        //btn2.addEventListener('click', handleCharDelete)
        btn2.addEventListener('click', (e) => handleCharDelete(e))

        function handleCharDelete(e){
            fetch(`http://localhost:3000/characters/${charObj.id}`,
            {
                method : 'DELETE'
            })
            .then((resp) => resp.json())
            .then(() => renderCharacters(charArr.filter((eachCharObj) => eachCharObj.id == charObj.id ? false : true)))
            // .then(() => {
            //     const newCharArr = charArr.filter((eachCharObj) =>
            //     {
            //         if(eachCharObj.id == charObj.id){
            //             return false
            //         }else{
            //             return true
            //         }
            //     })
            //     renderCharacters(newCharArr)
            // })
        }

        ul.append(li)
    })
}