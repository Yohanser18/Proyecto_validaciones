export function valida(EntradaDatos) {
  const tipoEntrada = EntradaDatos.dataset.tipo;
  if (validadores[tipoEntrada]) {
    validadores[tipoEntrada](EntradaDatos);
  }
  if (EntradaDatos.validity.valid) {
    EntradaDatos.parentElement.classList.remove("input-container--invalid");
    EntradaDatos.parentElement.querySelector(".input-message-error").innerHTML =
      "";
  } else {
    EntradaDatos.parentElement.classList.add("input-container--invalid");
    EntradaDatos.parentElement.querySelector(".inpur-message-error").innerHTML =
      mostrarmensajeDeError(tipoEntrada, EntradaDatos);
  }
}

const tipoError = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensejeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El campo password no puede estar vacio",
    patternMismatch:
      "Al menos 6 caractares, manxiom 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo fecha de nacimiento no puede estar vacio",
    customError: "Debes tener al menos 18 año de edad",
  },
  numero: {
    valueMissing: "El campo numero no puede estar vacio",
    patternMismatch: "El formato requerido es xxxxxxxxxx 10 numeros ",
  },
  dirección: {
    valueMissing: "El campo direccion no puede estar vacio",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo ciudad no puede estar vacio",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
  },
  Estado: {
    valueMissing: "El campo estado no puede estar vacio",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
  },
};

function mostrarmensajeDeError(tipoEntrada, EntradaDatos) {
  let menseje = "";
  tipoError.forEach((error) => {
    if (EntradaDatos.validity[error]) {
      console.log(tipoEntrada, error);
      console.log(EntradaDatos.validity[error]);
      console.log(mensejeError[tipoEntrada][error]);
      menseje = mensejeError[tipoEntrada][error];
    }
  });
  return menseje;
}

const validadores = {
  nacimiento: (EntradaDatos) => validarNacimiento(EntradaDatos),
};

function validarNacimiento(salida) {
  const fechaUsuario = new Date(salida.value);
  let menseje = "";
  if (!mayorEdad(fechaUsuario)) {
    menseje = "Debes al menos tener 18 ano de edad";
  }
  salida.setCustomValidity(menseje);
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferencialFecha = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferencialFecha <= fechaActual;
}
