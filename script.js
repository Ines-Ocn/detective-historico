// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let currentUser = null;
let currentSession = 0;
let completedSessions = new Set();
let savedAnswers = {};

// ══════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════

// Panel organisateur commun à chaque session (avant/pendant/après)
function orgPanel(n) {
  return `
    <div class="panel">
      <div class="panel-header gold"><span class="panel-icon">🧭</span><span class="panel-title">Organizador · Reflexión de sesión</span></div>
      <div class="panel-body">
        <div class="question-block">
          <span class="question-label">Antes de empezar</span>
          <p class="question-prompt">¿Qué problema histórico real vamos a analizar hoy?</p>
          <textarea class="answer-field" id="s${n}_org_antes" rows="2" placeholder="Escribe aquí tu respuesta inicial..."></textarea>
        </div>
        <div class="question-block">
          <span class="question-label">Durante</span>
          <p class="question-prompt">¿Qué conceptos del siglo XIII estás aplicando?</p>
          <textarea class="answer-field" id="s${n}_org_durante" rows="2" placeholder="Anota los conceptos que vayas identificando..."></textarea>
        </div>
        <div class="question-block">
          <span class="question-label">Al terminar</span>
          <p class="question-prompt">¿Qué has aprendido sobre la sociedad medieval que no sabías antes?</p>
          <textarea class="answer-field" id="s${n}_org_despues" rows="2" placeholder="Reflexión final de la sesión..."></textarea>
        </div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════
//  SESSION DEFINITIONS
// ══════════════════════════════════════════
const sessions = [

  // ── SESIÓN 1: La ciencia compartida — Toledo, crisol de culturas ──
  {
    id: 1,
    title: 'La ciencia compartida — Toledo, crisol de culturas',
    type: 'novela',
    tag: 'Sesión 1 · Novela Histórica + Fuente Primaria',
    desc: 'Escuela de Traductores · Las Tablas Alfonsíes · Colaboración intercultural',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📖</span><span class="panel-title">Lee antes de responder</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;font-size:0.97rem;margin-bottom:1rem;line-height:1.6;">Lee los dos textos que tu profesor te ha entregado o proyectado y responde las preguntas de forma individual.</p>
          <div class="source-text">
            <strong>Fragmento de novela (Extracto 2):</strong> Escena de Toledo al amanecer — en el alcázar de Toledo los sabios cristianos, musulmanes y judíos
también llevaban a cabo trabajos importantes, sobre todo la conclusión de la
General Historia y la traducción y composición de algunas obras
astrológicas.
El mes de abril había amanecido con brumas sobre el río Tajo, pero, a
medida que había ido avanzando la mañana, el sol se había extendido sobre
las murallas y calles de la laberíntica ciudad levantada sobre una elevada
colina. El Astrólogo contemplaba desde una ventana del alcázar este
lumínico panorama, fijando en ese momento la vista en un grupo de
cetreros que, en pos de un halcón, atravesaba el puente de Alcántara
dirigiéndose hacia la otra orilla. No es que los distinguiera muy bien, pero
sus voces proclamaban su condición.
También al otro lado, con sus almenas moras recortadas sobre un rocoso
promontorio, el castillo de San Servando le traía a la memoria los recuerdos
de muchas noches en vela contemplando el cielo estrellado en compañía de
sus sabios Ibn Raghel, Alquibicio, Yehuda Ibn Moshe e Isaac Ibn Sid, que
durante años elaboraron con paciencia unas tablas astronómicas para fijar el
movimiento de los cuerpos celestes sobre la eclíptica.
Toledo siempre había sido un reducto de sabiduría. Aquí, ya desde los
tiempos del rey Yahya Al-Mamun, brillaba la astrología como una rutilante
estrella amarilla clavada en el firmamento. Poco más de un siglo después,
con sus traductores y traducciones, el arzobispo don Raimundo encendió
otro foco de luz en el que irradiaron Juan Hispano, Domingo Gundisalvo y
Gerardo de Cremona, que hicieron resplandecer la astrología árabe y griega,
la filosofía, las matemáticas y la medicina. Cobró el saber fama en Toledo y
se juntaron en sus calles, palacios y cuevas los alquimistas, los lapidarios,
los astrólogos, los filósofos, los físicos, los matemáticos, los historiadores,
los juristas... Cuando Alfonso aún era infante se hizo traducir el Calila e
Dimna, pues amaba los viejos cuentos, conocidos como exempla, porque
con sus enseñanzas y lecciones de sabiduría servían de ejemplos para la
vida.
          </div>
          <div class="source-text" style="border-left-color:#5577cc;">
            <strong>Fuente primaria:</strong> Prólogo de las <em>Tablas Alfonsíes</em> — el propio Alfonso X explica por qué reunió a sabios de diferentes religiones.
          </div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Preguntas — Responde individualmente</span></div>
        <div class="panel-body">
 
          <div class="question-block">
            <span class="question-label">Pregunta 1</span>
            <p class="question-prompt">En el fragmento de la novela, ¿cómo se describe el ambiente en que Alfonso recuerda su trabajo con los sabios? ¿Qué emociones transmite?</p>
            <textarea class="answer-field" id="s1_q1" rows="4" placeholder="Describe el ambiente y las emociones que percibes en el texto..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 2</span>
            <p class="question-prompt">Según el prólogo de las <em>Tablas Alfonsíes</em>, ¿cuál es el propósito del rey al reunir a sabios de diferentes religiones?</p>
            <textarea class="answer-field" id="s1_q2" rows="4" placeholder="Basándote en la fuente primaria, explica el propósito de Alfonso X..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 3</span>
            <p class="question-prompt">¿Qué coincidencias encuentras entre la visión de la novela y la del documento histórico? ¿Y qué diferencias?</p>
            <div class="two-col-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:0.5rem;">
              <div>
                <p style="font-size:0.83rem;color:#7a6040;font-weight:600;margin-bottom:0.3rem;">COINCIDENCIAS</p>
                <textarea class="answer-field" id="s1_q3a" rows="3" placeholder="¿En qué se parecen los dos textos?"></textarea>
              </div>
              <div>
                <p style="font-size:0.83rem;color:#7a6040;font-weight:600;margin-bottom:0.3rem;">DIFERENCIAS</p>
                <textarea class="answer-field" id="s1_q3b" rows="3" placeholder="¿En qué se diferencian?"></textarea>
              </div>
            </div>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 4</span>
            <p class="question-prompt">¿Por qué crees que Alfonso X quiso dejar constancia por escrito de su proyecto científico?</p>
            <textarea class="answer-field" id="s1_q4" rows="4" placeholder="Reflexiona sobre las motivaciones políticas, culturales y personales del rey..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 5</span>
            <p class="question-prompt">¿Crees que la ciencia actual también se construye desde la colaboración entre distintas culturas? Pon un ejemplo.</p>
            <textarea class="answer-field" id="s1_q5" rows="4" placeholder="Conecta el ejemplo medieval con la ciencia contemporánea..."></textarea>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(1)}
    `
  },

  // ── SESIÓN 2: El saber juzga a los reyes ──
  {
    id: 2,
    title: 'El saber juzga a los reyes',
    type: 'fuentes',
    tag: 'Sesión 2 · Fuentes Primarias',
    desc: 'Siete Partidas · Conocimiento, poder y justicia en el pensamiento alfonsí',
    render: () => `
      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">⚠️</span><span class="panel-title">Hoy trabajamos con fuentes primarias reales</span></div>
        <div class="panel-body">
          <p style="color:#1a2a4a;font-size:1rem;line-height:1.6;">Estos son <strong>documentos reales</strong> del siglo XIII. Los analizamos como historiadores: con método crítico y atención al contexto.</p>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Textos de la sesión</span></div>
        <div class="panel-body">
          <div class="source-text">
            <strong>Fragmento de novela (Extracto 3):</strong><br>
            <em>«El saber es señor y juez: los reyes juzgan la tierra, y el saber juzga a los reyes.»</em>
          </div>
          <div class="source-text" style="border-left-color:#5577cc;">
            <strong>Fuente primaria — Siete Partidas, Partida II, título I, ley V (fragmento):</strong><br>
            <em>«El rey es puesto en la tierra en lugar de Dios para cumplir la justicia e dar a cada uno su derecho. E por ende le llamaron corazón e alma del pueblo. Ca así como el alma yace en el corazón del home, e por ella vive el cuerpo e se mantiene, así en el rey yace la justicia, que es vida e mantenimiento del pueblo de su señorío. Otrosí, debe el rey honrar e guardar a los sabios que estudiaron los saberes de las artes e de las ciencias, porque por su sabiduría se guía e se alumbra la tierra.»</em>
          </div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Preguntas — Responde individualmente</span></div>
        <div class="panel-body">
 
          <div class="question-block">
            <span class="question-label">Pregunta 1</span>
            <p class="question-prompt">¿Qué significa la frase de la novela? Explica con tus palabras la relación entre reyes, saber y justicia.</p>
            <textarea class="answer-field" id="s2_q1" rows="4" placeholder="Explica el significado de la frase y qué relación establece entre saber y poder..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 2</span>
            <p class="question-prompt">Según la ley de las <em>Partidas</em>, ¿para qué necesita el rey el saber? Haz una lista de las razones que da el texto.</p>
            <textarea class="answer-field" id="s2_q2" rows="4" placeholder="Extrae las razones del texto y explícalas..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 3</span>
            <p class="question-prompt">¿Crees que esta idea era avanzada para el siglo XIII? ¿Por qué?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s2_avanzada" value="si"> <span class="option-text">Sí, era muy avanzada para su época</span></label>
              <label class="option-item"><input type="radio" name="s2_avanzada" value="parcial"> <span class="option-text">Solo en algunos aspectos</span></label>
              <label class="option-item"><input type="radio" name="s2_avanzada" value="no"> <span class="option-text">No, era normal en la Edad Media</span></label>
            </div>
            <textarea class="answer-field" id="s2_q3" rows="3" placeholder="Justifica tu respuesta con argumentos históricos..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 4</span>
            <p class="question-prompt">¿Cómo se relaciona esta concepción del saber con la labor científica e intercultural que vimos en la Sesión 1?</p>
            <textarea class="answer-field" id="s2_q4" rows="4" placeholder="Conecta las ideas de las dos sesiones..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 5</span>
            <p class="question-prompt">¿Crees que en la actualidad los gobernantes están «juzgados» por el saber (ciencia, prensa, universidades)? Argumenta.</p>
            <textarea class="answer-field" id="s2_q5" rows="4" placeholder="Da un ejemplo concreto y argumenta tu postura..."></textarea>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(2)}
    `
  },
 
  // ── SESIÓN 3: La lengua como instrumento de poder ──
  {
    id: 3,
    title: 'La lengua como instrumento de poder',
    type: 'novela',
    tag: 'Sesión 3 · Novela Histórica + Fuente Primaria',
    desc: 'El scriptorium · El castellano como lengua culta · Cantigas de Santa María',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✒️</span><span class="panel-title">Textos de la sesión</span></div>
        <div class="panel-body">
          <div class="source-text">
            <strong>Fragmento de novela (Extracto 6):</strong><br>
            <em>«Tal como estaban las cosas, el rey encontraba en su scriptorium el refugio idóneo a tanta soledad. Le gustaba conversar sobre historia, leyendas, geografía, piedras, plantas, astrología, leyes, poesía, teología... El Astrólogo había logrado fijar, asear y potenciar el castellano, creando una prosa bella, aún con pesadas cargas, pero en trance de depurarse, capaz de rivalizar con el latín y de desbancar definitivamente al latín, lengua de la clerecía y las escuelas. Había sacado la lengua romance de la cuna y la había convertido en adulta, capaz de expresar las ideas de los juglares, los herreros, los herbolarios, los mercaderes, los soldados...»</em>
          </div>
          <div class="source-text" style="border-left-color:#5577cc;">
            <strong>Fuente primaria — Prólogo de las <em>Cantigas de Santa María</em> (Alfonso X):</strong><br>
            (Texto entregado en clase por el profesor)
          </div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Preguntas — Responde individualmente</span></div>
        <div class="panel-body">
 
          <div class="question-block">
            <span class="question-label">Pregunta 1</span>
            <p class="question-prompt">¿Por qué el scriptorium se presenta como un «refugio» en la novela? ¿De qué huye el rey?</p>
            <textarea class="answer-field" id="s3_q1" rows="4" placeholder="Reflexiona sobre la situación política y personal de Alfonso X en este momento..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 2</span>
            <p class="question-prompt">Explica la metáfora de «sacar la lengua de la cuna y convertirla en adulta». ¿Qué representa cultural y políticamente?</p>
            <textarea class="answer-field" id="s3_q2" rows="4" placeholder="Analiza la metáfora y explica su significado más profundo..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 3</span>
            <p class="question-prompt">Según el prólogo de las <em>Cantigas</em>, ¿qué motivos da Alfonso X para escribir en romance?</p>
            <textarea class="answer-field" id="s3_q3" rows="4" placeholder="Extrae y explica los motivos del prólogo..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 4</span>
            <p class="question-prompt">¿Qué ventajas e inconvenientes tenía escribir en romance frente al latín en el siglo XIII?</p>
            <div class="two-col-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:0.5rem;">
              <div>
                <p style="font-size:0.83rem;color:#3a7d44;font-weight:600;margin-bottom:0.3rem;">VENTAJAS</p>
                <textarea class="answer-field" id="s3_q4a" rows="3" placeholder="¿Qué ventajas tenía el romance?"></textarea>
              </div>
              <div>
                <p style="font-size:0.83rem;color:#b5302a;font-weight:600;margin-bottom:0.3rem;">INCONVENIENTES</p>
                <textarea class="answer-field" id="s3_q4b" rows="3" placeholder="¿Qué resistencias o inconvenientes había?"></textarea>
              </div>
            </div>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 5</span>
            <p class="question-prompt">¿Crees que hoy en día la lengua sigue siendo un instrumento de poder? ¿Por qué?</p>
            <textarea class="answer-field" id="s3_q5" rows="4" placeholder="Conecta con un ejemplo actual (debates lingüísticos en España u otros países)..."></textarea>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(3)}
    `
  },
 
  // ── SESIÓN 4: Vida urbana, oficios y marginalidad ──
  {
    id: 4,
    title: 'Vida urbana, oficios y marginalidad',
    type: 'novela',
    tag: 'Sesión 4 · Novela Histórica + Fuente Primaria',
    desc: 'Sevilla medieval · Lorenzo de Brujas · Fuero de Sevilla',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🏙️</span><span class="panel-title">Textos de la sesión</span></div>
        <div class="panel-body">
          <div class="source-text">
            <strong>Fragmento de novela (Extracto 7):</strong><br>
            <em>«Un laberinto de calles estrechas, largas y estrechísimas calles, callejas en curva, callejones que podían cruzarse tocando las paredes opuestas con ambas manos, pasadizos bordeados de ajimeces, costanillas con tenduchos de comerciantes y talleres de artesanos, calles y calles largas y más calles, cortas calles estrechas, calles largas de plateros, pellejeros, odreros, zapateros, calafates, batihojas, alcuceros, toneleros, pedreros, alfayates, herreros, alfajemes, tejedores, albarderos, caldereros, calles de alberguerías, calles con portales y portones, calles con tiendas, mesones y baños públicos [...] gentío trajinando en las plazas y placetas, vagabundos bostezando bajo los soportales [...] Al abrir la puerta, se le echó encima un tufo repentino. Olores añejos, vino malo, densidad humana, voces, jolgorio incesante.»</em>
          </div>
          <div class="source-text" style="border-left-color:#5577cc;">
            <strong>Fuente primaria — <em>Fuero de Sevilla</em> (extractos adaptados):</strong><br>
            (Texto entregado en clase por el profesor)
          </div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Preguntas — Responde individualmente</span></div>
        <div class="panel-body">
 
          <div class="question-block">
            <span class="question-label">Pregunta 1</span>
            <p class="question-prompt">En el fragmento de la novela, ¿qué oficios aparecen? Haz una lista e intenta explicar en qué consistía cada uno.</p>
            <textarea class="answer-field" id="s4_q1" rows="5" placeholder="Lista los oficios y explica brevemente cada uno..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 2</span>
            <p class="question-prompt">¿Qué sensaciones (olfato, vista, oído) predominan en la descripción de la ciudad? Pon ejemplos del texto.</p>
            <table class="analysis-table" style="margin-bottom:0.5rem;">
              <thead><tr><th>Sentido</th><th>Ejemplo del texto</th></tr></thead>
              <tbody>
                <tr><td class="label-col">👁 Vista</td><td><textarea id="s4_q2a" rows="2" placeholder="Ejemplo visual del texto..."></textarea></td></tr>
                <tr><td class="label-col">👃 Olfato</td><td><textarea id="s4_q2b" rows="2" placeholder="Ejemplo olfativo del texto..."></textarea></td></tr>
                <tr><td class="label-col">👂 Oído</td><td><textarea id="s4_q2c" rows="2" placeholder="Ejemplo auditivo del texto..."></textarea></td></tr>
              </tbody>
            </table>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 3</span>
            <p class="question-prompt">Según el <em>Fuero de Sevilla</em>, ¿cómo se ordenaba el espacio urbano? ¿Qué finalidad tenía esa regulación?</p>
            <textarea class="answer-field" id="s4_q3" rows="4" placeholder="Explica la organización del espacio urbano según el fuero y sus objetivos..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 4</span>
            <p class="question-prompt">¿Qué contrastes sociales se reflejan en la novela (personajes cultos, jugadores, condenados)?</p>
            <textarea class="answer-field" id="s4_q4" rows="4" placeholder="Analiza los diferentes grupos sociales que aparecen y el contraste entre ellos..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 5</span>
            <p class="question-prompt">¿Qué similitudes y diferencias encuentras entre el mercado medieval descrito y los mercados actuales?</p>
            <div class="two-col-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;">
              <div>
                <p style="font-size:0.83rem;color:#7a6040;font-weight:600;margin-bottom:0.3rem;">SIMILITUDES</p>
                <textarea class="answer-field" id="s4_q5a" rows="3" placeholder="¿Qué persiste en los mercados actuales?"></textarea>
              </div>
              <div>
                <p style="font-size:0.83rem;color:#7a6040;font-weight:600;margin-bottom:0.3rem;">DIFERENCIAS</p>
                <textarea class="answer-field" id="s4_q5b" rows="3" placeholder="¿Qué ha cambiado radicalmente?"></textarea>
              </div>
            </div>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(4)}
    `
  },
 
  // ── SESIÓN 5: Guerra, botín y ética del comercio ──
  {
    id: 5,
    title: 'Guerra, botín y ética del comercio',
    type: 'fuentes',
    tag: 'Sesión 5 · Novela Histórica + Fuente Primaria',
    desc: 'Comercio de posguerra · Crónica de Alfonso X · Dilemas éticos medievales y actuales',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">⚔️</span><span class="panel-title">Textos de la sesión</span></div>
        <div class="panel-body">
          <div class="source-text">
            <strong>Fragmento de novela (Extracto 8):</strong><br>
            <em>«Los comerciantes vendían espadas, anillos y telas aún manchadas de sangre. Unos decían que venían de botines de guerra. Otros, que eran herencia sin dueño.»</em>
          </div>
          <div class="source-text" style="border-left-color:#5577cc;">
            <strong>Fuente primaria — <em>Crónica de Alfonso X</em>, capítulo sobre la toma de Niebla (1262), adaptado:</strong><br>
            (Texto entregado en clase por el profesor)
          </div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Preguntas — Responde individualmente</span></div>
        <div class="panel-body">
 
          <div class="question-block">
            <span class="question-label">Pregunta 1</span>
            <p class="question-prompt">Según la novela, ¿qué objetos se venden en el mercado y qué explicaciones dan los vendedores?</p>
            <textarea class="answer-field" id="s5_q1" rows="4" placeholder="Describe los objetos y analiza las justificaciones que dan los comerciantes..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 2</span>
            <p class="question-prompt">Según la crónica, ¿cómo se obtenía el botín y cómo se repartía?</p>
            <textarea class="answer-field" id="s5_q2" rows="4" placeholder="Extrae la información de la fuente primaria sobre el botín de guerra..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 3</span>
            <p class="question-prompt">¿Crees que en la Edad Media se planteaban dudas éticas sobre comerciar con objetos saqueados? ¿Por qué?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s5_etica" value="si"> <span class="option-text">Sí, había debate ético claro</span></label>
              <label class="option-item"><input type="radio" name="s5_etica" value="parcial"> <span class="option-text">Solo desde la perspectiva religiosa</span></label>
              <label class="option-item"><input type="radio" name="s5_etica" value="no"> <span class="option-text">No, era una práctica totalmente aceptada</span></label>
            </div>
            <textarea class="answer-field" id="s5_q3" rows="3" placeholder="Argumenta tu respuesta con información histórica..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 4</span>
            <p class="question-prompt">¿Conoces algún ejemplo actual de comercio con bienes procedentes de conflictos bélicos (diamantes de sangre, antigüedades expoliadas, etc.)?</p>
            <textarea class="answer-field" id="s5_q4" rows="4" placeholder="Describe el ejemplo y compáralo con la situación medieval..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Pregunta 5 — Dilema ético</span>
            <p class="question-prompt">Imagina que eres un mercader medieval. ¿Aceptarías comprar y vender esos objetos? Argumenta tu decisión.</p>
            <div class="role-cards" style="margin-bottom:0.8rem;">
              <label class="role-card" onclick="selectRole(this)">
                <input type="radio" name="s5_decision" value="si">
                <span class="role-emoji">✅</span>
                <span class="role-name">Sí compraría</span>
              </label>
              <label class="role-card" onclick="selectRole(this)">
                <input type="radio" name="s5_decision" value="depende">
                <span class="role-emoji">⚖️</span>
                <span class="role-name">Dependería</span>
              </label>
              <label class="role-card" onclick="selectRole(this)">
                <input type="radio" name="s5_decision" value="no">
                <span class="role-emoji">❌</span>
                <span class="role-name">No compraría</span>
              </label>
            </div>
            <textarea class="answer-field" id="s5_q5" rows="4" placeholder="Justifica tu decisión usando valores medievales (ley, religión, honor) y razonamiento propio..."></textarea>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(5)}
    `
  },
 
  // ── SESIÓN 6: Discusión grabada — Grupo focal ──
  {
    id: 6,
    title: 'Discusión final — Feedback cualitativo',
    type: 'fuentes',
    tag: 'Sesión 6 · Grupo Focal · Reflexión Metacognitiva',
    desc: 'Debate guiado · Reflexión sobre el método · Percepción de la novela histórica vs. fuentes',
    render: () => `
      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">🎙️</span><span class="panel-title">Esta sesión es diferente</span></div>
        <div class="panel-body">
          <p style="color:#1a2a4a;font-size:1rem;line-height:1.6;">Durante las cinco sesiones anteriores habéis trabajado individualmente con fragmentos de novela histórica y documentos reales del siglo XIII. Hoy compartimos en grupo vuestras impresiones. La conversación se grabará (con vuestro consentimiento) para la investigación. <strong>No es una evaluación</strong>, sino un espacio para expresar libremente vuestras percepciones.</p>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">💬</span><span class="panel-title">Preguntas guía del debate (discutidas en grupo)</span></div>
        <div class="panel-body">
          <ol style="color:#3a2a12;font-size:0.95rem;line-height:1.8;padding-left:1.2rem;">
            <li><strong>Apertura:</strong> ¿Qué es lo que más os ha sorprendido o llamado la atención de Alfonso X y su época a través de los fragmentos trabajados?</li>
            <li><strong>Comparación metodológica:</strong> ¿Cómo compararíais aprender historia con estos fragmentos frente a cómo lo hacéis habitualmente con el libro de texto?</li>
            <li><strong>Comprensión histórica:</strong> ¿Creéis que los fragmentos de novela os han ayudado a entender mejor el contexto histórico? ¿Por qué?</li>
            <li><strong>Fuentes primarias:</strong> ¿Qué os ha parecido leer documentos reales del siglo XIII? ¿Os resultaron útiles, difíciles, interesantes?</li>
            <li><strong>Empatía histórica:</strong> ¿Os habéis sentido más cerca de los personajes históricos al leer la novela?</li>
            <li><strong>Pensamiento crítico:</strong> ¿Cómo habéis distinguido lo que es ficción de lo que es real?</li>
            <li><strong>Motivación:</strong> ¿Esta forma de trabajar ha cambiado vuestro interés por la historia?</li>
            <li><strong>Cierre:</strong> Si tuvierais que recomendar o no este método, ¿qué diríais?</li>
          </ol>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📝</span><span class="panel-title">Reflexión escrita individual (después del debate)</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;font-size:0.95rem;margin-bottom:1rem;line-height:1.6;">Una vez terminada la discusión en grupo, responde individualmente estas preguntas escritas.</p>
 
          <div class="question-block">
            <span class="question-label">Reflexión 1</span>
            <p class="question-prompt">¿Qué idea o comentario de la discusión te ha parecido más interesante o te ha hecho cambiar de opinión?</p>
            <textarea class="answer-field" id="s6_q1" rows="4" placeholder="Recoge la idea que más te haya impactado del debate grupal..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Reflexión 2</span>
            <p class="question-prompt">Después de la discusión, ¿cambiarías algo de tu opinión inicial sobre el uso de la novela histórica en clase de Historia?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s6_cambio" value="si"> <span class="option-text">Sí, he cambiado mi opinión</span></label>
              <label class="option-item"><input type="radio" name="s6_cambio" value="parcial"> <span class="option-text">He matizado algunos aspectos</span></label>
              <label class="option-item"><input type="radio" name="s6_cambio" value="no"> <span class="option-text">No, mi opinión se mantiene igual</span></label>
            </div>
            <textarea class="answer-field" id="s6_q2" rows="3" placeholder="Explica si ha cambiado tu visión y por qué..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Reflexión 3 — Valoración global</span>
            <p class="question-prompt">En general, ¿cómo valoras esta secuencia de 6 sesiones combinando novela histórica y fuentes primarias?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s6_valoracion" value="muy_positiva"> <span class="option-text">Muy positiva — lo recomendaría</span></label>
              <label class="option-item"><input type="radio" name="s6_valoracion" value="positiva"> <span class="option-text">Positiva — aunque con algunos matices</span></label>
              <label class="option-item"><input type="radio" name="s6_valoracion" value="neutra"> <span class="option-text">Neutra — ni mejor ni peor que el método habitual</span></label>
              <label class="option-item"><input type="radio" name="s6_valoracion" value="negativa"> <span class="option-text">Negativa — prefiero el método tradicional</span></label>
            </div>
            <textarea class="answer-field" id="s6_q3" rows="4" placeholder="Argumenta tu valoración global con ejemplos concretos de las sesiones..."></textarea>
          </div>
 
          <hr class="divider">
 
          <div class="question-block">
            <span class="question-label">Reflexión 4 — Metacognición</span>
            <p class="question-prompt">Después de 5 sesiones trabajando entre novela histórica y fuentes primarias: ¿en qué se diferencia tu forma de leer una novela histórica de tu forma de analizar una fuente primaria?</p>
            <textarea class="answer-field" id="s6_q4" rows="5" placeholder="Esta reflexión es de las más importantes de toda la secuencia. Tómate el tiempo necesario..."></textarea>
          </div>
 
        </div>
      </div>
 
      ${orgPanel(6)}
    `
  }
];

// ══════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════
function handleLogin() {
  const code = document.getElementById('code-input').value.trim().toUpperCase();
  if (!code || code.length < 3) {
    document.getElementById('login-error').style.display = 'block';
    return;
  }
  currentUser = code;
  savedAnswers = JSON.parse(localStorage.getItem('dh_answers_' + code) || '{}');
  completedSessions = new Set(JSON.parse(localStorage.getItem('dh_done_' + code) || '[]'));

  document.getElementById('header-code').textContent = '📎 ' + code;
  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');
  updateProgress();
  goSession(1);
}

function handleLogout() {
  currentUser = null;
  document.getElementById('screen-app').classList.remove('active');
  document.getElementById('screen-login').classList.add('active');
  document.getElementById('code-input').value = '';
  document.getElementById('login-error').style.display = 'none';
}

// ══════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════
function goSession(idx) {
  if (!currentUser) return;
  saveCurrentAnswers();
  currentSession = idx;

  // Update nav
  document.querySelectorAll('.session-btn').forEach(btn => btn.classList.remove('active'));
  sessions.forEach(s => {
    const btn = document.getElementById('nav-' + s.id);
    if (!btn) return;
    if (completedSessions.has(s.id)) btn.classList.add('done');
    else btn.classList.remove('done');
  });
  document.getElementById('nav-' + idx)?.classList.add('active');

  renderSession(idx);
  document.getElementById('content-area').scrollTop = 0;
}

function renderSession(idx) {
  const s = sessions.find(s => s.id === idx);
  const area = document.getElementById('content-area');
  const tagClass = s.type === 'novela' ? 'tag-novela' : s.type === 'fuentes' ? 'tag-fuentes' : 'tag-intro';

  area.innerHTML = `
    <div class="session-card">
      <div class="session-header">
        <span class="session-tag ${tagClass}">${s.tag}</span>
        <h2 class="session-title">${s.title}</h2>
        <p class="session-desc">${s.desc}</p>
      </div>
      ${completedSessions.has(idx) ? renderSuccess(idx) : s.render() + renderSubmitArea(idx)}
    </div>
  `;

  restoreAnswers();
}

function renderSubmitArea(idx) {
  return `
    <div class="submit-area">
      <span class="submit-info">Revisa la autoevaluación antes de enviar. Tu código: <strong>${currentUser}</strong></span>
      <button class="btn-submit" onclick="submitSession(${idx})">Entregar sesión ${idx} →</button>
    </div>`;
}

function renderSuccess(idx) {
  const nextIdx = idx < 6 ? idx + 1 : null;
  return `
    <div class="success-panel">
      <div class="success-icon">✦</div>
      <h3 class="success-title">Sesión ${idx} entregada</h3>
      <p class="success-msg">Tus respuestas han quedado registradas con el código <strong>${currentUser}</strong>.<br>El profesor podrá revisarlas en el panel de investigación.</p>
      ${nextIdx ? `<button class="btn-next" onclick="goSession(${nextIdx})">Continuar a Sesión ${nextIdx} →</button>` : '<p style="color:var(--gold);font-family:\'Cinzel\',serif;font-size:0.9rem;">¡Has completado toda la secuencia!</p>'}
    </div>
  `;
}

// ══════════════════════════════════════════
//  ANSWERS
// ══════════════════════════════════════════
function saveCurrentAnswers() {
  if (!currentUser) return;

  // Textareas and text/number inputs (by id)
  document.querySelectorAll('#content-area [id]').forEach(el => {
    if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type !== 'radio' && el.type !== 'checkbox')) {
      savedAnswers[el.id] = el.value;
    }
  });

  // Radio buttons (by name)
  document.querySelectorAll('#content-area input[type="radio"]:checked').forEach(el => {
    if (el.name) savedAnswers[el.name] = el.value;
  });

  // Role cards
  const selectedRole = document.querySelector('#content-area .role-card.selected');
  if (selectedRole) {
    const roleInput = selectedRole.querySelector('input');
    if (roleInput && roleInput.name) savedAnswers[roleInput.name] = roleInput.value;
  }

  // Checkbox groups (by name) — store checked option labels joined with "; "
  const checkboxNames = new Set();
  document.querySelectorAll('#content-area input[type="checkbox"][name]').forEach(el => {
    checkboxNames.add(el.name);
  });
  checkboxNames.forEach(name => {
    const checked = [];
    document.querySelectorAll(`#content-area input[type="checkbox"][name="${name}"]:checked`).forEach(el => {
      const label = el.closest('.option-item')?.querySelector('.option-text');
      if (label) checked.push(label.textContent.trim());
    });
    savedAnswers[name] = checked.join('; ');
  });

  localStorage.setItem('dh_answers_' + currentUser, JSON.stringify(savedAnswers));
}

function restoreAnswers() {
  setTimeout(() => {
    Object.keys(savedAnswers).forEach(key => {
      // Textareas and text inputs (by id)
      const el = document.getElementById(key);
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = savedAnswers[key];
      }

      // Radio buttons (saved by name)
      const radio = document.querySelector(`#content-area input[type="radio"][name="${key}"][value="${savedAnswers[key]}"]`);
      if (radio) radio.checked = true;

      // Checkbox groups (saved by name, value = "; "-separated labels)
      const group = document.querySelectorAll(`#content-area input[type="checkbox"][name="${key}"]`);
      if (group.length > 0 && savedAnswers[key]) {
        const saved = savedAnswers[key].split('; ').filter(Boolean);
        group.forEach(cb => {
          const span = cb.closest('.option-item')?.querySelector('.option-text');
          if (span && saved.includes(span.textContent.trim())) cb.checked = true;
        });
      }
    });
  }, 50);
}

// ══════════════════════════════════════════
//  GOOGLE SHEETS INTEGRATION
// ══════════════════════════════════════════
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzcjqvxZaZ1TWslRu546qznnefb1ablZ1I6CyW-yuJEVaYUMcDVI1vH3POClH_kE0Ej/exec';

const QUESTION_LABELS = {
  // Sesión 1 — Scriptorium
  s1_art1:              'S1 · Art. I — Definición del proyecto (objetivo y verificación)',
  s1_art2:              'S1 · Art. II — El equipo (roles cristiano/judío/musulmán)',
  s1_art3:              'S1 · Art. III — Ética de colaboración (respeto, autoría, conflictos)',
  s1_art4:              'S1 · Art. IV — Gestión del conocimiento (acceso a textos)',
  s1_reflexion:         'S1 · Reflexión — Concepto histórico del s.XIII aplicado',
  s1_org_antes:         'S1 · Organizador — Antes de empezar',
  s1_org_durante:       'S1 · Organizador — Durante',
  s1_org_despues:       'S1 · Organizador — Al terminar',

  // Sesión 2 — Poder y Ley
  s2_tipo:              'S2 · Fuente A — Tipo de fuente (radio)',
  s2_identificacion:    'S2 · Fuente A — Quién produce / a quién va / con qué intención',
  s2_c1a:               'S2 · "Rey en lugar de Dios" — Significado',
  s2_c1b:               'S2 · "Rey en lugar de Dios" — Qué revela',
  s2_c2a:               'S2 · "Corazón e alma del pueblo" — Significado',
  s2_c2b:               'S2 · "Corazón e alma del pueblo" — Qué revela',
  s2_c3a:               'S2 · "Honrar a los sabios" — Significado',
  s2_c3b:               'S2 · "Honrar a los sabios" — Qué revela',
  s2_limites_opciones:  'S2 · Limitaciones fuente A — Opciones marcadas',
  s2_limites:           'S2 · Limitaciones fuente A — Comentario libre',
  s2_pecho:             'S2 · Vocabulario — Pecho (definición)',
  s2_fazendera:         'S2 · Vocabulario — Fazendera (definición)',
  s2_anyo:              'S2 · Año real del documento (Era 1310−38)',
  s2_info_historica:    'S2 · Fuente B — Información histórica sobre la sociedad del s.XIII',
  s2_comp1:             'S2 · Comparación — ¿Qué aportan las fuentes primarias que la novela no?',
  s2_comp2:             'S2 · Comparación — ¿Qué aportó la novela que las fuentes no?',
  s2_org_antes:         'S2 · Organizador — Antes de empezar',
  s2_org_durante:       'S2 · Organizador — Durante',
  s2_org_despues:       'S2 · Organizador — Al terminar',

  // Sesión 3 — Herrero
  s3_invocacion:        'S3 · Invocación (fórmula inicial del privilegio)',
  s3_relacion:          'S3 · Relación (motivos del privilegio)',
  s3_disposicion:       'S3 · Disposición (derechos concedidos)',
  s3_sancion:           'S3 · Sanción (consecuencias si no se respeta)',
  s3_data:              'S3 · Data (fecha y lugar)',
  s3_plus:              'S3 · Desafío plus — Cláusula de reciprocidad',
  s3_reflexion:         'S3 · Reflexión — Privilegio ficticio vs. documento real de Yúçaf',
  s3_org_antes:         'S3 · Organizador — Antes de empezar',
  s3_org_durante:       'S3 · Organizador — Durante',
  s3_org_despues:       'S3 · Organizador — Al terminar',

  // Sesión 4 — Lengua
  s4_comparacion:       'S4 · Comparación — Latín vs. castellano (beneficiados/perjudicados)',
  s4_glosa:             'S4 · Glosa crítica — Defensa del castellano (8-10 líneas)',
  s4_actualidad:        'S4 · Reflexión — Paralelismo con debates lingüísticos actuales',
  s4_org_antes:         'S4 · Organizador — Antes de empezar',
  s4_org_durante:       'S4 · Organizador — Durante',
  s4_org_despues:       'S4 · Organizador — Al terminar',

  // Sesión 5 — Cultura y Sociedad
  s5_cantiga1:          'S5 · Cantiga — Tipo de fuente y elección lingüística',
  s5_sesgos_opciones:   'S5 · Cantiga — Sesgos marcados',
  s5_cantiga2:          'S5 · Cantiga — Argumentación sobre sesgos',
  s5_contradiccion:     'S5 · Contradicción — Alfonso X: castellano vs. gallego-portugués',
  s5_cronica1:          'S5 · Crónica — Implicaciones de ser escrita 60 años después',
  s5_exp1:              'S5 · Expresión valorativa 1 del cronista',
  s5_exp2:              'S5 · Expresión valorativa 2 del cronista',
  s5_t1a:               'S5 · Tabla Ventajas — Fuente jurídica',
  s5_t1b:               'S5 · Tabla Ventajas — Fuente documental',
  s5_t1c:               'S5 · Tabla Ventajas — Fuente literaria',
  s5_t1d:               'S5 · Tabla Ventajas — Fuente cronística',
  s5_t2a:               'S5 · Tabla Limitaciones — Fuente jurídica',
  s5_t2b:               'S5 · Tabla Limitaciones — Fuente documental',
  s5_t2c:               'S5 · Tabla Limitaciones — Fuente literaria',
  s5_t2d:               'S5 · Tabla Limitaciones — Fuente cronística',
  s5_t3a:               'S5 · Tabla Mejor para — Fuente jurídica',
  s5_t3b:               'S5 · Tabla Mejor para — Fuente documental',
  s5_t3c:               'S5 · Tabla Mejor para — Fuente literaria',
  s5_t3d:               'S5 · Tabla Mejor para — Fuente cronística',
  s5_meta:              'S5 · Metacognición — Novela histórica vs. fuente primaria',
  s5_org_antes:         'S5 · Organizador — Antes de empezar',
  s5_org_durante:       'S5 · Organizador — Durante',
  s5_org_despues:       'S5 · Organizador — Al terminar',

  // Sesión 6 — Ética
  s6_rol:               'S6 · Rol elegido (jueces/fiscales/defensores)',
  s6_argumentacion:     'S6 · Argumentación según rol (mín. 3 argumentos)',
  s6_veredicto:         'S6 · Veredicto del grupo (radio)',
  s6_fundamentacion:    'S6 · Fundamentación del veredicto (mín. 5 líneas)',
  s6_actualidad:        'S6 · Conexión — Paralelismo con dilemas éticos actuales',
  s6_org_antes:         'S6 · Organizador — Antes de empezar',
  s6_org_durante:       'S6 · Organizador — Durante',
  s6_org_despues:       'S6 · Organizador — Al terminar'
};

async function sendToSheets(code, sessionIdx, answers) {
  const prefix = `s${sessionIdx}_`;
  const sessionAnswers = {};
  const sessionLabels = {};

  Object.keys(answers).forEach(k => {
    if (k.startsWith(prefix)) {
      sessionAnswers[k] = answers[k];
      if (QUESTION_LABELS[k]) sessionLabels[k] = QUESTION_LABELS[k];
    }
  });

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ code, session: 'Sesión ' + sessionIdx, answers: sessionAnswers, questionLabels: sessionLabels })
    });
    return true;
  } catch (err) {
    console.error('Error enviando a Sheets:', err);
    return false;
  }
}

async function submitSession(idx) {
  saveCurrentAnswers();

  const btn = document.querySelector('.btn-submit');
  if (btn) {
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  await sendToSheets(currentUser, idx, savedAnswers);

  completedSessions.add(idx);
  localStorage.setItem('dh_done_' + currentUser, JSON.stringify([...completedSessions]));
  updateProgress();
  renderSession(idx);
  document.getElementById('nav-' + idx)?.classList.add('done');
}

function updateProgress() {
  const pct = (completedSessions.size / 6) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
}

// ══════════════════════════════════════════
//  ROLE CARDS
// ══════════════════════════════════════════
function selectRole(el) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// ══════════════════════════════════════════
//  EXPOSITION GLOBALE
// ══════════════════════════════════════════
window.goSession     = goSession;
window.submitSession = submitSession;
window.selectRole    = selectRole;
window.handleLogout  = handleLogout;

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.getElementById('code-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});
document.getElementById('btn-login').addEventListener('click', handleLogin);
