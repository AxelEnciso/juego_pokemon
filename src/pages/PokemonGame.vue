<script setup lang="ts">
    import PokemonImage from '@/modules/components/PokemonImage.vue';
    import PokemonOptions from '@/modules/components/PokemonOptions.vue';
    import PokemonIsLoading from '@/modules/components/PokemonIsLoading.vue';
    import { usePokemonGame } from '@/modules/composables';
    import { GameStatus } from '@/modules/interfaces';

    const {
        gameStatus,
        isLoading,
        isPlaying,
        isGameOver,
        pokemonList,
        correctPokemon,
        hintUsed,
        score,
        showPokemon,
        checkAnswer,
        giveUp,
        getHint
    } = usePokemonGame();
</script>

<template>

    <router-link 
        to="/" 
        class="fixed top-6 left-6 bg-yellow-400 hover:bg-orange-400 text-black font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
    >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 19l-7-7 7-7" />
    </svg>
        <span class="sr-only">Inicio</span>
    </router-link>
    
    <section 
        v-if="isLoading" 
        class="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white"
    >
        <PokemonIsLoading />
    </section>

    <section 
        v-else 
        class="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8 px-4"
    >
        <div class="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6 shadow-lg">
            <span class="text-white font-bold text-md">Puntuación: <span class="text-yellow-300">{{ score }}</span></span>
            </div>
            
            <div v-if="isGameOver" class="mb-4 px-4 py-2 bg-red-500/80 text-white rounded-full">
                ¡Perdiste! Intenta de nuevo
            </div>
            <div v-else-if="gameStatus === GameStatus.Won" class="mb-4 px-4 py-2 bg-green-500/80 text-white rounded-full">
                ¡Correcto! +1 punto
            </div>
            
            <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
            <h1 class="text-2xl font-bold text-center text-white mb-8">¿Quién es este Pokémon?</h1>
        
            <div class="w-full flex justify-center">
                <PokemonImage 
                    v-if="correctPokemon" 
                    :pokemonId="correctPokemon.id" 
                    :showPokemon="showPokemon" 
                    :pokemon-sprite="correctPokemon.sprite"
                    class="object-contain filter drop-shadow-xl" 
                />
            </div>
        
            <PokemonOptions 
                v-if="isPlaying"
                :pokemonList="pokemonList" 
                @selected="checkAnswer" 
                class="mt-5"
            />
        </div>
        
        <div class="mt-2 flex space-x-4">
            <button 
                @click="giveUp" 
                class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition-colors shadow-md"
                :disabled="!isPlaying"
            >
                Rendirse +1
            </button>
            <button 
                @click="getHint" 
                :disabled="hintUsed || !isPlaying"
                :class="{
                    'bg-yellow-500 hover:bg-yellow-600': !hintUsed,
                    'bg-gray-500 cursor-not-allowed': hintUsed
                }"
                class="px-4 py-2 rounded-full text-white font-semibold transition-colors shadow-md"
                >
                {{ hintUsed ? 'Pista usada' : 'Pista' }}
            </button>
        </div>
        
        <p class="text-white/70 text-sm mt-6 text-center max-w-md">
            Adivina correctamente para ganar puntos. Un error y el juego termina.
        </p>
        <p class="text-white/70 text-sm mt-6 text-center max-w-md">
            💛20760710🩵
        </p>
    </section>
</template>