const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const reels = [
  {
    id: 'reel_01_pasta_termica',
    title: 'Reel 1 - Pasta térmica cemento',
    text: '¿Tu placa llega a 86 grados y pensás que es normal? Si tu PC suena como turbina de avión y calienta como estufa, esto es lo que tiene adentro. Tres años sin mantenimiento. La pasta térmica original perdió toda conductividad y se convirtió en cemento seco. Limpiamos a fondo con alcohol isopropílico, renovamos pads desgastados y colocamos compuesto térmico premium. Menos veinticinco grados y el chip trabajando sin recortar frecuencias. Menos ruido, más vida útil. Mandanos un mensaje al DM con tus componentes y agendá tu service en Byte Fix.'
  },
  {
    id: 'reel_02_optimizacion_sistema',
    title: 'Reel 2 - Qué incluye la optimización',
    text: 'Tener muchos FPS no sirve de nada si se siente así. Podés tener 240 FPS de promedio, pero si tu frametime tiene picos, cada tiroteo se siente como si jugaras a 40. Nuestro servicio de optimización no usa limpiadores mágicos. Desinstalamos drivers limpios con DDU, depuramos telemetría innecesaria de Windows, calibramos opciones de energía y bajamos la latencia de entrada a niveles competitivos. Cero stuttering, máxima respuesta del mouse y estabilidad total. Escribinos por privado y coordinamos tu turno remoto o en taller.'
  },
  {
    id: 'reel_03_dual_channel',
    title: 'Reel 3 - Error de memoria RAM',
    text: 'Te gastaste una fortuna en placa de video, pero el que te armó la PC cometió este error básico. Poner las dos memorias RAM juntas hace que funcionen en Single Channel, cortando a la mitad el ancho de banda con el procesador. Y si nunca entraste a la BIOS a activar el perfil XMP o EXPO, tus memorias de alta frecuencia están corriendo a velocidad de oficina. Pasalas a las ranuras dos y cuatro, activá el perfil en la BIOS y recuperá los FPS por los que pagaste. Si no sabés configurarlo, dejanos un DM y te ayudamos en Byte Fix.'
  },
  {
    id: 'reel_04_plastico_disipador',
    title: 'Reel 4 - Plástico sin sacar en disipador',
    text: 'No te estoy jodiendo: esta máquina costó más de mil dólares y la entregaron así. El cliente la compró armada en un local conocido. Llegaba a su casa, abría cualquier juego y la PC se apagaba por protección térmica rozando los 100 grados. Cuando desarmamos el disipador en nuestro taller, el plástico protector de fábrica seguía pegado a la base de cobre con la pasta térmica encima. El cobre nunca llegó a tocar el procesador. Armar una PC requiere atención al detalle y pruebas de estrés reales. Cuidá tu inversión con Byte Fix.'
  },
  {
    id: 'reel_05_pc_generica_vs_custom',
    title: 'Reel 5 - PC armada genérica vs Byte Fix',
    text: 'Mismo precio en pesos, dos mundos completamente distintos. Esto es lo que te venden en una publicación genérica de PC Gamer lista para usar: ahorran en lo que no se ve, fuente genérica sin protecciones, un solo módulo de memoria y un gabinete cerrado que ahoga los componentes. Y esto es lo que armamos en Byte Fix por el mismo presupuesto: fuente certificada con protecciones reales, memorias en Dual Channel, flujo de aire con frente mallado y componentes balanceados. Rendimiento real sin sorpresas. Mandanos tu presupuesto al DM y te asesoramos.'
  },
  {
    id: 'reel_06_protocolo_taller',
    title: 'Reel 6 - Protocolo de entrega de taller',
    text: '¿Qué pasa realmente cuando dejás tu máquina en nuestro taller? Te mostramos nuestro protocolo. Paso 1: Medición de ingreso. Comprobamos temperaturas de fábrica, voltajes y salud de discos. Paso 2: Limpieza profunda con insumos de grado electrónico, renovación de pastas térmicas premium y gestión de cables para optimizar el flujo de aire. Paso 3: Testeo continuo de estrés de 45 minutos. Ninguna PC sale de acá sin demostrar que trabaja fría, silenciosa y al 100%. Escribinos al DM y reservá tu lugar.'
  }
];

function saveStreamToFile(stream, targetPath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(targetPath);
    stream.pipe(fileStream);
    stream.once('error', (err) => {
      fileStream.destroy();
      reject(err);
    });
    fileStream.once('close', () => {
      resolve();
    });
    fileStream.once('error', reject);
  });
}

async function generateAll() {
  const outDir = path.join(__dirname, 'audios');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const tts = new MsEdgeTTS();
  await tts.setMetadata("es-AR-TomasNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  console.log('Iniciando síntesis de voz neuronal argentina (es-AR-TomasNeural)...');

  for (const item of reels) {
    const filePath = path.join(outDir, `${item.id}.mp3`);
    console.log(`Generando: ${item.title}...`);
    const { audioStream } = tts.toStream(item.text);
    await saveStreamToFile(audioStream, filePath);
    const stats = fs.statSync(filePath);
    console.log(` -> Generado: ${item.id}.mp3 (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\n¡Todos los audios fueron generados exitosamente!');
}

generateAll().catch(err => {
  console.error('Error durante la generación:', err);
  process.exit(1);
});
