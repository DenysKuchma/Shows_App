<template>
  <v-card class="pa-5 card">
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formData.name"
        :label="$t('name')"
        data-vv-name="name"
        v-validate="'required|min:2'"
        outlined
        dense
      ></v-text-field>
      <span>{{ errors.first("name") }}</span>
      <v-text-field
        v-model="formData.email"
        v-validate="'required|email'"
        data-vv-name="email"
        :label="$t('email')"
        outlined
        dense
        type="email"
      ></v-text-field>
      <span>{{ errors.first("email") }}</span>
      <v-select
        v-model="formData.genres"
        :items="genreNames"
        :label="$t('geners')"
        outlined
        dense
        multiple
        data-vv-name="genres"
        v-validate="'required|min:1'"
      ></v-select>
      <span>{{ errors.first("genres") }}</span>
      <v-textarea
        v-model="formData.message"
        :label="$t('messageForm')"
        outlined
        dense
        data-vv-name="message"
      ></v-textarea>
      <v-radio-group
        v-model="formData.newsPreference"
        data-vv-name="choise"
        v-validate="'required'"
      >
        <v-radio
          :label="$t('acceptNews')"
          value="Send me another news"
        ></v-radio>
        <v-radio
          :label="$t('dismissNews')"
          value="Don`t send me another news"
        ></v-radio>
      </v-radio-group>
      <span>{{ errors.first("choise") }}</span>
      <v-checkbox
        v-model="formData.agreeProcessing"
        :label="$t('formCheckbox')"
        data-vv-name="checkbox"
        v-validate="'required'"
        @change="handleCheckboxChange"
      ></v-checkbox>
      <span>{{ errors.first("checkbox") }}</span>
      <v-btn
        type="submit"
        color="primary"
        :disabled="errors.any() || !formData.agreeProcessing"
        >{{ $t("buttonSubmit") }}</v-btn
      ></v-form
    >
    <ModalPopupForm
      :dialog="dialog"
      :formData="formData"
      @close="dialog = false"
      @confirm="submitForm"
    />
  </v-card>
</template>

<script>
import { getAllGenres } from "../../api/getGenres";
import ModalPopupForm from "@/components/ModalPopupForm/ModalPopupForm.vue";
export default {
  name: "SubscribeForm",
  components: {
    ModalPopupForm,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
        genres: [],
        newsPreference: "",
        agreeProcessing: false,
      },
      genreNames: [],
      dialog: false,
    };
  },
  async created() {
    await this.getAllGenres();
  },
  methods: {
    async getAllGenres() {
      const genres = await getAllGenres.getShowsGenres();
      this.genreNames = genres.map((genre) => genre.name);
    },
    handleSubmit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.dialog = true;
        }
      });
    },
    async submitForm() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$validator.reset();
      this.$toast.success(this.$t("formSubmittedSuccessfully"), {
        timeout: 3000,
      });
    },
    handleCheckboxChange(newValue) {
      if (newValue) {
        this.formData.agreeProcessing = true;
      }
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
span {
  display: block;
  width: 100%;
  text-align: left;
  margin-top: -12px;
  margin-bottom: 7px;
  color: red;
  font-weight: 500;
}
</style>
<style>
.v-list--dense .v-list-item .v-list-item__title {
  font-size: 16px !important;
}
</style>
