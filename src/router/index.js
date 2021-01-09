import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import DiagnosticTest from "../views/DiagnosticTest.vue";
import Risk from "../views/Risk.vue";
import SummaryStatistics from "../views/SummaryStatistics.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/risk",
    name: "Risk",
    component: Risk,
  },
  {
    path: "/diagnostic-tests",
    name: "Diagnostic Tests",
    component: DiagnosticTest,
  },
  {
    path: "/summary-statistics",
    name: "Summary Statistics",
    component: SummaryStatistics,
  },
  // {
  //   path: "/confidence-intervals",
  //   name: "CIs",
  //   component: ConfidenceIntervalCalc,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;