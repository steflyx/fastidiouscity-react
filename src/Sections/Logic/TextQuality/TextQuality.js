import { data } from "./DataHistoric";
import { stopwords } from "./Stopwords";

function getScore(value, scores, reverse) {
  const score = scores.find((score) =>
    reverse ? score.value > value : score.value < value
  );
  return score !== undefined ? score.mark : "F";
}

function removePunctuation(text) {
  const textPunctuationLess = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  return textPunctuationLess.replace(/\s{2,}/g, " ");
}

function computePercentageRepeatedWords(text) {
  console.log(text);
  const textPunctuationLess = removePunctuation(text);
  const words = textPunctuationLess
    .split(" ")
    .filter((word) => word !== "" && !stopwords.includes(word));
  const uniqueWords = words.reduce((unique, curr) => {
    const exists = unique.find((word) => word === curr);
    return exists ? unique : unique.concat(curr);
  }, []);
  return 1 - uniqueWords.length / words.length;
}

function computeAvgWordsPerSentence(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
  const wordsPerSentence = sentences.map(
    (sentence) => removePunctuation(sentence).split(" ").length
  );
  const sum = wordsPerSentence.reduce((a, b) => a + b, 0);
  return sum / wordsPerSentence.length || 0;
}

function averageScores(values) {
  const scoreToPerc = {
    Ap: 95,
    A: 90,
    Am: 88,
    Bp: 85,
    B: 80,
    Bm: 78,
    Cp: 75,
    C: 70,
    Cm: 68,
    Dp: 65,
    D: 60,
    Dm: 58,
    Ep: 48,
    E: 40,
    F: 20,
  };

  const percentages = values.map((value) => scoreToPerc[value]);
  const avg = percentages.reduce((a, b) => a + b, 0) / percentages.length;
  return Object.entries(scoreToPerc).find((score) => score[1] < avg)[0];
}

export async function computeTextQuality(text) {
  const percRepeatedWords = computePercentageRepeatedWords(text);
  const avgWordsPerSentence = computeAvgWordsPerSentence(text);

  const output = {
    percRepeatedWords: {
      value: percRepeatedWords,
      diffFromAverage:
        (percRepeatedWords - data.percRepeatedWords.avg) /
        data.percRepeatedWords.avg,
      score: getScore(percRepeatedWords, data.percRepeatedWords.scores, true),
    },
    avgWordsPerSentence: {
      value: avgWordsPerSentence,
      diffFromAverage:
        (avgWordsPerSentence - data.avgWordsPerSentence.avg) /
        data.avgWordsPerSentence.avg,
      score: getScore(
        avgWordsPerSentence,
        data.avgWordsPerSentence.scores,
        false
      ),
    },
  };

  const globalScore = averageScores([
    output.percRepeatedWords.score,
    output.avgWordsPerSentence.score,
  ]);
  output.globalScore = globalScore;
  return output;
}
