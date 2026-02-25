const firebaseConfig = {
    apiKey: "AIzaSyDTlodQcA9cZ_zOf_6uj_4EOF1s_xxoQ8A",
    authDomain: "ecoaudit-92eb4.firebaseapp.com",
    projectId: "ecoaudit-92eb4",
    storageBucket: "ecoaudit-92eb4.firebasestorage.app",
    messagingSenderId: "361654853529",
    appId: "1:361654853529:web:74f820b57e6fb53c947d08",
    measurementId: "G-5TD0HRKS4P"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- CAROUSEL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const container = document.querySelector('.carousel-container');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    let intervalId;
    const intervalTime = 3000;

    const updateSlidePosition = () => {
        const translateX = -(currentIndex * 100);
        track.style.transform = `translateX(${translateX}%)`;
    };

    const moveSlide = (direction) => {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateSlidePosition();
    };

    const startCarousel = () => {
        clearInterval(intervalId);
        intervalId = setInterval(() => moveSlide('next'), intervalTime);
    };

    const stopCarousel = () => clearInterval(intervalId);

    if (nextBtn) nextBtn.addEventListener('click', () => { moveSlide('next'); startCarousel(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { moveSlide('prev'); startCarousel(); });

    startCarousel();
    if (container) {
        container.addEventListener('mouseenter', stopCarousel);
        container.addEventListener('mouseleave', startCarousel);
    }
});

// --- SIDEBAR LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
});

// --- EBC AUDIT QUIZ LOGIC ---

// Configuración Global
const CRITICAL_PENALTY = 50; // Changed to 50 as per Executive Request
let ethicalRisk = false;
let companyName = "Verdnatura"; // Hardcoded for Verdnatura

const questions = [
    // --- BLOQUE 1: SOSTENIBILIDAD ECOLÓGICA (8 Preguntas - Verdnatura Specific) ---
    {
        id: 1,
        block: "Sostenibilidad Ecológica",
        question: "Placas Solares: ¿Qué porcentaje del consumo de las cámaras de frío y naves cubrimos con nuestras placas solares?",
        options: [
            { text: "0%", points: 0, recomendacion: "⚠️ Área Crítica: Dependencia fósil." },
            { text: "<30%", points: 3, recomendacion: "Inicio de transición." },
            { text: ">60%", points: 7, recomendacion: "Buen nivel de autoconsumo." },
            { text: "Autoconsumo casi total", points: 10, recomendacion: "Excelencia: Soberanía energética." }
        ]
    },
    {
        id: 2,
        block: "Sostenibilidad Ecológica",
        question: "Cámaras Frigoríficas: ¿Cómo gestionamos la eficiencia del frío para preservar las flores?",
        options: [
            { text: "Sin control", points: 0, recomendacion: "⚠️ Área Crítica: Despilfarro energético." },
            { text: "Termostatos básicos", points: 3, recomendacion: "Control estándar." },
            { text: "Aislamiento reforzado", points: 7, recomendacion: "Eficiencia pasiva." },
            { text: "Sistema inteligente optimizado por sensores", points: 10, recomendacion: "Excelencia: Frío inteligente." }
        ]
    },
    {
        id: 3,
        block: "Sostenibilidad Ecológica",
        question: "Logística de Importación (Sudamérica): ¿Medimos la huella de CO2 de las flores que traemos en avión/barco desde Sudamérica?",
        options: [
            { text: "No se mide", points: 0, recomendacion: "⚠️ Área Crítica: Impacto oculto." },
            { text: "Solo pesaje", points: 3, recomendacion: "Control de carga." },
            { text: "Estimación de emisiones", points: 7, recomendacion: "Conciencia de impacto." },
            { text: "Plan de reducción y compensación de huella", points: 10, recomendacion: "Excelencia: Logística carbono neutral." }
        ]
    },
    {
        id: 4,
        block: "Sostenibilidad Ecológica",
        question: "Transporte Local: ¿Cómo optimizamos las rutas de reparto nacional?",
        options: [
            { text: "Rutas fijas", points: 0, recomendacion: "⚠️ Área Crítica: Ineficiencia." },
            { text: "Google Maps básico", points: 3, recomendacion: "Digitalización básica." },
            { text: "Algoritmo de rutas", points: 7, recomendacion: "Optimización matemática." },
            { text: "Optimización total de carga y rutas para ahorro de combustible", points: 10, recomendacion: "Excelencia: Logística verde." }
        ]
    },
    {
        id: 5,
        block: "Sostenibilidad Ecológica",
        question: "Servidores Locales: Tenemos servidores físicos en la nave, ¿están en una sala climatizada eficiente?",
        options: [
            { text: "Sala normal", points: 0, recomendacion: "⚠️ Área Crítica: Riesgo y gasto." },
            { text: "Aire acondicionado estándar", points: 3, recomendacion: "Climatización básica." },
            { text: "Pasillo frío/caliente", points: 7, recomendacion: "Eficiencia Data Center." },
            { text: "Servidores de bajo consumo alimentados 100% por placas solares", points: 10, recomendacion: "Excelencia: Green IT." }
        ]
    },
    {
        id: 6,
        block: "Sostenibilidad Ecológica",
        question: "Migración a Odoo: ¿Ha servido el cambio a Odoo para eliminar el papel en almacén?",
        options: [
            { text: "Seguimos usando papel", points: 0, recomendacion: "⚠️ Área Crítica: Digitalización fallida." },
            { text: "Algún albarán digital", points: 3, recomendacion: "Híbrido." },
            { text: "Mayoría en tablets", points: 7, recomendacion: "Digitalización avanzada." },
            { text: "Oficina y almacén 100% Paperless", points: 10, recomendacion: "Excelencia: Cero Papel." }
        ]
    },
    {
        id: 7,
        block: "Sostenibilidad Ecológica",
        question: "Embalaje: ¿Qué materiales usamos para proteger las flores preservadas?",
        options: [
            { text: "Plástico de burbujas virgen", points: 0, recomendacion: "⚠️ Área Crítica: Plástico de un solo uso." },
            { text: "Cartón estándar", points: 3, recomendacion: "Mejora material." },
            { text: "Cartón reciclado", points: 7, recomendacion: "Circularidad básica." },
            { text: "Materiales compostables y residuo cero", points: 10, recomendacion: "Excelencia: Packaging sostenible." }
        ]
    },
    {
        id: 8,
        block: "Sostenibilidad Ecológica",
        question: "Residuos Orgánicos: ¿Qué hacemos con las flores que no se pueden vender (mermas)?",
        options: [
            { text: "Basura normal", points: 0, recomendacion: "⚠️ Área Crítica: Desperdicio." },
            { text: "Contenedor orgánico sin más", points: 3, recomendacion: "Gestión municipal." },
            { text: "Compostaje externo", points: 7, recomendacion: "Valorización externa." },
            { text: "Revalorización para otros productos o abono local", points: 10, recomendacion: "Excelencia: Economía Circular." }
        ]
    },

    {
        id: 41,
        block: "Sostenibilidad Ecológica",
        question: "Gestión del Agua: ¿Cómo controlamos el consumo de agua en los procesos de preservación y limpieza de las flores?",
        options: [
            { text: "No medimos el consumo de agua.", points: 0, recomendacion: "⚠️ Área Crítica: Descontrol." },
            { text: "Medimos el consumo global de la nave.", points: 3, recomendacion: "Medición básica." },
            { text: "Tenemos sistemas de ahorro en grifos y procesos.", points: 7, recomendacion: "Eficiencia hídrica." },
            { text: "Circuito cerrado de agua con depuración y reutilización interna.", points: 10, recomendacion: "Excelencia: Ciclo cerrado." }
        ]
    },
    {
        id: 42,
        block: "Sostenibilidad Ecológica",
        question: "Logística Inversa: ¿Tenemos un sistema para recuperar y reutilizar los palés y cajas que enviamos a los clientes?",
        options: [
            { text: "No recuperamos nada; el cliente gestiona el residuo.", points: 0, recomendacion: "⚠️ Área Crítica: Residuo lineal." },
            { text: "Recuperamos palés estándar pero no las cajas.", points: 3, recomendacion: "Recuperación parcial." },
            { text: "Tenemos una ruta de recogida de envases propios.", points: 7, recomendacion: "Logística inversa." },
            { text: "Sistema 100% circular con embalajes retornables de larga duración.", points: 10, recomendacion: "Excelencia: Economía Circular real." }
        ]
    },

    // --- BLOQUE 2: JUSTICIA SOCIAL (8 Preguntas - 5 Verdnatura + 3 Generic) ---
    {
        id: 9,
        block: "Justicia Social",
        question: "Dumping Ético: ¿Auditamos que las flores de Sudamérica no vengan de fincas con explotación laboral?",
        isCritical: true, // PENALTY APPLIES HERE
        options: [
            { text: "Solo miramos precio", points: 0, recomendacion: "⛔ RIESGO ÉTICO: Complicidad." },
            { text: "Confiamos en el proveedor", points: 3, recomendacion: "Confianza ciega." },
            { text: "Pedimos certificados éticos", points: 7, recomendacion: "Control documental." },
            { text: "Auditoría propia o Comercio Justo", points: 10, recomendacion: "Excelencia: Cadena ética." }
        ]
    },
    {
        id: 10,
        block: "Justicia Social",
        question: "¿Pagamos todos nuestros impuestos en España para apoyar los servicios públicos?",
        isCritical: true, // PENALTY APPLIES HERE
        options: [
            { text: "Ingeniería fiscal", points: 0, recomendacion: "⛔ RIESGO ÉTICO: Evasión." },
            { text: "Lo mínimo legal", points: 3, recomendacion: "Cumplimiento básico." },
            { text: "Pago justo", points: 7, recomendacion: "Responsabilidad." },
            { text: "Transparencia total en contribución fiscal", points: 10, recomendacion: "Excelencia: Civismo fiscal." }
        ]
    },
    {
        id: 11,
        block: "Justicia Social",
        question: "Precios a Productores Locales: Al comprar a locales, ¿pagamos un precio justo o solo el más bajo posible?",
        options: [
            { text: "Solo el más bajo", points: 0, recomendacion: "⚠️ Área Crítica: Asfixia al productor." },
            { text: "Precio de mercado", points: 3, recomendacion: "Estándar." },
            { text: "Contratos a largo plazo", points: 7, recomendacion: "Estabilidad." },
            { text: "Precio que garantiza la vida digna del agricultor", points: 10, recomendacion: "Excelencia: Comercio Justo local." }
        ]
    },
    {
        id: 12,
        block: "Justicia Social",
        question: "Brecha Salarial: Ratio entre el sueldo más alto y el más bajo en Verdnatura.",
        options: [
            { text: ">1:20", points: 0, recomendacion: "⚠️ Área Crítica: Desigualdad excesiva." },
            { text: "1:12-20", points: 3, recomendacion: "Brecha alta." },
            { text: "1:6-11", points: 7, recomendacion: "Brecha moderada." },
            { text: "<1:5", points: 10, recomendacion: "Excelencia: Equidad salarial." }
        ]
    },
    {
        id: 13,
        block: "Justicia Social",
        question: "¿Dónde están las cuentas bancarias de Verdnatura?",
        options: [
            { text: "Banca tradicional", points: 0, recomendacion: "⚠️ Área Crítica: Finanzas opacas." },
            { text: "Banco con cuenta eco", points: 3, recomendacion: "Greenwashing potencial." },
            { text: "Cooperativa de crédito", points: 7, recomendacion: "Banca social." },
            { text: "Banca Ética 100%", points: 10, recomendacion: "Excelencia: Coherencia financiera." }
        ]
    },
    {
        id: 14,
        block: "Justicia Social",
        question: "Algoritmos: ¿Hemos comprobado si los programas de ordenador que usamos (para elegir personal, organizar rutas o poner precios) pueden estar discriminando o tratando de forma injusta a alguien por su género, origen o edad?",
        options: [
            { text: "Ni nos lo hemos planteado", points: 0, recomendacion: "⚠️ Área Crítica: Ceguera ética." },
            { text: "Usamos programas estándar del mercado y suponemos que ya vienen bien configurados", points: 3, recomendacion: "Riesgo pasivo." },
            { text: "Revisamos que no haya discriminación por género, origen o edad", points: 7, recomendacion: "Revisión básica." },
            { text: "Auditados contra racismo/sexismo", points: 10, recomendacion: "Excelencia: Justicia algorítmica." }
        ]
    },
    {
        id: 15,
        block: "Justicia Social",
        question: "Limpieza Eco: ¿Productos tóxicos para quien limpia?",
        options: [
            { text: "Lejía y químicos fuertes", points: 0, recomendacion: "⚠️ Área Crítica: Toxicidad laboral." },
            { text: "Limpieza estándar", points: 3, recomendacion: "Estándar." },
            { text: "Productos Ecolabel", points: 7, recomendacion: "Reducción de riesgos." },
            { text: "Limpieza eco 100% y residuo cero", points: 10, recomendacion: "Excelencia: Salud laboral y ambiental." }
        ]
    },
    {
        id: 16,
        block: "Justicia Social",
        question: "Igualdad de Oportunidades: ¿Cómo se contrata?",
        options: [
            { text: "A dedo / Amiguismo", points: 0, recomendacion: "⚠️ Área Crítica: Nepotismo." },
            { text: "Currículum ciego (a veces)", points: 3, recomendacion: "Intento de igualdad." },
            { text: "Procesos estandarizados", points: 7, recomendacion: "Profesionalidad." },
            { text: "Discriminación positiva activa y paridad", points: 10, recomendacion: "Excelencia: Igualdad real." }
        ]
    },

    // --- BLOQUE 3: SOLIDARIDAD (8 Preguntas - 4 Verdnatura + 4 Generic) ---
    {
        id: 17,
        block: "Solidaridad",
        question: "Prioridad Local: ¿Qué porcentaje de nuestras compras (no flores) son a empresas del barrio o región?",
        options: [
            { text: "Todo Amazon/Multis", points: 0, recomendacion: "⚠️ Área Crítica: Fuga de capital." },
            { text: "<30%", points: 3, recomendacion: "Bajo impacto local." },
            { text: ">60%", points: 7, recomendacion: "Buen soporte local." },
            { text: "Prioridad absoluta KM 0", points: 10, recomendacion: "Excelencia: Economía local." }
        ]
    },
    {
        id: 18,
        block: "Solidaridad",
        question: "Software Libre: Con Odoo (que es open source), ¿fomentamos el uso de otras herramientas libres?",
        options: [
            { text: "Todo cerrado/Microsoft", points: 0, recomendacion: "⚠️ Área Crítica: Dependencia tecnológica." },
            { text: "Solo Odoo", points: 3, recomendacion: "Inicio open source." },
            { text: "Estrategia de migración a Linux/LibreOffice", points: 7, recomendacion: "Avance hacia la libertad." },
            { text: "Soberanía tecnológica total", points: 10, recomendacion: "Excelencia: Cultura libre." }
        ]
    },
    {
        id: 19,
        block: "Solidaridad",
        question: "Colaboración Sectorial: ¿Compartimos datos de sostenibilidad con otros floristas?",
        options: [
            { text: "Competencia agresiva", points: 0, recomendacion: "⚠️ Área Crítica: Aislamiento." },
            { text: "Alguna charla", points: 3, recomendacion: "Contacto puntual." },
            { text: "Asociación sectorial", points: 7, recomendacion: "Asociacionismo." },
            { text: "Cooperación activa para mejorar el sector", points: 10, recomendacion: "Excelencia: Coopetencia." }
        ]
    },
    {
        id: 20,
        block: "Solidaridad",
        question: "Apoyo Social: ¿Donamos flores o recursos a proyectos sociales locales?",
        options: [
            { text: "Nada", points: 0, recomendacion: "⚠️ Área Crítica: Indiferencia." },
            { text: "Donativo puntual", points: 3, recomendacion: "Filantropía básica." },
            { text: "Cedemos horas de técnicos", points: 7, recomendacion: "Voluntariado corporativo." },
            { text: "Implicación total en el barrio", points: 10, recomendacion: "Excelencia: Ciudadanía corporativa." }
        ]
    },
    {
        id: 21,
        block: "Solidaridad",
        question: "Consumo Oficina: ¿Qué coméis/bebéis?",
        options: [
            { text: "Lo más barato del súper", points: 0, recomendacion: "⚠️ Área Crítica: Consumo inconsciente." },
            { text: "Marcas conocidas", points: 3, recomendacion: "Consumo de marca." },
            { text: "Productos de Comercio Justo a veces", points: 7, recomendacion: "Consumo consciente." },
            { text: "Suministros 100% Comercio Justo y Local", points: 10, recomendacion: "Excelencia: Oficina Fair Trade." }
        ]
    },
    {
        id: 22,
        block: "Solidaridad",
        question: "Distribución de Beneficios: ¿Cómo se reparten los beneficios?",
        options: [
            { text: "Todo para los dueños", points: 0, recomendacion: "⚠️ Área Crítica: Acumulación." },
            { text: "Se reinvierte poco", points: 3, recomendacion: "Reinversión mínima." },
            { text: "Reparto con trabajadores", points: 7, recomendacion: "Reparto inclusivo." },
            { text: "Limitación de lucro y donación a bienes comunes", points: 10, recomendacion: "Excelencia: Lucro limitado." }
        ]
    },
    {
        id: 23,
        block: "Solidaridad",
        question: "Financiación Solidaria: ¿Prestamos dinero a empleados/proyectos?",
        options: [
            { text: "Nunca", points: 0, recomendacion: "Estrictamente comercial." },
            { text: "Adelantos de nómina", points: 3, recomendacion: "Ayuda básica." },
            { text: "Préstamos sin interés", points: 7, recomendacion: "Finanzas solidarias." },
            { text: "Fondo de solidaridad interno", points: 10, recomendacion: "Excelencia: Comunidad financiera." }
        ]
    },
    {
        id: 24,
        block: "Solidaridad",
        question: "Trato a Proveedores: ¿Cómo pagáis?",
        options: [
            { text: "Pagamos tarde (180 días)", points: 0, recomendacion: "⚠️ Área Crítica: Abuso financiero." },
            { text: "60-90 días", points: 3, recomendacion: "Pago lento." },
            { text: "30 días (Ley)", points: 7, recomendacion: "Cumplimiento." },
            { text: "Al contado o por adelantado", points: 10, recomendacion: "Excelencia: Solidaridad financiera." }
        ]
    },

    {
        id: 44,
        block: "Solidaridad",
        question: "Impacto en la Biodiversidad: ¿Colaboramos en proyectos de protección de polinizadores (abejas) o reforestación en las zonas de cultivo?",
        options: [
            { text: "No participamos en proyectos ambientales externos.", points: 0, recomendacion: "⚠️ Área Crítica: Desconexión." },
            { text: "Donaciones puntuales a ONGs ambientales.", points: 3, recomendacion: "Filantropía." },
            { text: "Colaboración activa en proyectos de biodiversidad local.", points: 7, recomendacion: "Compromiso ecológico." },
            { text: "Tenemos nuestro propio proyecto de regeneración de ecosistemas.", points: 10, recomendacion: "Excelencia: Regeneración." }
        ]
    },

    // --- BLOQUE 4: DIGNIDAD HUMANA (8 Preguntas - 4 Verdnatura + 4 Generic) ---
    {
        id: 25,
        block: "Dignidad Humana",
        question: "Salud en Almacén: ¿Tienen los mozos de almacén fajas, calzado ergonómico y formación en cargas?",
        options: [
            { text: "No", points: 0, recomendacion: "⚠️ Área Crítica: Riesgo laboral." },
            { text: "Lo básico legal", points: 3, recomendacion: "Cumplimiento." },
            { text: "Equipamiento de alta calidad", points: 7, recomendacion: "Protección avanzada." },
            { text: "Prevención total y cuidado físico proactivo", points: 10, recomendacion: "Excelencia: Cultura de salud." }
        ]
    },
    {
        id: 26,
        block: "Dignidad Humana",
        question: "Formación Odoo: ¿Se ha formado a todo el personal para que la tecnología no sea una barrera?",
        options: [
            { text: "Se apañan solos", points: 0, recomendacion: "⚠️ Área Crítica: Estrés digital." },
            { text: "Manual PDF", points: 3, recomendacion: "Autoaprendizaje." },
            { text: "Curso presencial", points: 7, recomendacion: "Capacitación formal." },
            { text: "Formación continua y acompañamiento digital", points: 10, recomendacion: "Excelencia: Empoderamiento digital." }
        ]
    },
    {
        id: 27,
        block: "Dignidad Humana",
        question: "Conciliación: ¿Respetamos el descanso del personal de oficinas?",
        options: [
            { text: "Siempre disponibles", points: 0, recomendacion: "⚠️ Área Crítica: Esclavitud moderna." },
            { text: "Algún WhatsApp o llamada fuera de horario", points: 3, recomendacion: "Interrupciones." },
            { text: "Respeto horario", points: 7, recomendacion: "Conciliación básica." },
            { text: "Desconexión digital garantizada por contrato", points: 10, recomendacion: "Excelencia: Derecho a la desconexión." }
        ]
    },
    {
        id: 28,
        block: "Dignidad Humana",
        question: "Sentido del Trabajo: ¿Sabe el equipo por qué las flores preservadas son una alternativa sostenible?",
        options: [
            { text: "No", points: 0, recomendacion: "⚠️ Área Crítica: Alienación." },
            { text: "Les suena", points: 3, recomendacion: "Información vaga." },
            { text: "Conocen el producto", points: 7, recomendacion: "Conocimiento producto." },
            { text: "Embajadores de la marca y la sostenibilidad", points: 10, recomendacion: "Excelencia: Propósito compartido." }
        ]
    },
    {
        id: 29,
        block: "Dignidad Humana",
        question: "Suelo Social: ¿Se respetan los derechos básicos?",
        options: [
            { text: "Apretamos al máximo", points: 0, recomendacion: "⚠️ Área Crítica: Explotación." },
            { text: "Convenio mínimo", points: 3, recomendacion: "Legalidad mínima." },
            { text: "Mejoras voluntarias", points: 7, recomendacion: "Buenas condiciones." },
            { text: "Dignidad total y bienestar", points: 10, recomendacion: "Excelencia: Bienestar laboral." }
        ]
    },
    {
        id: 30,
        block: "Dignidad Humana",
        question: "Diversidad ¿Cómo nos tomamos el tema de la diversidad en la plantilla (contratar a gente de distintos países, edades o con discapacidades)??",
        options: [
            { text: "No nos importa; solo queremos gente que no dé problemas y sea igual a nosotros.", points: 0, recomendacion: "⚠️ Área Crítica: Uniformidad." },
            { text: "Contratamos a perfiles diversos principalmente para pillar subvenciones o porque nos obliga la ley", points: 3, recomendacion: "Inercia." },
            { text: "Contratamos a gente diversa porque creemos que es lo correcto y nos esforzamos por integrar a todos", points: 7, recomendacion: "Inclusión." },
            { text: "La diversidad es nuestra fuerza", points: 10, recomendacion: "Excelencia: Diversidad estratégica." }
        ]
    },
    {
        id: 31,
        block: "Dignidad Humana",
        question: "Privacidad de Datos: ¿Respetas al cliente/empleado?",
        options: [
            { text: "Mercadeamos datos", points: 0, recomendacion: "⚠️ Área Crítica: Violación privacidad." },
            { text: "Cumplimos RGPD", points: 3, recomendacion: "Cumplimiento legal." },
            { text: "Privacidad por diseño", points: 7, recomendacion: "Ética de datos." },
            { text: "Soberanía total de datos", points: 10, recomendacion: "Excelencia: Derechos digitales." }
        ]
    },
    {
        id: 32,
        block: "Dignidad Humana",
        question: "Promoción Interna: ¿Hay futuro aquí?",
        options: [
            { text: "Techo de cristal", points: 0, recomendacion: "⚠️ Área Crítica: Estancamiento." },
            { text: "A veces", points: 3, recomendacion: "Sin plan carrera." },
            { text: "Prioridad interna", points: 7, recomendacion: "Desarrollo." },
            { text: "Planes de carrera transparentes para todos", points: 10, recomendacion: "Excelencia: Crecimiento personal." }
        ]
    },

    {
        id: 43,
        block: "Dignidad Humana",
        question: "Salud Mental y Estrés: ¿Existe algún programa para gestionar el estrés en épocas de picos de trabajo (ej: San Valentín, Día de la Madre)?",
        options: [
            { text: "No se tiene en cuenta; hay que sacar el trabajo como sea.", points: 0, recomendacion: "⚠️ Área Crítica: Burnout." },
            { text: "Se dan descansos extra tras los picos de trabajo.", points: 3, recomendacion: "Compensación." },
            { text: "Formación en gestión del estrés y ritmos de trabajo.", points: 7, recomendacion: "Prevención." },
            { text: "Plan de bienestar emocional con apoyo profesional y organización flexible.", points: 10, recomendacion: "Excelencia: Cuidado integral." }
        ]
    },

    // --- BLOQUE 5: DEMOCRACIA Y TRANSPARENCIA (8 Preguntas - Generic) ---
    {
        id: 33,
        block: "Democracia y Transparencia",
        question: "Democracia Interna: ¿Quién decide?",
        options: [
            { text: "Dictadura vertical", points: 0, recomendacion: "⚠️ Área Crítica: Autoritarismo." },
            { text: "Se escucha, decide el jefe", points: 3, recomendacion: "Consultivo." },
            { text: "Decisiones compartidas", points: 7, recomendacion: "Participación." },
            { text: "Un trabajador, un voto", points: 10, recomendacion: "Excelencia: Democracia económica." }
        ]
    },
    {
        id: 34,
        block: "Democracia y Transparencia",
        question: "Propiedad: ¿De quién es la empresa?",
        options: [
            { text: "Fondos de inversión o dueños que ni pisan la nave y solo quieren rentabilidad.", points: 0, recomendacion: "⚠️ Área Crítica: Desarraigo." },
            { text: "El fundador original sigue al mando y toma todas las decisiones importantes.", points: 3, recomendacion: "Tradicional." },
            { text: "Los trabajadores tienen acciones y participan en las decisiones importantes", points: 7, recomendacion: "Participada." },
            { text: "Cooperativa / Propiedad colectiva", points: 10, recomendacion: "Excelencia: Propiedad común." }
        ]
    },
    {
        id: 35,
        block: "Democracia y Transparencia",
        question: "Cuentas Abiertas: ¿Saben los trabajadores cuánto dinero se gana de verdad y en qué se gasta la pasta la empresa?",
        options: [
            { text: "Ni de coña; eso es secreto de estado de la dirección y nadie más lo sabe", points: 0, recomendacion: "⚠️ Área Crítica: Opacidad." },
            { text: "Nos dan un resumen anual que no se entera ni Dios", points: 3, recomendacion: "Mínimo." },
            { text: "Los que quieren pueden ver las cuentas y se explica lo que se hace con el dinero", points: 7, recomendacion: "Transparencia." },
            { text: "Todo está públicado y cualquiera puede ver los gastos en tiempo real", points: 10, recomendacion: "Excelencia: Transparencia radical." }
        ]
    },
    {
        id: 36,
        block: "Democracia y Transparencia",
        question: "Sueldos Públicos: ¿Sabéis lo que cobráis?",
        options: [
            { text: "Tabú total", points: 0, recomendacion: "⚠️ Área Crítica: Secretismo." },
            { text: "Rangos conocidos", points: 3, recomendacion: "Parcial." },
            { text: "Conocimiento informal", points: 7, recomendacion: "Abierto." },
            { text: "Sueldos públicos y transparentes", points: 10, recomendacion: "Excelencia: Claridad salarial." }
        ]
    },
    {
        id: 37,
        block: "Democracia y Transparencia",
        question: "Gestión de Errores: ¿Honestidad?",
        options: [
            { text: "Se tapan", points: 0, recomendacion: "⚠️ Área Crítica: Miedo." },
            { text: "Admitimos si nos pillan", points: 3, recomendacion: "Defensiva." },
            { text: "Informe interno", points: 7, recomendacion: "Aprendizaje." },
            { text: "Honestidad pública radical", points: 10, recomendacion: "Excelencia: Cultura del error." }
        ]
    },
    {
        id: 38,
        block: "Democracia y Transparencia",
        question: "Marketing: ¿Verdad o Greenwashing?",
        options: [
            { text: "Greenwashing", points: 0, recomendacion: "⚠️ Área Crítica: Engaño." },
            { text: "Exageración", points: 3, recomendacion: "Maquillaje." },
            { text: "Hechos reales", points: 7, recomendacion: "Veracidad." },
            { text: "Transparencia radical y ética", points: 10, recomendacion: "Excelencia: Comunicación ética." }
        ]
    },
    {
        id: 39,
        block: "Democracia y Transparencia",
        question: "Éxito Empresarial: ¿Qué es lo que más se celebra al final del año cuando se miran los resultados?",
        options: [
            { text: "Solo dinero", points: 0, recomendacion: "⚠️ Área Crítica: Codicia." },
            { text: "RSC(Ganar dinero, pero haciendo algunas acciones de caridad o quedar bien en redes para la foto)", points: 3, recomendacion: "Imagen." },
            { text: "Triple balance(Que cuadren los números, que el equipo esté contento y que hayamos contaminado menos)", points: 7, recomendacion: "Sostenibilidad." },
            { text: "Balance del Bien ComúnMejorar la vida de la gente y del entorno; el dinero es solo la herramienta para lograrlo", points: 10, recomendacion: "Excelencia: Bien Común." }
        ]
    },
    {
        id: 40,
        block: "Democracia y Transparencia",
        question: "Ciberseguridad: ¿Protección y Confianza?",
        options: [
            { text: "Nula", points: 0, recomendacion: "⚠️ Área Crítica: Negligencia." },
            { text: "Antivirus básico", points: 3, recomendacion: "Básico." },
            { text: "Auditorías", points: 7, recomendacion: "Seguridad." },
            { text: "Cultura de seguridad proactiva", points: 10, recomendacion: "Excelencia: Confianza Digital." }
        ]
    },
    {
        id: 45,
        block: "Democracia y Transparencia",
        question: "Participación en el Propósito: ¿Ha participado la plantilla en la definición de los valores y objetivos de sostenibilidad de Verdnatura?",
        options: [
            { text: "Los valores los decide la dirección al 100%.", points: 0, recomendacion: "⚠️ Área Crítica: Imposición." },
            { text: "Se han comunicado los valores después de redactarlos.", points: 3, recomendacion: "Comunicación." },
            { text: "Se hicieron encuestas para conocer la opinión del equipo.", points: 7, recomendacion: "Consulta." },
            { text: "Co-creación: Los valores se redactaron en talleres con todos los departamentos.", points: 10, recomendacion: "Excelencia: Propósito compartido." }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let userRecommendations = [];
let fetchedAudits = []; // Store fetched audits globally

document.addEventListener('DOMContentLoaded', () => {
    try {
        const quizContainer = document.getElementById('quiz-container');
        const resultsContainerCheck = document.querySelector('.charts-grid');
        const adviceContainerCheck = document.getElementById('advices-container');
        const evolutionChartCheck = document.getElementById('evolutionChart'); // Direct check for chart canvas

        // Logic for Single Company Flow - Verdnatura
        if (quizContainer) {
            // Force reset for new audit
            currentQuestionIndex = 0;
            totalScore = 0;
            userRecommendations = [];
            ethicalRisk = false;
            companyName = "Verdnatura"; // Ensure it is set
            renderIntro();
        } else if (resultsContainerCheck || adviceContainerCheck) {
            checkAndRenderResults();
        } else if (evolutionChartCheck) {
            console.log("Evolution page detected, initializing chart...");
            initEvolutionChart();
        }

    } catch (e) {
        console.error("Error in DOMContentLoaded:", e);
    }
});


function renderIntro() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-card fade-in" style="text-align: center; padding: 40px; border: 1px solid #e1e8ed; border-radius: 12px; max-width: 600px; margin: 40px auto; background-color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="font-size: 3.5rem; color: #2e7d32; margin-bottom: 25px;">
                 <i class="fas fa-clipboard-check"></i>
            </div>
            <h2 style="margin-bottom: 20px; color: #2c3e50;">Evaluación de Sostenibilidad EBC</h2>
            <p style="margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6; color: #555;">
                Analiza el impacto de tu empresa en 4 áreas clave: Dignidad Humana, Solidaridad, Sostenibilidad Ecológica y Justicia Social.
            </p>
            <button class="option-btn" onclick="startQuiz()" style="width: auto; padding: 12px 40px; font-size: 1.1rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 10px;">
                Empezar Evaluación <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

window.startQuiz = function () {
    renderQuestion();
}

function renderQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="quiz-card fade-in">
            <div class="quiz-header">
                <span class="quiz-block-label">${q.block}</span>
                <span class="quiz-counter">Pregunta ${currentQuestionIndex + 1} de ${questions.length}</span>
            </div>
            <h3 class="question-text">${q.question}</h3>
            <div class="options-container" style="display: flex; flex-direction: column; gap: 10px;">
                ${q.options.map((opt, index) => `
                    <button class="option-btn" style="width: 100%; margin-bottom: 10px;" onclick="handleAnswer(${index})">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// --- PROFESSIONAL AUDIT REPORT DATA (Lookup Table) ---
const auditReportData = {
    1: { diagnosis: "Las naves tienen una superficie ideal para el autoconsumo.", action: "Si estás por debajo del 60%, amplía la instalación para cubrir el pico de consumo de las cámaras de frío durante el día." },
    2: { diagnosis: "El frío es tu mayor gasto energético.", action: "Instala sensores IoT que regulen la temperatura según la carga real y asegúrate de que Odoo monitorice las aperturas de puertas para evitar fugas térmicas." },
    3: { diagnosis: "Traer flores de tan lejos genera una huella de carbono masiva.", action: "Empieza a medir las toneladas de CO2 por envío y busca proyectos de reforestación en esas mismas zonas de Sudamérica para compensar el impacto del avión." },
    4: { diagnosis: "Las rutas de reparto nacional son ineficientes si se hacen \"de cabeza\".", action: "Usa algoritmos de optimización de rutas para reducir kilómetros en vacío y ahorra un 15% de combustible inmediatamente." },
    5: { diagnosis: "Tener servidores físicos gasta mucha luz en refrigeración.", action: "Implementa un diseño de \"pasillo frío/caliente\" en la sala de racks y aliméntalos directamente con la energía sobrante de las placas solares." },
    6: { diagnosis: "El ERP debe servir para eliminar el papel, no solo para cambiar el programa.", action: "Equipa a todo el personal de almacén con tablets rugerizadas y elimina las impresoras de albaranes; el ahorro en papel y tóners será drástico." },
    7: { diagnosis: "El plástico de burbujas es veneno para el entorno.", action: "Sustitúyelo por cartón nido de abeja o materiales compostables. Las flores preservadas no necesitan plástico para mantenerse frescas." },
    8: { diagnosis: "Las mermas de flores son recursos, no basura.", action: "Crea una red con empresas de abono local o plantas de biogás para que tus flores muertas generen energía o fertilizante para el campo." },

    // JUSTICE SOCIAL
    9: { diagnosis: "⚠️ RIESGO ÉTICO MÁXIMO. Si compras flores baratas a costa de la explotación laboral en origen, penalizas -50 puntos.", action: "Exige certificados Fair Trade a tus proveedores de Sudamérica mañana mismo." },
    10: { diagnosis: "⚠️ RIESGO ÉTICO MÁXIMO. Eludir impuestos destruye el suelo social. Penalización de -50 puntos.", action: "Publica tu contribución fiscal anual en la web como ejercicio de transparencia." },
    11: { diagnosis: "Apretar al agricultor local por precio lo condena a desaparecer.", action: "Establece contratos a largo plazo con precios fijos que cubran sus costes de vida digna, independientemente de las fluctuaciones del mercado." },
    12: { diagnosis: "Una brecha alta genera envidias y desunión.", action: "Ajusta los salarios para que el que más cobra no supere en más de 5 veces al que menos cobra (mozos o limpiadores)." },
    13: { diagnosis: "Tu dinero en bancos tradicionales financia cosas que van en contra de tus valores.", action: "Mueve las cuentas corrientes a Banca Ética (Triodos o Fiare) para asegurar que tu liquidez apoya la economía real." },
    14: { diagnosis: "El software puede ser racista o machista sin querer.", action: "Revisa los filtros de selección de Odoo para asegurar que no descartan a nadie por edad o sexo de forma automática." },
    15: { diagnosis: "La lejía fuerte daña la salud de tus trabajadores de limpieza.", action: "Cambia todo el suministro a productos con etiqueta Ecolabel; limpian igual y no son tóxicos." },
    16: { diagnosis: "El \"amiguismo\" mata el talento externo.", action: "Profesionaliza el departamento de RRHH y aplica procesos de selección basados puramente en competencias técnicas y valores." },

    // SOLIDARITY
    17: { diagnosis: "Comprar todo fuera debilita el tejido de tu ciudad.", action: "Busca proveedores de mantenimiento, suministros de oficina y uniformes en empresas de tu misma comarca." },
    18: { diagnosis: "Pagar licencias caras a Microsoft es regalar dinero a una multi nacional.", action: "Aprovecha que usas Odoo para migrar la oficina a LibreOffice y sistemas abiertos; ganarás soberanía tecnológica." },
    19: { diagnosis: "Ver a otros floristas solo como enemigos es un error.", action: "Lidera una asociación sectorial para compartir buenas prácticas de ahorro energético en cámaras frigoríficas." },
    20: { diagnosis: "La empresa debe ser un buen vecino.", action: "Cede horas de tus expertos en logística o flores para ayudar a ONGs locales a organizar sus propios repartos o eventos." },
    21: { diagnosis: "El café del office suele ser de baja calidad y explotación.", action: "Cambia el suministro de café y fruta a opciones 100% ecológicas y de comercio justo." },
    22: { diagnosis: "Si todo el beneficio va al dueño, el equipo no se siente parte del éxito.", action: "Crea un sistema de reparto de beneficios anual (paga extra por objetivos de sostenibilidad) para toda la plantilla." },
    23: { diagnosis: "Ayudar a un empleado en un apuro es solidaridad básica.", action: "Formaliza un fondo de préstamos sin interés para gastos imprevistos de los trabajadores (salud, vivienda)." },
    24: { diagnosis: "Pagar a 180 días es asfixiar al pequeño.", action: "Paga al contado o a máximo 30 días. Tu buena salud financiera debe ayudar a la de tus proveedores." },

    // HUMAN DIGNITY
    25: { diagnosis: "Las lesiones de espalda son el mayor riesgo.", action: "Invierte en exoesqueletos ligeros o fajas de alta gama y haz talleres obligatorios de carga de cajas cada mes." },
    26: { diagnosis: "La tecnología asusta si no se enseña bien.", action: "No des un manual PDF; pon a un mentor al lado de cada operario de almacén hasta que manejen la tablet con confianza y sin estrés." },
    27: { diagnosis: "El personal de ruta tiene derecho a desconectar.", action: "Prohíbe por contrato los WhatsApps de trabajo fuera del horario de reparto, salvo emergencias reales de seguridad." },
    28: { diagnosis: "El trabajador debe saber que vende algo que mejora el mundo.", action: "Explica a todos cómo la flor preservada ahorra agua y recursos comparada con la flor fresca. Crea orgullo de marca." },
    29: { diagnosis: "Cumplir el convenio es lo mínimo, no es \"ser bueno\".", action: "Sube el salario base un 10% por encima de lo que marca la ley; la lealtad que ganarás vale mucho más." },
    30: { diagnosis: "La diversidad por dinero (subvenciones) no es ética.", action: "Crea un plan de inclusión real donde los perfiles diversos tengan las mismas posibilidades de ascenso que el resto." },
    31: { diagnosis: "Los datos de tus clientes son sagrados.", action: "Asegúrate de que Odoo no guarde más información de la necesaria y elimina datos antiguos de forma proactiva." },
    32: { diagnosis: "Si no hay futuro, el talento se va.", action: "Publica todas las vacantes de oficina primero en el almacén; da la oportunidad de crecer a quien ya conoce el producto." },

    // DEMOCRACY
    33: { diagnosis: "El jefe no siempre tiene la razón.", action: "Implementa un sistema de votación para decidir las inversiones en bienestar (ej: ¿mejoramos el comedor o compramos sillas nuevas?)." },
    34: { diagnosis: "La propiedad concentrada es el modelo viejo.", action: "Estudia convertir la empresa en una empresa participada donde los empleados más veteranos puedan comprar acciones." },
    35: { diagnosis: "Si ocultas el beneficio, el equipo piensa que les engañas.", action: "Haz una asamblea cada tres meses y enseña los números reales de Odoo: ingresos, gastos y margen neto." },
    36: { diagnosis: "El secreto salarial oculta la injusticia.", action: "Publica en la intranet los rangos salariales de cada puesto para que todos sepan qué necesitan para ganar más." },
    37: { diagnosis: "Tápalo y se hará más grande.", action: "Si hay un vertido o un error ético, admítelo públicamente, explica por qué pasó y qué vas a hacer para que no se repita." },
    38: { diagnosis: "El Greenwashing es un suicidio reputacional.", action: "No digas \"somos verdes\", di \"nuestras placas solares cubren el 42% del consumo\". Usa datos, no adjetivos." },
    39: { diagnosis: "El dinero es el medio, el Bien Común es el fin.", action: "Empieza a medir el éxito por la felicidad del equipo y los kg de CO2 ahorrados, no solo por el balance bancario." },
    40: { diagnosis: "Un hackeo pararía la logística y dañaría a clientes.", action: "Realiza auditorías de seguridad periódicas y forma a los mozos en detectar estafas digitales (Phishing)." },

    // ADDITIONAL QUESTIONS
    41: { diagnosis: "El agua es un recurso crítico en el sector floral.", action: "Instala contadores por sección para detectar fugas y estudia la recogida de aguas pluviales de la cubierta de la nave para la limpieza." },
    42: { diagnosis: "El residuo de embalaje en logística es masivo.", action: "Implementa un sistema de depósito y retorno (SDDR) con tus clientes habituales para reutilizar las cajas de envío premium." },
    43: { diagnosis: "El sector floral es muy estacional y genera mucha presión.", action: "Organiza sesiones de feedback después de cada campaña importante para mejorar los procesos y reducir la fatiga del equipo." },
    44: { diagnosis: "Tu materia prima depende directamente de la salud de la biodiversidad.", action: "Instala colmenas o 'hoteles de insectos' en el entorno de la nave y patrocina la recuperación de flora autóctona en la comarca." },
    45: { diagnosis: "Un propósito impuesto no genera compromiso real.", action: "Crea un 'Comité del Bien Común' formado por voluntarios de almacén, oficina y logística para revisar los objetivos de la empresa cada año." }
};

// Global Configuration


// ... (questions array remains but is implicitly checked via ID/Index in render function)

window.handleAnswer = function (optionIndex) {
    const q = questions[currentQuestionIndex];
    const selectedOption = q.options[optionIndex];

    let points = selectedOption.points;
    let feedback = selectedOption.recomendacion;

    // Lógica de Penalización por Riesgo Crítico (-50 pts)
    if (q.isCritical && points === 0) {
        totalScore -= CRITICAL_PENALTY;
        ethicalRisk = true;
        feedback += " (PENALIZACIÓN: -50 PUNTOS POR RIESGO ÉTICO)";
    } else {
        totalScore += points;
    }

    userRecommendations.push({
        id: q.id, // Important: Save ID to link with auditReportData
        question: q.question,
        category: q.block,
        answer: selectedOption.text,
        feedback: feedback,
        points: points,
        isCriticalFailure: (q.isCritical && points === 0) // Track specific failure
    });

    currentQuestionIndex++;
    renderQuestion();
};


async function finishQuiz() {
    const categoryScores = {
        "Dignidad Humana": 0,
        "Solidaridad": 0,
        "Sostenibilidad Ecológica": 0,
        "Justicia Social": 0,
        "Democracia y Transparencia": 0
    };

    userRecommendations.forEach(rec => {
        if (categoryScores[rec.category] !== undefined) categoryScores[rec.category] += rec.points;
    });


    // CALCULATION LOGIC FOR 1000 POINTS
    // Max theoretical score per question = 10
    // Total questions = 45 (Updated)
    // Max raw score = 450
    // Normalization factor = 1000 / 450 = 2.222...
    const MAX_RAW_SCORE = 450;
    const NORMALIZATION_FACTOR = 1000 / 450;

    let normalizedScore = Math.round(totalScore * NORMALIZATION_FACTOR);

    // Apply limits (optional, but good for safety)
    if (normalizedScore > 1000) normalizedScore = 1000;
    // Allow negative scores if penalties exceed points, or cap at 0? 
    // EBC allows negative, so we keep it, but maybe cap at -1000? 
    // Let's stick to raw calculation.

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-card fade-in" style="text-align:center;">
                <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: #2e7d32; margin-bottom: 1.5rem;"></i>
                <h2>Guardando resultados...</h2>
                <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #2e7d32; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto;"></div>
            </div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        `;
    }

    const resultadosJSON = {
        categoryScores: categoryScores,
        recommendations: userRecommendations,
        totalScore: totalScore, // Keep raw for reference if needed
        normalizedScore: normalizedScore, // MAIN SCORE
        ethicalRisk: ethicalRisk
    };

    try {
        if (!db) throw new Error("Firebase no está inicializado.");
        await db.collection('auditorias').add({
            empresa: companyName, // "Verdnatura"
            puntos: normalizedScore, // Save NORMALIZED score
            detalles: JSON.stringify(resultadosJSON),
            fecha: new Date().toISOString()
        });

        // Save to Session Storage for Results Page
        sessionStorage.setItem('active_results', JSON.stringify({
            company: companyName,
            score: normalizedScore, // Save NORMALIZED score
            categoryScores: categoryScores,
            recommendations: userRecommendations,
            ethicalRisk: ethicalRisk,
            timestamp: Date.now()
        }));

        window.location.href = 'resultados.html';

    } catch (err) {
        console.error("Error guardando:", err);
        // Fallback Local
        sessionStorage.setItem('active_results', JSON.stringify({
            company: companyName,
            score: normalizedScore, // Save NORMALIZED score
            categoryScores: categoryScores,
            recommendations: userRecommendations,
            ethicalRisk: ethicalRisk,
            timestamp: Date.now()
        }));
        window.location.href = 'resultados.html';
    }
}

function checkAndRenderResults() {
    const data = JSON.parse(sessionStorage.getItem('active_results'));
    const resultsContainer = document.querySelector('.charts-grid');
    const adviceContainer = document.getElementById('advices-container');

    if (!resultsContainer && !adviceContainer) return;

    // No Data State
    if (!data) {
        const container = resultsContainer || adviceContainer;
        if (container) {
            container.innerHTML = '';
            const noDataCard = document.createElement('div');
            noDataCard.className = 'card fade-in no-data-card';
            noDataCard.innerHTML = `
                <i class="fas fa-clipboard-list"></i>
                <h2>No hay datos activos</h2>
                <p>Realiza una nueva auditoría o selecciona una del historial.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="auditoria.html" class="option-btn primary-btn" style="text-decoration:none;">
                        <i class="fas fa-play"></i> Nueva Auditoría
                    </a>
                    <a href="evolucion.html" class="option-btn" style="text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                        <i class="fas fa-history"></i> Ir al Historial
                    </a>
                </div>
            `;
            container.appendChild(noDataCard);
        }
        return;
    }

    if (resultsContainer) {
        renderScoreCard(data, resultsContainer);
        renderRadarChart(data);
        renderStrategicRoadmap(data, resultsContainer); // New Roadmap
    }
    if (adviceContainer) {
        // Add header for Detailed Analysis
        if (!document.getElementById('details-header')) {
            const header = document.createElement('h3');
            header.id = 'details-header';
            header.className = 'fade-in';
            header.style.textAlign = 'center';
            header.style.marginBottom = '20px';
            header.style.color = '#2c3e50';
            header.textContent = 'Análisis Técnico Completo';
            adviceContainer.parentNode.insertBefore(header, adviceContainer);
        }
        renderFullRecommendations(data);
    }
}

// --- PROFESSIONAL EXECUTIVE REPORT ENGINE (UPDATED TO USER CSS) ---
function renderFullRecommendations(data) {
    const container = document.getElementById('advices-container');
    if (!container) return;
    container.innerHTML = '';

    // Create Report Container
    const reportWrapper = document.createElement('div');
    reportWrapper.className = 'accordion-container fade-in';
    container.appendChild(reportWrapper);

    const categories = [
        "Sostenibilidad Ecológica",
        "Justicia Social",
        "Solidaridad",
        "Dignidad Humana",
        "Democracia y Transparencia"
    ];

    categories.forEach(cat => {
        const catScore = data.categoryScores[cat] || 0;
        const maxCatScore = 80;
        const percentage = Math.round((catScore / maxCatScore) * 100);

        let statusText = "EN TRANSICIÓN";
        let statusClass = "status-average";
        let badgeColor = "#f39c12";

        if (percentage >= 80) {
            statusText = "EXCELENTE";
            statusClass = "status-excellent";
            badgeColor = "#2ecc71";
        } else if (percentage < 30) {
            statusText = "ÁREA CRÍTICA";
            statusClass = "status-critical";
            badgeColor = "#e74c3c";
        }

        // Critical Risk Check (-50 pts)
        const blockRecs = data.recommendations.filter(r => r.category === cat);
        const hasCriticalFailure = blockRecs.some(r => r.isCriticalFailure);

        // Structure for Header
        // .accordion-header has status class for left border color
        let headerClass = `accordion-header ${statusClass}`;

        // Critical Alert Content (Inline)
        let alertHTML = "";
        if (hasCriticalFailure) {
            alertHTML = `
                <div class="inline-critical-alert">
                    <i class="fas fa-radiation alert-icon-inline"></i>
                    <div class="alert-content-inline">
                        <h4>RIESGO ÉTICO DETECTADO (-50 Pts)</h4>
                        <p>Se ha detectado una violación flagrante de los principios EBC (Dumping o Evasión Fiscal).</p>
                        <div class="alert-action-inline">CORREGIR INMEDIATAMENTE</div>
                    </div>
                </div>
            `;
            headerClass = "accordion-header status-critical"; // Force critical style
        }

        const item = document.createElement('div');
        item.className = 'accordion-item';

        item.innerHTML = `
            <div class="${headerClass}" onclick="toggleReportCard(this)">
                <div class="header-content">
                    <span class="block-title">${cat}</span>
                    <span class="score-badge" style="background-color: ${badgeColor};">${percentage}% ${statusText}</span>
                </div>
                <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            
            <div class="accordion-content">
                <div class="accordion-body-padding">
                    ${alertHTML}
                    ${renderBlockQuestions(blockRecs)}
                </div>
            </div>
        `;
        reportWrapper.appendChild(item);
    });
}

function renderBlockQuestions(userRecs) {
    return userRecs.map(r => {
        let reportItem = null;
        if (r.id && auditReportData[r.id]) {
            reportItem = auditReportData[r.id];
        } else {
            const qObj = questions.find(q => q.question === r.question);
            if (qObj) reportItem = auditReportData[qObj.id];
        }

        const actionText = reportItem ? reportItem.action : "Revisar políticas internas.";

        // Determine points color for badge
        let badgeColor = "#f39c12";
        if (r.points >= 7) badgeColor = "#2ecc71";
        if (r.points === 0) badgeColor = "#e74c3c";

        return `
            <div class="rec-item">
                <span class="rec-question">${r.question}</span>
                
                <div class="rec-meta">
                    <p class="rec-answer">Tu respuesta: ${r.answer}</p>
                    <span class="rec-points-badge" style="color:${badgeColor}">${r.points} pts</span>
                </div>

                <div class="rec-feedback-box">
                    <i class="fas fa-lightbulb"></i>
                    <span>${actionText}</span>
                </div>
            </div>
        `;
    }).join('');
}

window.toggleReportCard = function (header) {
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    if (header.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = "0";
    }
};

function renderScoreCard(data, container) {
    const maxScore = 1000;
    // data.score is already normalized to 1000

    let colorClass = 'score-mid';
    let statusText = 'En Progreso';
    let colorHex = '#f39c12';

    if (data.score >= 751) {
        statusText = 'Excelente: Semilla del Bien Común';
        colorHex = '#2ecc71';
    } else if (data.score >= 401) {
        statusText = 'En Transición';
        colorHex = '#f39c12';
    } else {
        statusText = 'Área Crítica';
        colorHex = '#e74c3c';
    }

    // SDG Logic (High scores >= 7 in categories)
    const sdgMap = {
        "Sostenibilidad Ecológica": { id: 13, icon: "fas fa-globe-americas", color: "#3F7E44", title: "Acción por el Clima" },
        "Dignidad Humana": { id: 8, icon: "fas fa-briefcase", color: "#A21942", title: "Trabajo Decente" },
        "Justicia Social": { id: 10, icon: "fas fa-balance-scale", color: "#DD1367", title: "Reducción de Desigualdades" },
        "Solidaridad": { id: 12, icon: "fas fa-hands-helping", color: "#CF8D2A", title: "Producción Responsable" },
        "Democracia y Transparencia": { id: 16, icon: "fas fa-gavel", color: "#00689D", title: "Paz y Justicia" }
    };

    let earnedSDGs = [];
    for (const [category, score] of Object.entries(data.categoryScores)) {
        const catMaxRef = 80; // Approx max
        if ((score / catMaxRef) * 100 >= 50) { // Threshold for "Working on it" -> 50%? Or user said "Good answers (7 or 10)". 
            // Let's use > 0 to show what they are working on, or > 50% for achievement.
            // User prompt: "puntuaciones de 7 o 10". Category score is sum. 
            // Let's stick to categories with reasonable performance > 40% (Transition)
            if (sdgMap[category]) earnedSDGs.push(sdgMap[category]);
        }
    }
    // Optimization: Unique SDGs
    earnedSDGs = [...new Set(earnedSDGs)];

    container.innerHTML = '';

    const scoreCard = document.createElement('div');
    scoreCard.className = 'card fade-in';
    scoreCard.style.textAlign = 'center';
    scoreCard.style.borderTop = `5px solid ${colorHex}`;
    scoreCard.innerHTML = `
        <h3 style="color:${colorHex}">Puntuación Global EBC</h3>
        <div style="font-size:3.5rem; font-weight:800; color:${colorHex}; margin:10px 0;">
            ${data.score} <span style="font-size:1.5rem; color:#7f8c8d;">/ ${maxScore}</span>
        </div>
        <p style="font-size:1.2rem; font-weight:bold; color:${colorHex}">${statusText}</p>
        
        ${earnedSDGs.length > 0 ? `
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Contribución a los ODS:</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                ${earnedSDGs.map(sdg => `
                    <div style="display: flex; flex-direction: column; align-items: center; width: 60px; cursor: help;" title="${sdg.title}">
                        <div style="width: 45px; height: 45px; border-radius: 8px; background-color: ${sdg.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin-bottom: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <i class="${sdg.icon}"></i>
                        </div>
                        <span style="font-size: 0.65rem; color: #555; line-height: 1.1;">ODS ${sdg.id}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${data.ethicalRisk ? '<p style="color:#c0392b; font-weight:bold; margin-top:10px;"><i class="fas fa-exclamation-circle"></i> Penalización por prácticas críticas detectada.</p>' : ''}
    `;
    container.appendChild(scoreCard);

    const chartCard = document.createElement('div');
    chartCard.className = 'card fade-in';
    chartCard.innerHTML = `
        <h3>Matriz del Bien Común</h3>
        <div style="position: relative; height: 400px; width: 100%;">
            <canvas id="radarChart"></canvas>
        </div>
    `;
    container.appendChild(chartCard);

    const linkCard = document.createElement('div');
    linkCard.className = 'card fade-in';
    linkCard.style.textAlign = 'center';
    linkCard.innerHTML = `
        <h3>Plan de Acción</h3>
        <p>Descubre cómo mejorar en los 5 ejes.</p>
        <a href="recomendaciones.html" class="option-btn primary-btn" style="margin-top:1rem; display:inline-flex;">Ver Recomendaciones</a>
    `;
    container.appendChild(linkCard);
}

function renderRadarChart(data) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    if (window.myRadarChart instanceof Chart) {
        window.myRadarChart.destroy();
    }

    const categories = [
        "Dignidad Humana",
        "Solidaridad",
        "Sostenibilidad Ecológica",
        "Justicia Social",
        "Democracia y Transparencia"
    ];

    // Convert raw category scores to Percentage (0-100)
    // Max raw score per category is approx 8 questions * 10 points = 80
    const categoryMaxRaw = 80;

    const scores = categories.map(cat => {
        const rawScore = data.categoryScores[cat] || 0;
        return Math.round((rawScore / categoryMaxRaw) * 100);
    });

    window.myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '% Cumplimiento EBC',
                data: scores,
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                borderColor: 'rgba(46, 125, 50, 1)',
                pointBackgroundColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { display: false }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// (Function removed: renderAccordion - Legacy code)

// --- STRATEGIC ROADMAP ENGINE ---
function renderStrategicRoadmap(data, container) {
    // 1. Filter for urgent actions (0 or 3 points)
    const urgentActions = data.recommendations.filter(r => r.points <= 3);

    // 2. Sort by urgency (0 points first)
    urgentActions.sort((a, b) => a.points - b.points);

    // 3. Take top 10
    const topActions = urgentActions.slice(0, 10);

    if (topActions.length === 0) return;

    const roadmapCard = document.createElement('div');
    roadmapCard.className = 'card fade-in';
    roadmapCard.innerHTML = `
        <h3 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
            <i class="fas fa-map-signs" style="color: #f39c12; margin-right: 10px;"></i>
            Hoja de Ruta Estratégica
        </h3>
        <ul style="list-style: none; padding: 0;">
            ${topActions.map(item => {
        let reportItem = null;
        if (item.id && auditReportData[item.id]) {
            reportItem = auditReportData[item.id];
        } else {
            const qObj = questions.find(q => q.question === item.question);
            if (qObj) reportItem = auditReportData[qObj.id];
        }
        const actionText = reportItem ? reportItem.action : "Revisar proceso interno.";

        return `
                <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 1.05rem; color: #444;">
                    <span style="color: #e74c3c; font-weight: bold; font-size: 1.2rem;">➔</span>
                    <span>${actionText}</span>
                </li>
                `;
    }).join('')}
        </ul>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ddd; text-align: center; font-size: 0.9rem; color: #777;">
            * Estas son las acciones prioritarias para mejorar tu impacto inmediato.
        </div>
    `;
    container.appendChild(roadmapCard);
}

// --- EVOLUTION / HISTORY LOGIC ---

async function initEvolutionChart() {
    console.log("initEvolutionChart START");
    const ctx = document.getElementById('evolutionChart');

    const tableBody = document.getElementById('history-table-body');
    const tableCard = document.getElementById('history-table-card');

    if (!ctx) {
        console.error("Canvas element 'evolutionChart' NOT FOUND.");
        return;
    }

    try {
        console.log("Fetching auditorias for Verdnatura...");
        const querySnapshot = await db.collection('auditorias')
            .where('empresa', '==', 'Verdnatura')
            .get();

        const data = [];
        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            data.push(docData);
        });

        // Ensure chronological order for the chart (oldest first)
        data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        console.log("Firebase Data Fetched:", data);
        if (data.length === 0) {
            console.warn("No audit data found for Verdnatura.");
        }

        fetchedAudits = data; // Store globally

        // 1. Render Chart
        const labels = data.map(d => new Date(d.fecha).toLocaleDateString());
        const scores = data.map(d => d.puntos);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Puntuación Verdnatura',
                    data: scores,
                    borderColor: '#2e7d32',
                    tension: 0.3,
                    fill: true,
                    backgroundColor: 'rgba(46, 125, 50, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: { beginAtZero: true, max: 1000 }
                }
            }
        });

        // 3. Populate Table
        if (tableBody && tableCard) {
            tableCard.style.display = 'block'; // Show table
            tableBody.innerHTML = '';

            // Sort Descending for table (newest first)
            const sortedData = [...data].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            sortedData.forEach((audit) => {
                const date = new Date(audit.fecha).toLocaleString();
                // Find original index in fetchedAudits to load correct one
                const originalIndex = fetchedAudits.findIndex(a => a.id === audit.id);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:12px; border-bottom:1px solid #eee;">${date}</td>
                    <td style="padding:12px; border-bottom:1px solid #eee;">${audit.empresa}</td>
                    <td style="padding:12px; border-bottom:1px solid #eee; font-weight:bold;">${audit.puntos}</td>
                    <td style="padding:12px; border-bottom:1px solid #eee;">
                        <button onclick="loadAudit(${originalIndex})" class="option-btn" style="padding: 5px 10px; font-size: 0.8rem; background: #2ecc71; color: white;">
                            <i class="fas fa-upload"></i> Cargar
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

    } catch (err) {
        console.error("Error loading evolution:", err);
    }
}

// Global Load Audit Function
window.loadAudit = function (index) {
    if (index < 0 || index >= fetchedAudits.length) return;

    const audit = fetchedAudits[index];
    const details = typeof audit.detalles === 'string' ? JSON.parse(audit.detalles) : audit.detalles;

    const sessionData = {
        company: audit.empresa,
        score: audit.puntos,
        categoryScores: details.categoryScores,
        recommendations: details.recommendations,
        ethicalRisk: details.ethicalRisk,
        timestamp: new Date(audit.fecha).getTime()
    };

    sessionStorage.setItem('active_results', JSON.stringify(sessionData));
    alert('Auditoria del ' + new Date(audit.fecha).toLocaleString() + ' cargada correctamente.');
    window.location.href = 'resultados.html';
};

// Global Clear History
window.clearHistory = async function () {
    if (confirm("¿Seguro que quieres borrar TODO el historial de Verdnatura?")) {
        try {
            const querySnapshot = await db.collection('auditorias')
                .where('empresa', '==', 'Verdnatura')
                .get();
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            alert('Historial borrado.');
            location.reload();
        } catch (error) {
            alert('Error al borrar: ' + error.message);
        }
    }
};
