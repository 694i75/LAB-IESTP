# Laboratorios Virtuales IESTP-ESPINAR

Portal educativo de código abierto con simuladores web y rutas de aprendizaje para acompañar la formación técnica del Instituto de Educación Superior Tecnológico Público Espinar.

El proyecto reúne prácticas interactivas para cinco áreas: **Minería, Agropecuaria, Mecánica, Electrónica y APSTI** (Administración de Plataformas y Servicios de Tecnologías de la Información). Su propósito es servir como recurso didáctico; los datos y resultados de los simuladores son referenciales.

## Contenido

- [Características](#características)
- [Requisitos](#requisitos)
- [Ejecución local](#ejecución-local)
- [Uso del portal](#uso-del-portal)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Acceso y seguridad](#acceso-y-seguridad)
- [Alcance educativo](#alcance-educativo)

## Características

- Interfaz adaptable a computadoras, tabletas y celulares.
- Pantalla de acceso previa al portal, con selección de perfil de estudiante o administrador.
- Navegación por laboratorios y panel de administración local.
- Rutas de formación técnica superior organizadas en tres años para cada carrera.
- Competencias y recursos por especialidad, con pestañas para libros y bibliotecas abiertas, manuales/guías y fuentes confiables.
- Enlaces a repositorios institucionales y editoriales para consultar publicaciones y leer o descargar PDF cuando la licencia y el proveedor lo permiten.
- Descarga de guías referenciales en formato `.txt`.
- Simuladores y actividades técnicas por carrera: caracterización, control QA/QC, estimación geométrica e identificación de minerales en Minería; telemetría, programación de riego, cálculo de nutrientes y consulta educativa de productos veterinarios/agropecuarios en Agropecuaria; inventario, análisis FMEA, transmisión, componentes e intervalos didácticos de mantenimiento en Mecánica; lógica de control, instrumentación 4–20 mA, ley de Ohm y dimensionamiento teórico de resistor para LED en Electrónica; ofimática, compatibilidad de hardware, cableado T568B, consola aislada, catálogo de servicios TI y cálculo local de subredes en APSTI.
- Preferencia para recordar el nombre de usuario; la contraseña no se almacena.

## Requisitos

- Un navegador actualizado con soporte para JavaScript moderno y módulos ES.
- Un servidor web local para servir los archivos. **No abras `index.html` directamente** como archivo, porque el portal carga vistas y módulos con `fetch` e importaciones de JavaScript.
- Python 3 para la opción de ejecución por terminal, o una extensión de servidor local para Visual Studio Code.

No se requiere instalar paquetes: el proyecto no usa un gestor de dependencias.

## Ejecución local

### Con Python

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
python -m http.server 8000
```

Si Windows no reconoce `python`, prueba:

```powershell
py -m http.server 8000
```

Después, visita [http://localhost:8000](http://localhost:8000). Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.

### Con Visual Studio Code

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Inicia un servidor local con una extensión como **Live Server**.
3. Abre `index.html` desde el servidor, no desde el sistema de archivos.

## Uso del portal

1. Inicia el portal desde un servidor local. Si abriste `index.html` directamente desde el disco, vuelve a la carpeta del proyecto y sigue los pasos de [Ejecución local](#ejecución-local).
2. Escribe cualquier nombre de usuario y una de las contraseñas ficticias correspondientes:

   | Perfil | Usuario de ejemplo | Contraseña de ejemplo |
   |---|---|---|
   | Estudiante | `estudiante01` | `ClavePrueba123` |
   | Administrador | `admin-demo` | `AdminPrueba123` |

   **Son claves ficticias de demostración, no cuentas institucionales.** El perfil se selecciona comparando la contraseña en JavaScript del navegador; no es un control de acceso seguro.
3. Selecciona **Ingresar al sistema** para abrir el portal con el perfil asociado a la contraseña.
4. Usa el menú lateral para entrar a una carrera y explorar su simulador y ruta de aprendizaje.
5. En las rutas, cambia entre los años y las pestañas de libros, manuales y fuentes para consultar material técnico de nivel superior. Cada enlace abre el repositorio o editor original; la disponibilidad de PDF depende de sus licencias.
6. En cada laboratorio, usa las pestañas para cambiar de práctica y los selectores desplegables para explorar minerales, productos, componentes o servicios. Los cálculos y catálogos son didácticos: no sustituyen indicaciones veterinarias, etiquetas registradas, manuales de fabricantes ni procedimientos de seguridad.
7. Usa **Salir** para volver a la pantalla inicial.

## Estructura del proyecto

```text
.
├── index.html                         # Acceso y estructura principal del portal
├── README.md
├── logo-iestp (1).png                 # Escudo institucional
├── assets/
│   └── fondo-campus.png               # Imagen de fondo de la pantalla de acceso
├── css/
│   └── estilos.css                    # Estilos globales y diseño adaptable
└── js/
    ├── app.js                         # Sesión local, navegación y carga de vistas
    ├── fondo-tecnologico.js           # Fondo animado
    ├── guias.js                       # Rutas formativas y descargas
    └── modulos/
        ├── administracion/            # Panel de gestión local
        ├── agropecuaria/              # Sensores y alertas climáticas simuladas
        ├── apsti/                     # Ofimática, hardware, cableado y terminal TI
        ├── electronica/               # Circuitos y controladores didácticos
        ├── mecanica/                  # Inventario y reportes de mantenimiento
        └── mineria/                   # Datos de referencia y simulador
```

## Acceso y seguridad

El inicio de sesión actual **es una simulación del lado del navegador**, no valida cuentas institucionales. Las contraseñas de ejemplo están visibles en el código JavaScript y cualquiera puede inspeccionarlo o modificar el estado local; la clave de administrador solo cambia la interfaz y no protege el panel. Los datos de gestión se guardan en el navegador y no se envían a un servidor. No publiques claves reales ni uses estas claves ficticias como protección.

No introduzcas contraseñas reales ni información personal. Para un uso institucional, se necesita conectar un servicio de autenticación y autorización del lado del servidor, además de definir el almacenamiento y protección de los datos.

## Alcance educativo

Las rutas y actividades son material de apoyo de nivel técnico superior, no sílabos oficiales ni sustitutos de prácticas presenciales o protocolos de seguridad. Los enlaces llevan a catálogos con colecciones extensas y a fuentes oficiales; cada institución determina el acceso, la licencia y la disponibilidad de sus publicaciones. El portal no copia libros protegidos ni aloja cientos de archivos ajenos. Confirma la malla curricular y los recursos vigentes con la coordinación académica del IESTP-ESPINAR.
