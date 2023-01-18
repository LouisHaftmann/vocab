import { useLocalStorage } from '@vueuse/core'
import type { LanguageData, Lexeme } from '~~/types'

const getWeightedRandomArrayIndex = (rawWeights: number[]) => {
  const sum = rawWeights.reduce((a, b) => a + b, 0)

  const random = Math.random() * sum

  const weights = [] as number[]
  for (let i = 0; i < rawWeights.length; i++) {
    const prev = weights[i - 1] ?? 0
    weights.push(prev + rawWeights[i])
  }

  const originalWeights = [...weights]

  while (weights.length > 1) {
    const pivot = Math.floor(weights.length / 2)
    const weight = weights[pivot]

    if (random >= weight)
      weights.splice(0, pivot)
    else
      weights.splice(pivot, weights.length - pivot)
  }

  return originalWeights.indexOf(weights[0])
}
const keyFromLexeme = (lexeme: Lexeme) => `${lexeme.native}-${lexeme.translated}`

const useAccuracyData = () => useLocalStorage('vocab-accuracy', {} as Record<string, { total: number; totalWrong: number }>)

const useVocabGame = (languageData: LanguageData) => {
  const enabledQuestions = languageData.groups.filter(group => true /* TODO check if enabled */).flatMap(group => group.vocabulary)

  const accuracyData = useAccuracyData()

  const weights = computed(() => enabledQuestions.map((lexeme) => {
    const key = keyFromLexeme(lexeme)
    const accuracy = accuracyData.value[key]
    if (!accuracy || accuracy.total === 0)
      return 1

    return (1 + accuracy.totalWrong / accuracy.total) ** 2
  }).sort((a, b) => a - b))

  const currentQuestion = ref(enabledQuestions[getWeightedRandomArrayIndex(weights.value)])

  const nextQuestion = (answerWrong = false) => {
    const key = keyFromLexeme(currentQuestion.value)
    const currentAccuracy = accuracyData.value[key] ?? { total: 0, totalWrong: 0 }

    currentAccuracy.total++

    if (answerWrong)
      currentAccuracy.totalWrong++

    accuracyData.value = {
      ...accuracyData.value,
      [key]: currentAccuracy,
    }

    // update current question
    currentQuestion.value = enabledQuestions[getWeightedRandomArrayIndex(weights.value)]
  }

  return {
    currentQuestion,
    nextQuestion,
  }
}

export default useVocabGame
