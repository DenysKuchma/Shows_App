<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card class="pa-5 card">
          <h1 class="mb-5">{{ $t("subscribeTitle") }}</h1>
          <SubscribeForm />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SubscribeForm from "../../components/SubscribeForm/SubscribeForm.vue";

export default {
  name: "SubscribeNewsPage",
  components: {
    SubscribeForm,
  },
};
</script>
