<template>
	<v-form 
		ref="form"
		@submit.prevent="onDenominationSubmit">
		<p class="text-subtitle-2 font-weight-light mt-1">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique.
		</p>

		<v-row no-gutters class="mb-2 d-flex align-center">
			<v-col cols="12" sm="6">
				<v-combobox 
					v-model="selectedPayment"
					:items="$onsite"
					item-text="or_number"
					label="Select Payment Official Receipt No."
					outlined 
					hide-details></v-combobox>
			</v-col>
			<v-col cols="12" sm="6" v-if="$selectedPayment" class="d-flex mt-2 mt-sm-0 justify-end">
				<v-menu 
					max-width="400">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							:disabled="!$selectedPayment.amount"
							large="" 
							color="primary" 
							v-bind="attrs" 
							v-on="on">
							<v-icon class="mr-2">mdi-information</v-icon> Preview Payment
						</v-btn>
					</template>
					<PreviewPaymentItem :item="$selectedPayment"></PreviewPaymentItem>
				</v-menu>
			</v-col>
		</v-row>

		<v-row no-gutters>
			<!-- Main form -->
			<v-col cols="12" sm="6">
			<h4 class="font-weight-medium text-body-1 mb-2 primary--text">
				Philippine Banknotes
			</h4>

			<v-row no-gutters>
				<v-col cols="12" class="d-flex align-center mb-2">
				<v-img max-width="128" src="@/assets/images/BSP_20.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['20']"
					class="pl-2 text-button"
					dense 
					outlined
					hide-details 
					label="Twenty-peso (₱ 20.00)" 
					placeholder="Quantity"
					prepend-inner-icon="mdi-cash"
					min="0"
					type="number"></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center mb-2">
				<v-img max-width="128" src="@/assets/images/BSP_50.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['50']"
					class="pl-2 text-button"
					dense 
					outlined 
					hide-details 
					label="Fifty-peso (₱ 50.00)" 
					placeholder="Quantity"
					prepend-inner-icon="mdi-cash"
					min="0"
					type="number"></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center mb-2">
				<v-img max-width="128" src="@/assets/images/BSP_100.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['100']"
					class="pl-2 text-button"
					dense 
					outlined 
					hide-details 
					label="One hundred-peso (₱ 100.00)" 
					placeholder="Quantity"
					prepend-inner-icon="mdi-cash"
					min="0"
					type="number"></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center mb-2">
				<v-img max-width="128" src="@/assets/images/BSP_200.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['200']"
					class="pl-2 text-button"
					dense 
					outlined 
					hide-details 
					label="Two hundred-peso (₱ 200.00)" 
					placeholder="Quantity"
					prepend-inner-icon="mdi-cash"
					min="0"
					type="number"></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center mb-2">
				<v-img max-width="128" src="@/assets/images/BSP_500.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['500']"
					class="pl-2 text-button"
					dense 
					outlined 
					hide-details 
					label="Five hundred-peso (₱ 500.00)" 
					placeholder="Quantity"
					prepend-inner-icon="mdi-cash"
					min="0"
					type="number"></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex align-center">
				<v-img max-width="128" src="@/assets/images/BSP_1000.png" class="float-left"></v-img>
				<v-text-field 
					v-model="denomination['1000']"
					class="pl-2 text-button"
					dense 
					outlined 
					hide-details 
					label="One thousand-peso (₱ 1,000.00)" 
					prepend-inner-icon="mdi-cash"
					placeholder="Quantity"
					min="0"
					type="number"></v-text-field>
				</v-col>
			</v-row>
			</v-col>
			<v-col cols="12" sm="6" class="pl-sm-3 d-flex flex-column">
				<h4 class="font-weight-medium text-body-1 mb-2 mt-2 mt-sm-0 primary--text">
					Philippine Coins
				</h4>

				<v-row no-gutters>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_1_CEN.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['0.01']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="One-centavo (₱ 0.01)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_5_CEN.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['0.05']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="Five-centavo (₱ 0.05)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_25_CEN.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['0.25']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="Twenty five-centavo (₱ 0.25)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_1.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['1']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="One-peso (₱ 1.00)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_5.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['5']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="Five-peso (₱ 5.00)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
					<v-col cols="12" class="d-flex align-center">
					<v-img max-width="48" src="@/assets/images/BSP_10.png" class="float-left"></v-img>
					<v-text-field 
						v-model="denomination['10']"
						class="pl-2 text-button"
						dense 
						outlined 
						hide-details 
						label="Ten-peso (₱ 10.00)" 
						prepend-inner-icon="mdi-cash" 
						placeholder="Quantity" 
						type="number" 
						min="0"></v-text-field>
					</v-col>
				</v-row>
			</v-col>

			<v-col cols="12" class="mt-2">
			<p class="text-subtitle-2 float-right font-weight-light mt-1">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat similique. {{ $totalDenominationAmount }}
			</p>
			</v-col>

			<v-col cols="12">
			<v-btn 
				:disabled="$selectedPayment.amount != $totalDenominationAmount"
				large
				depressed 
				color="primary" 
				type="submit" 
				class="float-right">
				<v-icon class="mr-1">mdi-pen</v-icon>
				Record Denomination
			</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';

import PreviewPaymentItem from '@/components/tax_payer/PreviewPaymentItem.vue';

import CashierServiceMixin from '@/services/cashier.service.ts';

@Component({
	components: {
		PreviewPaymentItem
	}
})
export default class DenominationRecorder extends Mixins(CashierServiceMixin) {
	public selectedPayment: _object | null = null;
	public denomination: _object = {
		"20": null,		"200": null,
		"50": null,		"500": null,
		"100": null,		"1000": null,

		"0.01": null,	"1": null,
		"0.05": null,	"5": null,
		"0.25": null,	"10": null
	};

	get $totalDenominationAmount() {
		let total = 0;

		for (const [ amount, quantity ] of Object.entries(this.denomination))
			total += parseFloat(amount)*(quantity ?? 0);

		return total;
	}

	get $selectedPayment() {
		return this.selectedPayment ?? {};
	}

	get $onsite() {
		return this.$cashier.payments?.filter((el: _object) => el.status === 'paid_onsite' && !el.denomination);
	}

	public async onDenominationSubmit() {
		const formdata = new FormData();

		formdata.set('payment_id', this.$selectedPayment.id);
		formdata.set('denomination', JSON.stringify(this.denomination));

		try {
			await this.storeDenomination(formdata);
			await this.getAllPayments();

			this.$store.commit('snackBar/toggle', {
				toggle: true,
				message: `Denomination for OR No. ${ this.$selectedPayment.or_number } has been added!`,
				color: 'success'
			});

			(this.$refs.form as any).reset();
		} catch(error) {
			console.log(error);
		}
	}


}
</script>

