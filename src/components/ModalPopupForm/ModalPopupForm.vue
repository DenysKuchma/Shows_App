<template>
  <v-dialog v-model="internalDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">{{
        $t("formModalHeadline")
      }}</v-card-title>
      <v-card-text>
        <h3 class="mb-3">{{ $t("formModalTitle") }}</h3>
        <div>
          <strong>{{ $t("name") }}:</strong> {{ formData.name }}
        </div>
        <div>
          <strong>{{ $t("email") }}:</strong> {{ formData.email }}
        </div>
        <div>
          <strong>{{ $t("geners") }}:</strong>
          {{ formData.genres.join(", ") }}
        </div>
        <div v-if="formData.message">
          <strong>{{ $t("messageForm") }}:</strong> {{ formData.message }}
        </div>
        <div>
          <strong>{{ $t("date") }}:</strong> {{ formatDate }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="confirm">{{ $t("confirm") }}</v-btn>
        <v-btn color="error" @click="close">{{ $t("cancel") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalPopupForm",
  props: {
    dialog: Boolean,
    formData: Object,
  },
  data() {
    return {
      internalDialog: this.dialog,
    };
  },
  computed: {
    formatDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
  watch: {
    dialog(newVal) {
      this.internalDialog = newVal;
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.v-card__text {
  text-align: left !important;
}
</style>
