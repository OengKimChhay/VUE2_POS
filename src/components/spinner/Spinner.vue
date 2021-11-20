<template>
  <div v-if="active" class="loader-wrapper">
    <div>
        <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
        <p>{{ text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Spinner',
  props: {
    active: Boolean,
    text: String
  }
}
</script>
<style scoped>
  p {
    font-size: 1em;
    font-weight: 600;
    margin-top: 5px;
    letter-spacing: 1px;
    color: rgb(85, 85, 85);
    text-align: center;
  }
  .loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffffa8;
    width: 100%;
    z-index: 2000;
    height: 100vh;
  }
  .loader {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .loader div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #2178af;
    border-radius: 50%;
    animation: loader 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #2178af transparent transparent transparent;
  }
  .loader div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .loader div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .loader div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
