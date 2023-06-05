import {
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
	//handleGetAll,
	//loadResource,
} from './GenericFunctions';

export class BillwerkTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Billwerk Trigger',
		name: 'billwerkTrigger',
		icon: 'file:billwerk.svg',
		group: ['trigger'],
		version: 1,
		subtitle: 'Webhooks from billwerk',
		description: 'Receive updates about your subscription business with billwerk',
		defaults: {
			name: 'Billwerk Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'billwerkApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Accounting Export File Created',
						value: 'AccountingExportFileCreated',
						description: 'On successful accounting export file creation',
					},
					{
						name: 'Automatic Downgrade Insufficient Balance',
						value: 'AutomaticDowngradeInsufficientBalance',
						description: 'When a contract gets downgraded due to insufficient balance',
					},
					{
						name: 'Component Changed',
						value: 'ComponentChanged',
						description: 'On change of component',
					},
					{
						name: 'Component Created',
						value: 'ComponentCreated',
						description: 'On successful component creation',
					},
					{
						name: 'Component Deleted',
						value: 'ComponentDeleted',
						description: 'On delete of component',
					},
					{
						name: 'Contract Cancelled',
						value: 'ContractCancelled',
						description: 'When a notice of cancellation has been handed in',
					},
					{
						name: 'Contract Changed',
						value: 'ContractChanged',
						description: 'On entering a new contract phase',
					},
					{
						name: 'Contract Created',
						value: 'ContractCreated',
						description: 'On successful contract creation',
					},
					{
						name: 'Contract Data Changed',
						value: 'ContractDataChanged',
						description: 'When contract data was modified (CustomFields, ExternalId, etc.)',
					},
					{
						name: 'Contract Deleted',
						value: 'ContractDeleted',
						description: 'On delete of contract data',
					},
					{
						name: 'Customer Changed',
						value: 'CustomerChanged',
						description: 'On change of customer data',
					},
					{
						name: 'Customer Created',
						value: 'CustomerCreated',
						description: 'On successful customer creation',
					},
					{
						name: 'Customer Deleted',
						value: 'CustomerDeleted',
						description: 'On delete of customer data',
					},
					{
						name: 'Customer Locked',
						value: 'CustomerLocked',
						description: 'When customer has been locked',
					},
					{
						name: 'Customer Unlocked',
						value: 'CustomerUnlocked',
						description: 'When customer has been unlocked',
					},
					{
						name: 'Debit Auth Cancelled',
						value: 'DebitAuthCancelled',
						description: 'When a customer withdraws debit authorization through the PSP',
					},
					{
						name: 'Dunning Created',
						value: 'DunningCreated',
						description: 'When a dunning pdf was created and sent',
					},
					{
						name: 'Insufficient Balance For Next Billing',
						value: 'InsufficientBalanceForNextBilling',
						description: 'When the current billing is done, but for the next billing there is insufficient credit',
					},
					{
						name: 'Invoice Corrected',
						value: 'InvoiceCorrected',
						description: 'When an invoice or credit note pdf was corrected',
					},
					{
						name: 'Invoice Created',
						value: 'InvoiceCreated',
						description: 'When an invoice or credit note pdf was created and sent',
					},
					{
						name: 'Order Succeeded',
						value: 'OrderSucceeded',
						description: 'When an order has been committed successfully',
					},
					{
						name: 'Payment Bearer Expired',
						value: 'PaymentBearerExpired',
						description: 'When a payment bearer (for example credit card) is expired',
					},
					{
						name: 'Payment Bearer Expiring',
						value: 'PaymentBearerExpiring',
						description: 'When a payment bearer (for example credit card) is valid only for one more month',
					},
					{
						name: 'Payment Data Changed',
						value: 'PaymentDataChanged',
						description: 'When payment data is changed for an existing contract',
					},
					{
						name: 'Payment Escalated',
						value: 'PaymentEscalated',
						description: 'On reaching a new escalation level as defined in payment escalation',
					},
					{
						name: 'Payment Escalation Reset',
						value: 'PaymentEscalationReset',
						description: 'When the escalation process is reset for a specific contract (for example due to payment)',
					},
					{
						name: 'Payment Failed',
						value: 'PaymentFailed',
						description: 'On payment errors',
					},
					{
						name: 'Payment Process Status Changed',
						value: 'PaymentProcessStatusChanged',
						description: 'When payment process of contract is started / stopped',
					},
					{
						name: 'Payment Registered',
						value: 'PaymentRegistered',
						description: 'On manual payment registrations',
					},
					{
						name: 'Payment Succeeded',
						value: 'PaymentSucceeded',
						description: 'On successful payment',
					},
					{
						name: 'Payments Export File Created',
						value: 'PaymentsExportFileCreated',
						description: 'On successful payments export file creation',
					},
					{
						name: 'Plan Changed',
						value: 'PlanChanged',
						description: 'On change of plan',
					},
					{
						name: 'Plan Created',
						value: 'PlanCreated',
						description: 'On successful plan creation',
					},
					{
						name: 'Plan Deleted',
						value: 'PlanDeleted',
						description: 'On delete of plan',
					},
					{
						name: 'Plan Variant Changed',
						value: 'PlanVariantChanged',
						description: 'On change of plan variant',
					},
					{
						name: 'Plan Variant Created',
						value: 'PlanVariantCreated ',
						description: 'On successful plan variant creation',
					},
					{
						name: 'Plan Variant Deleted',
						value: 'PlanVariantDeleted',
						description: 'On delete of plan variant',
					},
					{
						name: 'Recurring Billing Approaching',
						value: 'RecurringBillingApproaching',
						description: 'When a contract passed its next billing period and billing delay period started to pass metered usage',
					},
					{
						name: 'Report Failed',
						value: 'ReportFailed',
						description: 'On failed report creation',
					},
					{
						name: 'Report Succeeded',
						value: 'ReportSucceeded',
						description: 'On successful report creation',
					},
					{
						name: 'Trial End Approaching',
						value: 'TrialEndApproaching',
						description: 'When the trial phase of a contract is about to end (period can be configured in each plan)',
					},
				],
			},
		],
	};


	// @ts-ignore
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');

				const endpoint = `/api/v1/webhooks/`;

				const billwerkWebhooks = await billwerkApiRequest.call(this, 'GET',  endpoint, {}, {});

				for (const billwerkWebhook of billwerkWebhooks) {
					if (billwerkWebhook.Url === webhookUrl /*&& webhook.event === snakeCase(event)*/) {
						webhookData.webhookId = billwerkWebhook.Id;
						return true;
					}
				}
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events', []);

				const endpoint = `/api/v1/webhooks/`;


				const body: IDataObject = {
					events: events as string[],
					url: webhookUrl,
				};

				const webhook = await billwerkApiRequest.call(this, 'POST',  endpoint, {}, body);
				webhookData.webhookId = webhook.Id;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {

				const webhookData = this.getWorkflowStaticData('node');
				try {
					const endpoint = `/api/v1/webhooks/${webhookData.webhookId}`;

					await billwerkApiRequest.call(this, 'DELETE',  endpoint, {}, {});
				} catch (error) {
					return false;
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};




	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const bodyData = this.getBodyData() as IDataObject;

		const eventType = bodyData.Event as string | undefined;

		const activatedEvents = this.getNodeParameter('events', []) as string[];

		if (eventType === undefined || !activatedEvents.includes('all') && !activatedEvents.includes(eventType)) {
			return {};
		}

		return {
			workflowData: [
					this.helpers.returnJsonArray(req.body),
			],
		};
	}


}
