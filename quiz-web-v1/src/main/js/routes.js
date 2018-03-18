import Home from "./pages/Home.vue";
import AcidGreen from "./quizzes/AcidGreen.vue";
import Start from "./quizzes/Start.vue";
import Aero from "./quizzes/Aero.vue";
import AeroBlue from "./quizzes/AeroBlue.vue";
import AfricanViolet from "./quizzes/AfricanViolet.vue";
import AirForceBlue from "./quizzes/AirForceBlue.vue";
import DarkBlue from "./quizzes/DarkBlue.vue";
import DarkBlueGray from "./quizzes/DarkBlueGray.vue";
import NotFound from "./pages/NotFound.vue";

export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/quizzes/start',
        component: Start
    },
    {
        path: '/quizzes/acidgreen',
        component: AcidGreen
    },
    {
        path: '/quizzes/aero',
        component: Aero
    },
    {
        path: '/quizzes/aeroblue',
        component: AeroBlue
    },
    {
        path: '/quizzes/africanviolet',
        component: AfricanViolet
    },
    {
        path: '/quizzes/airforceblue',
        component: AirForceBlue
    },
    {
        path: '/quizzes/darkblue',
        component: DarkBlue
    },
    {
        path: '/quizzes/DarkBlueGray',
        component: DarkBlueGray
    },
    {
        path: '*',
        component: NotFound
    }
]
