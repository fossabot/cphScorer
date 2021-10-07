import "regenerator-runtime/runtime.js";
import Alpine from 'alpinejs'
import RegisterStore from './store/register'
import registerInput from "../../components/register-input/register-input";

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {    
    registerInput()
    RegisterStore()
})

Alpine.start()