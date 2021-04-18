document.addEventListener('DOMContentLoaded', function() {

    let numpag = obtain(1);
 

    //Crear formulario para envio de datos
    const creaMons = document.querySelector('#create-monster');
    const fmonst = document.createElement('form');
    fmonst.id='monster-form';
    const newNameMonst = document.createElement('input');
    newNameMonst.id='name';
    newNameMonst.placeholder='name...';
    const newAgeMonst = document.createElement('input');
    newAgeMonst.id='age';
    newAgeMonst.placeholder='age...';
    const newDescMonst = document.createElement('input');
    newDescMonst.id='desc';
    newDescMonst.placeholder='description...';
    const envMonst = document.createElement('button');
    envMonst.id='sendMonster';
    envMonst.style.width='100px';
    envMonst.style.height='20px';
    envMonst.innerHTML = 'Create';
    envMonst.style.marginLeft='15px';
    creaMons.appendChild(fmonst);
    fmonst.appendChild(newNameMonst);
    fmonst.appendChild(newAgeMonst);
    fmonst.appendChild(newDescMonst);
    fmonst.appendChild(envMonst);

   
    
    const sendBut = document.querySelector('#sendMonster');
    sendBut.addEventListener('click',(e)=>{
        e.preventDefault();
        newMonst(newNameMonst.value, newAgeMonst.value, newDescMonst.value);
    })

   
    const forwardBut = document.querySelector('#forward');
    forwardBut.addEventListener('click',(e)=>{
        e.preventDefault();
        eraseChild();
        nextMonst();
    })
     
    const backBut = document.querySelector('#back');
    backBut.addEventListener('click',(e)=>{
        e.preventDefault();
        eraseChild();
        befMonst();
    })


    function obtain(pag){
        const url = ` http://localhost:3000/monsters/?_limit=50&_page=${pag}`;
        const listMonst = fetch(url,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(json =>{
            console.log(json);
            showMonsters(json);
        })
        return pag;
    }


    function showMonsters(listMons){
        const monstCont = document.querySelector('#monster-container');
        const oneMonst = listMons.map(function(listMons) {
            const mDiv = document.createElement('div');
            const h2 = document.createElement('h2');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            monstCont.appendChild(mDiv);
            mDiv.appendChild(h2);
            mDiv.appendChild(h4);
            mDiv.appendChild(p);
            h2.innerHTML=listMons.name;
            h4.innerHTML=listMons.age;
            p.innerHTML=listMons.description;
            return listMons.name;
        });
    }

    function eraseChild(){

        let element1 = document.getElementById("monster-container");
        while (element1.firstChild) {
            element1.removeChild(element1.firstChild);
        }
        let erase=true;
        return erase;
    }

    function nextMonst(){
        let incNumPag = ++numpag;
        obtain(incNumPag);
    }

    function befMonst(){
        let incNumPag = (numpag === 1)? 1:--numpag;
        obtain(incNumPag);
    }
  
    function newMonst(newName, newAge, newDesc){
        const url = ` http://localhost:3000/monsters/`;
        const listMonst = fetch(url,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                age: newAge,
                description: newDesc
            })

        })
        .then(resp => resp.json())
        .then(json =>{
            console.log(json);
        })
       
    }
});