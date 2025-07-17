<template>
  <div class="flex flex-col md:flex-row p-4 gap-6">
    <router-link
      to="/"
      class="inline-block bg-blue-200 text-gray-800 px-4 py-2 rounded hover:bg-blue-300 transition self-start"
    >
      Back to Menu
    </router-link>

    <OrderSummary />

    <!-- Payment + Confirmation -->
    <section class="md:w-1/2 bg-white rounded-lg p-6 shadow text-center flex flex-col items-center justify-center space-y-4">
      <h2 class="text-2xl font-bold">
        {{ paymentComplete ? 'Thank you for your order!' : 'Please pay to complete your order' }}
      </h2>

      <!-- Post-payment confirmation -->
      <div v-if="paymentComplete">
        <p class="text-gray-600 mb-1">Your meal is being prepared.</p>
        <p class="text-sm text-gray-500">Order #{{ orderId }}</p>
      </div>

      <!-- Payment Form -->
      <PaymentForm
        v-if="!paymentComplete"
        :order-id="orderId"
        @payment-complete="handlePaymentComplete"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import OrderSummary from '../components/OrderSummary.vue'
import PaymentForm from '../components/PaymentForm.vue'

const cart = useCartStore()
const paymentComplete = ref(false)
const orderId = ref(Math.floor(100000 + Math.random() * 900000))

function handlePaymentComplete() {
  paymentComplete.value = true
}
</script>