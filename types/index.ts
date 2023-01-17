export interface Question {
  question: string
  answer: string
}

export interface LanguageData {
  letters: {
    groups: {
      name: string
      items: Question[]
    }[]
  }
}