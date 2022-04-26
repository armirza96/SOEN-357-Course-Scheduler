import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Calendar from "../components/Calendar.vue";
import Objective from "../components/ObjectivesPage.vue";
import HomePage from "../components/HomePage.vue";


export default [
  { path: "/Login", component: Login },
  { path: "/SignUp", component: SignUp },
  { path: "/Calendar", component: Calendar },
  { path: "/Objectives", component: Objective },
  { path: "/HomePage", component: HomePage },

];
