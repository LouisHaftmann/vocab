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
    <main class="flex-1 flex flex-col text-6xl items-center justify-evenly" @click="answerHidden = false">
      <div>
        {{ currentQuestion.question }}
      </div>
      <div :class="[answerHidden && 'invisible']">
        {{ currentQuestion.answer }}
      </div>
    </main>
    <div class="flex gap-5">
      <QuestionButton theme="wrong" @click="() => {
        answerHidden = true
        nextQuestion(true)
      }" />
      <QuestionButton theme="correct" @click="() => {
        answerHidden = true
        nextQuestion()
      }" />

    </div>
  </div>
</template>