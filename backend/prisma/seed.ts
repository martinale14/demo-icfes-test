import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const student = await prisma.student.upsert({
    where: { id: 'demo-student' },
    update: {},
    create: { id: 'demo-student', name: 'Estudiante Demo' },
  });

  const matPorc = await prisma.skill.upsert({
    where: { code: 'MAT-PORC' },
    update: {},
    create: {
      code: 'MAT-PORC',
      name: 'Matemáticas: razonamiento cuantitativo',
      description:
        'Resolver problemas que involucran porcentajes, proporciones y modelación de situaciones cotidianas.',
    },
  });

  const lcInf = await prisma.skill.upsert({
    where: { code: 'LC-INF' },
    update: {},
    create: {
      code: 'LC-INF',
      name: 'Lectura crítica',
      description:
        'Desde la identificación de información literal hasta la inferencia de ideas no explícitas en un texto.',
    },
  });

  const socCiud = await prisma.skill.upsert({
    where: { code: 'SOC-CIUD' },
    update: {},
    create: {
      code: 'SOC-CIUD',
      name: 'Sociales y Ciudadanas',
      description:
        'Desde el reconocimiento de derechos básicos y conflictos hasta el análisis y comparación de fuentes.',
    },
  });

  const cienciasNaturales = await prisma.skill.upsert({
    where: { code: 'CN' },
    update: {},
    create: {
      code: 'CN',
      name: 'Ciencias Naturales',
      description:
        'Desde el reconocimiento de información explícita hasta la aplicación de teorías científicas y el planteamiento de preguntas de investigación.',
    },
  });

  const ingles = await prisma.skill.upsert({
    where: { code: 'ING' },
    update: {},
    create: {
      code: 'ING',
      name: 'Inglés',
      description:
        'Comprensión de lectura en inglés, de nivel básico (Pre A1) a intermedio (B1) según el Marco Común Europeo.',
    },
  });

  const questions = [
    // Ronda 1 (dificultad 1) — una pregunta por categoría
    {
      order: 1,
      skillId: matPorc.id,
      enunciado:
        'Una tienda ofrece un descuento del 20% sobre una camisa cuyo precio original es $80.000. ¿Cuánto dinero se ahorra el comprador al aplicar el descuento?',
      optionA: '$8.000',
      optionB: '$16.000',
      optionC: '$20.000',
      optionD: '$64.000',
      correctAnswer: 'B',
      difficulty: 1,
      explanation: '20% de $80.000 = 0,20 × 80.000 = $16.000.',
    },
    {
      order: 2,
      skillId: lcInf.id,
      enunciado:
        'El café es uno de los productos agrícolas más exportados por Colombia. Según cifras del gremio cafetero, en 2023 el país exportó cerca de 11,3 millones de sacos de café verde, consolidándose como el tercer mayor exportador de café a nivel mundial, después de Brasil y Vietnam.\n\n¿Según el texto, qué lugar ocupa Colombia entre los exportadores mundiales de café?',
      optionA: 'Primero',
      optionB: 'Segundo',
      optionC: 'Tercero',
      optionD: 'Cuarto',
      correctAnswer: 'C',
      difficulty: 1,
      explanation:
        "El texto lo dice explícitamente: 'consolidándose como el tercer mayor exportador de café a nivel mundial'.",
    },
    {
      order: 3,
      skillId: socCiud.id,
      enunciado:
        'La Constitución Política de Colombia de 1991 reconoce la salud, la educación y el trabajo como derechos fundamentales que el Estado debe garantizar a todos los ciudadanos.\n\n¿Cuál de las siguientes opciones corresponde a un derecho reconocido en el texto?',
      optionA: 'La propiedad de vehículos particulares',
      optionB: 'La educación',
      optionC: 'El acceso a redes sociales',
      optionD: 'La propiedad de inmuebles comerciales',
      correctAnswer: 'B',
      difficulty: 1,
      explanation:
        "El texto menciona explícitamente 'la salud, la educación y el trabajo' como derechos fundamentales.",
    },
    {
      order: 4,
      skillId: cienciasNaturales.id,
      enunciado:
        'La fotosíntesis es el proceso mediante el cual las plantas, usando la luz solar, el agua y el dióxido de carbono, producen glucosa y liberan oxígeno como subproducto. Este proceso ocurre principalmente en los cloroplastos de las células vegetales.\n\n¿Según el texto, qué subproducto se libera durante la fotosíntesis?',
      optionA: 'Dióxido de carbono',
      optionB: 'Agua',
      optionC: 'Oxígeno',
      optionD: 'Glucosa',
      correctAnswer: 'C',
      difficulty: 1,
      explanation: "El texto dice explícitamente que las plantas 'liberan oxígeno como subproducto'.",
    },
    {
      order: 5,
      skillId: ingles.id,
      enunciado:
        'My name is Laura. I am sixteen years old. I live in Medellín with my family. I go to school every morning and I like to play basketball in the afternoon.\n\nHow old is Laura?',
      optionA: 'Fifteen',
      optionB: 'Sixteen',
      optionC: 'Seventeen',
      optionD: 'Eighteen',
      correctAnswer: 'B',
      difficulty: 1,
      explanation: "The text says: 'I am sixteen years old.'",
    },

    // Ronda 2 (dificultad 2)
    {
      order: 6,
      skillId: matPorc.id,
      enunciado:
        'En un colegio, el 60% de los 250 estudiantes de grado 11 presentaron la prueba Saber 11 en la primera fecha. De los que no la presentaron en esa fecha, la mitad lo hizo en una segunda fecha. ¿Cuántos estudiantes de grado 11 aún no han presentado la prueba?',
      optionA: '50',
      optionB: '100',
      optionC: '150',
      optionD: '200',
      correctAnswer: 'A',
      difficulty: 2,
      explanation:
        '60% de 250 = 150 presentaron en la primera fecha; quedan 100. La mitad de esos 100 (50) presentó en la segunda fecha; quedan 50 sin presentar.',
    },
    {
      order: 7,
      skillId: lcInf.id,
      enunciado:
        'Durante la última década, varias ciudades colombianas han implementado sistemas de bicicletas públicas como alternativa de transporte. Aunque estos sistemas han reducido el tráfico vehicular en zonas específicas, su uso sigue siendo bajo en comparación con el de las motocicletas, cuyo número ha crecido de manera sostenida. Algunos expertos señalan que la falta de ciclorrutas seguras y continuas desestimula a los posibles usuarios de la bicicleta, mientras que la motocicleta ofrece mayor flexibilidad en vías compartidas con automóviles.\n\n¿A partir del texto, se puede inferir que el bajo uso de las bicicletas públicas se debe principalmente a?',
      optionA: 'La falta de interés general de los ciudadanos por el medio ambiente.',
      optionB: 'El alto costo de adquirir una bicicleta pública.',
      optionC: 'Las deficiencias en la infraestructura vial destinada a los ciclistas.',
      optionD: 'La preferencia cultural histórica por el uso del automóvil particular.',
      correctAnswer: 'C',
      difficulty: 2,
      explanation:
        "El texto señala explícitamente 'la falta de ciclorrutas seguras y continuas' como causa del bajo uso, lo que respalda la infraestructura como causa principal; no se menciona interés ambiental, costo ni preferencia por el automóvil.",
    },
    {
      order: 8,
      skillId: socCiud.id,
      enunciado:
        'En Colombia, el conflicto por la tenencia de la tierra ha sido una de las principales causas históricas de la violencia rural. La concentración de tierras en pocas manos, sumada a la falta de titulación formal para muchos campesinos, ha generado desplazamientos y disputas que persisten hasta hoy.\n\n¿De acuerdo con el texto, cuál de las siguientes es una causa histórica del conflicto por la tierra en Colombia?',
      optionA: 'El exceso de titulación formal para los campesinos',
      optionB: 'La concentración de tierras y la falta de titulación formal',
      optionC: 'La ausencia total de conflictos rurales antes del siglo XX',
      optionD: 'El crecimiento excesivo de las ciudades',
      correctAnswer: 'B',
      difficulty: 2,
      explanation:
        "El texto lo señala directamente: 'la concentración de tierras en pocas manos, sumada a la falta de titulación formal... ha generado desplazamientos y disputas'.",
    },
    {
      order: 9,
      skillId: cienciasNaturales.id,
      enunciado:
        'Un estudiante coloca dos plantas idénticas en macetas: la planta A recibe luz solar directa durante el día, mientras que la planta B se mantiene en un armario cerrado sin luz, aunque recibe la misma cantidad de agua. Después de dos semanas, la planta A se mantiene verde y saludable, mientras que la planta B presenta hojas amarillentas y crecimiento detenido.\n\n¿Cuál es la explicación más adecuada para la diferencia observada entre las dos plantas?',
      optionA: 'La planta B recibió más agua que la planta A.',
      optionB: 'La ausencia de luz impidió que la planta B realizara fotosíntesis de manera adecuada.',
      optionC: 'La planta A creció en un ambiente con menor temperatura.',
      optionD: 'La planta B fue afectada por una plaga no relacionada con la luz.',
      correctAnswer: 'B',
      difficulty: 2,
      explanation:
        'El experimento mantiene constante el agua y varía la luz; la diferencia observada se explica porque la fotosíntesis requiere luz, y sin ella la planta B no puede producir su propio alimento.',
    },
    {
      order: 10,
      skillId: ingles.id,
      enunciado:
        'Last weekend, Carlos and his friends went camping near a river. They set up their tent, cooked food over a fire, and went swimming in the afternoon. Unfortunately, it started raining at night, so they had to pack everything quickly and return home earlier than planned.\n\nWhy did Carlos and his friends return home earlier than planned?',
      optionA: 'Because they ran out of food.',
      optionB: 'Because it started raining.',
      optionC: 'Because the river was too cold.',
      optionD: 'Because they lost their tent.',
      correctAnswer: 'B',
      difficulty: 2,
      explanation:
        "The text states: 'it started raining at night, so they had to pack everything quickly and return home earlier than planned.'",
    },

    // Ronda 3 (dificultad 3)
    {
      order: 11,
      skillId: matPorc.id,
      enunciado:
        'Una receta para 4 personas requiere 250 gramos de harina. Sofía quiere preparar la receta para 10 personas y luego repartir equitativamente la masa total en bolsas de 125 gramos cada una. ¿Cuántas bolsas completas obtendrá?',
      optionA: '4',
      optionB: '5',
      optionC: '6',
      optionD: '10',
      correctAnswer: 'B',
      difficulty: 3,
      explanation:
        'Para 10 personas se necesitan 250 × (10/4) = 625 g de harina. Repartidos en bolsas de 125 g: 625 ÷ 125 = 5 bolsas completas.',
    },
    {
      order: 12,
      skillId: lcInf.id,
      enunciado:
        'La inteligencia artificial conversacional ha pasado, en pocos años, de ser una curiosidad tecnológica a convertirse en una herramienta cotidiana en educación, salud y servicio al cliente. Sin embargo, su adopción acelerada plantea preguntas que la tecnología por sí sola no puede responder: ¿quién es responsable cuando un sistema entrega información incorrecta? ¿Cómo se garantiza que estas herramientas no reemplacen, sino complementen, el juicio humano? Resolver estas preguntas exige tanto avances técnicos como acuerdos sociales e institucionales que, hasta ahora, van a un ritmo más lento que el de la innovación misma.\n\n¿El propósito principal del autor en el texto es?',
      optionA:
        'Explicar en detalle cómo funciona técnicamente la inteligencia artificial conversacional.',
      optionB:
        'Argumentar que la inteligencia artificial debe dejar de usarse en educación y salud.',
      optionC:
        'Señalar que la adopción tecnológica ha superado la capacidad de la sociedad para regularla.',
      optionD: 'Demostrar que el juicio humano ya ha sido reemplazado por sistemas automatizados.',
      correctAnswer: 'C',
      difficulty: 3,
      explanation:
        "El autor contrasta el ritmo de la innovación con el de los 'acuerdos sociales e institucionales', señalando un desajuste entre ambos — no explica funcionamiento técnico, ni aboga por eliminar el uso, ni afirma que el reemplazo ya ocurrió.",
    },
    {
      order: 13,
      skillId: socCiud.id,
      enunciado:
        'Fuente A: Un historiador afirma que la independencia de las colonias americanas fue impulsada principalmente por las élites criollas que buscaban controlar el comercio y el poder político, más que por un sentimiento generalizado de identidad nacional entre toda la población.\nFuente B: Otro historiador sostiene que, aunque las élites lideraron el proceso, la participación popular (mestizos, indígenas y afrodescendientes) fue decisiva para el triunfo militar de la independencia, y sin ese apoyo masivo las élites no habrían logrado sus objetivos.\n\n¿En qué aspecto se diferencian principalmente las dos fuentes?',
      optionA: 'Ambas niegan que las élites criollas tuvieran algún papel en la independencia.',
      optionB:
        'La Fuente A atribuye el proceso principalmente a las élites, mientras que la Fuente B resalta el papel decisivo de la participación popular.',
      optionC:
        'La Fuente A afirma que la independencia fue un proceso exclusivamente militar, mientras la Fuente B lo niega.',
      optionD:
        'Las dos fuentes coinciden en que la independencia fue impulsada únicamente por la población indígena.',
      correctAnswer: 'B',
      difficulty: 3,
      explanation:
        'La Fuente A centra la explicación en las élites criollas; la Fuente B, sin negar el liderazgo de las élites, resalta que la participación popular fue decisiva. Esa es la diferencia principal entre ambas posturas.',
    },
    {
      order: 14,
      skillId: cienciasNaturales.id,
      enunciado:
        'Un grupo de biólogos observa que, en un lago, la población de peces ha disminuido significativamente en los últimos cinco años, coincidiendo con el aumento de una planta acuática invasora que cubre gran parte de la superficie del agua.\n\n¿Cuál de las siguientes preguntas de investigación sería más adecuada para que los biólogos determinen si existe una relación causal entre la planta invasora y la disminución de peces?',
      optionA: '¿Cuál es el color predominante de la planta invasora?',
      optionB:
        '¿Qué efecto tiene la cobertura de la planta invasora sobre los niveles de oxígeno disuelto en el agua y la supervivencia de los peces?',
      optionC: '¿Cuántas especies de peces existen en otros lagos de la región?',
      optionD: '¿Qué instituciones gubernamentales regulan la pesca en el país?',
      correctAnswer: 'B',
      difficulty: 3,
      explanation:
        'Para establecer una relación causal entre la planta invasora y la disminución de peces, la pregunta debe conectar un mecanismo biológico plausible (oxígeno disuelto) con el efecto observado (supervivencia de peces); las demás opciones no permiten evaluar esa relación.',
    },
    {
      order: 15,
      skillId: ingles.id,
      enunciado:
        'Many schools around the world are now teaching students how to manage their personal finances. Supporters of this idea argue that understanding how to save money, avoid debt, and make smart financial decisions is just as important as learning math or science. Critics, however, claim that schools already have too many subjects to teach and that financial education should be the responsibility of parents.\n\nWhat is the main purpose of the text?',
      optionA: 'To explain how to save money effectively.',
      optionB: 'To present different opinions about teaching financial education in schools.',
      optionC: 'To criticize parents for not teaching their children about money.',
      optionD: 'To describe the history of financial education around the world.',
      correctAnswer: 'B',
      difficulty: 3,
      explanation:
        "The text presents both supporters' and critics' views on teaching financial education in schools, without taking a side — its purpose is to present different opinions, not to argue for one, explain a how-to, or give a history.",
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { order: q.order },
      update: q,
      create: q,
    });
  }

  for (const skill of [matPorc, lcInf, socCiud, cienciasNaturales, ingles]) {
    await prisma.studentSkillState.upsert({
      where: { studentId_skillId: { studentId: student.id, skillId: skill.id } },
      update: {},
      create: { studentId: student.id, skillId: skill.id },
    });
  }

  console.log(
    `Seed completado: 1 estudiante, 5 skills, ${questions.length} preguntas (3 por categoría).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
