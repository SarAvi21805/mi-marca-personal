import { additionalProjects } from './additional-projects.js';
// Each editorial field has ES / EN / FR. Names, URLs and technology names stay unchanged.
export const choose = (value, language) => Array.isArray(value) ? value[['es','en','fr'].indexOf(language)] : value;
export const portfolioData = [
 {
  id:'brand', title:'SarAvi · saravi.codes', category:['Web · Identidad','Web · Identity','Web · Identité'],
  description:['Mi sitio personal reúne mi perfil, proyectos y aprendizajes, con una identidad visual propia.','My personal site brings together my profile, projects and learning with a visual identity of my own.','Mon site personnel rassemble mon profil, mes projets et mes apprentissages dans une identité visuelle qui me ressemble.'],
  role:['Diseñé e implementé la estructura del sitio, su identidad visual y sus interacciones. Preparé su publicación en GitHub Pages y su configuración para saravi.codes.','I designed and implemented the site structure, visual identity and interactions. I prepared its GitHub Pages deployment and configuration for saravi.codes.','J’ai conçu et développé la structure du site, son identité visuelle et ses interactions. J’ai préparé sa publication sur GitHub Pages et sa configuration pour saravi.codes.'],
  skills:'React, Vite, JavaScript, CSS, GitHub Pages',
  value:['Presentar mi trabajo y facilitar el contacto desde un solo lugar.','Present my work and make it easy to connect in one place.','Présenter mon travail et faciliter la prise de contact au même endroit.'],
  siteUrl:'https://saravi.codes/', url:'https://github.com/SarAvi21805/mi-marca-personal', image:'media/saravi-welcome.png', liveUrl:'', demoVideo:''
 },
 {
  id:'vive',title:'Vive paso a paso',category:['App Android · En equipo','Android app · Team project','Application Android · Projet en équipe'],
  description:['App de seguimiento de hábitos y estadísticas de bienestar, desarrollada junto a Tiffany.','A habit and wellbeing tracking app developed with Tiffany.','Une application de suivi des habitudes et des statistiques de bien-être, développée avec Tiffany.'],
  role:['Me encargué principalmente del frontend: diseño visual, paletas, temas claro y oscuro, registro de hábitos y recomendaciones con IA a partir de las estadísticas. Tiffany implementó el inicio de sesión con Firebase.','I mainly handled the frontend: visual design, palettes, light and dark themes, habit logging and AI recommendations based on the statistics. Tiffany implemented Firebase sign-in.','Je me suis principalement chargée du frontend : design visuel, palettes, thèmes clair et sombre, saisie des habitudes et recommandations par IA à partir des statistiques. Tiffany a réalisé la connexion avec Firebase.'],
  skills:'Kotlin · Firebase (Tiffany)',
  value:['Dar una forma visual a la información registrada y facilitar el seguimiento de hábitos.','Make recorded information easier to understand visually and support habit tracking.','Présenter visuellement les données enregistrées et faciliter le suivi des habitudes.'],
  url:'https://github.com/SarAvi21805/Vive_paso_a_paso',image:'media/vive-poster.jpg',demoVideo:'media/vive-demo.mp4',liveUrl:''
 },
 {
  id:'kontrol',title:'Kontrol',category:['Producto · Colaboración','Product · Collaboration','Produit · Collaboration'],
  description:['Plataforma de gestión en la que colaboro desde enero de 2026, con aportes en frontend, backend y documentación.','A management platform I have contributed to since January 2026, across frontend, backend and documentation.','Une plateforme de gestion à laquelle je contribue depuis janvier 2026, côté frontend, backend et documentation.'],
  role:['Implementé algunas vistas a partir de prototipos de Figma, participé en pruebas con usuarios y documenté mejoras. También aporté a pruebas de rutas y del flujo de comunicación entre transferencias, y revisé código antes de integrar cambios al deploy.','I implemented views from Figma prototypes, took part in user testing and documented improvements. I also contributed to route and transfer communication flow tests, and reviewed code before deployment changes were integrated.','J’ai développé certaines vues à partir de prototypes Figma, participé à des tests utilisateurs et documenté des améliorations. J’ai aussi contribué aux tests de routes et des échanges entre transferts, et relu du code avant l’intégration de changements au déploiement.'],
  skills:'JavaScript, Vue, CSS, Shell, Python, PLpgSQL',
  value:['Conectar diseño, implementación, pruebas y documentación dentro de un trabajo colaborativo.','Connect design, implementation, testing and documentation in a collaborative project.','Relier conception, développement, tests et documentation dans un projet collaboratif.'],
  note:['Tecnologías del repositorio; la distribución de lenguajes no representa mi porcentaje de contribución.','Repository technologies; the language distribution does not represent my share of contributions.','Technologies du dépôt ; leur répartition ne représente pas ma part de contribution.'],
  siteUrl:'https://www.kontrol.it.com/', url:'https://github.com/PabloVS044/Kontrol',image:'media/kontrol-site.png',demoVideo:'',liveUrl:''
 },
 {
  id:'snake',title:'Snake game',category:['Juego web · Proyecto personal','Web game · Personal project','Jeu web · Projet personnel'],
  description:['Mi versión del juego clásico Snake, con opciones de personalización y funciones adicionales.','My take on the classic Snake game, with customization options and additional features.','Ma version du jeu classique Snake, avec des options de personnalisation et des fonctionnalités supplémentaires.'],
  role:['Desarrollé el juego y añadí detalles propios, como elegir el color de la serpiente. Incluye menú, puntajes, instrucciones, dificultad ajustable, paredes, túneles y enemigos.','I built the game and added my own details, such as choosing the snake’s color. It includes a menu, scores, instructions, adjustable difficulty, walls, tunnels and enemies.','J’ai développé le jeu et ajouté des détails personnels, comme le choix de la couleur du serpent. Il comprend un menu, des scores, des instructions, une difficulté réglable, des murs, des tunnels et des ennemis.'],
  skills:'JavaScript, CSS, HTML · React, Vite',
  value:['Convertir reglas conocidas en una experiencia que el jugador puede personalizar.','Turn familiar rules into an experience the player can customize.','Transformer des règles familières en une expérience personnalisable.'],
  url:'https://github.com/SarAvi21805/snake-game',image:'media/snake-game.png',demoVideo:'',liveUrl:'https://snake.saravi.codes/'
 }
];

portfolioData.push(...additionalProjects);

export const teaching = [
 {course:['Algoritmos y programación básica','Algorithms and basic programming','Algorithmes et programmation de base'],period:['Enero–mayo de 2026','January–May 2026','Janvier–mai 2026']},
 {course:['Ecuaciones Diferenciales I','Differential Equations I','Équations différentielles I'],period:['Enero–mayo de 2026','January–May 2026','Janvier–mai 2026']},
 {course:['Guatemala en Contexto Mundial','Guatemala in the World Context','Le Guatemala dans le contexte mondial'],period:['Julio–noviembre de 2026','July–November 2026','Juillet–novembre 2026']},
 {course:['Programación Orientada a Objetos','Object-Oriented Programming','Programmation orientée objet'],period:['Julio–noviembre de 2026','July–November 2026','Juillet–novembre 2026']}
];
export const personalFacts = [
 ['Escucho música en distintos idiomas: me inspira para dibujar, elegir paletas y concentrarme al programar.','I listen to music in different languages: it inspires my drawing, color palettes and focus while coding.','J’écoute de la musique dans différentes langues : elle inspire mes dessins, mes palettes et ma concentration quand je programme.'],
 ['Me gusta cantar, dibujar, escribir y hacer manualidades.','I enjoy singing, drawing, writing and crafting.','J’aime chanter, dessiner, écrire et faire des activités manuelles.'],
 ['Me gusta dibujar ideas para espacios y pensar cómo mejorar la distribución y la funcionalidad de una habitación.','I like sketching spaces and thinking about how to improve a room’s layout and functionality.','J’aime dessiner des espaces et réfléchir à l’aménagement et à la fonctionnalité d’une pièce.'],
 ['Pasar tiempo con mi familia es una de las cosas que más disfruto.','Spending time with my family is one of the things I enjoy most.','Passer du temps avec ma famille fait partie de ce que j’aime le plus.'],
 ['Me gustan el aguacate, el k-pop y aprender idiomas.','I like avocado, K-pop and learning languages.','J’aime l’avocat, la K-pop et apprendre des langues.'],
 ['La luna, las mariposas, las mariquitas y las series de animación también me inspiran.','The moon, butterflies, ladybugs and animated series also inspire me.','La lune, les papillons, les coccinelles et les séries d’animation m’inspirent aussi.'],
 ['Hablo español; mi CV indica inglés B2–C1 y francés básico. Sigo aprendiendo.','I speak Spanish; my CV lists English at B2–C1 and basic French. I’m still learning.','Je parle espagnol ; mon CV indique un niveau B2–C1 en anglais et un niveau débutant en français. Je continue à apprendre.'],
 ['He tenido auxiliaturas en programación, ecuaciones diferenciales y Guatemala en Contexto Mundial. Puedes ver los cursos y períodos en Sobre Mí.','I have held teaching assistant roles in programming, differential equations and Guatemala in the World Context. See the courses and dates in About Me.','J’ai exercé des fonctions d’auxiliaire d’enseignement en programmation, en équations différentielles et en contexte mondial du Guatemala. Les cours et périodes figurent dans À propos.'],
 ['Me interesa aportar ideas, soluciones y formas de optimizar procesos. Busco un entorno colaborativo donde pueda seguir aprendiendo.','I enjoy contributing ideas, solutions and ways to improve processes. I’m looking for a collaborative environment where I can keep learning.','J’aime apporter des idées, des solutions et des moyens d’améliorer les processus. Je recherche un environnement collaboratif où continuer à apprendre.']
];
