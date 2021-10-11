import "regenerator-runtime/runtime.js";
import Alpine from 'alpinejs'
import RegisterStore from './store/register'
import RegisterInput from "../../components/register-input/register-input";
import Register from "../../components/register/register";

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {    
    RegisterStore()
    RegisterInput()
    Register()
})

Alpine.start()