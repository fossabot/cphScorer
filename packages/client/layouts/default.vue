<template>
  <div class="main">
    <Navbar />
    <Nuxt />
  </div>
</template>

<style>
  html {
    background-color: var(--darkest);
  }

  .main {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 58px 1fr;
    min-height: 100vh;
  }
</style>