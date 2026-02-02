<script setup>
import { ref } from 'vue';

const count = ref(0);
const step = ref(1);
const min = ref(0)
const max = ref(100)

//undo
const prevCount = ref(null)
//savecount
function savePrev() {
    prevCount.value = count.value;
}

function increment() {
    count.value = Math.min(count.value + step.value, max.value)
    
}

function decrement() {
    count.value = Math.max(count.value - step.value, min.value)
}

function reset() {
    count.value = min.value
}

function undo() {
    if (prevCount.value === null) return;
    count.value = prevCount.value;
    prevCount.value = null;
}
</script>

<template>
    <div>
        <h1>Counter App</h1>
        <p>Click buttons to change the number.</p>

        <div class ="count">{{count}}</div>

        <div class="row">
            <button class="btn inc" @click="increment">+ Increase</button>
            <button class="btn dec" @click="decrement">- Decrease</button>
        </div>

        <div class="row">
            <button class="btn reset" @click="reset">Reset</button>
            <button class="btn undo" @click="undo">Undo</button>
        </div>

        <div class="hint">
        Step: <input type="number" min="1" v-model.number="step"/>
        </div>
    </div>

</template>

<style scoped>
    /* Layout */
div {
    max-width: 360px;
    margin: 60px auto;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
}

/* Title */
h1 {
    margin-bottom: 8px;
    color: #333;
}

p {
    margin-bottom: 20px;
    color: #777;
    font-size: 14px;
}

/* Counter number */
.count {
    font-size: 64px;
    font-weight: bold;
    color: #4f46e5; /* indigo */
    margin: 20px 0;
}

/* Button rows */
.row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
}

/* Buttons */
.btn {
    flex: 1;
    padding: 12px 0;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* Button colors */
.inc {
    background: #22c55e;
    color: white;
}

.dec {
    background: #ef4444;
    color: white;
}

.reset {
    background: #64748b;
    color: white;
}

/* Hover effects */
.btn:hover {
    transform: translateY(-2px);
    opacity: 0.9;
}

.btn:active {
    transform: scale(0.97);
}

/* Step input */
.hint {
    margin-top: 16px;
    font-size: 14px;
    color: #555;
}

input[type="number"] {
    width: 70px;
    padding: 6px 8px;
    margin-left: 6px;
    border-radius: 6px;
    border: 1px solid #ccc;
    text-align: center;
}
</style>