<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePokemonGame } from '@/modules/composables';

    const router = useRouter();
    const bestScore = ref<number>(0);
    const startGame = () => {
        router.push('/game');
        console.log('¡Juego iniciado!');
    };
    onMounted(() => {
        const { getHighScore } = usePokemonGame();
        bestScore.value = getHighScore();
    })
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
        <div class="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/20">

            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                    alt="Logo Pokémon" 
                    class="animate-bounce w-24 h-24 object-contain filter drop-shadow-lg" />
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-yellow-300 drop-shadow-md">
                    El Juego del Pokémon
                </h1>
                <div class="h-1 w-20 bg-yellow-300 mx-auto mt-2 rounded-full"></div>
            </div>
        
            <div class="mb-8 text-center">
                <p class="text-lg">
                    ¡Pon a prueba tus conocimientos sobre Pokémon! 
                    Adivina correctamente para sumar puntos.
                </p>
                <p class="mt-2 text-sm opacity-80">
                    ¡Pero cuidado! Un error y el juego terminará.
                </p>
            </div>
        
            <div class="bg-white/20 rounded-lg p-4 mb-8 text-center">
                <h2 class="text-xl font-semibold mb-2">Mejor puntuación</h2>
                <div class="text-3xl font-bold text-yellow-300">{{ bestScore }}</div>
            </div>
        
            <button 
                @click="startGame"
                class="w-full py-4 px-6 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold text-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
                ¡COMENZAR A JUGAR!
            </button>
            
            <div class="mt-6 text-center text-sm opacity-70">
                <p>¿Podrás convertirte en un Maestro Pokémon?</p>
            </div>
        </div>
    </main>
</template>