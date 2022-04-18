import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Calendar from "../components/Calendar.vue";

export default [
  { path: "/Login", component: Login },
  { path: "/", component: SignUp },
  { path: "/Calendar", component: Calendar },
];
