import "regenerator-runtime/runtime.js";
import Alpine from "alpinejs";
import RegisterStore from "./store/register";
import RegisterInput from "../../components/register-input/register-input";
import Register from "../../components/register/register";
import { post } from "./util/client";
import { ROUND } from "./util/route";
import notification from "./util/notification";

window.Alpine = Alpine;

function loadStore() {
  RegisterStore();
}

function loadComponent() {
  RegisterInput();
  Register();
}

function loadPage() {
  const NUMBER_OF_ROUND = 3;

  Alpine.data("index", () => ({
    buttonDisabled: false,

    async start() {
      this.buttonDisabled = true;
      await post(ROUND.CREATE(NUMBER_OF_ROUND), {});
      notification("success", "Parties correctement générés !");
      this.buttonDisabled = false;
    },
  }));
}

document.addEventListener("alpine:init", () => {
  loadStore();
  loadComponent();
  loadPage();
});

Alpine.start();
