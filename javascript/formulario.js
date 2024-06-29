
const formulario= document.getElementById("formulario");
const inputs= document.querySelectorAll(".formulario__input");
const name_input= document.getElementById("name");
const lastname_input= document.getElementById("lastname");
const email_input= document.getElementById("email");
const message_input= document.getElementById("message");
const selectRadio= document.querySelectorAll(".formulario__grupo .formulario__input-radio,.formulario__grupo .formulario__input-checkbox");

/*expresiones regulares para validacion*/

const expresiones = {
	
	nombre: /^(?!\s*$).+/, // Letras y espacios, pueden llevar acentos.
	email:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

/*campos de validacion*/

let campos= {
	
	name: false,
	lastname: false,
	email: false,
	radio: false,
	message: false,
	checkbox: false,
	checked: false,
}

/*validar formulario*/

const validarFormulario= (e)=>{
	
	switch(e.target.name){
		
		case "name":
			
			validarCampo(expresiones.nombre, e.target, 'name');
			
		break;
				
		case "lastname":
			
			validarCampo(expresiones.nombre, e.target, 'lastname');
			
		break;
		
		case "email":
			
			validarCampoEmail(expresiones.email, e.target, 'email');
			
		break;
		
		case "message":
			
			validarCampo(expresiones.nombre, e.target, 'message');
			
		break;
		
		default:
		
			validarCampo(expresiones.nombre, name_input, 'name');
			validarCampo(expresiones.nombre, lastname_input, 'lastname');
			validarCampoEmail(expresiones.email, email_input, 'email');
			validarCampo(expresiones.nombre, message_input, 'message');
	}
}


/*valida los campos de texto name, lastname y message*/

const validarCampo= (expresion, input, campo)=>{
	
	const messageError= document.querySelector(`#grupo-${campo} .formulario__input-error`);
	
	
	if(expresion.test(input.value)){
		
		messageError.classList.remove("formulario__input-error-activo");
		campos[campo]= true;
		
		
	}else{
		
		messageError.classList.add("formulario__input-error-activo");
		campos[campo]= false;
	}
	
}
/*valida el campo email*/

const validarCampoEmail= (expresion, input_email, email)=>{
	
	const messageError= document.querySelector('#grupo-email .formulario__input-error');
	
	
	if(expresion.test(input_email.value)){
		
		messageError.classList.remove("formulario__input-error-activo");
		campos['email']= true;
		
	}else{
		
		if(input_email.value.trim().length == 0){
			
			messageError.innerText= "This field is requiered";
			
		}else{
			
			messageError.innerText= "Please enter a valid email address";
		}
		
		messageError.classList.add("formulario__input-error-activo");
		campos['email']= false;
	}

}

/*validando radios y checkbox*/

const validarChecks= (campo)=>{
	
	const messageError= document.querySelector(`#grupo-${campo} .formulario__input-error`);
	const checks= document.getElementsByClassName(`formulario__input-${campo}`);
	const checksArray= Array.from(checks);
	
	let flag= false;
	
	checksArray.forEach((element)=>{
		
		if(element.checked){
			
			flag= true;
			campos[campo]= true;
		}
	})
	
	if(!flag){
		
		messageError.classList.add("formulario__input-error-activo");
		campos[campo]= false;
		
	}else{
		
		messageError.classList.remove("formulario__input-error-activo");
	}
}

/*validando checkbox 2*/

selectRadio.forEach(radio =>{
	
	radio.addEventListener("change", (e)=>{
		
		const campo= e.target.name;
		const messageError= document.querySelector(`#grupo-${campo} .formulario__input-error`);
		messageError.classList.remove("formulario__input-error-activo");
		
	})
})

selectRadio.forEach((radio)=>{
	
	const radiosContainer= document.querySelectorAll(".formulario__radio-container");
	
	radio.addEventListener("change", ()=>{
		
		radiosContainer.forEach(container =>{
			
			container.classList.remove("checked");
			radio.parentElement.classList.add("unchecked");
			
		})
		
		if(radio.checked && radio.name==="radio"){
		
			radio.parentElement.classList.add("checked");
			radio.parentElement.classList.remove("unchecked");
		}
	})
})

/*agregando los eventos a los inputs*/

inputs.forEach((input)=>{
		
		//desencadena un evento cuando presionamos una tecla dentro del input
		input.addEventListener('keyup', validarFormulario);
		
		//desencadena un evento cuando salimos de uno de los campos
		input.addEventListener('blur', validarFormulario);
		
})

/*agregando los eventos a los radios e inputs*/

selectRadio.forEach((option)=>{
	
	option.addEventListener("change", ()=>{
			
		if(option.checked){
			
			campos.checked= true;
		}else{
					
			campos.checked= false;
		}
		
	})
})
	

formulario.addEventListener("submit", (e)=>{
	
	const mensajeConfirmacion= document.getElementById("mensaje-confirmacion");
	
	e.preventDefault();
	validarChecks("radio");
	validarChecks("checkbox");
	validarFormulario(e);
	
	if(campos.name && campos.lastname && campos.email && campos.message && campos.radio && campos.checkbox ){
		
		formulario.reset();
		mensajeConfirmacion.classList.add("mensaje-confirmacion-activo");
		
		setTimeout(() => {
			mensajeConfirmacion.classList.remove("mensaje-confirmacion-activo");
		}, 5000);
	}
});
