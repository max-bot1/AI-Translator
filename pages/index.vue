<script lang="ts" setup>
import '~/assets/css/main.css'

const messages = ref([
  {
    role: 'AI',
    content: 'Hello! What can I translate for you?',
    language: ""
  }
]);
const loading = ref(false);
const message = ref('');
const language = ref('');

const scrollToEnd = () => {
  setTimeout(() => {
    const chatMessages = document.querySelector('.chat-messages > div:last-child');
    chatMessages?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 100);
};

const sendPrompt = async () => {
  if (message.value === '') {
    return;
  };
  loading.value = true;

  messages.value.push({
    role: 'user',
    content: message.value,
    language: language.value
  });

  scrollToEnd();
  message.value = '';

  const res = await fetch(`/api/chat`, {
    body: JSON.stringify(messages.value.slice(1)),
    method: 'post'
  });

  if (res.status === 200) {
    const response = await res.json();
    messages.value.push({
      role: 'AI',
      content: response?.message,
      language: response?.language
    });
  } else {
    messages.value.push({
      role: 'AI',
      content: res.statusText,
      language: ""
    });
  }

  loading.value = false;
  scrollToEnd();
};

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
        aria-label="Theme" @click="isDark = !isDark" />
      <h2 style="display: flex; justify-content: center;">
        <strong> AI Translator </strong>
      </h2>

      <h1 style="display: flex; justify-content: center;">This is a translator that leverages OpenAI. It allows you to
        translate any given input to one of the languages that is officially supported by OpenAi. Just select any
        language from the dropdown, type in a phrase and translate. Enjoy! </h1>
    </template>

    <UContainer style="width: auto;" class="roundedContainer">
      <div v-for="(message, i) in messages" :key="i" class="flex flex-col p-4">
        <div v-if="message.role === 'AI'" class="pr-8 mr-auto">
          <div class="p-2 mt-1 text-sm text-gray-700 bg-gray-200 rounded-lg text-smp-2">
            {{ message.content }}
          </div>
        </div>
        <div v-else class="pl-8 ml-auto">
          <div class="p-2 mt-1 text-sm text-white bg-blue-400 rounded-lg">
            {{ message.content }}
          </div>
        </div>
      </div>
      <div class="p-4 ml-10 mr-auto" v-if="loading">
        <span class="loader"></span>
      </div>
    </UContainer>

    <template #footer>
      <form class="mt-6 flex gap-1" @submit.prevent="sendPrompt" style="display: flex; align-items: center;">
      <USelect icon="i-heroicons-magnifying-glass-20-solid" color="white" style="padding-top: 10px;" size="sm"
        :model-value="language"  @update:model-value="value => language = value"
        :options="['Albanian', 'Amharic', 'Arabic', 'Armenian', 'Bengali', 'Bosnian', 'Bulgarian', 'Catalan', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'Georgian', 'German', 'Greek', 'Gujarati', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Latvian', 'Lithuanian', 'Macedonian', 'Malay', 'Malayalam', 'Mandarin Chinese', 'Marathi', 'Mongolian', 'Norwegian', 'Persian (Farsi)', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Somali', 'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese']"
        required placeholder="Translate to..." />
        <UInput size="xl" v-model="message" required placeholder="Translate something!" class="flex-1" />
        <uButton size="xl" color="green" :ui="{ rounded: 'rounded-full' }" icon="typcn:pencil" type="submit" />
      </form>
    </template>
  </UCard>
</template>


<style>
::-webkit-scrollbar {
  display: none;
}
</style>