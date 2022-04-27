<template>
  <div>
    <vue-particles
      color="#409EFF"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#555"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="particles"
    />
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Particles'
}
</script>

<style scoped>
.particles {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
