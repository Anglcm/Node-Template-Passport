<template>
  <v-app>
    <v-app-bar
        v-if="$route.path != '/login'"
        class="app-bar"
        prominent
        density="compact"
      >
        <v-app-bar-nav-icon @click="navigationBtn()"></v-app-bar-nav-icon>

        <v-toolbar-title>SPA Passport Template</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-if="$route.path != '/login'"
        v-model="drawer"
      >
        <v-list>
          <v-list-item
            v-for="item in navigationItems"
            :key="item.value"
            link
          >
            <v-list-item-icon>
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link :to="item.to" class="router-link">
                {{ item.title }}
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>


</template>

<script setup>

  import { ref } from 'vue';

  
  //Data:
  const drawer = ref(false);
  const navigationItems = ref([
    {
      title: 'Home',
      value: 'home',
      to: '/',
      icon: 'mdi-home-circle-outline'
    }
  ]);

  //Methods:
  const navigationBtn = () => {
    drawer.value = !drawer.value;
  }

</script>

<style scoped>
.v-list-item {
  background: #e8e7ee !important;
}
.router-link {
  text-decoration: none;
  color: black;
}
</style>


