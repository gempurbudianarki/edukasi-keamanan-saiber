/**
 * Menghitung persentase akurasi misi secara murni dan idempoten.
 * Setiap ID soal hanya dihitung 1 kali berdasarkan status jawaban terakhir (anti-point farming).
 * Pembagi totalQuestions bersifat konstan (tidak dipengaruhi jumlah soal yang sempat dijawab).
 *
 * @param {Array<{id: string, correct: boolean}>} historyArray
 * @param {number} totalQuestions
 * @returns {number} Nilai persentase bulat (0 - 100)
 */
export function calculateMissionAccuracy(historyArray, totalQuestions) {
  if (!Array.isArray(historyArray) || !totalQuestions || totalQuestions <= 0) {
    return 0;
  }

  const uniqueAnswers = new Map();
  for (const item of historyArray) {
    if (item && item.id) {
      uniqueAnswers.set(item.id, Boolean(item.correct));
    }
  }

  let correctCount = 0;
  for (const isCorrect of uniqueAnswers.values()) {
    if (isCorrect) correctCount++;
  }

  const rawPercent = (correctCount / totalQuestions) * 100;
  return Math.min(100, Math.max(0, Math.round(rawPercent)));
}
