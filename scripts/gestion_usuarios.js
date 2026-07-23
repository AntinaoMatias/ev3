$(document).ready(function () {

    $('.alert').each(function () {
        $(this).hide();
    });

    $('#inputNombre, #inputUsuario').on('change keyup', function () {
        validarInput($(this));
    });

    $('#inputFechaIngreso').on('change keyup', function () {
        validarFecha($(this));
    });

    $('#inputEmail').on('change keyup', function () {
        validarEmail($(this));
    });

    $('#btnGuardar').click(function () {
        validarFormulario();
    });

    $('#btnCancelar').click(function () {
        limpiarFormulario();
    });

    $('#inputSitioWeb').on('change keyup', function () {
        validarSitioWeb($(this));
    });
});

function validarFormulario() {
    const inputNombre = $('#inputNombre');
    const inputUsuario = $('#inputUsuario');
    const inputFechaIngreso = $('#inputFechaIngreso');
    const inputEmail = $('#inputEmail');
    const inputSitioWeb = $('#inputSitioWeb');

    let formularioValido = true;

    if (!validarInput(inputNombre)) { formularioValido = false; }
    if (!validarInput(inputUsuario)) { formularioValido = false; }
    if (!validarFecha(inputFechaIngreso)) { formularioValido = false; }
    if (!validarEmail(inputEmail)) { formularioValido = false; }
    if (!validarSitioWeb(inputSitioWeb)) { formularioValido = false; }

    if (formularioValido) {
        alert('¡Formulario Válido!\nEl usuario ha sido registrado correctamente.');
        limpiarFormulario();
        window.location.href = './index.html';
    } else {
        alert('¡Formulario Inválido!\nRevise los campos en rojo.');
    }
}

function validarInput(input) {
    if (input.val() == '') {
        input.next().removeClass('d-none').show().text('Campo Obligatorio!');
        input.removeClass('is-valid').addClass('is-invalid');
        return false;
    } else {
        input.next().hide().text('');
        input.removeClass('is-invalid').addClass('is-valid');
        return true;
    }
}

function validarFecha(input) {
    const regexFechaISO = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (validarInput(input)) {
        if (regexFechaISO.test(input.val().trim())) {
            input.next().hide().text('');
            input.removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            input.next().removeClass('d-none').show().text('¡Por favor seleccione una fecha válida!');
            input.removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }
    return false;
}

function validarEmail(input) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (validarInput(input)) {
        if (regexEmail.test(input.val().trim())) {
            input.next().hide().text('');
            input.removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            input.next().removeClass('d-none').show().text('Correo Inválido! Ej: nombre@servidor.com');
            input.removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }
    return false;
}

function validarSitioWeb(input) {
    const valor = input.val().trim();

    if (valor === '') {
        input.next().addClass('d-none').hide().text('');
        input.removeClass('is-invalid is-valid');
        return true;
    }

    const regexURL = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(:\d{1,5})?(\/.*)?$/i;

    if (regexURL.test(valor)) {
        input.next().addClass('d-none').hide().text('');
        input.removeClass('is-invalid').addClass('is-valid');
        return true;
    } else {
        input.next().removeClass('d-none').show().text('¡Sitio Web Inválido! Ej: https://ejemplo.com');
        input.removeClass('is-valid').addClass('is-invalid');
        return false;
    }
}

function limpiarFormulario() {
    const formulario = $('#formularioUsuario');
    formulario.find('input, select').val('').removeClass('is-valid is-invalid');
    $('.alert').hide().text('');
}