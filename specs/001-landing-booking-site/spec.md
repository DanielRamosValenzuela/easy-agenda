# Feature Specification: Sitio Completo EasyAgenda — Landing, Páginas y Reservas

**Feature Branch**: `001-landing-booking-site`
**Created**: 2026-02-26
**Status**: Draft
**Input**: User description: "Landing page completa con hero, navbar, footer, calendario, clubes, canchas y todas las páginas necesarias para negocio de reservas de canchas deportivas con datos dummy."

## Clarifications

### Session 2026-02-26

- Q: ¿El flujo principal de reserva debe ser búsqueda centralizada (deporte/ubicación/fecha cruzando clubes) o navegación por club? → A: Búsqueda centralizada (como EasyCancha): barra de búsqueda en hero con deporte/ubicación/fecha → resultados cruzando todos los clubes.
- Q: ¿Incluir sección B2B para dueños de clubes en la landing? → A: Sí, incluir sección en la landing con propuesta de valor para clubes y CTA "Registra tu club".
- Q: ¿Incluir sección de estadísticas/contadores de impacto en la landing? → A: Sí, incluir contadores con datos dummy (ej: +500 clubes, +50.000 reservas, +10.000 jugadores activos).
- Q: ¿Qué deportes debe soportar EasyAgenda? → A: Solo deportes de raqueta: pádel, tenis, squash y racquetball.
- Q: ¿Qué moneda usar para precios? → A: CLP (peso chileno). Formato: $15.000 CLP.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Landing Page y Navegación (Priority: P1)

Un visitante llega al sitio web de EasyAgenda por primera vez. Ve una página de inicio
atractiva con un hero section que comunica inmediatamente el valor del producto e incluye
una barra de búsqueda prominente donde puede seleccionar deporte, ubicación y fecha/hora
para buscar canchas disponibles cruzando todos los clubes. El navbar permite navegar a
todas las secciones del sitio. El footer contiene enlaces útiles, redes sociales y datos
de contacto. La página incluye secciones de características del producto, testimonios de
clientes, una vista previa de precios y un llamado a la acción (CTA) para registrarse.

**Why this priority**: La landing page es la primera impresión del producto. Sin ella,
ninguna otra página tiene contexto ni punto de entrada. Es el MVP mínimo para presentar
el negocio.

**Independent Test**: Se puede verificar navegando a la URL raíz y confirmando que
todas las secciones (hero, features, testimonios, pricing preview, CTA, navbar, footer)
se renderizan correctamente y los enlaces de navegación funcionan.

**Acceptance Scenarios**:

1. **Given** un visitante nuevo, **When** accede a la página principal, **Then** ve un hero section con título, subtítulo y una barra de búsqueda prominente con campos: deporte, ubicación y fecha/hora, visible above the fold
2. **Given** el hero section, **When** el visitante selecciona deporte, ubicación y fecha en la barra de búsqueda y presiona "Buscar", **Then** es redirigido a la página de resultados con canchas disponibles cruzando todos los clubes
3. **Given** la página principal cargada, **When** el visitante hace scroll, **Then** ve secciones de características (mínimo 4), contadores de estadísticas de impacto (ej: +500 clubes, +50.000 reservas, +10.000 jugadores), testimonios (mínimo 3), sección B2B para dueños de clubes con CTA "Registra tu club", preview de precios y CTA final
3. **Given** cualquier página del sitio, **When** el visitante mira el navbar, **Then** ve el logo de EasyAgenda y enlaces a: Inicio, Clubes, Canchas, Precios, Contacto
4. **Given** cualquier página del sitio, **When** el visitante mira el footer, **Then** ve enlaces de navegación, redes sociales (iconos), datos de contacto y copyright
5. **Given** el navbar en dispositivo móvil, **When** el visitante toca el menú hamburguesa, **Then** se despliega un menú con todos los enlaces de navegación

---

### User Story 2 — Explorar Clubes (Priority: P2)

Un visitante quiere conocer los clubes deportivos disponibles en la plataforma.
Accede a la página de clubes donde ve una lista/grilla de clubes con su imagen, nombre,
ubicación, deportes disponibles y calificación. Puede hacer clic en un club para ver
su página de detalle con información completa: descripción, galería de fotos, horarios,
canchas disponibles, mapa de ubicación y reseñas de usuarios.

**Why this priority**: La exploración de clubes es el segundo paso natural después de
entender el producto. Sin clubes visibles, el usuario no puede avanzar hacia la reserva.

**Independent Test**: Se puede verificar navegando a la página de clubes, confirmando
que se muestran al menos 4 clubes con datos dummy, y que al hacer clic en uno se
navega a su página de detalle con toda la información.

**Acceptance Scenarios**:

1. **Given** el visitante en la página de clubes, **When** la página carga, **Then** ve una grilla de al menos 4 clubes con imagen, nombre, ubicación, deportes y calificación (estrellas)
2. **Given** la lista de clubes, **When** el visitante hace clic en un club, **Then** navega a la página de detalle del club
3. **Given** la página de detalle de un club, **When** carga, **Then** muestra: nombre, descripción, galería de imágenes (placeholder), dirección, horario de atención, lista de canchas disponibles, deportes ofrecidos y reseñas de usuarios dummy
4. **Given** la página de detalle de un club, **When** el visitante ve las canchas, **Then** cada cancha muestra nombre, tipo de deporte, superficie, capacidad y un botón para ver disponibilidad

---

### User Story 3 — Explorar Canchas y Disponibilidad (Priority: P3)

Un visitante quiere ver las canchas disponibles en un club específico o navegar
directamente a un catálogo general de canchas. Ve cada cancha con su imagen, nombre
del club al que pertenece, tipo de deporte, superficie (césped, cemento, cristal, etc.),
precio por hora y disponibilidad general. Al seleccionar una cancha, puede ver su
calendario de disponibilidad con franjas horarias.

**Why this priority**: Las canchas son el producto central. El usuario necesita verlas
antes de poder reservar.

**Independent Test**: Se puede verificar navegando a la página de canchas, confirmando
que se muestran canchas de varios clubes, y que al seleccionar una se muestra un
calendario con franjas horarias dummy.

**Acceptance Scenarios**:

1. **Given** el visitante en la página de canchas, **When** carga, **Then** ve un catálogo de canchas con filtros por deporte (pádel, squash, racquetball, tenis), ubicación y rango de precio
2. **Given** la lista de canchas, **When** el visitante aplica un filtro por deporte, **Then** solo se muestran las canchas del deporte seleccionado
3. **Given** una cancha seleccionada, **When** el visitante ve su detalle, **Then** muestra nombre, club, tipo de deporte, superficie, dimensiones, precio por hora, amenities (iluminación, techado, vestuarios) e imágenes placeholder
4. **Given** la página de detalle de una cancha, **When** el visitante selecciona una fecha en el calendario, **Then** ve las franjas horarias del día con estados: disponible (verde), ocupada (roja) o parcialmente disponible (amarillo)

---

### User Story 4 — Flujo de Reserva con Calendario (Priority: P4)

Un usuario quiere reservar una cancha. Desde la página de resultados de búsqueda
(accesible vía la barra de búsqueda del hero o la página de canchas), ve una lista de
canchas disponibles cruzando clubes, filtradas por deporte/ubicación/fecha. Selecciona
una cancha, elige una franja horaria disponible en el calendario y completa un formulario
de reserva con sus datos. Al confirmar, ve una pantalla de resumen de la reserva con
todos los detalles (cancha, fecha, hora, precio, club). Todo con datos dummy — no se
persiste en base de datos.

**Why this priority**: El flujo de reserva es la funcionalidad core del negocio, pero
depende de que clubes y canchas ya estén implementados.

**Independent Test**: Se puede verificar seleccionando una cancha, eligiendo fecha y
hora, completando el formulario y llegando a la pantalla de confirmación.

**Acceptance Scenarios**:

1. **Given** el visitante en la vista de disponibilidad de una cancha, **When** selecciona una franja horaria disponible, **Then** se abre un formulario/modal de reserva
2. **Given** el formulario de reserva, **When** el usuario completa nombre, email, teléfono y confirma, **Then** ve una pantalla de confirmación con resumen de la reserva
3. **Given** la pantalla de confirmación, **When** la reserva se completa, **Then** muestra: nombre de la cancha, club, fecha, hora inicio/fin, duración, precio total y un número de reserva dummy
4. **Given** una franja horaria marcada como "ocupada", **When** el usuario intenta seleccionarla, **Then** el sistema muestra que no está disponible y sugiere horarios alternativos cercanos

---

### User Story 5 — Página de Precios (Priority: P5)

Un visitante quiere conocer los planes y precios de EasyAgenda para su club.
Navega a la página de precios donde ve una comparativa de planes (Gratis, Pro, Enterprise)
con sus características, limitaciones y precios. Cada plan tiene un botón de CTA.

**Why this priority**: La página de precios es esencial para la conversión comercial
pero puede existir independientemente de la funcionalidad de reservas.

**Independent Test**: Se puede verificar navegando a /precios y confirmando que se
muestran al menos 3 planes con sus características y precios.

**Acceptance Scenarios**:

1. **Given** el visitante en la página de precios, **When** carga, **Then** ve al menos 3 planes presentados en tarjetas comparativas lado a lado
2. **Given** los planes de precios, **When** el visitante los revisa, **Then** cada plan muestra: nombre, precio mensual, lista de características incluidas, limitaciones y botón CTA
3. **Given** la página de precios, **When** el visitante la ve, **Then** uno de los planes está destacado visualmente como "Más popular" o "Recomendado"

---

### User Story 6 — Página de Contacto (Priority: P6)

Un visitante quiere comunicarse con el equipo de EasyAgenda. Navega a la página de
contacto donde ve un formulario de contacto, información de la empresa (email, teléfono,
dirección) y un mapa con la ubicación. El formulario no envía datos reales.

**Why this priority**: La página de contacto genera confianza y es estándar en cualquier
sitio comercial, pero no bloquea ninguna otra funcionalidad.

**Independent Test**: Se puede verificar navegando a /contacto, completando el
formulario y viendo un mensaje de confirmación dummy.

**Acceptance Scenarios**:

1. **Given** el visitante en la página de contacto, **When** carga, **Then** ve un formulario con campos: nombre, email, asunto, mensaje
2. **Given** el formulario de contacto completo, **When** el visitante envía el formulario, **Then** ve un mensaje de éxito indicando que el mensaje fue recibido (dummy)
3. **Given** la página de contacto, **When** carga, **Then** muestra información de contacto (email, teléfono, dirección) y horario de atención

---

### User Story 7 — Dashboard de Usuario (Priority: P7)

Un usuario registrado quiere ver sus reservas. Accede a un dashboard donde ve un
resumen de sus próximas reservas, historial de reservas pasadas y acceso rápido para
hacer una nueva reserva. Todo con datos dummy estáticos.

**Why this priority**: El dashboard es importante para la retención pero no es necesario
para la primera impresión ni el flujo básico de exploración.

**Independent Test**: Se puede verificar navegando al dashboard y confirmando que
muestra reservas dummy (próximas e historial) con información de cancha, fecha y estado.

**Acceptance Scenarios**:

1. **Given** el usuario en el dashboard, **When** carga, **Then** ve un resumen con: número de reservas activas, próxima reserva destacada y acceso rápido a "Nueva reserva"
2. **Given** el dashboard, **When** el usuario ve "Mis reservas", **Then** ve una lista de reservas dummy con: cancha, club, fecha, hora, estado (confirmada, completada, cancelada) y precio
3. **Given** la lista de reservas, **When** el usuario hace clic en una reserva, **Then** ve el detalle completo de la reserva con opción (visual) de cancelar

---

### Edge Cases

- ¿Qué sucede cuando un club no tiene canchas asociadas? Se muestra un mensaje "Este club aún no tiene canchas registradas" con un CTA para contactar al club
- ¿Qué sucede cuando no hay franjas horarias disponibles en una fecha? Se muestra un mensaje "No hay disponibilidad para esta fecha" y se sugieren fechas cercanas con disponibilidad
- ¿Qué sucede cuando el calendario se ve en pantallas muy pequeñas? Las franjas horarias se adaptan a vista vertical de lista en lugar de grilla
- ¿Qué sucede si los filtros de canchas no arrojan resultados? Se muestra un estado vacío con mensaje "No encontramos canchas con estos filtros" y botón para limpiar filtros
- ¿Qué sucede al navegar a una URL de club/cancha que no existe? Se muestra una página 404 personalizada con enlace de regreso a la página principal

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar una landing page con hero section que incluya una barra de búsqueda centralizada (deporte, ubicación, fecha/hora), sección de características, sección de contadores de estadísticas de impacto con datos dummy, testimonios, sección B2B dirigida a dueños de clubes con propuesta de valor y CTA "Registra tu club", preview de precios y CTA final
- **FR-002**: El sistema DEBE incluir un navbar persistente con logo y enlaces de navegación en todas las páginas
- **FR-003**: El sistema DEBE incluir un footer persistente con enlaces, redes sociales y datos de contacto en todas las páginas
- **FR-004**: El navbar DEBE ser responsive — menú hamburguesa en dispositivos móviles con animación de apertura/cierre
- **FR-005**: El sistema DEBE mostrar una página de listado de clubes con al menos 4 clubes dummy en formato grilla
- **FR-006**: El sistema DEBE mostrar una página de detalle por cada club con descripción, galería, horarios, canchas y reseñas
- **FR-007**: El sistema DEBE mostrar una página de catálogo de canchas con filtros funcionales por deporte, ubicación y precio
- **FR-008**: El sistema DEBE mostrar una vista de detalle por cancha con calendario de disponibilidad interactivo
- **FR-009**: El calendario DEBE mostrar franjas horarias de 1 hora con estados visuales: disponible, ocupada y parcialmente disponible
- **FR-010**: El sistema DEBE permitir seleccionar una franja disponible y completar un formulario de reserva (nombre, email, teléfono)
- **FR-011**: Al confirmar la reserva, el sistema DEBE mostrar una pantalla de resumen con todos los detalles y un número de reserva generado
- **FR-012**: El sistema DEBE mostrar una página de precios con al menos 3 planes comparativos (Gratis, Pro, Enterprise)
- **FR-013**: El sistema DEBE mostrar una página de contacto con formulario funcional (validación client-side) y datos de empresa
- **FR-014**: El sistema DEBE mostrar un dashboard de usuario con reservas dummy (próximas e historial)
- **FR-015**: Todas las páginas DEBEN ser completamente responsive (mobile, tablet, desktop)
- **FR-016**: El sistema DEBE usar datos dummy estáticos — no se requiere persistencia en base de datos para esta iteración
- **FR-017**: Los filtros en la página de canchas DEBEN funcionar en el cliente actualizando la lista sin recarga de página
- **FR-018**: El sistema DEBE mostrar una página 404 personalizada para rutas no existentes
- **FR-019**: El sistema DEBE incluir transiciones y animaciones sutiles para mejorar la experiencia de usuario (hover, scroll reveal, transiciones de página)
- **FR-020**: El sistema DEBE mostrar una página de resultados de búsqueda que liste canchas disponibles cruzando todos los clubes, filtradas por deporte, ubicación y fecha/hora seleccionados
- **FR-021**: La barra de búsqueda del hero DEBE redirigir a la página de resultados con los parámetros seleccionados como filtros activos

### Key Entities

- **Club**: Representa un club deportivo. Atributos: nombre, descripción, dirección, ciudad, teléfono, email, horario de atención, imagen de portada, galería de imágenes, calificación promedio, deportes ofrecidos
- **Deporte (Sport)**: Representa un deporte de raqueta soportado. Valores fijos: pádel, tenis, squash, racquetball. Atributos: nombre, icono, descripción corta
- **Cancha (Court)**: Representa una cancha dentro de un club. Atributos: nombre, deporte asociado (pádel, tenis, squash o racquetball), superficie (césped sintético, cemento, cristal, parquet), dimensiones, precio por hora, amenities (iluminación, techado, vestuarios, estacionamiento), imagen, estado activo
- **Reserva (Booking)**: Representa una reserva de cancha. Atributos: número de reserva, cancha asociada, club asociado, fecha, hora inicio, hora fin, duración, nombre del cliente, email, teléfono, precio total, estado (confirmada, completada, cancelada)
- **Franja Horaria (Time Slot)**: Representa un bloque de tiempo en el calendario. Atributos: hora inicio, hora fin, estado (disponible, ocupada, parcialmente disponible), cancha asociada, fecha
- **Plan de Precios**: Representa un plan comercial de EasyAgenda. Atributos: nombre (Gratis, Pro, Enterprise), precio mensual, lista de características, limitaciones, destacado (boolean)
- **Reseña**: Representa la opinión de un usuario sobre un club. Atributos: nombre del autor, calificación (1-5 estrellas), comentario, fecha
- **Testimonio**: Representa un testimonio para la landing page. Atributos: nombre, cargo/rol, foto, texto del testimonio, club asociado

### Assumptions

- Todos los datos son estáticos/dummy definidos como constantes en el código
- No hay autenticación real — el dashboard simula un usuario logueado
- No hay integración con pasarelas de pago — los precios son informativos
- Las imágenes usan placeholders (gradientes, colores sólidos o imágenes de stock si están disponibles)
- El formulario de contacto y reserva valida campos en el cliente pero no envía datos a ningún servidor
- Los horarios de disponibilidad son generados estáticamente con un mix predecible de estados
- La moneda por defecto es CLP (peso chileno), formato: $15.000 CLP — confirmado por el usuario
- El calendario muestra 7 días a partir de hoy como ventana de reserva

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitante nuevo comprende el propósito del producto en menos de 5 segundos al ver el hero section
- **SC-002**: Un visitante puede navegar desde la landing page hasta la confirmación de una reserva dummy en menos de 2 minutos (máximo 5 clics)
- **SC-003**: Todas las páginas cargan con contenido visible en menos de 2 segundos en conexión estándar
- **SC-004**: La experiencia es completamente funcional y legible en pantallas desde 320px hasta 1920px de ancho
- **SC-005**: El 100% de los enlaces de navegación del navbar y footer llevan a páginas funcionales (sin enlaces rotos)
- **SC-006**: Los filtros de canchas actualizan los resultados instantáneamente (menos de 200ms de percepción)
- **SC-007**: El formulario de reserva valida todos los campos requeridos antes de permitir el envío
- **SC-008**: El sitio completo presenta un diseño visual cohesivo — misma paleta de colores, tipografía y estilo de componentes en todas las páginas
