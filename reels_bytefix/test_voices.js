const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

async function main() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("es-AR-TomasNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const voices = await tts.getVoices();
  const esVoices = voices.filter(v => v.Locale.startsWith('es-AR') || v.Locale.startsWith('es-MX'));
  console.log('Voices available:', esVoices.map(v => `${v.ShortName} (${v.Gender})`));
}

main().catch(console.error);
