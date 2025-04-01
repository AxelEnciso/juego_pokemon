// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomePage from "../pages/PokemonStart.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomePage,
		meta: {
			title: "El Juego del Pokémon - Inicio",
		},
	},
	{
		path: "/game",
		name: "game",
		component: import("../pages/PokemonGame.vue"),
		meta: {
			title: "El Juego del Pokémon - ¡Adivina!",
		},
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = (to.meta.title as string) || "El Juego del Pokémon";
	next();
});

export default router;
