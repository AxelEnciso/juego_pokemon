<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Pokemon } from '../interfaces';

  const props = defineProps<{
    pokemonList: Pokemon[]
  }>();

  const emit = defineEmits<{
    (e: 'selected', id: number): void
  }>();

  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleClick = (pokemonId: number) => {
    emit('selected', pokemonId);
  };
</script>

<template>
    <section>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li 
              v-for="pokemon in pokemonList" 
              :key="pokemon.id"
              @click="handleClick(pokemon.id)"
              class="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                  rounded-lg shadow-md hover:shadow-lg cursor-pointer 
                  transition-all duration-200 transform hover:scale-[1.02]
                  border border-white/10 flex items-center justify-center"
            >
                <span class="text-white font-medium text-center">
                  {{ capitalize(pokemon.name) }}
                </span>
            </li>
        </ul>
    </section>
</template>