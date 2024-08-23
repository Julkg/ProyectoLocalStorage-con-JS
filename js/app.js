//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];




//Even Listeners
eventListeners();

function eventListeners() {
    //CUANDO EL USUARIO AGREGA UN NUEVO TWEET
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documeto esta listo, recuerda que cuando cargue el documento tendran que mostrar los tweets en el local storage
    document.addEventListener('DOMContentLoaded', () => {
        

        // PROBLEMA Aquí tenemos un problema, recordamos que let = tweets es un array vacio y si mandamos a llamar el eventListener de DOMContentLoaded el array de tweets va a ser replazado por lo que salga del localStorage, entonces como localStorege este vacio va a arrojar un null y al llamar la función del crearHTML, que tiene un forEach que es una función para arrays, va a crear un error, porque no puedes usar una función sobre un null.

        // PARA EL PROBLEMA El propone  el siguiente tetodo que al manda a crear un array con los valores del local STORAGE  OR || CREAR UN STRING VACIO
        
        // PARA EL PROBLEMA 
        //////////////////////////////////////////////////////////////////
        // tweets = JSON.parse( localStorage.getItem('tweets')) ||  []; //
        //////////////////////////////////////////////////////////////////
        
        
        // PARA EL PROBLEMA a mi se me ocurrio un IF es verdad que es mas codigo pero queria dejarlo presente, tambien lo dejare activo por si hay un eror buscar y entender cual fue mi erro de razonamiento o ejecucion

        // PARA EL PROBLEMA: En la función de crear HTML hay un if, también podríamos poner como condición && tweets!== null.
        
        if (localStorage.length > 0) {
             tweets = JSON.parse(localStorage.getItem('tweets'));
            
             console.log(tweets);
        crearHTML();
         }
        
    });
}







//Funciones
function agregarTweet(e) {
    e.preventDefault();


    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion de que el textArea no este vacio
    if (tweet==='') {
        console.log('El tweet esta vacio');
        
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    //Creamos un Date.now() que mide los milisegundos de una fecha para aca, esto servira como identificador unico de cada tweet
    const tweetObj = {
        id: Date.now(),
        tweet /** Hay una synstaxis en la que si ela key y el valor es el mismo solamente con poner el nombre de la key basta eso es igual a tweet:tweet o t:tweet */
    }


    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);

    //Crear HTML
    crearHTML();

    //Reuniciar el formulario
    formulario.reset();
    
}

//Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Pasados unos 3 segundo el mensaje se elimina
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Muestra un listado de los tweets


function crearHTML() {

    LimpiarHTML();

    if (tweets.length > 0) {

        tweets.forEach( tweet => {
            //Agregar ub boton de eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = "X";

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
                crearHTML();
            }

            //Crear HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet

            //Añadir el boton
            li.appendChild(btnEliminar);
            
            //Agregarlo al html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agrega los twets actuales a local storage, RECORDAR QUE SOLAMENTE CON SUBIR UN NUEVO ELEMENTO SE ACTUALIZA
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}

//Elimina un tweet

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    console.log(tweets);
}




//Limpiar el HTML esta es la funcion que hemos visto a lo largo del curso que mientras
// tenga un hijo removemos el primer hijo, basicamente va limpiando de a uno el html
function LimpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

