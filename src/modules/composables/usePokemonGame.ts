import { ref, onMounted, computed } from "vue";
import { pokemonApi } from "@/modules/api/pokemonAPI";
import { GameStatus } from "@/modules/interfaces";
import type { Pokemon } from "@/modules/interfaces";

export const usePokemonGame = () => {
	const gameStatus = ref<GameStatus>(GameStatus.Loading);
	const showPokemon = ref<boolean>(false);
	const pokemonList = ref<Pokemon[]>([]);
	const correctPokemon = ref<Pokemon | null>(null);
	const score = ref<number>(0);
	const hintUsed = ref<boolean>(false);
	const highScore = ref<number>(0);
	const HIGH_SCORE_KEY: string = "pokemon_game_high_score";

	const isLoading = computed(() => gameStatus.value === GameStatus.Loading);
	const isPlaying = computed(() => gameStatus.value === GameStatus.Playing);
	const isGameOver = computed(() => gameStatus.value === GameStatus.Lose);

	const sleep = (ms: number): Promise<void> => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const getRandomPokemonId = () => Math.floor(Math.random() * 898) + 1;

	const getHighScore = (): number => {
		try {
			const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
			highScore.value = savedScore ? parseInt(`${savedScore}`) : 0;
			return highScore.value;
		} catch (error) {
			console.error("Error reading high score from LocalStorage:", error);
			return 0;
		}
	};

	const saveHighScore = (newScore: number) => {
		try {
			localStorage.setItem(HIGH_SCORE_KEY, newScore.toString());
			highScore.value = newScore;
		} catch (error) {
			console.error("Error saving high score to LocalStorage:", error);
		}
	};

	const updateHighScore = () => {
		const savedHighScore = getHighScore();
		if (score.value > savedHighScore) {
			saveHighScore(score.value);
		}
	};

	const fetchPokemon = async (id: number): Promise<Pokemon> => {
		const { data } = await pokemonApi.get(`/${id}`);
		return {
			id: data.id,
			name: data.name,
			sprite: data.sprites.other["official-artwork"].front_default,
		};
	};

	const restartGame = () => {
		hintUsed.value = false;
		score.value = 0;
		loadGame();
	}

	const loadGame = async () => {
		try {
			gameStatus.value = GameStatus.Loading;
			showPokemon.value = false;

			const uniqueIds = new Set<number>();
			while (uniqueIds.size < 4) {
				uniqueIds.add(getRandomPokemonId());
			}

			const pokemonPromises = Array.from(uniqueIds).map((id) =>
				fetchPokemon(id)
			);
			const pokemons = await Promise.all(pokemonPromises);
			const randomIndex = Math.floor(Math.random() * pokemons.length);

			pokemonList.value = pokemons.map((p) => ({
				id: p.id,
				name: p.name,
				sprite: p.sprite,
			}));
			correctPokemon.value = pokemons[randomIndex];
		} catch (error) {
			console.error("Error cargando Pokémon:", error);
			gameStatus.value = GameStatus.Lose;
			throw error;
		} finally {
			gameStatus.value = GameStatus.Playing;
		}
	};

	const checkAnswer = async (selectedId: number) => {
		if (!correctPokemon.value) return;

		showPokemon.value = true;
		await sleep(2000);

		if (selectedId === correctPokemon.value.id) {
			gameStatus.value = GameStatus.Won;
			score.value += 1;
			updateHighScore();
			loadGame();
		} else {
			alert(
				`¡Game Over! El Pokémon era ${correctPokemon.value.name}. Puntuación final: ${score.value}`
			);
			updateHighScore();
			restartGame();
		}

		showPokemon.value = false;
	};

	const giveUp = () => {
		if (correctPokemon.value) {
			score.value += 1;
			alert(
				`¡Te rendiste! El Pokémon era ${correctPokemon.value.name}. Puntuación: ${score.value}`
			);
			updateHighScore();
			restartGame();
		}
	};

	const getHint = () => {
		if (hintUsed.value || !correctPokemon.value) return;

		const incorrectOptions = pokemonList.value.filter(
			(pokemon) => pokemon.id !== correctPokemon.value?.id
		);

		const randomIncorrect =
			incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

		pokemonList.value =
			Math.floor(Math.random() * 2) === 0
				? [correctPokemon.value, randomIncorrect]
				: [randomIncorrect, correctPokemon.value];

		hintUsed.value = true; 
	};

	onMounted(() => {
		loadGame();
	});

	return {
		gameStatus,
		isLoading,
		isPlaying,
		isGameOver,
		pokemonList,
		correctPokemon,
		score,
		showPokemon,
		highScore,
		hintUsed,

		checkAnswer,
		giveUp,
		getHint,
		loadGame,
		getHighScore,
		updateHighScore,

	};
};
