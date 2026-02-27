// lib/feedback/engine.ts

export type Trait =
  | "מצפוניות"
  | "נעימות"
  | "מוחצנות"
  | "פתיחות מחשבתית"
  | "יציבות רגשית";

export type FeedbackInput = {
  traitCounts: Partial<Record<Trait, number>>;
  totalChoices: number;
  positiveChoices?: number;
  negativeChoices?: number;
};

export type TraitScores = Record<Trait, number>;

export type Flag =
  | "balanced"
  | "mild_imbalance"
  | "high_imbalance"
  | "extreme_positive_bias"
  | "rigidity_risk"
  | "unstable_charisma"
  | "idealistic_no_structure";

export type Insight = {
  flag: Flag;
  title: string;
  severity: "info" | "warn" | "alert";
  summary: string;
  stationImpact: string;
  action: string;
};

export type FeedbackResult = {
  scores: TraitScores;
  overall: {
    level: "מאוזן" | "כמעט מאוזן" | "לא מאוזן";
    imbalanceIndex: number;
    variance: number;
    positiveRatio?: number;
    summary: string;
  };
  insights: Insight[];
};

// ========================
// helpers
// ========================

const ALL_TRAITS: Trait[] = [
  "מצפוניות",
  "נעימות",
  "מוחצנות",
  "פתיחות מחשבתית",
  "יציבות רגשית",
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function stdev(values: number[]) {
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance =
    values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

// ========================
// score computation
// ========================

export function computeScores(input: FeedbackInput): TraitScores {
  const total = Math.max(1, input.totalChoices);

  const scores = {} as TraitScores;

  ALL_TRAITS.forEach((trait) => {
    const count = input.traitCounts?.[trait] ?? 0;
    scores[trait] = clamp((count / total) * 100, 0, 100);
  });

  return scores;
}

// ========================
// main engine
// ========================

export function generateFeedback(
  input: FeedbackInput
): FeedbackResult {
  const scores = computeScores(input);
  const values = Object.values(scores);

  const max = Math.max(...values);
  const min = Math.min(...values);

  const imbalanceIndex = max - min;
  const variance = stdev(values);

  const positiveChoices = input.positiveChoices ?? 0;
  const negativeChoices = input.negativeChoices ?? 0;

  const hasValence =
    positiveChoices + negativeChoices > 0;

  const positiveRatio = hasValence
    ? clamp(
        positiveChoices /
          Math.max(1, positiveChoices + negativeChoices),
        0,
        1
      )
    : undefined;

  // ========================
  // רמת איזון
  // ========================

  let level: FeedbackResult["overall"]["level"] =
    "מאוזן";

  if (imbalanceIndex >= 45 || variance >= 16)
    level = "לא מאוזן";
  else if (imbalanceIndex >= 30 || variance >= 12)
    level = "כמעט מאוזן";

  const insights: Insight[] = [];

  // ========================
  // insights כלליים
  // ========================

  if (level === "מאוזן") {
    insights.push({
      flag: "balanced",
      severity: "info",
      title: "איזון כללי טוב",
      summary:
        "הפרופיל שלך נראה מאוזן יחסית בין התכונות – זה בדרך כלל נתפס כבשלות.",
      stationImpact:
        "בתחנות הדורשות הסתגלות למצבים שונים, איזון משדר גמישות ויציבות.",
      action:
        "שמור/י על אותנטיות. נסה להסביר בחירה ולא רק לבחור את האפשרות 'הנכונה'.",
    });
  } else if (level === "כמעט מאוזן") {
    insights.push({
      flag: "mild_imbalance",
      severity: "warn",
      title: "נטייה דומיננטית קלה",
      summary:
        "יש נטייה חזקה יותר לאחת התכונות – לא בעיה, אבל שווה לשים לב לאיזון.",
      stationImpact:
        "תכונה דומיננטית עלולה 'לצבוע' את הרושם הכללי שלך.",
      action:
        "נסה בתרגול הבא להדגיש גם צדדים משלימים לתכונה החזקה.",
    });
  } else {
    insights.push({
      flag: "high_imbalance",
      severity: "alert",
      title: "חוסר איזון משמעותי",
      summary:
        "הפער בין התכונות גדול יחסית. בשאו״ל קיצוניות עלולה להיתפס כחד-ממדיות.",
      stationImpact:
        "בדינמיקה קבוצתית או בראיון זה עשוי להיראות כחוסר גמישות.",
      action:
        "תרגול: בכל סיטואציה הדגש גם חוזקה וגם רגישות/איזון.",
    });
  }

  // ========================
  // מושלם מדי
  // ========================

  if (positiveRatio !== undefined && positiveRatio > 0.85) {
    insights.push({
      flag: "extreme_positive_bias",
      severity: "warn",
      title: "נטייה לבחור כמעט רק חיובי",
      summary:
        "בחירה כמעט מוחלטת בהיגדים חיוביים עלולה להיראות לא אותנטית.",
      stationImpact:
        "בוחנים מחפשים מודעות עצמית גם לחולשות.",
      action:
        "שלב לעיתים גם היגד שמראה למידה או קושי שנוהל נכון.",
    });
  }

  // ========================
  // דפוסים בין-תכונתיים
  // ========================

  const C = scores["מצפוניות"];
  const A = scores["נעימות"];
  const E = scores["מוחצנות"];
  const O = scores["פתיחות מחשבתית"];
  const ES = scores["יציבות רגשית"];

  if (C - A >= 35) {
    insights.push({
      flag: "rigidity_risk",
      severity: "warn",
      title: "סיכון לקשיחות תפקודית",
      summary:
        "מצפוניות גבוהה מאוד יחד עם נעימות נמוכה עשויים להתפרש כקשיחות.",
      stationImpact:
        "עלול להיראות כ'מוביל אבל פחות מקשיב'.",
      action:
        "לפני פתרון – שאל שאלה אחת שמבררת את הצד השני.",
    });
  }

  if (E >= 75 && ES <= 40) {
    insights.push({
      flag: "unstable_charisma",
      severity: "warn",
      title: "כריזמה לא יציבה",
      summary:
        "מוחצנות גבוהה עם יציבות רגשית נמוכה עלולה להיראות כנלהבות לא מווסתת.",
      stationImpact:
        "בתחנה מלחיצה זה עלול להתפרש כמהירות יתר.",
      action:
        "שלב נשימה קצרה ומשפט פתיחה מסדר לפני מענה.",
    });
  }

  if (O >= 75 && C <= 40) {
    insights.push({
      flag: "idealistic_no_structure",
      severity: "warn",
      title: "יצירתיות בלי מסגרת",
      summary:
        "פתיחות גבוהה עם מצפוניות נמוכה עשויות להיראות כרעיונות בלי ביצוע.",
      stationImpact:
        "בוחנים רוצים גם רעיון וגם תכנית.",
      action:
        "לכל רעיון – הוסף צעד ראשון מדיד וברור.",
    });
  }

  const overallSummary =
    level === "מאוזן"
      ? "פרופיל מאוזן יחסית."
      : level === "כמעט מאוזן"
      ? "קיימת נטייה דומיננטית קלה."
      : "קיים חוסר איזון משמעותי בין התכונות.";

  return {
    scores,
    overall: {
      level,
      imbalanceIndex,
      variance,
      positiveRatio,
      summary: overallSummary,
    },
    insights,
  };
}