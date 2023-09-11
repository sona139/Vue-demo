import { createRouter, createWebHistory } from "vue-router";
import EmulationHome from "@/views/emulation/EmulationHome.vue";
import EmulationForm from "@/views/emulation/EmulationForm.vue";

const routers = [
	{
		path: "/emulation",
		name: "EmulationHomeRouter",
		component: EmulationHome,
		children: [
			{
				path: ":id",
				name: "EmulationFormRouter",
				components: {
					EmulationRouterView: EmulationForm,
				},
				props: true,
			},
		],
	},
	{
		path: "/",
		name: "HomeRouter",
		component: EmulationHome,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routers,
});

export default router;
