---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "SparkHome"
  text: "The final browser homepage."
  tagline: Everything you want, in a magic searchbox.
  actions:
    - theme: brand
      text: Get started
      link: /intro
    - theme: alt
      text: Doc
      link: /ref
---

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
const { isDark } = useData();
const dark = ref(isDark);
</script>

# Why SparkHome?

## Simple UI

SparkHome's intuitive design creates a seamless user experience, allowing you to effortlessly access all the information and resources you need from one place. The sleek and modern interface features a simple search box that becomes your one-stop place for navigating the web, getting answers to questions, and leveling up your productivity with our powerful toolbox.

<img src="./img/homepage.dark.png" v-if="isDark">
<img src="./img/homepage.png" v-else>
