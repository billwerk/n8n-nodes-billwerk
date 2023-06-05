import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	customerDataFields,
	customerOperations,
	executeCustomerApi,
} from './resources/Customer';

import {
	contractOperations,
	executeContractApi,
} from './resources/Contract';

import {
	executeInvoiceApi,
	invoiceOperations,
} from './resources/Invoice';

import {
	executeMeteredUsageApi,
	meteredUsageOperations,
} from './resources/MeteredUsage';

import {
	executeOrderApi,
	orderDataFields,
	orderOperations,
} from './resources/Order';

import {
	executePaymentApi,
	paymentOperations,
} from './resources/Payment';

import {
	executeProductApi,
	productOperations,
} from './resources/Product';

import {
	executeReportApi,
	reportOperations,
} from './resources/Report';

import {
	accountingExportOperations,
	executeAccountingExportApi,
} from './resources/AccountingExport';

import {
	executeTokenApi,
	tokenOperations,
} from './resources/Token';

export class Billwerk implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Billwerk',
		name: 'billwerk',
		icon: 'file:billwerk.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate your subscription business with billwerk',
		defaults: {
			name: 'Billwerk',
		},

		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'billwerkApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Accounting Export',
						value: 'accountingExport',
					},
					{
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Metered Usage',
						value: 'meteredUsage',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Report',
						value: 'report',
					},
					{
						name: 'Token',
						value: 'token',
					},
				],
				default: 'contract',
			},

			...accountingExportOperations,

			...customerOperations,
			...customerDataFields,

			...contractOperations,

			...invoiceOperations,

			...meteredUsageOperations,

			...orderOperations,
			...orderDataFields,

			...paymentOperations,

			...productOperations,

			...reportOperations,

			...tokenOperations,

		],
	};




	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;
		const returnData: IDataObject[] = [];


		for (let i = 0; i < items.length; i++) {
			try{
				if (resource === 'accountingExport') {
					responseData = await executeAccountingExportApi.call(this, i, operation);
				} else if (resource === 'customer') {
					responseData = await executeCustomerApi.call(this, i, operation);
				} else if (resource === 'contract') {
					responseData = await executeContractApi.call(this, i, operation);
				} else if (resource === 'invoice') {
					responseData = await executeInvoiceApi.call(this, i, operation);
				} else if (resource === 'meteredUsage') {
					responseData = await executeMeteredUsageApi.call(this, i, operation);
				} else if (resource === 'order') {
					responseData = await executeOrderApi.call(this, i, operation);
				} else if (resource === 'payment') {
					responseData = await executePaymentApi.call(this, i, operation);
				} else if (resource === 'product') {
					responseData = await executeProductApi.call(this, i, operation);
				} else if (resource === 'report') {
					responseData = await executeReportApi.call(this, i, operation);
				} else if (resource === 'token') {
					responseData = await executeTokenApi.call(this, i, operation);
				}
				Array.isArray(responseData)
				? returnData.push(...responseData)
				: returnData.push(responseData);

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
