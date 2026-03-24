// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let currentUser = null;
let currentSession = 0;
let completedSessions = new Set();
let savedAnswers = {};

// ══════════════════════════════════════════
//  SESSION DEFINITIONS
// ══════════════════════════════════════════
const sessions = [

  // ── SESSION 0: ORGANIZADOR ──
  {
    id: 0,
    title: 'Organizador Detective Histórico',
    type: 'intro',
    tag: 'Introducción',
    desc: 'Tu brújula para toda la secuencia. Consúltalo en cada sesión.',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🔍</span><span class="panel-title">Tu rol en esta investigación</span></div>
        <div class="panel-body">
          <p style="color:#2a1f0e;line-height:1.7;margin-bottom:1rem;">No memorizas datos. Usas la <strong>ficción como SIMULADOR</strong> para entender <strong>conceptos históricos reales</strong> del siglo XIII. En las sesiones con fuentes primarias, actúas como historiador que analiza documentos reales.</p>
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He leído el fragmento o fuente de la sesión antes de hacer la actividad</span></div>
            <div class="check-item"><input type="checkbox"> <span>Identifico qué problema histórico real estoy analizando hoy</span></div>
            <div class="check-item"><input type="checkbox"> <span>Distingo entre lo que es ficción y lo que es documento real</span></div>
            <div class="check-item"><input type="checkbox"> <span>Argumento con lógica histórica, no solo con intuición moderna</span></div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📋</span><span class="panel-title">Preguntas clave para cada sesión</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">Antes de empezar</span>
            <p class="question-prompt">¿Qué problema histórico real vamos a analizar hoy?</p>
            <textarea class="answer-field" id="q0_antes" rows="2" placeholder="Escribe aquí tu respuesta inicial..."></textarea>
          </div>
          <div class="question-block">
            <span class="question-label">Durante</span>
            <p class="question-prompt">¿Qué conceptos del siglo XIII estás aplicando?</p>
            <textarea class="answer-field" id="q0_durante" rows="2" placeholder="Anota los conceptos que vayas identificando..."></textarea>
          </div>
          <div class="question-block">
            <span class="question-label">Al terminar</span>
            <p class="question-prompt">¿Qué has aprendido sobre la sociedad medieval que no sabías antes?</p>
            <textarea class="answer-field" id="q0_despues" rows="2" placeholder="Reflexión final de la sesión..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📅</span><span class="panel-title">Registro de sesiones</span></div>
        <div class="panel-body">
          <table class="analysis-table">
            <thead>
              <tr><th>Sesión</th><th>Tipo</th><th>Tema</th><th>Concepto clave que aprendí</th></tr>
            </thead>
            <tbody>
              <tr><td class="label-col">1</td><td>Novela</td><td>Escuela de Traductores</td><td><input class="answer-field" id="reg1"></td></tr>
              <tr><td class="label-col">2</td><td>Fuentes</td><td>Poder y Ley</td><td><input class="answer-field" id="reg2"></td></tr>
              <tr><td class="label-col">3</td><td>Novela</td><td>El herrero del rey</td><td><input class="answer-field" id="reg3"></td></tr>
              <tr><td class="label-col">4</td><td>Novela</td><td>Lengua castellana</td><td><input class="answer-field" id="reg4"></td></tr>
              <tr><td class="label-col">5</td><td>Fuentes</td><td>Cultura y sociedad</td><td><input class="answer-field" id="reg5"></td></tr>
              <tr><td class="label-col">6</td><td>Novela</td><td>Comercio y ética</td><td><input class="answer-field" id="reg6"></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  // ── SESSION 1: SCRIPTORIUM ──
  {
    id: 1,
    title: 'Protocolo del Scriptorium',
    type: 'novela',
    tag: 'Sesión 1 · Novela Histórica',
    desc: 'Escuela de Traductores de Toledo · Colaboración intercultural',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📖</span><span class="panel-title">Contexto — Lee antes de empezar</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>En el siglo XIII, "traducir" era <strong>crear conocimiento nuevo</strong>, no solo cambiar palabras</li>
            <li>Cristianos, judíos y musulmanes colaboraban en ciencia, filosofía y astronomía</li>
            <li><strong>Ejemplo real:</strong> Isaac ben Sid (judío) y Bernardo el Arábigo (cristiano) tradujeron tratados de astronomía del árabe al castellano</li>
            <li>Alfonso X fortalecía su reino <em>con conocimiento</em>, no solo con armas</li>
            <li>Pregunta guía: ¿Cómo trabajar juntos sin renunciar a las propias creencias?</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📜</span><span class="panel-title">Actividad · Protocolo del Scriptorium</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;margin-bottom:1.2rem;font-size:0.98rem;">Sois el equipo de Alfonso X organizando el scriptorium toledano. Redactad un protocolo para garantizar la colaboración entre las tres culturas.</p>

          <div class="question-block">
            <span class="question-label">Artículo I · Definición del proyecto</span>
            <p class="question-prompt">¿Cuál es el objetivo específico del scriptorium y cómo verificaréis la calidad de las traducciones?</p>
            <p class="question-hint">Pensad en qué conocimientos se van a traducir y quién supervisará el proceso</p>
            <textarea class="answer-field" id="s1_art1" rows="4" placeholder="Objetivo, metodología de traducción y sistema de verificación..."></textarea>
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">Artículo II · El equipo</span>
            <p class="question-prompt">¿Qué aporta cada miembro del equipo? Describid el rol del sabio cristiano, judío y musulmán, y quién dirige.</p>
            <textarea class="answer-field" id="s1_art2" rows="4" placeholder="Sabio cristiano: aporta... | Sabio judío: aporta... | Sabio musulmán: aporta... | Director:..."></textarea>
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">Artículo III · Ética de colaboración</span>
            <p class="question-prompt">¿Cómo se respetarán las diferencias religiosas? ¿Cómo se atribuirá la autoría colectiva? ¿Cómo se resolverán las discrepancias?</p>
            <textarea class="answer-field" id="s1_art3" rows="4" placeholder="Normas de convivencia y resolución de conflictos entre culturas..."></textarea>
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">Artículo IV · Gestión del conocimiento</span>
            <p class="question-prompt">¿El acceso a los textos traducidos será abierto o restringido? ¿Por qué? ¿Existe "propiedad intelectual" en el siglo XIII?</p>
            <textarea class="answer-field" id="s1_art4" rows="3" placeholder="Decisión sobre acceso y justificación histórica..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">💬</span><span class="panel-title">Reflexión · Debate de cierre (recuperar al inicio de la Sesión 2)</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">¿Qué concepto histórico del siglo XIII has aplicado hoy en tu protocolo?</p>
            <textarea class="answer-field" id="s1_reflexion" rows="2" placeholder="Identifica al menos un concepto clave que hayas usado..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación antes de enviar</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>He pensado en cómo colaborarían culturas diferentes en el siglo XIII (no desde la perspectiva actual)</span></div>
            <div class="check-item"><input type="checkbox"> <span>Mi protocolo sería creíble y útil en la época de Alfonso X</span></div>
            <div class="check-item"><input type="checkbox"> <span>He mencionado al menos 2 conceptos del Organizador Detective</span></div>
          </div>
        </div>
      </div>
    `
  },

  // ── SESSION 2: FUENTES I ──
  {
    id: 2,
    title: 'Poder y Ley · Fuentes Primarias I',
    type: 'fuentes',
    tag: 'Sesión 2 · Fuentes Primarias',
    desc: 'Siete Partidas + Privilegio real · Analizamos documentos reales del siglo XIII',
    render: () => `
      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">⚠️</span><span class="panel-title">Hoy NO es ficción</span></div>
        <div class="panel-body">
          <p style="color:#1a2a4a;font-size:1rem;line-height:1.6;">Estos son <strong>documentos reales</strong> del siglo XIII escritos por gente de la época. Los analizamos como historiadores profesionales, con método crítico.</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📜</span><span class="panel-title">Fuente A · Las Siete Partidas (c. 1265)</span></div>
        <div class="panel-body">
          <div class="source-text">
            "El rey es puesto en la tierra en lugar de Dios para cumplir la justicia e dar a cada uno su derecho. E por ende le llamaron corazón e alma del pueblo. Ca así como el alma yace en el corazón del home, e por ella vive el cuerpo e se mantiene, así en el rey yace la justicia, que es vida e mantenimiento del pueblo de su señorío.<br><br>
            Otrosí, debe el rey honrar e guardar a los sabios que estudiaron los saberes de las artes e de las ciencias, porque por su sabiduría se guía e se alumbra la tierra."
          </div>
          <p class="source-attr">Partida II, Título I, Ley V (fragmento adaptado)</p>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">1. Identificación de la fuente</span>
            <p class="question-prompt">¿Qué tipo de fuente es? ¿Quién la produce, a quién va dirigida y con qué intención?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s2_tipo" value="cronica"> <span class="option-text">Crónica histórica (narración de eventos)</span></label>
              <label class="option-item"><input type="radio" name="s2_tipo" value="legal"> <span class="option-text">Código legal (leyes y normas)</span></label>
              <label class="option-item"><input type="radio" name="s2_tipo" value="carta"> <span class="option-text">Carta privada</span></label>
              <label class="option-item"><input type="radio" name="s2_tipo" value="poema"> <span class="option-text">Poema laudatorio</span></label>
            </div>
            <textarea class="answer-field" id="s2_identificacion" rows="2" placeholder="Quién la produce · A quién va dirigida · Con qué intención..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Extracción de información</span>
            <p class="question-prompt">Explica qué significa cada concepto medieval y qué revela sobre la época.</p>
            <table class="analysis-table">
              <thead><tr><th>Concepto en el texto</th><th>¿Qué significa?</th><th>¿Qué revela sobre la época?</th></tr></thead>
              <tbody>
                <tr><td class="label-col">"Rey en lugar de Dios"</td><td><textarea id="s2_c1a" rows="2"></textarea></td><td><textarea id="s2_c1b" rows="2"></textarea></td></tr>
                <tr><td class="label-col">"Corazón e alma del pueblo"</td><td><textarea id="s2_c2a" rows="2"></textarea></td><td><textarea id="s2_c2b" rows="2"></textarea></td></tr>
                <tr><td class="label-col">"Honrar a los sabios"</td><td><textarea id="s2_c3a" rows="2"></textarea></td><td><textarea id="s2_c3b" rows="2"></textarea></td></tr>
              </tbody>
            </table>
          </div>

          <div class="question-block">
            <span class="question-label">3. Limitaciones de la fuente</span>
            <p class="question-prompt">Esta fuente dice lo que el rey QUERÍA que pasara. ¿Qué NO nos dice?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="checkbox"> <span class="option-text">Cómo vivía realmente el pueblo llano</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Si los nobles obedecían estas leyes</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Qué pensaban los sabios de esto</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Los conflictos internos del reino</span></label>
            </div>
            <textarea class="answer-field" id="s2_limites" rows="2" placeholder="Añade otras limitaciones que identifies..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📄</span><span class="panel-title">Fuente B · Privilegio real a un herrero (1272)</span></div>
        <div class="panel-body">
          <div class="source-text">
            "Don Alfonso, por la graçia de Dios rey de Castiella, de Toledo, de León… A quantos esta carta vieren, salud e gracia.<br><br>
            Sepades que yo, por fazer bien e merçed a vos, maestro Yúçaf, ferrero de Toledo, por los muchos e buenos serviçios que me avedes fecho e faredes de aquí adelante, otorgovos que seades quito de todo pecho e de toda fazendera que los otros ferreros de Toledo han de dar e de fazer.<br><br>
            E mando a todos los mis alcaldes e alguaziles e a todos los otros ofiçiales de Toledo que vos guarden este mi previllejo.<br><br>
            Fecha en Sevilla, XVIII días de abril, era de mill e CCC e X annos."
          </div>
          <p class="source-attr">Archivo Municipal de Toledo, Legajo 47, Doc. 23 — Fuente auténtica</p>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">1. Vocabulario medieval</span>
            <p class="question-prompt">Define estos términos y calcula el año real del documento.</p>
            <table class="analysis-table">
              <thead><tr><th>Término</th><th>Significado</th></tr></thead>
              <tbody>
                <tr><td class="label-col">Pecho</td><td><input id="s2_pecho"></td></tr>
                <tr><td class="label-col">Fazendera</td><td><input id="s2_fazendera"></td></tr>
                <tr><td class="label-col">Era 1310 − 38 = año…</td><td><input id="s2_anyo" placeholder="¿En qué año se escribió?"></td></tr>
              </tbody>
            </table>
          </div>

          <div class="question-block">
            <span class="question-label">2. Información histórica</span>
            <p class="question-prompt">¿Qué aprendemos sobre la sociedad del siglo XIII a partir de este documento?</p>
            <textarea class="answer-field" id="s2_info_historica" rows="4" placeholder="Reflexiona sobre los oficios, el poder del rey, y la fiscalidad (impuestos) de la época..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">🔄</span><span class="panel-title">Reflexión comparativa</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">¿Qué te aportan estas fuentes primarias que la novela histórica (Sesión 1) NO puede darte?</p>
            <textarea class="answer-field" id="s2_comp1" rows="3" placeholder="Piensa en precisión, autenticidad, limitaciones..."></textarea>
          </div>
          <div class="question-block">
            <p class="question-prompt">¿Y qué te aportó la novela que estas fuentes NO te dan?</p>
            <textarea class="answer-field" id="s2_comp2" rows="3" placeholder="Piensa en contexto, emoción, comprensión de las personas..."></textarea>
          </div>
        </div>
      </div>
    `
  },

  // ── SESSION 3: HERRERO ──
  {
    id: 3,
    title: 'Certificado de Maestría en Herrería',
    type: 'novela',
    tag: 'Sesión 3 · Novela Histórica',
    desc: 'El herrero del rey · Privilegios y poder real',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🔨</span><span class="panel-title">Contexto · Recuerda la Sesión 2</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>En la Sesión 2 analizaste un <strong>privilegio REAL</strong> dado a Yúçaf, herrero de Toledo (1272). Usa su estructura hoy.</li>
            <li>Los herreros medievales fabricaban armas para la guerra <em>y</em> herramientas para la agricultura</li>
            <li>"Privilegio real" = derechos especiales dados por el rey (no pagar impuestos, taller en buen sitio, título honorífico)</li>
            <li>"So pena de…" normalmente conllevaba multa, destierro o pérdida del oficio</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📜</span><span class="panel-title">Actividad · Redacta el privilegio real</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;margin-bottom:1.2rem;font-size:0.98rem;">Redacta el certificado que Alfonso X daría a un herrero toledano. Sigue la estructura del documento real que analizaste.</p>

          <div class="question-block">
            <span class="question-label">Invocación (fórmula inicial)</span>
            <textarea class="answer-field" id="s3_invocacion" rows="2" placeholder='"Alfonso, por la gracia de Dios, rey de Castilla, Toledo, León…"'></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">Relación (motivos del privilegio)</span>
            <textarea class="answer-field" id="s3_relacion" rows="3" placeholder='"Atendiendo a la petición del maestro ___ y considerando su dominio del arte de la forja…"'></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">Disposición (derechos concedidos)</span>
            <textarea class="answer-field" id="s3_disposicion" rows="3" placeholder='"Concedemos el título de maestro herrero real con derecho a…"'></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">Sanción (consecuencias si no se respeta)</span>
            <textarea class="answer-field" id="s3_sancion" rows="2" placeholder='"Y mandamos a todos nuestros oficiales que respeten este privilegio so pena de…"'></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">Data (fecha y lugar)</span>
            <input class="answer-field" id="s3_data" placeholder='"Dado en ___, a ___ de ___ de 1274."'>
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">⭐ Desafío plus</span>
            <p class="question-prompt">Añade una cláusula sobre qué debe hacer el herrero A CAMBIO del privilegio. ¿Qué le pide el rey?</p>
            <textarea class="answer-field" id="s3_plus" rows="2" placeholder="Cláusula de reciprocidad..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">💬</span><span class="panel-title">Reflexión</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">¿En qué se parece y en qué difiere tu privilegio ficticio del documento real de Yúçaf (Sesión 2)?</p>
            <textarea class="answer-field" id="s3_reflexion" rows="3" placeholder="Compara estructura, fórmulas, contenido..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>Mi documento suena a texto medieval formal (no moderno)</span></div>
            <div class="check-item"><input type="checkbox"> <span>He seguido la estructura del privilegio real (Sesión 2)</span></div>
            <div class="check-item"><input type="checkbox"> <span>El herrero obtiene algo valioso y concreto</span></div>
            <div class="check-item"><input type="checkbox"> <span>Hay consecuencias claras si no se obedece</span></div>
          </div>
        </div>
      </div>
    `
  },

  // ── SESSION 4: LENGUA ──
  {
    id: 4,
    title: 'Glosa sobre Política Lingüística',
    type: 'novela',
    tag: 'Sesión 4 · Novela Histórica',
    desc: 'La lengua castellana · Idioma como herramienta de poder',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✒️</span><span class="panel-title">Contexto</span></div>
        <div class="panel-body">
          <ul class="context-list">
            <li>En el siglo XIII, el <strong>latín</strong> = lengua de la Iglesia, universidades y poder tradicional</li>
            <li>El <strong>romance (castellano)</strong> = lengua del pueblo, de los reyes nuevos, del poder renovado</li>
            <li>Traducir al castellano era <em>revolucionario</em>: más gente podía acceder al saber</li>
            <li>Alfonso X no solo permitió el castellano: lo <strong>promovió activamente</strong> como política de Estado</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">📝</span><span class="panel-title">Textos para comparar</span></div>
        <div class="panel-body">
          <div class="source-text"><strong>Texto A — Fuero Juzgo en latín (s. VII):</strong><br>"Omnis homo qui in regno nostro habitat, secundum legem vivat"</div>
          <div class="source-text"><strong>Texto B — Siete Partidas en castellano (s. XIII):</strong><br>"Todo ome que mora en nuestro regno deve bevir segund la ley"</div>
          <div class="source-text"><strong>Texto C — Traducción alfonsí de astronomía:</strong><br>"Las estrellas fixas son aquellas que non se mudan de sus lugares"</div>

          <hr class="divider">

          <div class="question-block">
            <p class="question-prompt">¿Qué diferencias observas entre escribir en latín y en castellano? ¿A quién beneficia el uso del romance? ¿A quién perjudica?</p>
            <textarea class="answer-field" id="s4_comparacion" rows="4" placeholder="Analiza los tres textos y reflexiona sobre acceso al saber, poder real e identidad cultural..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">⚔️</span><span class="panel-title">Actividad · Glosa crítica</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;margin-bottom:1rem;font-size:0.98rem;">Escribe una glosa crítica (8-10 líneas) defendiendo el uso del castellano. Debe incluir: el problema/polémica, los efectos (en acceso al saber, poder, identidad) y al menos un paralelismo con debates lingüísticos actuales.</p>
          <textarea class="answer-field" id="s4_glosa" rows="8" placeholder="Tu glosa debe DEFENDER una postura, no solo describir. Usa argumentos del siglo XIII y conecta con la actualidad..."></textarea>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">💬</span><span class="panel-title">Reflexión</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">¿Qué paralelismo con debates lingüísticos actuales (España u otros países) has identificado?</p>
            <textarea class="answer-field" id="s4_actualidad" rows="3" placeholder="Conecta el debate medieval con un ejemplo contemporáneo concreto..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>Mi glosa defiende una postura (no solo describe)</span></div>
            <div class="check-item"><input type="checkbox"> <span>He mencionado tanto ventajas del romance como resistencias al cambio</span></div>
            <div class="check-item"><input type="checkbox"> <span>He analizado los tres textos (A, B, C)</span></div>
            <div class="check-item"><input type="checkbox"> <span>He conectado con algún debate lingüístico actual</span></div>
          </div>
        </div>
      </div>
    `
  },

  // ── SESSION 5: FUENTES II ──
  {
    id: 5,
    title: 'Cultura y Sociedad · Fuentes Primarias II',
    type: 'fuentes',
    tag: 'Sesión 5 · Fuentes Primarias',
    desc: 'Cantiga de Santa María + Crónica · Sesgos y credibilidad',
    render: () => `
      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">⚠️</span><span class="panel-title">Hoy tampoco es ficción</span></div>
        <div class="panel-body">
          <p style="color:#1a2a4a;font-size:1rem;line-height:1.6;">Documentos reales del siglo XIII. Hoy veremos que <strong>incluso las fuentes auténticas tienen sesgos</strong>. Eso no las hace inútiles: las hace más interesantes de analizar.</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">🎵</span><span class="panel-title">Fuente A · Cantiga de Santa María 166 (c. 1270)</span></div>
        <div class="panel-body">
          <div class="source-text">
            <em>"Quen a Virgen ben servirá / a seu partir non morrerá / sen confisson.<br><br>
            Dest' avẽo en Ultramar / a un bon cavaleiro, / que Deus quis d'esta vida sacar / por seu mort' avẽedeyro.<br><br>
            E jazendo en gran lazeir, / rog' a Deus con grand' afan / que lle desse confesseir / ante que passass' alén."</em>
          </div>
          <div class="source-text" style="border-left-color:#8b7355;">
            <strong>Traducción:</strong> "Quien bien sirva a la Virgen / al partir no morirá sin confesión. / Esto sucedió en Ultramar / a un buen caballero / que Dios quiso sacar de esta vida. / Y yaciendo en gran dolor / rogó a Dios que le diese confesor / antes que pasase al más allá."
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">1. Identificación y análisis</span>
            <p class="question-prompt">¿Qué tipo de fuente es? ¿Por qué es significativo que Alfonso X patrocinara poesía en gallego-portugués y NO en latín?</p>
            <textarea class="answer-field" id="s5_cantiga1" rows="3" placeholder="Tipo de fuente y reflexión sobre la elección lingüística..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Sesgos de la fuente</span>
            <p class="question-prompt">¿Qué sesgos detectas? ¿Significa eso que no sirve para el historiador?</p>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="checkbox"> <span class="option-text">Sesgo religioso (todo se explica por la fe)</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Sesgo de clase (visión aristocrática/caballeresca)</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Sesgo de género (perspectiva masculina)</span></label>
              <label class="option-item"><input type="checkbox"> <span class="option-text">Sesgo político (legitimación del rey mecenas)</span></label>
            </div>
            <textarea class="answer-field" id="s5_cantiga2" rows="2" placeholder="¿Un sesgo hace que la fuente no sirva? Argumenta..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">3. La aparente contradicción</span>
            <p class="question-prompt">Alfonso X promueve el castellano (Sesión 4) pero escribe las Cantigas en gallego-portugués. ¿Cuál es tu hipótesis?</p>
            <textarea class="answer-field" id="s5_contradiccion" rows="3" placeholder="¿Contradicción real o tiene una explicación histórica lógica?..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">📖</span><span class="panel-title">Fuente B · Crónica de Alfonso X (c. 1344)</span></div>
        <div class="panel-body">
          <div class="source-text">
            "E el Rey don Alfonso, que amava mucho el saber, fizo ayuntar muchos maestros de astronomía e de las otras ciencias en Toledo. E fizo trasladar del arávigo al latín, e después al romance, muchos libros de filosofía e de las estrellas e de física.<br><br>
            Pero acaesció que en su tiempo, por las grandes despensas que fazía en estas cosas e en la demanda del Imperio, fue muy menguado de aver. E por esta razón, e porque fazía grandes premas a los homes de sus reynos, fue muy mal quisto de los grandes e de los pequeños.<br><br>
            E vino a tan gran desaventura que su fijo don Sancho se levantó contra él e le tomó casi todo el reyno. E el Rey don Alfonso murió en Sevilla muy despechado e pobre."
          </div>
          <p class="source-attr">Crónica de Alfonso X, cap. 73 — escrita ~60 años después de su muerte</p>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">1. Contextualización crítica</span>
            <p class="question-prompt">La crónica se escribe 60 años después de Alfonso X, bajo Alfonso XI. ¿Qué implicaciones tiene para su credibilidad?</p>
            <textarea class="answer-field" id="s5_cronica1" rows="3" placeholder="Reflexiona sobre distancia temporal, acceso a la información, posibles motivos políticos del cronista..."></textarea>
          </div>

          <div class="question-block">
            <span class="question-label">2. Expresiones valorativas</span>
            <p class="question-prompt">Copia dos expresiones del texto que revelan el <em>juicio</em> del cronista (no solo descripción, sino valoración).</p>
            <input class="answer-field" id="s5_exp1" placeholder="Expresión 1:">
            <input class="answer-field" id="s5_exp2" placeholder="Expresión 2:" style="margin-top:0.5rem;">
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">🗂️</span><span class="panel-title">Síntesis comparativa · Las 4 fuentes primarias</span></div>
        <div class="panel-body">
          <p style="color:#2a1f0e;margin-bottom:1rem;font-size:0.97rem;">Has analizado 4 tipos de fuente a lo largo de las sesiones 2 y 5. Compáralas.</p>
          <table class="analysis-table">
            <thead><tr><th>Criterio</th><th>Jurídica (Siete Partidas)</th><th>Documental (Privilegio)</th><th>Literaria (Cantiga)</th><th>Cronística (Crónica)</th></tr></thead>
            <tbody>
              <tr><td class="label-col">Ventajas</td><td><textarea id="s5_t1a" rows="3"></textarea></td><td><textarea id="s5_t1b" rows="3"></textarea></td><td><textarea id="s5_t1c" rows="3"></textarea></td><td><textarea id="s5_t1d" rows="3"></textarea></td></tr>
              <tr><td class="label-col">Limitaciones</td><td><textarea id="s5_t2a" rows="3"></textarea></td><td><textarea id="s5_t2b" rows="3"></textarea></td><td><textarea id="s5_t2c" rows="3"></textarea></td><td><textarea id="s5_t2d" rows="3"></textarea></td></tr>
              <tr><td class="label-col">Mejor para conocer…</td><td><textarea id="s5_t3a" rows="2"></textarea></td><td><textarea id="s5_t3b" rows="2"></textarea></td><td><textarea id="s5_t3c" rows="2"></textarea></td><td><textarea id="s5_t3d" rows="2"></textarea></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">🧠</span><span class="panel-title">Reflexión metacognitiva</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">Después de 3 sesiones con novela y 2 con fuentes primarias: ¿en qué se diferencia tu forma de leer una novela histórica de tu forma de analizar una fuente primaria?</p>
            <textarea class="answer-field" id="s5_meta" rows="4" placeholder="Esta reflexión es la más importante de toda la secuencia. Tómate el tiempo necesario..."></textarea>
          </div>
        </div>
      </div>
    `
  },

  // ── SESSION 6: ÉTICA ──
  {
    id: 6,
    title: 'Dictamen Ético sobre Comercio',
    type: 'novela',
    tag: 'Sesión 6 · Novela Histórica',
    desc: 'Comercio tras la guerra · Dilemas éticos medievales y actuales',
    render: () => `
      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">⚖️</span><span class="panel-title">El caso</span></div>
        <div class="panel-body">
          <div class="source-text" style="font-style:normal;">
            Un mercader vende espadas y anillos "manchados de sangre". Afirma que son <em>herencia sin dueño</em>. Otros denuncian que son botín de guerra robado ilegítimamente.
          </div>
          <ul class="context-list" style="margin-top:1rem;">
            <li>El botín de guerra medieval tenía <strong>reglas precisas</strong>: qué se podía tomar y de quién</li>
            <li>La Iglesia prohibía aprovecharse injustamente de los vencidos</li>
            <li>"Herencia sin dueño" era una excusa habitual para legalizar el botín</li>
            <li>Dilema real: necesidad económica <em>vs.</em> ética religiosa y honor</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">🎭</span><span class="panel-title">Tu rol en el debate</span></div>
        <div class="panel-body">
          <p style="color:#3a2a12;margin-bottom:1rem;">Elige el rol de tu grupo para el debate:</p>
          <div class="role-cards">
            <label class="role-card" onclick="selectRole(this)">
              <input type="radio" name="s6_rol" value="jueces">
              <span class="role-emoji">⚖️</span>
              <span class="role-name">Jueces</span>
            </label>
            <label class="role-card" onclick="selectRole(this)">
              <input type="radio" name="s6_rol" value="fiscales">
              <span class="role-emoji">⚔️</span>
              <span class="role-name">Fiscales</span>
            </label>
            <label class="role-card" onclick="selectRole(this)">
              <input type="radio" name="s6_rol" value="defensores">
              <span class="role-emoji">🛡️</span>
              <span class="role-name">Defensores</span>
            </label>
          </div>
          <p style="font-size:0.84rem;color:#7a6040;font-style:italic;">Jueces: decidís tras escuchar · Fiscales: argumentáis contra la venta · Defensores: argumentáis a favor</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header red"><span class="panel-icon">📋</span><span class="panel-title">Argumentación y veredicto</span></div>
        <div class="panel-body">
          <div class="question-block">
            <span class="question-label">Argumentación según tu rol</span>
            <p class="question-prompt">Desarrolla los argumentos desde tu posición. Usa valores medievales (ley, religión, honor) Y razonamiento propio.</p>
            <textarea class="answer-field" id="s6_argumentacion" rows="5" placeholder="Desarrolla al menos 3 argumentos sólidos desde tu rol..."></textarea>
          </div>

          <hr class="divider">

          <div class="question-block">
            <span class="question-label">Veredicto del grupo</span>
            <div class="options-group" style="margin-bottom:0.8rem;">
              <label class="option-item"><input type="radio" name="s6_veredicto" value="vender"> <span class="option-text">Se puede vender — es legítimo</span></label>
              <label class="option-item"><input type="radio" name="s6_veredicto" value="confiscar"> <span class="option-text">Debe confiscarse — es ilegal</span></label>
              <label class="option-item"><input type="radio" name="s6_veredicto" value="legal-inmoral"> <span class="option-text">Legal pero inmoral — zona gris</span></label>
            </div>
            <textarea class="answer-field" id="s6_fundamentacion" rows="5" placeholder="Fundamentación (mínimo 5 líneas): basa tu decisión en 1) valores medievales, 2) valores actuales, 3) consecuencias sociales de cada opción..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header blue"><span class="panel-icon">🌍</span><span class="panel-title">Conexión con la actualidad</span></div>
        <div class="panel-body">
          <div class="question-block">
            <p class="question-prompt">¿Qué paralelismos encuentras con problemas éticos actuales del comercio?</p>
            <p class="question-hint">Piensa en minerales de conflicto (coltán, diamantes), venta de armas a países en guerra, comercio de bienes de origen dudoso…</p>
            <textarea class="answer-field" id="s6_actualidad" rows="4" placeholder="Conecta el dilema medieval con un caso contemporáneo concreto..."></textarea>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header gold"><span class="panel-icon">✅</span><span class="panel-title">Autoevaluación final</span></div>
        <div class="panel-body">
          <div class="checklist">
            <div class="check-item"><input type="checkbox"> <span>Hemos considerado ambos lados del debate aunque tengamos un rol</span></div>
            <div class="check-item"><input type="checkbox"> <span>La fundamentación usa valores MEDIEVALES, no solo intuición moderna</span></div>
            <div class="check-item"><input type="checkbox"> <span>La conexión con la actualidad es concreta (no vaga)</span></div>
          </div>
        </div>
      </div>
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
  goSession(0);
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
  document.querySelectorAll('.session-btn').forEach((btn, i) => {
    btn.classList.remove('active');
    if (completedSessions.has(i)) btn.classList.add('done');
    else btn.classList.remove('done');
  });
  document.getElementById('nav-' + idx)?.classList.add('active');

  // Render
  renderSession(idx);
  document.getElementById('content-area').scrollTop = 0;
}

function renderSession(idx) {
  const s = sessions[idx];
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

  restoreAnswers(idx);
}

function renderSubmitArea(idx) {
  if (idx === 0) return `
    <div class="submit-area">
      <span class="submit-info">El organizador está siempre disponible. Puedes actualizarlo en cualquier momento.</span>
      <button class="btn-submit" onclick="submitSession(${idx})">Guardar organizador</button>
    </div>`;
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
  // Sauvegarder les textarea et input text/number par id
  const inputs = document.querySelectorAll('#content-area [id]');
  inputs.forEach(el => {
    if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type !== 'radio' && el.type !== 'checkbox')) {
      savedAnswers[el.id] = el.value;
    }
  });
  // Sauvegarder les radio buttons sélectionnés par name
  document.querySelectorAll('#content-area input[type="radio"]:checked').forEach(el => {
    if (el.name) savedAnswers[el.name] = el.value;
  });
  // Sauvegarder les rôles sélectionnés (role-card)
  const selectedRole = document.querySelector('#content-area .role-card.selected');
  if (selectedRole) {
    const roleInput = selectedRole.querySelector('input');
    if (roleInput && roleInput.name) savedAnswers[roleInput.name] = roleInput.value;
  }
  localStorage.setItem('dh_answers_' + currentUser, JSON.stringify(savedAnswers));
}

function restoreAnswers(idx) {
  setTimeout(() => {
    Object.keys(savedAnswers).forEach(key => {
      const el = document.getElementById(key);
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = savedAnswers[key];
      }
      // Restaurer les radio buttons (sauvegardés par name, pas id)
      const radio = document.querySelector(`#content-area input[type="radio"][name="${key}"][value="${savedAnswers[key]}"]`);
      if (radio) radio.checked = true;
    });
  }, 50);
}

// ══════════════════════════════════════════
//  GOOGLE SHEETS INTEGRATION
// ══════════════════════════════════════════
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzcjqvxZaZ1TWslRu546qznnefb1ablZ1I6CyW-yuJEVaYUMcDVI1vH3POClH_kE0Ej/exec';

const QUESTION_LABELS = {
  // Sesión 0 — Organizador
  q0_antes:          'S0 · Antes de empezar — ¿Qué problema histórico real vamos a analizar hoy?',
  q0_durante:        'S0 · Durante — ¿Qué conceptos del siglo XIII estás aplicando?',
  q0_despues:        'S0 · Al terminar — ¿Qué has aprendido sobre la sociedad medieval?',
  reg1:              'S0 · Registro S1 — Concepto clave aprendido',
  reg2:              'S0 · Registro S2 — Concepto clave aprendido',
  reg3:              'S0 · Registro S3 — Concepto clave aprendido',
  reg4:              'S0 · Registro S4 — Concepto clave aprendido',
  reg5:              'S0 · Registro S5 — Concepto clave aprendido',
  reg6:              'S0 · Registro S6 — Concepto clave aprendido',

  // Sesión 1 — Scriptorium
  s1_art1:           'S1 · Art. I — Definición del proyecto (objetivo y verificación)',
  s1_art2:           'S1 · Art. II — El equipo (roles cristiano/judío/musulmán)',
  s1_art3:           'S1 · Art. III — Ética de colaboración (respeto, autoría, conflictos)',
  s1_art4:           'S1 · Art. IV — Gestión del conocimiento (acceso a textos)',
  s1_reflexion:      'S1 · Reflexión — Concepto histórico del s.XIII aplicado',

  // Sesión 2 — Poder y Ley
  s2_tipo:           'S2 · Fuente A — Tipo de fuente (radio)',
  s2_identificacion: 'S2 · Fuente A — Quién produce / a quién va / con qué intención',
  s2_c1a:            'S2 · "Rey en lugar de Dios" — Significado',
  s2_c1b:            'S2 · "Rey en lugar de Dios" — Qué revela',
  s2_c2a:            'S2 · "Corazón e alma del pueblo" — Significado',
  s2_c2b:            'S2 · "Corazón e alma del pueblo" — Qué revela',
  s2_c3a:            'S2 · "Honrar a los sabios" — Significado',
  s2_c3b:            'S2 · "Honrar a los sabios" — Qué revela',
  s2_limites:        'S2 · Limitaciones adicionales de la fuente A',
  s2_pecho:          'S2 · Vocabulario — Pecho (definición)',
  s2_fazendera:      'S2 · Vocabulario — Fazendera (definición)',
  s2_anyo:           'S2 · Año real del documento (Era 1310−38)',
  s2_info_historica: 'S2 · Fuente B — Información histórica sobre la sociedad del s.XIII',
  s2_comp1:          'S2 · Comparación — ¿Qué aportan las fuentes primarias que la novela no?',
  s2_comp2:          'S2 · Comparación — ¿Qué aportó la novela que las fuentes no?',

  // Sesión 3 — Herrero
  s3_invocacion:     'S3 · Invocación (fórmula inicial del privilegio)',
  s3_relacion:       'S3 · Relación (motivos del privilegio)',
  s3_disposicion:    'S3 · Disposición (derechos concedidos)',
  s3_sancion:        'S3 · Sanción (consecuencias si no se respeta)',
  s3_data:           'S3 · Data (fecha y lugar)',
  s3_plus:           'S3 · Desafío plus — Cláusula de reciprocidad',
  s3_reflexion:      'S3 · Reflexión — Privilegio ficticio vs. documento real de Yúçaf',

  // Sesión 4 — Lengua
  s4_comparacion:    'S4 · Comparación — Latín vs. castellano (beneficiados/perjudicados)',
  s4_glosa:          'S4 · Glosa crítica — Defensa del castellano (8-10 líneas)',
  s4_actualidad:     'S4 · Reflexión — Paralelismo con debates lingüísticos actuales',

  // Sesión 5 — Cultura y Sociedad
  s5_cantiga1:       'S5 · Cantiga — Tipo de fuente y elección lingüística',
  s5_cantiga2:       'S5 · Cantiga — Sesgos detectados y si invalidan la fuente',
  s5_contradiccion:  'S5 · Contradicción — Alfonso X: castellano vs. gallego-portugués',
  s5_cronica1:       'S5 · Crónica — Implicaciones de ser escrita 60 años después',
  s5_exp1:           'S5 · Expresión valorativa 1 del cronista',
  s5_exp2:           'S5 · Expresión valorativa 2 del cronista',
  s5_t1a:            'S5 · Tabla Ventajas — Fuente jurídica',
  s5_t1b:            'S5 · Tabla Ventajas — Fuente documental',
  s5_t1c:            'S5 · Tabla Ventajas — Fuente literaria',
  s5_t1d:            'S5 · Tabla Ventajas — Fuente cronística',
  s5_t2a:            'S5 · Tabla Limitaciones — Fuente jurídica',
  s5_t2b:            'S5 · Tabla Limitaciones — Fuente documental',
  s5_t2c:            'S5 · Tabla Limitaciones — Fuente literaria',
  s5_t2d:            'S5 · Tabla Limitaciones — Fuente cronística',
  s5_t3a:            'S5 · Tabla Mejor para — Fuente jurídica',
  s5_t3b:            'S5 · Tabla Mejor para — Fuente documental',
  s5_t3c:            'S5 · Tabla Mejor para — Fuente literaria',
  s5_t3d:            'S5 · Tabla Mejor para — Fuente cronística',
  s5_meta:           'S5 · Metacognición — Novela histórica vs. fuente primaria',

  // Sesión 6 — Ética
  s6_rol:            'S6 · Rol elegido (jueces/fiscales/defensores)',
  s6_argumentacion:  'S6 · Argumentación según rol (mín. 3 argumentos)',
  s6_veredicto:      'S6 · Veredicto del grupo (radio)',
  s6_fundamentacion: 'S6 · Fundamentación del veredicto (mín. 5 líneas)',
  s6_actualidad:     'S6 · Conexión — Paralelismo con dilemas éticos actuales'
};

async function sendToSheets(code, sessionIdx, answers) {
  // Filter only answers for this session
  const prefix = sessionIdx === 0 ? ['q0_', 'reg'] : [`s${sessionIdx}_`];
  const sessionAnswers = {};
  const sessionLabels = {};

  Object.keys(answers).forEach(k => {
    if (prefix.some(p => k.startsWith(p))) {
      sessionAnswers[k] = answers[k];
      if (QUESTION_LABELS[k]) sessionLabels[k] = QUESTION_LABELS[k];
    }
  });

  try {
    // POST + Content-Type text/plain : évite le preflight CORS tout en supportant un body JSON
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

  // Show loading state on button
  const btn = document.querySelector('.btn-submit');
  if (btn) {
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  // Send to Google Sheets
  await sendToSheets(currentUser, idx, savedAnswers);

  // L'organizador (session 0) reste toujours éditable — on ne le marque pas "done"
  if (idx === 0) {
    renderSession(0);
    return;
  }

  // Mark as done locally regardless (even if network failed, data is in localStorage)
  completedSessions.add(idx);
  localStorage.setItem('dh_done_' + currentUser, JSON.stringify([...completedSessions]));
  updateProgress();
  renderSession(idx);
  document.getElementById('nav-' + idx)?.classList.add('done');
}

function updateProgress() {
  const pct = (completedSessions.size / 7) * 100;
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
//  Les fonctions appelées via onclick="" dans du HTML injecté
//  par innerHTML doivent être sur window, sinon le navigateur
//  les cherche dans le scope global et échoue silencieusement.
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
