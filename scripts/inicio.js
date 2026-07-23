$(document).ready(function () {
    let tablaDT = null;

    $('#btnCargarDatos').click(function () {
        const recurso = $('#selectTipoData').val();
        cargarDatosAPI(recurso);
    });

    function cargarDatosAPI(recurso) {
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/${recurso}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                renderizarTabla(recurso, data);
            },
            error: function (error) {
                console.error('Error al consultar la API:', error);
                alert('No se pudieron obtener los datos ó\nNo ha seleccionado un recurso válido.\nPor favor, seleccione un recurso y vuelva a intentarlo.');
            }
        });
    }

    function renderizarTabla(recurso, data) {
        if (tablaDT) {
            tablaDT.destroy();
            $('#tablaDinamica').empty();
        }

        let columnas = [];

        if (recurso === 'users') {
            columnas = [
                { title: "ID", data: "id" },
                { title: "Nombre", data: "name" },
                { title: "Usuario", data: "username" },
                { title: "Email", data: "email" },
                { title: "Sitio Web", data: "website" }
            ];
        } 

        else if (recurso === 'posts') {
            columnas = [
                { title: "ID", data: "id" },
                { title: "ID usuario", data: "userId" },
                { title: "Título", data: "title" },
                { title: "Contenido", data: "body" }
            ];
        } 

        else if (recurso === 'comments') {
            columnas = [
                { title: "ID", data: "id" },
                { title: "ID publicación", data: "postId" },
                { title: "Nombre", data: "name" },
                { title: "Email", data: "email" },
                { title: "Comentario", data: "body" }
            ];
        }

        tablaDT = $('#tablaDinamica').DataTable({
            data: data,
            columns: columnas,
            dom: 'tp',
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
            }
        });
    }
});