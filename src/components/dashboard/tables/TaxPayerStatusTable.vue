<template>
  <v-card color="main" class="mx-auto" dark>
    <h4 class="pl-4 text-button font-weight-medium">Tax Payer Status</h4>
    <v-simple-table class="main">
      <template v-slot:default>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.type }}</td>
            <td>
              <button><i class="mdi mdi-folder"></i></button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TaxPayerStatusTable extends Vue {
  public readonly data = [
    {
      id: 1,
      name: "CJ Lignes",
      contact: "09123145122",
      address:
        "7th St., Bgy. 16 - Kawit-East Washington Drive (Pob.), City of Legazpi, Albay",
      type: "Professional Tax",
    },
    {
      id: 2,
      name: "CJ Lignes",
      contact: "09123145122",
      address:
        "7th St., Bgy. 16 - Kawit-East Washington Drive (Pob.), City of Legazpi, Albay",
      type: "Professional Tax",
    },
    {
      id: 3,
      name: "CJ Lignes",
      contact: "09123145122",
      address:
        "7th St., Bgy. 16 - Kawit-East Washington Drive (Pob.), City of Legazpi, Albay",
      type: "Professional Tax",
    },
    {
      id: 4,
      name: "CJ Lignes",
      contact: "09123145122",
      address:
        "7th St., Bgy. 16 - Kawit-East Washington Drive (Pob.), City of Legazpi, Albay",
      type: "Professional Tax",
    },
    {
      id: 5,
      name: "CJ Lignes",
      contact: "09123145122",
      address:
        "7th St., Bgy. 16 - Kawit-East Washington Drive (Pob.), City of Legazpi, Albay",
      type: "Professional Tax",
    },
  ];
}
</script>

<style lang="postcss" scoped></style>
