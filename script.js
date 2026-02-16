
const SUPABASE_URL = 'https://xdwvoqyausmpioslahwy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkd3ZvcXlhdXNtcGlvc2xhaHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDU2MTgsImV4cCI6MjA4NjgyMTYxOH0.F1pNn98WO-BxhWbxZ0c0VDzoDSlNJFTEe4Adtxykqtw';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

const questions = [
    // --- BLOQUE 1: ESTRATEGIA ---
    {
        id: 1,
        block: "Estrategia",
        question: "Éxito empresarial: ¿Se basa en el crecimiento infinito del PIB o en prosperar dentro del equilibrio del Modelo Donut?",
        options: [
            { text: "Solo PIB y ganar cuanta más pasta mejor.", points: 0, recomendacion: "⚠️ Área Crítica: Solo PIB." },
            { text: "Ganar dinero es lo primero, pero intentando no molestar mucho al entorno.", points: 3, recomendacion: "Estás en transición." },
            { text: "Tenemos objetivos sociales medibles, aunque el beneficio sigue mandando.", points: 7, recomendacion: "Bien, objetivos sociales." },
            { text: "Prosperar en equilibrio es nuestro prioridad.", points: 10, recomendacion: "¡Excelente! Modelo Donut." }
        ]
    },
    {
        id: 2,
        block: "Estrategia",
        question: "Techo Ecológico: ¿Sabes cuántos recursos consumes y cuánta contaminación generas antes de pasarte de los límites?",
        options: [
            { text: "Ni idea de qué es eso.", points: 0, recomendacion: "⚠️ Área Crítica: Desconocimiento total." },
            { text: "Sabemos que contaminamos, pero no medimos nada.", points: 3, recomendacion: "Empieza a medir." },
            { text: "Medimos nuestra huella de CO2 y papel anualmente.", points: 7, recomendacion: "Buena medición anual." },
            { text: "Monitorización total de límites planetarios (agua, CO2, residuos).", points: 10, recomendacion: "Control total de límites." }
        ]
    },
    {
        id: 3,
        block: "Estrategia",
        question: "Suelo Social: ¿Tus beneficios se logran respetando los derechos básicos de tu gente o vas pisando el 'Suelo Social'?",
        options: [
            { text: "Si para ganar hay que apretar al trabajador, se hace.", points: 0, recomendacion: "⚠️ Área Crítica: Explotación laboral." },
            { text: "Cumplimos el convenio y poco más.", points: 3, recomendacion: "Cumplimiento mínimo." },
            { text: "Ofrecemos beneficios extra y cuidamos el clima laboral seriamente.", points: 7, recomendacion: "Buen clima laboral." },
            { text: "Garantizamos dignidad total y bienestar por encima de la ley.", points: 10, recomendacion: "Dignidad total." }
        ]
    },
    {
        id: 4,
        block: "Estrategia",
        question: "Obsolescencia: ¿Diseñas servicios/productos para que duren o para que mueran pronto y te vuelvan a comprar?",
        options: [
            { text: "Programada: que vuelvan a comprar pronto.", points: 0, recomendacion: "⚠️ Área Crítica: Obsolescencia programada." },
            { text: "No nos importa cuánto dure, solo que se venda.", points: 3, recomendacion: "Indiferencia ante durabilidad." },
            { text: "Intentamos que sea duradero y damos soporte largo.", points: 7, recomendacion: "Esfuerzo por durabilidad." },
            { text: "Diseño para la eternidad: reparable, actualizable y circular.", points: 10, recomendacion: "Diseño circular perfecto." }
        ]
    },
    {
        id: 5,
        block: "Estrategia",
        question: "Resiliencia: ¿Tu empresa sabría 'aterrizar' y mantenerse si el mercado dejara de crecer?",
        options: [
            { text: "Si dejamos de crecer, nos hundimos (Adicción al crecimiento).", points: 0, recomendacion: "⚠️ Área Crítica: Adicción al crecimiento." },
            { text: "Sufriríamos mucho, no tenemos plan B.", points: 3, recomendacion: "Falta de plan B." },
            { text: "Tenemos ahorros y estructura para aguantar un mercado estancado.", points: 7, recomendacion: "Buena estructura financiera." },
            { text: "Priorizamos la estabilidad al volumen.", points: 10, recomendacion: "Resiliencia total." }
        ]
    },
    {
        id: 6,
        block: "Estrategia",
        question: "Plan SMART: ¿Tienes un plan de sostenibilidad real a 3 años o vas a salto de mata?",
        options: [
            { text: "Sobrevivir mes a mes.", points: 0, recomendacion: "⚠️ Área Crítica: Supervivencia pura." },
            { text: "Tenemos objetivos financieros, nada más.", points: 3, recomendacion: "Solo visión financiera." },
            { text: "Plan a 3 años con algunas metas sostenibles.", points: 7, recomendacion: "Plan a medio plazo." },
            { text: "Plan Estratégico SMART alineado 100% con la EBC.", points: 10, recomendacion: "Estrategia EBC total." }
        ]
    },
    // --- BLOQUE 2: SOCIAL ---
    {
        id: 7,
        block: "Social",
        question: "Brecha Salarial: ¿Cuál es el ratio entre el que más cobra y el que menos?",
        options: [
            { text: "Más de 1:20 (El jefe cobra por 20).", points: 0, recomendacion: "⚠️ Área Crítica: Desigualdad extrema." },
            { text: "Entre 1:11 y 1:20 (Lo normal en empresas grandes).", points: 3, recomendacion: "Brecha considerable." },
            { text: "Entre 1:6 y 1:10 (Esfuerzo por la equidad).", points: 7, recomendacion: "Esfuerzo por equidad." },
            { text: "Máximo 1:5 (Justicia social real).", points: 10, recomendacion: "Justicia social real." }
        ]
    },
    {
        id: 8,
        block: "Social",
        question: "Democracia Interna: ¿Se puede opinar sobre el rumbo de la empresa o es una dictadura vertical?",
        options: [
            { text: "Dictadura: se hace lo que dice el de arriba.", points: 0, recomendacion: "⚠️ Área Crítica: Autoritarismo." },
            { text: "Se escucha, pero la decisión final no se negocia.", points: 3, recomendacion: "Escucha sin voto." },
            { text: "El equipo decide sobre temas de oficina y bienestar.", points: 7, recomendacion: "Participación media." },
            { text: "Democracia real: votamos las decisiones estratégicas.", points: 10, recomendacion: "Democracia real." }
        ]
    },
    {
        id: 9,
        block: "Social",
        question: "Desconexión Digital: ¿El Slack/WhatsApp echa humo fuera de horario o respetáis el descanso?",
        options: [
            { text: "Disponibilidad 24/7 exigida.", points: 0, recomendacion: "⚠️ Área Crítica: Esclavitud digital." },
            { text: "Se envían correos fuera de hora pero 'no urge' (mentira).", points: 3, recomendacion: "Falsa desconexión." },
            { text: "Política de no molestar tras la jornada, salvo incendios.", points: 7, recomendacion: "Política de respeto." },
            { text: "Desconexión sagrada: servidores de chat apagados tras el curro.", points: 10, recomendacion: "Desconexión sagrada." }
        ]
    },
    {
        id: 10,
        block: "Social",
        question: "Diversidad: ¿Buscas 'clones' que piensen igual o valoras la diversidad real?",
        options: [
            { text: "Buscamos 'clones' que piensen igual.", points: 0, recomendacion: "⚠️ Área Crítica: Falta de diversidad." },
            { text: "Intentamos ser abiertos, pero no hay planes reales.", points: 3, recomendacion: "Intención sin plan." },
            { text: "Tenemos cuotas de diversidad", points: 7, recomendacion: "Medidas activas de diversidad." },
            { text: "La diversidad es nuestra mayor fuerza y está en todos los niveles.", points: 10, recomendacion: "Diversidad integrada." }
        ]
    },
    {
        id: 11,
        block: "Social",
        question: "Formación Ética: ¿Enseñas a tu equipo sostenibilidad y EBC o solo cómo producir más?",
        options: [
            { text: "Solo formación técnica para producir.", points: 0, recomendacion: "⚠️ Área Crítica: Solo producción." },
            { text: "Alguna charla suelta sobre reciclaje.", points: 3, recomendacion: "Formación superficial." },
            { text: "Cursos anuales de ética, EBC y Green IT.", points: 7, recomendacion: "Formación anual sólida." },
            { text: "La sostenibilidad es parte central de la formación continua.", points: 10, recomendacion: "Sostenibilidad central." }
        ]
    },
    {
        id: 12,
        block: "Social",
        question: "Salud y Ergonomía: ¿Cuidas las espaldas de tu equipo con mobiliario decente o usas lo más barato?",
        options: [
            { text: "Mobiliario barato de IKEA, el que haya.", points: 0, recomendacion: "⚠️ Área Crítica: Descuido ergonómico." },
            { text: "Sillas estándar de oficina sin más.", points: 3, recomendacion: "Mobiliario estándar." },
            { text: "Revisión ergonómica y sillas de calidad para todos.", points: 7, recomendacion: "Buena ergonomía." },
            { text: "Cuidado físico total: fisio, mobiliario top y descansos activos.", points: 10, recomendacion: "Cuidado físico total." }
        ]
    },
    {
        id: 13,
        block: "Social",
        question: "Propósito Laboral: ¿Tu equipo sabe qué problema social resuelve su trabajo o solo vienen a fichar?",
        options: [
            { text: "Vienen a facturar y ya.", points: 0, recomendacion: "⚠️ Área Crítica: Falta de propósito." },
            { text: "Saben que el producto es bueno, nada más.", points: 3, recomendacion: "Conocimiento de producto." },
            { text: "Entienden el valor social de lo que hacen.", points: 7, recomendacion: "Conciencia social." },
            { text: "Propósito compartido: todos sabemos qué problema del mundo resolvemos.", points: 10, recomendacion: "Propósito transformador." }
        ]
    },
    // --- BLOQUE 3: ECOLOGÍA ---
    {
        id: 14,
        block: "Ecología",
        question: "Ahorro Energético: Selecciona qué medidas aplicáis :",
        type: "checkbox",
        options: [
            { text: "Modo oscuro", points: 2.5, recomendacion: "Ahorra batería en OLED." },
            { text: "Apagado total", points: 2.5, recomendacion: "Evita consumo fantasma." },
            { text: "Brillo optimizado", points: 2.5, recomendacion: "Reduce consumo de monitor." },
            { text: "Regletas inteligentes", points: 2.5, recomendacion: "Gestión eficiente de energía." }
        ]
    },
    {
        id: 15,
        block: "Ecología",
        question: "Criterio de Compra HW: ¿Qué prima al comprar equipos?",
        options: [
            { text: "El más barato de Amazon/PC Componentes.", points: 0, recomendacion: "⚠️ Área Crítica: Compra por precio." },
            { text: "El más potente aunque no se necesite.", points: 3, recomendacion: "Despilfarro de potencia." },
            { text: "Con certificado energético Gold/Platinum.", points: 7, recomendacion: "Eficiencia energética." },
            { text: "Prioridad a la reparabilidad y piezas de recambio.", points: 10, recomendacion: "Reparabilidad prioritaria." }
        ]
    },
    {
        id: 16,
        block: "Ecología",
        question: "Software Inflado (Bloatware): ¿Tu código es ligero o una mole?",
        options: [
            { text: "Código sucio y librerías pesadas que no usamos.", points: 0, recomendacion: "⚠️ Área Crítica: Código ineficiente." },
            { text: "Programamos estándar; si la máquina es potente, que tire.", points: 3, recomendacion: "Programación despreocupada." },
            { text: "Refactorizamos para quitar basura antes de desplegar.", points: 7, recomendacion: "Limpieza de código." },
            { text: "Eco-diseño: optimizado al byte para ahorrar CPU y batería.", points: 10, recomendacion: "Eco-diseño de software." }
        ]
    },
    {
        id: 17,
        block: "Ecología",
        question: "Servidores (Cloud): ¿Dónde alojas tus datos?",
        options: [
            { text: "Ni idea de dónde están.", points: 0, recomendacion: "⚠️ Área Crítica: Desconocimiento de hosting." },
            { text: "Un hosting barato estándar.", points: 3, recomendacion: "Hosting genérico." },
            { text: "Hosting nacional con medidas de ahorro.", points: 7, recomendacion: "Hosting nacional eficiente." },
            { text: "Servidores 100% renovables con PUE muy bajo.", points: 10, recomendacion: "Hosting verde certificado." }
        ]
    },
    {
        id: 18,
        block: "Ecología",
        question: "Gestión de RAEE (Residuos): ¿Qué haces con la electrónica vieja?",
        options: [
            { text: "A la basura normal o al contenedor de la esquina.", points: 0, recomendacion: "⚠️ Área Crítica: Contaminación directa." },
            { text: "Guardados en el 'cajón del olvido' mil años.", points: 3, recomendacion: "Acumulación sin uso." },
            { text: "Reciclaje en punto limpio certificado.", points: 7, recomendacion: "Reciclaje correcto." },
            { text: "Reacondicionamiento, donación o venta de piezas.", points: 10, recomendacion: "Economía circular real." }
        ]
    },
    {
        id: 19,
        block: "Ecología",
        question: "Monitorización kWh: ¿Controlas tu consumo energético?",
        options: [
            { text: "Ni miramos la factura de luz.", points: 0, recomendacion: "⚠️ Área Crítica: Ceguera energética." },
            { text: "Miramos el importe (€), no el consumo (kWh).", points: 3, recomendacion: "Visión solo económica." },
            { text: "Analizamos el consumo mensual para buscar picos.", points: 7, recomendacion: "Análisis mensual." },
            { text: "Control total por zonas y monitorización en tiempo real.", points: 10, recomendacion: "Monitorización avanzada." }
        ]
    },
    {
        id: 20,
        block: "Ecología",
        question: "Hardware Usado: ¿Compras segunda mano?",
        options: [
            { text: "Todo tiene que ser nuevo y brillante.", points: 0, recomendacion: "⚠️ Área Crítica: Obsesión por lo nuevo." },
            { text: "Alguna vez hemos comprado algo usado por ahorrar.", points: 3, recomendacion: "Uso ocasional de segunda mano." },
            { text: "Consideramos el reacondicionado como opción seria.", points: 7, recomendacion: "Reacondicionado como opción." },
            { text: "Prioridad total a hardware Refurbished profesional.", points: 10, recomendacion: "Prioridad Refurbished." }
        ]
    },
    {
        id: 21,
        block: "Ecología",
        question: "Oficina sin Papel: ¿Cuánto imprimís?",
        options: [
            { text: "Se imprime todo 'por si acaso'.", points: 0, recomendacion: "⚠️ Área Crítica: Despilfarro de papel." },
            { text: "Imprimimos a doble cara al menos.", points: 3, recomendacion: "Ahorro básico." },
            { text: "Solo imprimimos lo legalmente obligatorio.", points: 7, recomendacion: "Impresión mínima." },
            { text: "Oficina 99% digital con firma electrónica.", points: 10, recomendacion: "Oficina Paperless." }
        ]
    },
    // --- BLOQUE 4: JUSTICIA ---
    {
        id: 22,
        block: "Justicia",
        question: "Dumping Ético: ¿Compras a quien explota para ahorrar?",
        options: [
            { text: "Si es más barato, compramos aunque exploten gente.", points: 0, recomendacion: "⚠️ Área Crítica: Complicidad en explotación." },
            { text: "Intentamos que no, pero no investigamos mucho.", points: 3, recomendacion: "Pasividad ante explotación." },
            { text: "Exigimos códigos de conducta a los proveedores.", points: 7, recomendacion: "Exigencia ética." },
            { text: "Solo proveedores con sellos éticos certificados.", points: 10, recomendacion: "Certificación ética." }
        ]
    },
    {
        id: 23,
        block: "Justicia",
        question: "Proximidad: ¿De dónde vienen tus compras?",
        options: [
            { text: "Todo de fuera, manda el precio de compra.", points: 0, recomendacion: "⚠️ Área Crítica: Dependencia global." },
            { text: "Mitad y mitad.", points: 3, recomendacion: "Mix local-global." },
            { text: "Priorizamos proveedores nacionales.", points: 7, recomendacion: "Prioridad nacional." },
            { text: "Compra de proximidad: proveedores del barrio/región (KM 0).", points: 10, recomendacion: "Comercio local KM 0." }
        ]
    },
    {
        id: 24,
        block: "Justicia",
        question: "Banca Ética: ¿Dónde está tu dinero?",
        options: [
            { text: "Banca tradicional especulativa de toda la vida.", points: 0, recomendacion: "⚠️ Área Crítica: Financiación opaca." },
            { text: "Banco normal pero con cuenta 'sostenible'.", points: 3, recomendacion: "Greenwashing bancario posible." },
            { text: "Cooperativa de crédito o banca con inversión ética real.", points: 7, recomendacion: "Banca cooperativa." },
            { text: "Banca Ética (Triodos, Fiare, etc.) 100%.", points: 10, recomendacion: "Banca ética 100%." }
        ]
    },
    {
        id: 25,
        block: "Justicia",
        question: "Soberanía Tecnológica: ¿Software libre o propietario?",
        options: [
            { text: "Software privativo cerrado y caro siempre.", points: 0, recomendacion: "⚠️ Área Crítica: Dependencia tecnológica." },
            { text: "Alguna herramienta Open Source usamos por ahorrar.", points: 3, recomendacion: "Uso oportunista de Open Source." },
            { text: "Estrategia de migración activa a Software Libre.", points: 7, recomendacion: "Migración a FLOSS." },
            { text: "Prioridad total al Software Libre y Soberanía Digital.", points: 10, recomendacion: "Soberanía digital total." }
        ]
    },
    {
        id: 26,
        block: "Justicia",
        question: "Consumo Oficina: ¿Qué coméis/bebéis?",
        options: [
            { text: "Lo más barato del súper sin mirar nada.", points: 0, recomendacion: "⚠️ Área Crítica: Consumo irresponsable." },
            { text: "Miramos la marca pero no el origen.", points: 3, recomendacion: "Consumo marquista." },
            { text: "Compramos productos eco o de comercio justo a veces.", points: 7, recomendacion: "Consumo consciente ocasional." },
            { text: "Suministros (café, té, fruta) 100% Comercio Justo y Local.", points: 10, recomendacion: "Comercio justo y local 100%." }
        ]
    },
    {
        id: 27,
        block: "Justicia",
        question: "Asesoría EBC: ¿Quién te aconseja?",
        options: [
            { text: "Solo saben de maximizar beneficio e impuestos.", points: 0, recomendacion: "⚠️ Área Crítica: Asesoría tradicional." },
            { text: "Les suena el tema pero no lo aplican.", points: 3, recomendacion: "Conocimiento superficial." },
            { text: "Nos ayudan a medir indicadores sociales básicos.", points: 7, recomendacion: "Medición social básica." },
            { text: "Trabajamos con expertos en Economía del Bien Común.", points: 10, recomendacion: "Asesoría experta EBC." }
        ]
    },
    {
        id: 28,
        block: "Justicia",
        question: "Limpieza Eco: ¿Con qué limpiáis?",
        options: [
            { text: "Químicos fuertes convencionales que huelen a lejía pura.", points: 0, recomendacion: "⚠️ Área Crítica: Toxicidad en limpieza." },
            { text: "Limpieza estándar de mercado.", points: 3, recomendacion: "Limpieza estándar." },
            { text: "Exigimos productos con etiqueta Ecolabel.", points: 7, recomendacion: "Productos Ecolabel." },
            { text: "Limpieza 100% ecológica, sin tóxicos y residuo cero.", points: 10, recomendacion: "Limpieza eco total." }
        ]
    },
    // --- BLOQUE 5: GOBERNANZA ---
    {
        id: 29,
        block: "Gobernanza",
        question: "Cuentas Abiertas: ¿Transparencia financiera?",
        options: [
            { text: "Es secreto total de la dirección.", points: 0, recomendacion: "⚠️ Área Crítica: Opacidad total." },
            { text: "Se da un resumen muy vago una vez al año.", points: 3, recomendacion: "Transparencia mínima." },
            { text: "Se informan de los ingresos y gastos trimestralmente.", points: 7, recomendacion: "Información trimestral." },
            { text: "Transparencia radical: las cuentas están abiertas al equipo.", points: 10, recomendacion: "Transparencia radical." }
        ]
    },
    {
        id: 30,
        block: "Gobernanza",
        question: "Gestión de Errores: ¿Honestidad?",
        options: [
            { text: "Se tapa como sea, la imagen manda.", points: 0, recomendacion: "⚠️ Área Crítica: Ocultación de errores." },
            { text: "Solo se admite si nos pillan o hay denuncia.", points: 3, recomendacion: "Admisión forzada." },
            { text: "Informamos internamente de los fallos para mejorar.", points: 7, recomendacion: "Aprendizaje interno." },
            { text: "Honestidad total: admitimos errores públicamente y los reparamos.", points: 10, recomendacion: "Honestidad pública." }
        ]
    },
    {
        id: 31,
        block: "Gobernanza",
        question: "Propiedad: ¿De quién es la empresa?",
        options: [
            { text: "De un fondo de inversión o dueño que no aparece nunca.", points: 0, recomendacion: "⚠️ Área Crítica: Propiedad ausente." },
            { text: "Del fundador al 100%.", points: 3, recomendacion: "Propiedad única." },
            { text: "El equipo tiene un pequeño porcentaje de acciones.", points: 7, recomendacion: "Participación accionarial." },
            { text: "Modelo cooperativo o propiedad colectiva real.", points: 10, recomendacion: "Propiedad colectiva." }
        ]
    },
    {
        id: 32,
        block: "Gobernanza",
        question: "Marketing: ¿Verdad o Greenwashing?",
        options: [
            { text: "Greenwashing: fotos con árboles mientras contaminamos.", points: 0, recomendacion: "⚠️ Área Crítica: Greenwashing." },
            { text: "Exageramos un poco los logros sociales.", points: 3, recomendacion: "Exageración." },
            { text: "Comunicación basada solo en hechos demostrables.", points: 7, recomendacion: "Hechos demostrables." },
            { text: "Transparencia radical y marketing honesto basado en datos.", points: 10, recomendacion: "Marketing honesto." }
        ]
    },
    {
        id: 33,
        block: "Gobernanza",
        question: "Sueldos Públicos: ¿Se saben?",
        options: [
            { text: "Prohibido hablar de lo que uno cobra.", points: 0, recomendacion: "⚠️ Área Crítica: Tabú salarial." },
            { text: "Se saben los rangos generales por categoría.", points: 3, recomendacion: "Rangos conocidos." },
            { text: "Sabemos lo que cobra cada uno, pero es tabú.", points: 7, recomendacion: "Conocimiento informal." },
            { text: "Sueldos públicos y transparentes dentro de la empresa.", points: 10, recomendacion: "Transparencia salarial total." }
        ]
    },
    // --- BLOQUE 6: CLIENTES ---
    {
        id: 34,
        block: "Clientes",
        question: "Privacidad: ¿Qué hacéis con los datos?",
        options: [
            { text: "Mercadeamos con los datos si podemos.", points: 0, recomendacion: "⚠️ Área Crítica: Venta de datos." },
            { text: "Cumplimos la ley (RGPD) por miedo a la multa.", points: 3, recomendacion: "Cumplimiento legal mínimo." },
            { text: "Aplicamos privacidad por diseño.", points: 7, recomendacion: "Privacidad por diseño." },
            { text: "Ética de datos total: soberanía absoluta del cliente.", points: 10, recomendacion: "Soberanía de datos." }
        ]
    },
    {
        id: 35,
        block: "Clientes",
        question: "Ciberseguridad: ¿Protección del usuario?",
        options: [
            { text: "Seguridad nula, si nos hackean ya veremos.", points: 0, recomendacion: "⚠️ Área Crítica: Negligencia en seguridad." },
            { text: "Antivirus básico y poco más.", points: 3, recomendacion: "Seguridad básica." },
            { text: "Auditoría de seguridad anual y formación al equipo.", points: 7, recomendacion: "Seguridad auditada." },
            { text: "Cultura de seguridad proactiva: protegemos al cliente como a nosotros.", points: 10, recomendacion: "Cultura de seguridad." }
        ]
    },
    {
        id: 36,
        block: "Clientes",
        question: "Algoritmos: ¿Tienen sesgos?",
        options: [
            { text: "Ni miramos si la IA tiene sesgos.", points: 0, recomendacion: "⚠️ Área Crítica: Ceguera algorítmica." },
            { text: "Usamos lo que nos dan sin cuestionar.", points: 3, recomendacion: "Uso acrítico." },
            { text: "Revisamos que no haya discriminación básica.", points: 7, recomendacion: "Revisión básica." },
            { text: "Algoritmos éticos auditados contra sesgos de raza/género.", points: 10, recomendacion: "Algoritmos éticos." }
        ]
    },
    // --- BLOQUE 7: IMPACTO ---
    {
        id: 37,
        block: "Impacto",
        question: "Impuestos: ¿Dónde tributáis?",
        options: [
            { text: "Ingeniería fiscal para pagar lo mínimo fuera de aquí.", points: 0, recomendacion: "⚠️ Área Crítica: Elusión fiscal." },
            { text: "Pagamos lo que toca porque no queda otra.", points: 3, recomendacion: "Cumplimiento forzoso." },
            { text: "Evitamos deducciones dudosas para contribuir más.", points: 7, recomendacion: "Contribución responsable." },
            { text: "Orgullo fiscal: pagamos con gusto donde generamos valor.", points: 10, recomendacion: "Orgullo fiscal." }
        ]
    },
    {
        id: 38,
        block: "Impacto",
        question: "Impacto Local: ¿Relación con el barrio?",
        options: [
            { text: "Somos un vecino invisible en el barrio.", points: 0, recomendacion: "⚠️ Área Crítica: Aislamiento local." },
            { text: "Damos algún donativo en Navidad.", points: 3, recomendacion: "Caridad puntual." },
            { text: "Cedemos horas de nuestros técnicos a ONGs locales.", points: 7, recomendacion: "Voluntariado técnico." },
            { text: "Implicación total: el barrio es parte de la empresa.", points: 10, recomendacion: "Implicación total." }
        ]
    },
    {
        id: 39,
        block: "Impacto",
        question: "Plan de Residuos Especiales: ¿Qué hacéis?",
        options: [
            { text: "Los tóners y pilas van a la basura normal.", points: 0, recomendacion: "⚠️ Área Crítica: Gestión ilegal de residuos." },
            { text: "Los llevamos a la tienda cuando nos acordamos.", points: 3, recomendacion: "Gestión esporádica." },
            { text: "Tenemos puntos de recogida clara en la oficina.", points: 7, recomendacion: "Puntos de recogida." },
            { text: "Gestión certificada y reducción activa de consumibles.", points: 10, recomendacion: "Gestión certificada." }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let userRecommendations = [];
let companyName = "";

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainerCheck = document.querySelector('.charts-grid');
    const adviceContainerCheck = document.getElementById('advices-container');

    if (quizContainer) {
        const prefill = sessionStorage.getItem('prefill_company');
        if (prefill) {
            companyName = prefill;
            sessionStorage.removeItem('prefill_company');
            currentQuestionIndex = 0;
            totalScore = 0;
            userRecommendations = [];
            renderQuestion();
        } else {
            showStartScreen();
        }
    } else if (resultsContainerCheck || adviceContainerCheck) {
        checkAndRenderResults();
    }

    if (document.getElementById('evolutionChart')) {
        initEvolutionChart();
    }
});

function showStartScreen() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-card fade-in" id="start-screen" style="text-align: center;">
            <i class="fas fa-clipboard-check" style="font-size: 4rem; color: #2e7d32; margin-bottom: 1.5rem;"></i>
            <h2>Auditoría de Sostenibilidad EBC</h2>
            <p style="margin-bottom: 2rem; color: #666;">Evalúa el impacto social y ambiental de tu empresa.</p>
            <div class="input-group" style="margin-bottom: 2rem;">
                <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">Nombre de la Empresa:</label>
                <input type="text" id="companyNameInput" placeholder="Nombre de tu empresa" class="form-input" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px;">
            </div>

            <button class="option-btn primary-btn" onclick="beginTest()" style="justify-content: center; width: 100%; background:#2e7d32; color:white;">
                Comenzar Auditoría <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

window.beginTest = function () {
    const input = document.getElementById('companyNameInput');
    if (!input.value.trim()) {
        alert("Por favor, introduce el nombre de la empresa.");
        return;
    }
    companyName = input.value.trim();
    currentQuestionIndex = 0;
    totalScore = 0;
    userRecommendations = [];
    renderQuestion();
};

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
            <div class="options-container">
                ${q.options.map((opt, index) => `
                    <button class="option-btn" onclick="handleAnswer(${index})">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

window.handleAnswer = function (optionIndex) {
    const q = questions[currentQuestionIndex];
    const selectedOption = q.options[optionIndex];

    totalScore += selectedOption.points;
    userRecommendations.push({
        question: q.question,
        category: q.block,
        answer: selectedOption.text,
        feedback: selectedOption.recomendacion || "Consultar guía EBC",
        points: selectedOption.points
    });

    currentQuestionIndex++;
    renderQuestion();
};

async function finishQuiz() {
    const categoryScores = {
        "Estrategia": 0, "Social": 0, "Ecología": 0,
        "Justicia": 0, "Gobernanza": 0, "Clientes": 0, "Impacto": 0
    };

    userRecommendations.forEach(rec => {
        if (categoryScores[rec.category] !== undefined) categoryScores[rec.category] += rec.points;
    });

    // Validar que hay nombre de empresa (por si acaso)
    if (!companyName) companyName = "Anónimo";

    // Feedback Visual: Guardando...
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-card fade-in" style="text-align:center;">
                <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: #2e7d32; margin-bottom: 1.5rem;"></i>
                <h2>Guardando resultados en la nube...</h2>
                <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #2e7d32; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto;"></div>
                <p>Por favor espera un momento.</p>
            </div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        `;
    }

    // Preparar objeto resultados
    const resultadosJSON = {
        categoryScores: categoryScores,
        recommendations: userRecommendations,
        totalScore: totalScore
    };

    try {
        const { data, error } = await supabase
            .from('auditorias')
            .insert([
                {
                    empresa: companyName,
                    puntos: totalScore,
                    resultados: resultadosJSON,
                    fecha: new Date().toISOString()
                },
            ]);

        if (error) throw error;

        // Save active results for immediate rendering (keep this for session persistence)
        sessionStorage.setItem('active_results', JSON.stringify({
            company: companyName,
            score: totalScore,
            categoryScores: categoryScores,
            recommendations: userRecommendations,
            timestamp: Date.now()
        }));

        window.location.href = 'resultados.html';

    } catch (err) {
        console.error("Error guardando en Supabase:", err);
        alert("Hubo un error al guardar los datos en la nube. Se guardarán localmente.");

        // Fallback localstorage (opcional, pero buena práctica)
        const historyEntry = {
            date: new Date().toLocaleDateString(),
            timestamp: Date.now(),
            companyName: companyName,
            totalScore: totalScore,
            blockScores: categoryScores,
            savedRecommendations: userRecommendations
        };
        const history = JSON.parse(localStorage.getItem('ebcAuditHistory')) || [];
        history.push(historyEntry);
        localStorage.setItem('ebcAuditHistory', JSON.stringify(history));

        sessionStorage.setItem('active_results', JSON.stringify({
            company: companyName,
            score: totalScore,
            categoryScores: categoryScores,
            recommendations: userRecommendations,
            timestamp: Date.now()
        }));

        window.location.href = 'resultados.html';
    }
}

function checkAndRenderResults() {
    const data = JSON.parse(sessionStorage.getItem('active_results'));

    // Ensure we are on the results page or recommendations page
    const resultsContainer = document.querySelector('.charts-grid');
    const adviceContainer = document.getElementById('advices-container');

    if (!resultsContainer && !adviceContainer) return;

    if (!data) {
        const container = resultsContainer || adviceContainer;
        if (container) {
            container.innerHTML = `<div class="card" style="text-align:center; padding:50px;">
                <h2>No hay datos activos</h2>
                <p>Realiza un test o carga uno desde el historial.</p>
                <a href="auditoria.html" class="option-btn" style="display:inline-block; margin-top:1rem;">Ir a la Auditoría</a>
             </div>`;
        }
        return;
    }

    if (resultsContainer) {
        // Render Score Card
        renderScoreCard(data, resultsContainer);
        // Render Radar Chart
        renderRadarChart(data);
    }

    if (adviceContainer) {
        renderAccordion(data);
    }
}

function renderScoreCard(data, container) {
    // Determine max score (39 questions * 10 points = 390)
    const maxScore = 390;
    const percentage = Math.round((data.score / maxScore) * 100);

    let colorClass = 'score-bad'; // Default red
    let statusText = 'Mejorable';
    let colorHex = '#e74c3c';

    if (percentage >= 75) {
        colorClass = 'score-good';
        statusText = 'Excelente';
        colorHex = '#2ecc71';
    } else if (percentage >= 40) {
        colorClass = 'score-mid';
        statusText = 'En Proceso';
        colorHex = '#f39c12';
    }

    // Clear loading message
    container.innerHTML = '';

    // Create Score Card
    const scoreCard = document.createElement('div');
    scoreCard.className = 'card';
    scoreCard.style.textAlign = 'center';
    scoreCard.style.borderTop = `5px solid ${colorHex}`;
    scoreCard.innerHTML = `
        <h3 style="color:${colorHex}">Puntuación Global EBC</h3>
        <div style="font-size:3.5rem; font-weight:800; color:${colorHex}; margin:10px 0;">
            ${data.score} <span style="font-size:1.5rem; color:#7f8c8d;">/ ${maxScore}</span>
        </div>
        <p style="font-size:1.2rem; font-weight:bold; color:${colorHex}">${statusText} (${percentage}%)</p>
    `;
    container.appendChild(scoreCard);

    // Create Radar Chart Container
    const chartCard = document.createElement('div');
    chartCard.className = 'card';
    chartCard.innerHTML = `
        <h3>Matriz del Bien Común</h3>
        <div style="position: relative; height: 400px; width: 100%;">
            <canvas id="radarChart"></canvas>
        </div>
    `;
    container.appendChild(chartCard);

    // Link to full recommendations
    const linkCard = document.createElement('div');
    linkCard.className = 'card';
    linkCard.style.textAlign = 'center';
    linkCard.innerHTML = `
        <h3>¿Cómo mejorar?</h3>
        <p>Descubre acciones concretas para cada área.</p>
        <a href="recomendaciones.html" class="option-btn primary-btn" style="margin-top:1rem; display:inline-flex;">Ver Plan de Acción</a>
    `;
    container.appendChild(linkCard);
}

function renderRadarChart(data) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    // Destroy existing chart if any
    if (window.myRadarChart instanceof Chart) {
        window.myRadarChart.destroy();
    }

    // Prepare data, handling missing/zero values safely
    const categories = [
        "Estrategia", "Social", "Ecología",
        "Justicia", "Gobernanza", "Clientes", "Impacto"
    ];

    // Max scores per block based on question count:
    // Estrategia (6q): 60, Social (7q): 70, Ecología (8q): 80, Justicia (7q): 70
    // Gobernanza (6q): 60, Clientes (3q): 30, Impacto (3q): 30
    const blockMax = {
        "Estrategia": 60, "Social": 70, "Ecología": 80,
        "Justicia": 70, "Gobernanza": 50, "Clientes": 30, "Impacto": 30
    };

    const dataset = categories.map(cat => {
        const score = data.categoryScores[cat] || 0;
        const max = blockMax[cat] || 60;
        return Math.round((score / max) * 100);
    });

    window.myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '% Cumplimiento EBC',
                data: dataset,
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: '#2ecc71',
                pointBackgroundColor: '#27ae60',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { backdropColor: 'transparent' }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// --- SECTOR FEEDBACK DATA ---
const sectorFeedback = {
    "Estrategia": {
        low: "⚠️ Área Crítica: Adicción al Crecimiento. Estás operando en un modelo de 'avión que no sabe aterrizar'. Tu éxito depende de un crecimiento infinito que choca con los límites del planeta. Acción: Adopta el Modelo Donut, define qué es 'suficiente' para tu empresa y deja de medir solo el beneficio.",
        mid: "En Transición. Tienes conciencia, pero falta estructura. Acción: Pasa de las 'buenas intenciones' a un Plan SMART EBC con objetivos medibles a 3 años que incluyan límites ecológicos reales.",
        high: "Referente Estratégico. Entiendes la prosperidad en equilibrio. Acción: Sirve de mentor para otras empresas del sector y lidera la transición hacia el post-crecimiento."
    },
    "Social": {
        low: "⚠️ Área Crítica: Modelo Vertical y Desigual. Tu empresa es una dictadura donde el talento se quema. Brechas salariales altas y falta de participación matan la motivación. Acción: Reduce la brecha a menos de 1:5, respeta la desconexión digital y deja que el equipo empiece a decidir.",
        mid: "Empresa Humana en Proceso. Cuidas a la gente pero de forma paternalista. Acción: Pasa de 'escuchar' a 'dar poder'. Implementa democracia interna real y transparencia salarial total.",
        high: "Líder en Justicia Social. Tu equipo es tu socio, no tu recurso. Acción: Mantén la cultura de transparencia radical y sigue invirtiendo en ergonomía y salud integral."
    },
    "Ecología": {
        low: "⚠️ Área Crítica: Despilfarro Digital. Tu código es 'Software Inflado' y tu hardware es basura en potencia. Estás fundiendo recursos innecesarios. Acción: Audita tus kWh, limpia tu código de librerías inútiles y deja de comprar hardware nuevo por defecto.",
        mid: "TIC en Transición Verde. Tienes buenas prácticas (modo oscuro, reciclaje), pero falta eficiencia profunda. Acción: Pasa a un Cloud 100% renovable y prioriza el hardware reacondicionado (Refurbished) sobre el nuevo.",
        high: "Maestro del Green IT. Minimizas el impacto por byte. Acción: Implementa el 'Derecho a Reparar' como norma de empresa y optimiza tu infraestructura para que sea regenerativa."
    },
    "Justicia": {
        low: "⚠️ Área Crítica: Cómplice de Dumping Ético. Tu ahorro se basa en la explotación ajena o en banca que financia armas/fósiles. Acción: Cierra tus cuentas en banca especulativa, pásate a la Banca Ética y audita hoy mismo a tus proveedores de hardware.",
        mid: "Comprador Responsable. Miras etiquetas pero el precio sigue mandando demasiado. Acción: Prioriza la proximidad (KM 0) y el Software Libre para ganar soberanía tecnológica y social.",
        high: "Soberanía y Ética Total. Tu cadena de suministro es limpia y coherente. Acción: Fomenta alianzas con otras cooperativas y empresas EBC para crear un mercado local fuerte."
    },
    "Gobernanza": {
        low: "⚠️ Área Crítica: Caja Negra. Tu empresa es opaca y genera desconfianza. El secreto salarial y financiero es una barrera para la sostenibilidad. Acción: Abre los libros financieros al equipo y admite los errores ambientales con honestidad radical.",
        mid: "Transparencia Moderada. Informas pero no involucras. Acción: Publica los sueldos internamente y permite que la propiedad de la empresa sea compartida con los empleados.",
        high: "Gobernanza Democrática. Eres una organización madura y transparente. Acción: Implementa marketing honesto basado en datos reales para evitar cualquier sombra de Greenwashing."
    },
    "Clientes": {
        low: "⚠️ Área Crítica: Manipulación Digital. Usas 'Dark Patterns' y mercadeas con datos. Eso erosiona la dignidad del cliente. Acción: Elimina los trucos psicológicos de venta y aplica 'Privacidad por Diseño' inmediatamente.",
        mid: "Respeto Digital Básico. Cumples la ley pero no vas más allá. Acción: Audita tus algoritmos contra sesgos de género/raza y refuerza la ciberseguridad proactiva.",
        high: "Guardián de la Ética Digital. Proteges al usuario como a ti mismo. Acción: Lidera el debate sobre IAs éticas y soberanía de datos en tu comunidad técnica."
    },
    "Impacto": {
        low: "⚠️ Área Crítica: Vecino Invisible / Economía Lineal. Generas residuos tóxicos (RAEE) sin control y no aportas nada a tu barrio. Acción: Gestiona tus tóners y cables con certificados oficiales y empieza a pagar impuestos con orgullo local.",
        mid: "Colaborador Social. Ayudas puntualmente pero no estás integrado. Acción: Cede horas de tus técnicos para proyectos sociales locales y elimina al 100% los plásticos de un solo uso.",
        high: "Activo Comunitario. Tu empresa mejora el barrio y el entorno. Acción: Implementa un plan de residuos cero y colabora en la creación de redes de economía social locales."
    }
};

function renderAccordion(data) {
    const container = document.getElementById('advices-container');
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    const categories = [
        "Estrategia", "Social", "Ecología",
        "Justicia", "Gobernanza", "Clientes", "Impacto"
    ];

    const blockMax = {
        "Estrategia": 60, "Social": 70, "Ecología": 80,
        "Justicia": 70, "Gobernanza": 50, "Clientes": 30, "Impacto": 30
    };

    // Group individual questions by category for the details view
    const detailsGrouped = {};
    categories.forEach(cat => detailsGrouped[cat] = []);

    // questions is global, we can use it to map answers
    // We need to match user answers (which we might need to look up in userRecommendations or rebuild)
    // Actually userRecommendations contains { category, points, text, ... } but maybe not the original question text easily?
    // Let's rely on userRecommendations which has: {id, category, points, maxPoints, questionText, selectedOption, recommendation}
    // Wait, let's check what userRecommendations has. In `handleAnswer` we push:
    // { id: question.id, category: question.block, points: selectedOption.points, selectedOption: selectedOption.text, recommendation: selectedOption.recomendacion }
    // It does NOT have 'questionText' or 'maxPoints'.

    // Let's map it using the question ID
    userRecommendations.forEach(rec => {
        if (rec.category) {
            const q = questions.find(q => q.id === rec.id);
            if (q) {
                if (!detailsGrouped[rec.category]) detailsGrouped[rec.category] = [];
                detailsGrouped[rec.category].push({
                    question: q.question,
                    answer: rec.selectedOption,
                    points: rec.points,
                    tip: rec.recommendation
                });
            }
        }
    });

    categories.forEach(cat => {
        const score = data.categoryScores[cat] || 0;
        const max = blockMax[cat] || 1; // avoid div by zero
        const percent = Math.round((score / max) * 100);

        let feedbackText = "";
        let statusClass = "";
        let statusLabel = "";
        let colorHex = "";

        if (percent < 40) {
            feedbackText = sectorFeedback[cat].low;
            statusClass = "recommendation-critical";
            statusLabel = "CRÍTICO";
            colorHex = "#e74c3c";
        } else if (percent < 75) {
            feedbackText = sectorFeedback[cat].mid;
            statusClass = "recommendation-warning";
            statusLabel = "EN TRANSICIÓN";
            colorHex = "#f39c12";
        } else {
            feedbackText = sectorFeedback[cat].high;
            statusClass = "recommendation-good";
            statusLabel = "EXCELENTE";
            colorHex = "#2ecc71";
        }

        const card = document.createElement('div');
        card.className = `recommendation-card fade-in ${statusClass}`;
        card.style.borderLeft = `6px solid ${colorHex}`;
        card.style.marginBottom = "20px";
        card.style.padding = "20px";
        card.style.borderRadius = "8px";
        card.style.backgroundColor = "#fff";
        card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; color:${colorHex};">${cat}</h3>
                <span style="font-weight:bold; font-size:1.2rem; color:${colorHex};">${percent}%</span>
            </div>
            <div style="margin:10px 0;">
                <span style="display:inline-block; padding:4px 8px; border-radius:4px; background:${colorHex}20; color:${colorHex}; font-weight:bold; font-size:0.8rem;">
                    ${statusLabel}
                </span>
            </div>
            <p style="font-size:1rem; line-height:1.5; color:#333; margin-bottom:15px;">
                ${feedbackText}
            </p>
        `;

        container.appendChild(card);
    });
}

// --- HISTORY & EVOLUTION CHART LOGIC (SUPABASE) ---

async function initEvolutionChart() {
    // Solo ejecutar si estamos en la página de evolución
    const selector = document.getElementById('companySelector');
    if (!selector) return;

    try {
        // 1. Obtener empresas únicas de Supabase
        const { data, error } = await supabase
            .from('auditorias')
            .select('empresa');

        if (error) throw error;

        // Extraer nombres únicos
        const companies = [...new Set(data.map(item => item.empresa))];

        selector.innerHTML = '<option value="">Selecciona una empresa...</option>';

        if (companies.length === 0) {
            const resultCard = document.querySelector('.card h3').parentNode; // Parent of "Progreso Histórico"
            if (resultCard) resultCard.innerHTML += '<p>No hay auditorías registradas en la nube.</p>';
            return;
        }

        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            selector.appendChild(option);
        });

        // 2. Event Listener para cargar historial
        selector.addEventListener('change', async (e) => {
            const company = e.target.value;
            if (company) {
                await loadCompanyHistory(company);
            } else {
                hideHistoryUI();
            }
        });

        // Pre-seleccionar si venimos de guardar un resultado
        const activeData = JSON.parse(sessionStorage.getItem('active_results'));
        if (activeData && activeData.company && companies.includes(activeData.company)) {
            selector.value = activeData.company;
            await loadCompanyHistory(activeData.company);
        }

    } catch (err) {
        console.error("Error cargando empresas:", err);
        selector.innerHTML = '<option>Error al cargar</option>';
    }
}

async function loadCompanyHistory(companyName) {
    const tableCard = document.getElementById('history-table-card');
    const tableBody = document.getElementById('history-table-body');

    // Mostrar estado de carga (opcional)
    if (tableBody) tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando historial...</td></tr>';
    if (tableCard) tableCard.style.display = 'block';

    try {
        const { data, error } = await supabase
            .from('auditorias')
            .select('*')
            .eq('empresa', companyName)
            .order('fecha', { ascending: true });

        if (error) throw error;

        updateEvolutionUI(data);

    } catch (err) {
        console.error("Error cargando historial:", err);
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:red;">Error al obtener datos.</td></tr>';
    }
}

function hideHistoryUI() {
    const tableCard = document.getElementById('history-table-card');
    if (tableCard) tableCard.style.display = 'none';
    // Opcional: Limpiar gráfico
    if (window.evolutionLineChart) {
        window.evolutionLineChart.destroy();
    }
}

function updateEvolutionUI(historyData) {
    // Render Tabla
    const tableBody = document.getElementById('history-table-body');
    if (tableBody) {
        tableBody.innerHTML = historyData.map(h => {
            const dateObj = new Date(h.fecha);
            const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
            return `
            <tr>
                <td>${formattedDate}</td>
                <td>${h.empresa}</td>
                <td>${h.puntos}</td>
                <td>
                    <button class="option-btn" style="padding:5px 10px; font-size:0.9rem;" onclick="loadAudit(${h.id})">
                        Cargar
                    </button>
                </td>
            </tr>
            `;
        }).join('');
    }

    // Render Gráfico
    renderEvolutionChart(historyData);
}

function renderEvolutionChart(data) {
    const ctx = document.getElementById('evolutionChart');
    if (!ctx) return;

    if (window.evolutionLineChart instanceof Chart) {
        window.evolutionLineChart.destroy();
    }

    const labels = data.map(h => new Date(h.fecha).toLocaleDateString());
    const scores = data.map(h => h.puntos);

    window.evolutionLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntuación EBC',
                data: scores,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Puntos: ${context.parsed.y} / 430`;
                        }
                    }
                },
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 430,
                    title: { display: true, text: 'Puntuación Total' }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Global scope para que el onclick del HTML funcione
window.loadAudit = async function (id) {
    try {
        // Mostrar feedback visual
        const btn = event ? event.target : null;
        if (btn) btn.textContent = "Cargando...";

        const { data, error } = await supabase
            .from('auditorias')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Recuperar objeto resultados (JSON)
        // Nota: en Supabase guardamos el JSON completo en la columna 'resultados'
        const resultados = data.resultados;

        sessionStorage.setItem('active_results', JSON.stringify({
            company: data.empresa,
            score: data.puntos,
            categoryScores: resultados.categoryScores,
            recommendations: resultados.recommendations,
            timestamp: new Date(data.fecha).getTime() // Por compatibilidad
        }));

        window.location.href = 'resultados.html';

    } catch (err) {
        console.error("Error cargando auditoría:", err);
        alert("Error al cargar la auditoría desde la nube.");
        if (btn) btn.textContent = "Cargar";
    }
};

window.clearHistory = function () {
    alert("Esta funcionalidad ahora se gestiona directamente en la base de datos.");
};
