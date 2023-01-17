import { LanguageData, Question } from "~~/types";
import {useLocalStorage} from '@vueuse/core'

const getRandomArrayItem = <T>(array: T[]) => {
  console.log(array)
  return array[Math.floor(Math.random() * array.length)]
}

const useVocabGame = (languageData: LanguageData) => {
  const enabledQuestions = languageData.letters.groups.filter(group => true /* TODO check if enabled */).flatMap(group => group.items)


  const errorMultipliers = useLocalStorage('vocab-error-multipliers', Object.fromEntries(enabledQuestions.map(question => [question.question, 1])))


  const weightedQuestions = computed(() => {
    const weightedQuestions = enabledQuestions.flatMap(question => {
      const errorMultiplier = errorMultipliers.value[question.question]
      return Array(errorMultiplier).fill(question)
    })

    return weightedQuestions
  })

  const currentQuestion = ref<Question>(getRandomArrayItem(weightedQuestions.value))
  
  const nextQuestion = (answerWrong = false) => {
    // update error multiplier
    const currentMultiplier = errorMultipliers.value[currentQuestion.value.question]
    errorMultipliers.value = {
      ...errorMultipliers.value,
      [currentQuestion.value.question]: Math.max(1, answerWrong ? Math.ceil(currentMultiplier * 1.1) : Math.floor(currentMultiplier * 0.9))
    }

    // update current question
    currentQuestion.value = getRandomArrayItem(weightedQuestions.value)
  }

  return {
    currentQuestion,
    nextQuestion
  }
}

export default useVocabGame