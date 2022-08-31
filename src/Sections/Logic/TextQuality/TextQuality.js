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

function computeSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g);
}

function computeAvgWordsPerSentence(text) {
  const sentences = computeSentences(text);
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

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) {
    return 1;
  }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  return word.match(/[aeiouy]{1,2}/g).length;
}

function computeFleschScore(text) {
  const fleschScores = [
    { value: 90, mark: "a 5th grade student", letterScore: "F" },
    { value: 80, mark: "a 6th grade student", letterScore: "E" },
    { value: 70, mark: "a 7th grade student", letterScore: "D" },
    { value: 60, mark: "a 9th grade student", letterScore: "C" },
    { value: 50, mark: "a 12th grade student", letterScore: "Cp" },
    { value: 30, mark: "a college student", letterScore: "B" },
    { value: 10, mark: "a college graduate", letterScore: "A" },
    { value: 0, mark: "an expert in the field", letterScore: "Ap" },
  ];

  const numberOfSentences = computeSentences(text).length;
  const words = removePunctuation(text).split(" ");
  const syllablesPerWord = words.map((word) => countSyllables(word));
  const totSyllables = syllablesPerWord.reduce((a, b) => a + b, 0);
  const score =
    206.835 -
    (1.015 * words.length) / numberOfSentences -
    (84.6 * totSyllables) / words.length;
  const index = getScore(score, fleschScores, false);
  const readabilityIndex = {
    index: index,
    score: fleschScores.find((score) => score.mark === index).letterScore,
  };
  return readabilityIndex;
}

export async function computeTextQuality(text) {
  const textAdj = text + ".";
  const percRepeatedWords = computePercentageRepeatedWords(textAdj);
  const avgWordsPerSentence = computeAvgWordsPerSentence(textAdj);
  const readabilityIndex = computeFleschScore(textAdj);

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
    readabilityIndex: {
      index: readabilityIndex.index,
      score: readabilityIndex.score,
    },
  };

  const globalScore = averageScores([
    output.percRepeatedWords.score,
    output.avgWordsPerSentence.score,
    output.readabilityIndex.score,
  ]);
  output.globalScore = globalScore;
  return output;
}
