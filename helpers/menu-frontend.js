/**
 * Helper que permite construir el menú de navegación para el cliente Web
 * las opciones disponibles estarán con base al role del usuario actualmente logeado
 */

const menuFrontend = (role = 'USER_ROLE') => {
    const menu = [   
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'Progress Bar', url: 'progress' },
                { title: 'Gráficas', url: 'grafica-uno' },
                { title: 'Promesas', url: 'promesas' },
                { title: 'RxJS', url: 'rxjs' },
            ]
        },
        {
            title: 'Mantenimientos',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Usuarios', url: 'usuarios' },      Solo estará disponible para usuarios Administradores
                { title: 'Médicos', url: 'medicos' },
                { title: 'Hospitales', url: 'hospitales' },
            ]
        }
    ];

    // Si el role es de tipo administrador, inyecto opciones de menú adicionales
    if (role === 'ADMIN_ROLE') {
        // Inyecto el mantenimiento de usuarios
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' });
    }

    return menu;
}

module.exports = {
    menuFrontend
}