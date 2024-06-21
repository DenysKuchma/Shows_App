<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card class="pa-5 card">
          <h1 class="mb-5">{{ $t("permissionTitle") }}</h1>
        </v-card>
        <v-card class="pa-5 card">
          <v-row align="center" justify="end" class="mb-4">
            <v-btn @click="toggleAllPermissions" class="primary">
              {{ permissionButtonText }}
            </v-btn>
          </v-row>
          <v-data-table
            :headers="localizedHeaders"
            :items="permissions"
            item-key="name"
          >
            <template v-slot:[`item.permissionState`]="{ item }">
              <td>
                <v-checkbox
                  v-model="item.permissionState"
                  hide-details
                ></v-checkbox>
              </td>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <td>{{ permissionNames[item.name] }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "PermissionPage",
  data() {
    return {
      permissions: [],
      permissionNames: {
        changeLangState: this.$t("changeLangState"),
        changeThemeState: this.$t("changeThemeState"),
        sendFormState: this.$t("sendFormState"),
        addToWatchedState: this.$t("addToWatchedState"),
        addToWatchlistState: this.$t("addToWatchlistState"),
      },
    };
  },
  computed: {
    ...mapGetters(["GET_PERMISSION_STATE"]),
    allPermissionsEnabled() {
      return this.permissions.every((permission) => permission.permissionState);
    },
    permissionButtonText() {
      return this.allPermissionsEnabled
        ? this.$t("permissionBtnOff")
        : this.$t("permissionBtnOn");
    },
    localizedHeaders() {
      return [
        {
          text: this.$t("permissionText"),
          align: "start",
          value: "name",
          sortable: false,
        },
        {
          text: this.$t("permissionTextTwo"),
          value: "permissionState",
          align: "start",
          sortable: false,
        },
      ];
    },
  },
  methods: {
    ...mapMutations(["SET_TO_PERMISSION_STATE"]),
    toggleAllPermissions() {
      const newState = !this.allPermissionsEnabled;
      this.permissions.forEach((permission) => {
        permission.permissionState = newState;
      });
      const updatedPermissions = {};
      this.permissions.forEach((permission) => {
        updatedPermissions[permission.name] = permission.permissionState;
      });
      this.SET_TO_PERMISSION_STATE(updatedPermissions);
    },
  },
  mounted() {
    const permissionState = this.GET_PERMISSION_STATE;
    if (permissionState) {
      this.permissions = Object.keys(permissionState).map((permission) => ({
        name: permission,
        permissionState: permissionState[permission],
        displayName: this.permissionNames[permission],
      }));
    }
  },
  watch: {
    permissions: {
      deep: true,
      handler(newPermissions) {
        const updatedPermissions = {};
        newPermissions.forEach((permission) => {
          updatedPermissions[permission.name] = permission.permissionState;
        });
        this.SET_TO_PERMISSION_STATE(updatedPermissions);
      },
    },
  },
};
</script>

<style scoped>
.v-input--selection-controls {
  margin-top: 0 !important;
}
</style>
