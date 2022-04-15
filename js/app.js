// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');



// Listeners
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFrom);
    asunto.addEventListener('blur', validarFrom);
    mensaje.addEventListener('blur', validarFrom);

    // enviar el mail
    formulario.addEventListener('submit', enviarMail);

    // rest form
    btnReset.addEventListener('click', resetForm);
}


// Functions
function iniciarApp(){
    console.log('Init...');
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFrom(e){
    // console.log('Validating...');

    // check type of field
    let tipo = e.target.type;
    // console.log(tipo);
    

    if(e.target.value.length > 0) {
        // remove error messages
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('All fields are mandatory');
    }

    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(tipo === 'email'){
        
        //const resultado = e.target.value.indexOf('@');
        //console.log(resultado);
        if(er.test(e.target.value)){
            // remove error messages
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Enter a valid email');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
    
}

function enviarMail(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Final message
    const parrafo = document.createElement('p');
    parrafo.textContent = 'email sent successfuly';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    // simular el spinner y ocultarlo despues de 3 segundos
    setTimeout( () => {
        spinner.style.display = 'none';

        // insert parrafo before spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout( () => {
            parrafo.remove();
            formulario.reset();
        }, 3000);
    }, 3000 );

}

function resetForm(e) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}