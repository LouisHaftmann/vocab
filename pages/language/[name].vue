<script lang="ts" setup>
const languageName = useRoute().params.name

if (!languageName)
  await navigateTo('/')

const languageData = await import(`../../assets/languages/${languageName}.json`)
if (!languageData)
  await navigateTo('/')

const { currentQuestion, nextQuestion } = useVocabGame(languageData)

const answerHidden = ref(true)
</script>

<template>
  <div class="flex flex-col gap-5 w-screen h-screen max-h-[-webkit-fill-available] p-5">
    <header>JP</header>
    <button :disabled="!answerHidden" class="flex-1 flex flex-col text-6xl items-center justify-evenly ring-2 ring-emerald-500/40 rounded-md" @click="answerHidden = false">
      <div>
        {{ currentQuestion.translated }}
      </div>
      <div :class="[answerHidden && 'invisible']">
        {{ currentQuestion.native }}
      </div>
    </button>
    <div class="flex gap-5">
      <QuestionButton
        :disabled="answerHidden"
        theme="wrong" @click="() => {
          if (answerHidden) return
          answerHidden = true
          nextQuestion(true)
        }"
      />
      <QuestionButton
        :disabled="answerHidden"
        theme="correct" @click="() => {
          if (answerHidden) return
          answerHidden = true
          nextQuestion()
        }"
      />
    </div>
  </div>
</template>
