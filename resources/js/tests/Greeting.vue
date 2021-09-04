<template>
  <div>
    {{ Greeting }}
  </div>
</template>

<script>
export default {
  name: "Greeting",

  data() {
    return {
      Greeting: "Vue and TDD"
    }
  }
}
</script>
  