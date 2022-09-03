import { data } from "./DataHistoric";
import { stopwords } from "./Stopwords";

const scoresLetterPercentage = [
  { letterMark: "Ap", percScore: 95 },
  { letterMark: "A", percScore: 90 },
  { letterMark: "Am", percScore: 88 },
  { letterMark: "Bp", percScore: 85 },
  { letterMark: "B", percScore: 80 },
  { letterMark: "Bm", percScore: 78 },
  { letterMark: "Cp", percScore: 75 },
  { letterMark: "C", percScore: 70 },
  { letterMark: "Cm", percScore: 68 },
  { letterMark: "Dp", percScore: 65 },
  { letterMark: "D", percScore: 60 },
  { letterMark: "Dm", percScore: 58 },
  { letterMark: "Ep", percScore: 48 },
  { letterMark: "E", percScore: 40 },
  { letterMark: "F", percScore: 20 },
];

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

function getUniqueWords(words) {
  return words.reduce((unique, curr) => {
    const exists = unique.find((word) => word === curr);
    return exists ? unique : unique.concat(curr);
  }, []);
}

function computePercentageRepeatedWords(text) {
  const textPunctuationLess = removePunctuation(text);
  const words = textPunctuationLess
    .split(" ")
    .filter((word) => word !== "" && !stopwords.includes(word));
  const uniqueWords = getUniqueWords(words);
  return 1 - uniqueWords.length / words.length;
}

function computeSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g);
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function computeAvgWordsPerSentence(text) {
  const sentences = computeSentences(text);
  const wordsPerSentence = sentences.map(
    (sentence) => removePunctuation(sentence).split(" ").length
  );
  return sumArray(wordsPerSentence) / wordsPerSentence.length || 0;
}

function letterScoreToPerc(letter) {
  return scoresLetterPercentage.find((score) => score.letterMark === letter)
    .percScore;
}

function PercScoreToLetter(percentage) {
  return scoresLetterPercentage.find((score) => score.percScore <= percentage)
    .letterMark;
}

function averageScores(values) {
  const percentages = values.map((value) => letterScoreToPerc(value));
  const avgPercentage = sumArray(percentages) / percentages.length;
  return PercScoreToLetter(avgPercentage);
}

function countSyllables(word) {
  if (word.length <= 3) {
    return 1;
  }
  const wordSimplified = word
    .toLowerCase()
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");
  const syllables = wordSimplified.match(/[aeiouy]{1,2}/g);
  return syllables?.length;
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
  const numberOfWords = words.length;
  const numberOfSyllables = sumArray(
    words
      .map((word) => countSyllables(word))
      .filter((syllable) => syllable !== undefined)
  );

  const score =
    206.835 -
    (1.015 * numberOfWords) / numberOfSentences -
    (84.6 * numberOfSyllables) / numberOfWords;
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
