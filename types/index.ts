export interface Lexeme {
  translated: string
  native: string
}

export interface LanguageData {
  groups: {
    name: string
    vocabulary: Lexeme[]
  }[]
}
