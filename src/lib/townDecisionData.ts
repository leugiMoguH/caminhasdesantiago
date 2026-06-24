// Curated per-town decision insight (Phase 5 STEP 2). Editorial guidance that
// restates each town's own verified data (bed counts, albergue types, town size)
// as honest pilgrim advice. Hand-written per town so nothing reads templated or
// duplicated across towns (STEP 6). Sections that can be derived mechanically
// (budget / safest / best pick) live in TownDecision.astro instead.

export type Lang = 'en' | 'es' | 'pt';

export interface TownInsight {
  needBook: Record<Lang, string>;       // "Do you need to book in [Town]?"
  mistake: Record<Lang, string>;        // "Biggest mistake in [Town]"
  quietVsSocial: Record<Lang, string>;  // "Quiet vs social"
  fillTime: Record<Lang, string>;       // "What time beds usually fill"
}

export const TOWN_INSIGHTS: Record<string, TownInsight> = {
  'a-guarda': {
    needBook: {
      en: 'Not usually — a municipal plus a private albergue and hotels mean a bed most nights. Reserve the private O Peirao only on summer weekends.',
      es: 'No suele hacer falta — un municipal más un albergue privado y hoteles dan cama casi siempre. Reserva el privado O Peirao solo en fines de semana de verano.',
      pt: 'Normalmente não — um municipal mais um albergue privado e hotéis dão cama quase sempre. Reserva o privado O Peirao só em fins de semana de verão.',
    },
    mistake: {
      en: 'Forgetting Spain runs an hour ahead of Portugal — arrive on Spanish time or the municipal may already be full.',
      es: 'Olvidar que España va una hora por delante de Portugal — llega en hora española o el municipal puede estar ya lleno.',
      pt: 'Esquecer que a Espanha está uma hora à frente de Portugal — chega em hora espanhola ou o municipal pode já estar cheio.',
    },
    quietVsSocial: {
      en: 'The municipal is sociable and pilgrim-packed after the crossing; the 16-bed O Peirao is calmer and quieter.',
      es: 'El municipal es sociable y lleno de peregrinos tras el cruce; el O Peirao (16 plazas) es más tranquilo.',
      pt: 'O municipal é sociável e cheio de peregrinos após a travessia; o O Peirao (16 camas) é mais calmo.',
    },
    fillTime: {
      en: 'The municipal usually has space into late afternoon; in July–August aim to arrive by 14:00–15:00.',
      es: 'El municipal suele tener sitio hasta media tarde; en julio–agosto intenta llegar a las 14:00–15:00.',
      pt: 'O municipal costuma ter espaço até meio da tarde; em julho–agosto tenta chegar às 14:00–15:00.',
    },
  },
  oia: {
    needBook: {
      en: 'Yes. Only ~32 beds across two private albergues and no municipal — book ahead, especially May–September.',
      es: 'Sí. Solo unas 32 plazas en dos albergues privados y sin municipal — reserva con antelación, sobre todo de mayo a septiembre.',
      pt: 'Sim. Apenas ~32 camas em dois albergues privados e sem municipal — reserva com antecedência, sobretudo de maio a setembro.',
    },
    mistake: {
      en: 'Treating Oia as a guaranteed stop — pilgrims who don’t book often have to push on to Baiona.',
      es: 'Dar Oia por segura — quien no reserva a menudo tiene que seguir hasta Baiona.',
      pt: 'Dar Oia como garantida — quem não reserva muitas vezes tem de seguir até Baiona.',
    },
    quietVsSocial: {
      en: 'Both albergues are small and quiet — this is a peaceful monastery-village night, not a party stop.',
      es: 'Ambos albergues son pequeños y tranquilos — es una noche de pueblo-monasterio, no una parada de fiesta.',
      pt: 'Ambos os albergues são pequenos e tranquilos — é uma noite de aldeia-mosteiro, não uma paragem de festa.',
    },
    fillTime: {
      en: 'Beds can be gone by early afternoon in summer — reserve rather than rely on a walk-in.',
      es: 'Las plazas pueden agotarse a primera hora de la tarde en verano — reserva en vez de fiarte de llegar sin más.',
      pt: 'As camas podem esgotar ao início da tarde no verão — reserva em vez de contar com chegar sem mais.',
    },
  },
  baiona: {
    needBook: {
      en: 'Yes in summer. Only private albergues (no municipal), and the town fills in July–August — reserve ahead.',
      es: 'Sí en verano. Solo albergues privados (sin municipal) y la villa se llena en julio–agosto — reserva con antelación.',
      pt: 'Sim no verão. Só albergues privados (sem municipal) e a vila enche em julho–agosto — reserva com antecedência.',
    },
    mistake: {
      en: 'Arriving late on a summer weekend with no booking — Baiona’s limited beds go fast.',
      es: 'Llegar tarde un fin de semana de verano sin reserva — las pocas camas de Baiona vuelan.',
      pt: 'Chegar tarde num fim de semana de verão sem reserva — as poucas camas de Baiona voam.',
    },
    quietVsSocial: {
      en: 'Estela do Mar and Baionamar are mid-size and social; for quiet, book a seafront guesthouse instead.',
      es: 'Estela do Mar y Baionamar son medianos y sociables; para tranquilidad, reserva mejor una pensión frente al mar.',
      pt: 'Estela do Mar e Baionamar são médios e sociáveis; para sossego, reserva antes uma pensão frente ao mar.',
    },
    fillTime: {
      en: 'Private beds can sell out by mid-afternoon in peak season; spring and autumn are far easier.',
      es: 'Las camas privadas pueden agotarse a media tarde en temporada alta; primavera y otoño son mucho más fáciles.',
      pt: 'As camas privadas podem esgotar a meio da tarde na época alta; primavera e outono são muito mais fáceis.',
    },
  },
  vigo: {
    needBook: {
      en: 'For the 93-bed public albergue, rarely — it seldom fills entirely. For a private room, book ahead; it’s a big city.',
      es: 'Para el albergue público de 93 plazas, rara vez — casi nunca se llena del todo. Para habitación privada, reserva; es una gran ciudad.',
      pt: 'Para o albergue público de 93 camas, raramente — quase nunca enche por completo. Para quarto privado, reserva; é uma grande cidade.',
    },
    mistake: {
      en: 'Walking deep into Vigo’s sprawl to a full albergue with no backup — keep a Booking.com room ready.',
      es: 'Adentrarte en la extensa Vigo hacia un albergue lleno sin respaldo — ten lista una habitación en Booking.com.',
      pt: 'Embrenhar-te na extensa Vigo até um albergue cheio sem apoio — tem um quarto do Booking.com pronto.',
    },
    quietVsSocial: {
      en: 'The 93-bed Xunta albergue is big and busy; for a quiet sleep take a private room in the Casco Vello.',
      es: 'El albergue de la Xunta (93 plazas) es grande y bullicioso; para dormir tranquilo coge habitación en el Casco Vello.',
      pt: 'O albergue da Xunta (93 camas) é grande e movimentado; para dormir tranquilo apanha quarto no Casco Vello.',
    },
    fillTime: {
      en: 'The large municipal usually still has beds into the evening, even in summer.',
      es: 'El gran municipal suele tener camas aún entrada la tarde-noche, incluso en verano.',
      pt: 'O grande municipal costuma ter camas ainda ao fim da tarde, mesmo no verão.',
    },
  },
  redondela: {
    needBook: {
      en: 'Rarely — a municipal plus a 40-bed private give good capacity. Book the private on busy summer weekends.',
      es: 'Rara vez — un municipal más un privado de 40 plazas dan buena capacidad. Reserva el privado en fines de semana de verano concurridos.',
      pt: 'Raramente — um municipal mais um privado de 40 camas dão boa capacidade. Reserva o privado em fins de semana de verão movimentados.',
    },
    mistake: {
      en: 'Underestimating Redondela as a mere junction — Coastal and Central merge here, so it’s busier than its size suggests.',
      es: 'Subestimar Redondela como simple cruce — aquí se unen Costa y Central, así que tiene más gente de lo que parece.',
      pt: 'Subestimar Redondela como simples cruzamento — aqui juntam-se Costa e Central, por isso tem mais gente do que parece.',
    },
    quietVsSocial: {
      en: 'Casa da Torre (municipal) is social and central; A Conserveira is larger and a touch calmer.',
      es: 'Casa da Torre (municipal) es sociable y céntrico; A Conserveira es mayor y algo más tranquilo.',
      pt: 'Casa da Torre (municipal) é sociável e central; A Conserveira é maior e um pouco mais calmo.',
    },
    fillTime: {
      en: 'Beds usually last into late afternoon; on peak weekends aim for mid-afternoon.',
      es: 'Las camas suelen durar hasta media tarde; en fines de semana de mucha gente apunta a media tarde.',
      pt: 'As camas costumam durar até meio da tarde; em fins de semana de muita gente aponta a meio da tarde.',
    },
  },
  pontevedra: {
    needBook: {
      en: 'For the 56-bed municipal, usually not. For the old-town hostels and rooms — the nicer option — book ahead.',
      es: 'Para el municipal de 56 plazas, normalmente no. Para los hostales y habitaciones del casco antiguo —la opción más bonita— reserva.',
      pt: 'Para o municipal de 56 camas, normalmente não. Para os hostels e quartos do centro histórico —a opção mais bonita— reserva.',
    },
    mistake: {
      en: 'Not booking a room when you want a rest day — the pedestrian old town fills on weekends.',
      es: 'No reservar habitación cuando quieres día de descanso — el casco peatonal se llena los fines de semana.',
      pt: 'Não reservar quarto quando queres dia de descanso — o centro pedonal enche aos fins de semana.',
    },
    quietVsSocial: {
      en: 'The municipal is sociable; tiny Slow City Hostel and old-town rooms are far quieter.',
      es: 'El municipal es sociable; el pequeño Slow City Hostel y las habitaciones del casco son mucho más tranquilos.',
      pt: 'O municipal é sociável; o pequeno Slow City Hostel e os quartos do centro são muito mais tranquilos.',
    },
    fillTime: {
      en: 'The municipal holds beds into the evening; the small private places sell out earlier.',
      es: 'El municipal mantiene camas entrada la tarde; los pequeños privados se agotan antes.',
      pt: 'O municipal mantém camas ao fim da tarde; os pequenos privados esgotam mais cedo.',
    },
  },
  padron: {
    needBook: {
      en: 'Often wise. It’s the last stop before Santiago, so reserve the private O Pedrón on busy days.',
      es: 'A menudo prudente. Es la última parada antes de Santiago, así que reserva el privado O Pedrón los días concurridos.',
      pt: 'Muitas vezes prudente. É a última paragem antes de Santiago, por isso reserva o privado O Pedrón nos dias movimentados.',
    },
    mistake: {
      en: 'Cutting your final night too fine — arriving late here can leave you scrambling so close to the end.',
      es: 'Apurar demasiado la última noche — llegar tarde aquí puede dejarte buscando tan cerca del final.',
      pt: 'Apurar demasiado a última noite — chegar tarde aqui pode deixar-te à procura tão perto do fim.',
    },
    quietVsSocial: {
      en: 'The Xunta municipal buzzes with finishing pilgrims; the 44-bed O Pedrón is larger and steadier.',
      es: 'El municipal de la Xunta bulle de peregrinos que terminan; el O Pedrón (44 plazas) es mayor y más estable.',
      pt: 'O municipal da Xunta fervilha de peregrinos a terminar; o O Pedrón (44 camas) é maior e mais estável.',
    },
    fillTime: {
      en: 'Both are sizeable, but in summer the municipal can fill by mid-afternoon as everyone targets the finish.',
      es: 'Ambos son amplios, pero en verano el municipal puede llenarse a media tarde porque todos apuntan al final.',
      pt: 'Ambos são amplos, mas no verão o municipal pode encher a meio da tarde porque todos apontam ao fim.',
    },
  },
};
