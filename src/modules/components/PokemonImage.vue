<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  showPokemon: boolean;
  pokemonSprite: string;
}>();

const imageClasses = computed(() => {
  return {
    'brightness-0': !props.showPokemon,
    'transition-all duration-500 ease-in-out': true,
    'h-48 w-48 md:h-64 md:w-64': true
  };
});
</script>

<template>
  <section class="flex justify-center items-center">
    <img 
      :src="pokemonSprite" 
      :alt="`Pokémon ¿?`"
      :class="imageClasses"
      class="object-contain filter drop-shadow-xl"
    >
  </section>
</template>

<style scoped>
    img {
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        max-height: 280px;
        image-rendering: pixelated;
    }

    .brightness-0 {
        filter: brightness(0) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    }

    img:not(.brightness-0) {
        animation: reveal 0.8s ease-out;
    }

    @keyframes reveal {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>