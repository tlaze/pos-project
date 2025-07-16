import { createRouter, createWebHistory } from "vue-router";
// import MenuView from './views/MenuView.vue';
// import CheckoutView from './views/CheckoutView.vue';
import MenuView from '../views/MenuView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
    { path: '/', name: 'Menu', component: MenuView },
    { path: '/checkout', name: 'Checkout', component: CheckoutView },
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router