# 🃏 Ingeniería DevOps - Pokémon TCG Store
## 📸 Screenshots

### 🏠 Home
![Home](./screenshots/home.png)

### 🃏 Cartas
![Cartas](./screenshots/cartas.png)

###  Noticias
![Noticias](./screenshots/noticias.png)

## 📌 Descripción

Aplicación frontend desarrollada en React para la visualización y gestión de cartas Pokémon TCG.

El proyecto fue utilizado como base para implementar prácticas DevOps, incluyendo control de versiones, trabajo colaborativo y automatización mediante GitHub Actions.


### Funcionalidades principales:

- Visualización de cartas Pokémon
- Consumo de API externa (TCGdex)
- Carrito de compras con persistencia (localStorage)
- Sistema de fallback en caso de falla de API
- Interfaz moderna estilo tienda gaming

---

## ⚙️ Instalación y ejecución

``bash
git clone https://github.com/Deimonlay13/Ingenieria-Devops.git
cd Ingenieria-Devops
npm install
npm run dev
🌿 Estrategia de Branching

Se utilizó una estrategia basada en GitFlow simplificado, adaptada al contexto del proyecto.

Ramas utilizadas:
main: rama principal, contiene versiones estables del proyecto
develop: integración de cambios antes de producción
feature/<nombre>: desarrollo de nuevas funcionalidades
hotfix/<nombre>: correcciones urgentes sobre producción
fix/<nombre>: mejoras o correcciones generales
chore/<nombre>: tareas técnicas (ej: configuración CI)
Justificación

Se eligió GitFlow porque permite mantener una separación clara entre desarrollo, integración y producción, facilitando la trazabilidad del código y el trabajo colaborativo en equipo.

🔁 Flujo de trabajo
Se crea una rama desde develop
Se implementa la funcionalidad o corrección
Se realizan commits siguiendo una convención
Se suben los cambios al repositorio
Se crea un Pull Request hacia develop
Se revisa y se hace merge
Se integran cambios finales en main
🏷️ Convención de commits

Se utilizó una convención basada en prefijos para mejorar la claridad del historial:

feat: nueva funcionalidad
fix: corrección de errores
chore: tareas técnicas
docs: documentación
Ejemplos:
feat: agrega carrito de compras
fix: corrige render de cartas
chore: configura pipeline CI
docs: actualiza README
🤝 Flujo de Pull Requests
Cada cambio se realiza mediante Pull Request
Se revisa antes de hacer merge
Se mantiene trazabilidad de cambios en GitHub
Se utilizan PRs para simular trabajo colaborativo
⚡ GitHub Actions (CI)

Se configuró un pipeline de integración continua en:

.github/workflows/ci.yml
Se ejecuta en:
push a rama develop
pull_request hacia main
Funcionalidades:
Instalación de dependencias (npm install)
Build del proyecto (npm run build)
Rol en CI/CD:

GitHub Actions permite automatizar la validación del código, asegurando que cada cambio sea verificable antes de integrarse al proyecto principal, mejorando la calidad y estabilidad del sistema.

🌐 API utilizada

Se utilizó la API pública:

https://api.tcgdex.net

Para obtener datos reales de cartas Pokémon TCG.

🧪 Manejo de fallos

Se implementó un sistema de fallback utilizando datos mock, permitiendo que la aplicación continúe funcionando en caso de que la API externa no esté disponible.


🤖 Uso de Inteligencia Artificial

Se utilizó inteligencia artificial (ChatGPT y Cursor) como herramienta de apoyo en:

diseño de interfaz
configuración de CI/CD
integración de API
optimización de código

Todo el contenido generado fue revisado y validado manualmente por el equipo, cumpliendo con las normas de uso ético establecidas.

🚀 Estado del proyecto

✔ Aplicación funcional
✔ Flujo de trabajo con Git implementado
✔ Integración con API externa
✔ CI configurado con GitHub Actions
✔ Documentación completa

👨‍💻 Autor

Diego Pizarro
