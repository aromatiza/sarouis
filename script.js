/*
 * World Food Day quiz
 * 1) QUESTIONS contient les 10 questions du quiz.
 * 2) Remplacez SUPABASE_URL et SUPABASE_ANON_KEY par les valeurs du projet Supabase.
 * IMPORTANT: le calcul du score dans le navigateur est adapté à une première version,
 * mais un quiz à enjeu réel doit valider les réponses côté serveur (Edge Function).
 */

const SUPABASE_URL = "https://gqakkmxrxpohigmfcgzr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYWtrbXhyeHBvaGlnbWZjZ3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMDgzMjUsImV4cCI6MjEwNzU4NDMyNX0.kNYcWAM6U1jzahBaoyyawUKSRnGjXUn3n8vU7SzRFIA";

const QUESTIONS = [
  {
    category: "JOURNÉE MONDIALE DE L’ALIMENTATION",
    question: "Quel organisme des Nations Unies pilote et coordonne chaque année la célébration de la Journée mondiale de l’alimentation, le 16 octobre ?",
    options: ["Le Fonds international de développement agricole", "Le Programme alimentaire mondial", "L’Organisation des Nations Unies pour l’alimentation et l’agriculture", "L’Organisation mondiale de la santé"],
    correctIndex: 2,
    explanation: "C’est la FAO qui coordonne cette journée. Le 16 octobre commémore la date de sa création, en 1945."
  },
  {
    category: "GASPILLAGE ALIMENTAIRE",
    question: "Selon la FAO, quelle part estimée de la production alimentaire mondiale est perdue ou gaspillée, de la récolte à la consommation ?",
    options: ["Environ un tiers", "Environ un dixième", "Environ la moitié", "Environ un quart"],
    correctIndex: 0,
    explanation: "Environ 30 à 33 % de la nourriture produite pour la consommation humaine est perdue ou gaspillée chaque année dans le monde."
  },
  {
    category: "SÉCURITÉ SANITAIRE",
    question: "Que désigne précisément la « sécurité sanitaire des aliments » (food safety), par opposition à la « sécurité alimentaire » (food security) ?",
    options: ["L’autosuffisance totale d’un pays en matière de production agricole nationale", "La garantie d’un accès régulier à des quantités suffisantes de calories pour tous", "L’absence de contamination et de risques liés aux agents pathogènes ou toxiques", "Le maintien des prix des denrées de base en dessous du seuil de pauvreté"],
    correctIndex: 2,
    explanation: "La sécurité sanitaire garantit que les aliments ne nuisent pas au consommateur. La sécurité alimentaire, elle, concerne l’accès physique et économique à une nourriture suffisante."
  },
  {
    category: "CLIMAT & AGRICULTURE",
    question: "Quel facteur représente aujourd’hui la menace la plus systémique et la plus immédiate pour la stabilité des rendements agricoles dans les zones arides et semi-arides ?",
    options: ["La baisse globale et ininterrompue des températures nocturnes mondiales", "La disparition totale des pollinisateurs sauvages en haute montagne", "L’augmentation drastique de l’ensoleillement direct en zones tempérées", "Le stress hydrique accru et l’intensification des sécheresses"],
    correctIndex: 3,
    explanation: "La raréfaction de l’eau et les sécheresses prolongées affectent directement la productivité des cultures et de l’élevage. Le réchauffement climatique fait au contraire monter les températures."
  },
  {
    category: "AGROÉCOLOGIE",
    question: "Dans la transition agroécologique, quelle pratique vise en priorité à maximiser la couverture végétale du sol pour améliorer sa fertilité et limiter l’érosion ?",
    options: ["Le labour profond et systématique après chaque récolte", "L’apport exclusif d’engrais minéraux azotés de synthèse", "La monoculture intensive à haut niveau d’intrants chimiques", "L’utilisation de cultures intermédiaires ou de couverture"],
    correctIndex: 3,
    explanation: "Les cultures intermédiaires ou de couverture protègent le sol, enrichissent la matière organique et réduisent l’érosion entre deux cultures principales."
  },
  {
    category: "NUTRITION",
    question: "Que recouvre le concept de « double fardeau de la malnutrition », souvent mis en avant dans les rapports mondiaux sur l’alimentation ?",
    options: ["L’alternance entre des périodes de sécheresse sévère et d’inondations destructrices", "L’obligation pour les agriculteurs de produire à la fois pour le marché local et pour l’exportation", "La coexistence de la sous-nutrition et du surpoids ou de l’obésité au sein d’une même population", "La hausse simultanée du coût des intrants agricoles et de celui des denrées transformées"],
    correctIndex: 2,
    explanation: "Dans un même pays, voire une même famille, la sous-nutrition (retards de croissance, carences) peut coexister avec le surpoids, l’obésité et les maladies liées à l’alimentation."
  },
  {
    category: "AGRICULTURE FAMILIALE",
    question: "Quel rôle jouent les exploitations agricoles familiales dans l’alimentation mondiale, selon les données de la FAO ?",
    options: ["Elles ne contribuent qu’à une infime fraction de la production, destinée aux marchés locaux", "Elles produisent environ 80 % de la nourriture mondiale en valeur", "Elles se consacrent exclusivement à des cultures industrielles non alimentaires", "Elles dépendent entièrement des subventions des grands groupes agroalimentaires"],
    correctIndex: 1,
    explanation: "Selon la FAO, les exploitations familiales produisent environ 80 % de la nourriture mondiale en valeur et sont des acteurs clés de la sécurité alimentaire."
  },
  {
    category: "CIRCUITS COURTS",
    question: "Quel est l’objectif principal des « circuits courts » alimentaires dans les politiques d’aménagement du territoire et de durabilité ?",
    options: ["Éliminer totalement les intrants chimiques dans les cultures maraîchères", "Réduire les intermédiaires pour diminuer l’empreinte carbone et mieux valoriser le producteur", "Imposer un monopole d’État sur la distribution des denrées périssables de base", "Standardiser les calibres des produits agricoles pour l’exportation internationale"],
    correctIndex: 1,
    explanation: "Avec moins d’intermédiaires et des distances réduites, les circuits courts limitent l’empreinte carbone et garantissent une meilleure rémunération aux producteurs."
  },
  {
    category: "RÉSILIENCE",
    question: "Comment se définit la « résilience des systèmes alimentaires » face aux chocs extérieurs (pandémies, crises géopolitiques, catastrophes) ?",
    options: ["La capacité à anticiper, absorber, s’adapter et se transformer pour maintenir l’approvisionnement", "Le stockage illimité de réserves de blé par les gouvernements pendant plus de dix ans", "La fermeture stricte des frontières pour bloquer toute importation de denrées", "L’uniformisation totale des variétés cultivées pour maximiser la vitesse de production"],
    correctIndex: 0,
    explanation: "Un système résilient anticipe les chocs, les absorbe, s’adapte et se transforme afin de continuer à nourrir la population. L’uniformisation des variétés l’affaiblirait."
  },
  {
    category: "UNE SEULE SANTÉ",
    question: "Quel principe fondamental sous-tend l’approche « Une seule santé » (One Health) appliquée à l’alimentation et à la nutrition ?",
    options: ["L’obligation pour chaque citoyen de suivre un régime strictement végétalien", "L’éradication complète de l’élevage intensif au niveau mondial d’ici la fin de la décennie", "L’interdépendance étroite entre la santé humaine, la santé animale et la santé des écosystèmes", "La centralisation de toutes les décisions de santé mondiale par une seule institution financière"],
    correctIndex: 2,
    explanation: "L’approche « Une seule santé » relie santé humaine, santé animale et santé des écosystèmes, par exemple pour lutter contre les zoonoses et la résistance aux antimicrobiens."
  }
];

const $ = (selector) => document.querySelector(selector);
const screens = ["#intro-screen", "#register-screen", "#quiz-screen", "#results-screen"];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_RE = /^\+?[0-9 ().-]{8,20}$/;

let currentIndex = 0;
let selectedAnswers = [];
let participant = null;
let startTime = null;
let finalResult = null;
let supabaseClient = null;
let saving = false;
let saved = false;

function setupSupabase() {
  const configured = SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_PROJECT") &&
    SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE");
  if (configured && window.supabase?.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}
setupSupabase();

function showScreen(id) {
  screens.forEach((selector) => $(selector).classList.toggle("hidden", selector !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const formatNumber = (n) => String(n).padStart(2, "0");

function validateQuestionData() {
  if (QUESTIONS.length !== 10) return "Le quiz doit contenir exactement 10 questions.";
  for (const [index, q] of QUESTIONS.entries()) {
    if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
        !Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
      return `La question ${index + 1} est incomplète.`;
    }
  }
  return "";
}

/* ---------- Inscription ---------- */
function openRegistration() {
  const problem = validateQuestionData();
  if (problem) { showToast(problem); return; }
  showScreen("#register-screen");
  $("#first-name").focus({ preventScroll: true });
}

function submitRegistration(event) {
  event.preventDefault();
  const data = {
    first_name: $("#first-name").value.trim().replace(/\s+/g, " "),
    last_name: $("#last-name").value.trim().replace(/\s+/g, " "),
    email: $("#email").value.trim().toLowerCase(),
    phone: $("#phone").value.trim()
  };
  const fail = (message, field) => {
    $("#register-error").textContent = message;
    $(field).focus();
  };
  if (data.first_name.length < 2) return fail("Veuillez saisir votre prénom (2 caractères minimum).", "#first-name");
  if (data.last_name.length < 2) return fail("Veuillez saisir votre nom (2 caractères minimum).", "#last-name");
  if (!EMAIL_RE.test(data.email)) return fail("Cette adresse e-mail semble incorrecte. Exemple : nom@exemple.com", "#email");
  if (!PHONE_RE.test(data.phone)) return fail("Numéro de téléphone invalide. Utilisez 8 à 20 chiffres, par exemple +212 6 12 34 56 78.", "#phone");
  if (!$("#consent").checked) return fail("Cochez la case d’accord pour continuer.", "#consent");
  $("#register-error").textContent = "";
  participant = data;
  startQuiz();
}

/* ---------- Quiz ---------- */
function startQuiz() {
  currentIndex = 0;
  selectedAnswers = Array(QUESTIONS.length).fill(null);
  finalResult = null;
  saved = false;
  startTime = Date.now();
  renderQuestion();
  showScreen("#quiz-screen");
}

function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  const number = formatNumber(currentIndex + 1);
  $("#current-number").textContent = number;
  $("#aside-number").textContent = number;
  $("#total-number").textContent = formatNumber(QUESTIONS.length);
  $("#progress-fill").style.width = `${((currentIndex + 1) / QUESTIONS.length) * 100}%`;
  $("#question-category").textContent = q.category || "CONNAISSANCES GÉNÉRALES";
  $("#question-text").textContent = q.question;
  $("#answers-list").replaceChildren();
  $("#quiz-error").textContent = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option" + (selectedAnswers[currentIndex] === index ? " selected" : "");
    button.setAttribute("aria-pressed", String(selectedAnswers[currentIndex] === index));
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.className = "answer-text";
    text.textContent = option;
    button.append(letter, text);
    button.addEventListener("click", () => {
      selectedAnswers[currentIndex] = index;
      renderQuestion();
    });
    $("#answers-list").append(button);
  });

  $("#previous-btn").disabled = currentIndex === 0;
  $("#previous-btn").style.opacity = currentIndex === 0 ? ".35" : "1";
  $("#next-btn").disabled = selectedAnswers[currentIndex] === null;
  $("#next-btn").innerHTML = currentIndex === QUESTIONS.length - 1
    ? 'Terminer et voir mon résultat <span aria-hidden="true">↗</span>'
    : 'Question suivante <span aria-hidden="true">→</span>';
}

function nextQuestion() {
  if (selectedAnswers[currentIndex] === null) {
    $("#quiz-error").textContent = "Veuillez sélectionner une réponse avant de continuer.";
    return;
  }
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function previousQuestion() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(totalSeconds / 60)} min ${String(totalSeconds % 60).padStart(2, "0")} s`;
}

function calculateResult() {
  const correctCount = QUESTIONS.reduce((sum, q, i) => sum + (selectedAnswers[i] === q.correctIndex ? 1 : 0), 0);
  return {
    ...participant,
    score: correctCount,
    total_questions: QUESTIONS.length,
    percentage: Math.round((correctCount / QUESTIONS.length) * 100),
    duration_seconds: Math.floor((Date.now() - startTime) / 1000),
    answers: QUESTIONS.map((q, i) => ({
      question_index: i + 1,
      selected_index: selectedAnswers[i],
      correct_index: q.correctIndex,
      is_correct: selectedAnswers[i] === q.correctIndex
    }))
  };
}

function finishQuiz() {
  finalResult = calculateResult();
  renderResults();
  showScreen("#results-screen");
  saveResult();
}

/* ---------- Résultats ---------- */
function renderResults() {
  const { first_name, score, total_questions, percentage, duration_seconds } = finalResult;
  $("#result-greeting").textContent = `Merci pour votre participation, ${first_name}.`;
  $("#score-value").textContent = `${score}/${total_questions}`;
  $("#score-percent").textContent = `${percentage} %`;
  $("#correct-count").textContent = score;
  $("#incorrect-count").textContent = total_questions - score;
  $("#elapsed-time").textContent = formatDuration(duration_seconds * 1000);

  if (percentage >= 80) {
    $("#result-title").innerHTML = "Un regard éclairé<br>sur l’alimentation.";
    $("#result-description").textContent = "Excellent parcours. Continuez à approfondir vos connaissances et à les partager.";
  } else if (percentage >= 50) {
    $("#result-title").innerHTML = "De bonnes bases,<br>à approfondir.";
    $("#result-description").textContent = "Vous avez déjà des repères utiles. La correction détaillée vous aidera à progresser.";
  } else {
    $("#result-title").innerHTML = "Chaque réponse<br>est une occasion d’apprendre.";
    $("#result-description").textContent = "Prenez le temps de lire les explications, puis recommencez quand vous le souhaitez.";
  }

  $("#corrections-list").replaceChildren();
  QUESTIONS.forEach((q, i) => {
    const isCorrect = selectedAnswers[i] === q.correctIndex;
    const item = document.createElement("article");
    item.className = `correction-item ${isCorrect ? "is-correct" : "is-wrong"}`;
    const index = document.createElement("div");
    index.className = "correction-index";
    index.textContent = formatNumber(i + 1);
    const body = document.createElement("div");
    const label = document.createElement("span");
    label.className = "correction-label";
    label.textContent = isCorrect ? "Réponse correcte" : "À revoir";
    const question = document.createElement("p");
    question.className = "correction-question";
    question.textContent = q.question;
    const chosen = document.createElement("p");
    chosen.className = "correction-answer";
    chosen.textContent = `Votre réponse : ${q.options[selectedAnswers[i]]}`;
    body.append(label, question, chosen);
    if (!isCorrect) {
      const correct = document.createElement("p");
      correct.className = "correction-answer";
      correct.textContent = `Bonne réponse : ${q.options[q.correctIndex]}`;
      body.append(correct);
    }
    const explanation = document.createElement("p");
    explanation.className = "correction-explanation";
    explanation.textContent = q.explanation || "";
    body.append(explanation);
    item.append(index, body);
    $("#corrections-list").append(item);
  });
}

/* ---------- Enregistrement Supabase ---------- */
async function saveResult() {
  if (saving || saved || !finalResult) return;
  $("#retry-save-btn").classList.add("hidden");
  if (!supabaseClient) {
    $("#save-status").textContent = "Mode aperçu — base non configurée";
    showToast("Résultat calculé, mais Supabase n’est pas encore configuré (voir README).");
    return;
  }
  saving = true;
  $("#save-status").textContent = "Enregistrement…";
  const payload = {
    first_name: finalResult.first_name,
    last_name: finalResult.last_name,
    email: finalResult.email,
    phone: finalResult.phone,
    score: finalResult.score,
    total_questions: finalResult.total_questions,
    percentage: finalResult.percentage,
    duration_seconds: finalResult.duration_seconds,
    answers: finalResult.answers
  };
  // Pas de .select() : la lecture publique est volontairement désactivée.
  const { error } = await supabaseClient.from("quiz_results").insert(payload);
  saving = false;
  if (error) {
    console.error("Supabase insert failed:", error);
    $("#save-status").textContent = "Participation non enregistrée";
    $("#retry-save-btn").classList.remove("hidden");
    showToast("Impossible d’enregistrer votre participation. Vérifiez votre connexion et réessayez.");
  } else {
    saved = true;
    $("#save-status").textContent = "Participation enregistrée ✓";
  }
}

let toastTimeout;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 4000);
}

$("#start-btn").addEventListener("click", openRegistration);
$("#register-form").addEventListener("submit", submitRegistration);
$("#next-btn").addEventListener("click", nextQuestion);
$("#previous-btn").addEventListener("click", previousQuestion);
$("#retry-save-btn").addEventListener("click", saveResult);
$("#restart-btn").addEventListener("click", () => {
  selectedAnswers = [];
  finalResult = null;
  participant = null;
  saved = false;
  $("#register-form").reset();
  $("#register-error").textContent = "";
  showScreen("#intro-screen");
});
$("#print-btn").addEventListener("click", () => window.print());
