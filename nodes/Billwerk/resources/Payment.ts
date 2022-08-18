import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
} from '../GenericFunctions';


export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve list of payments',
				action: 'Get all payments',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single payment',
				action: 'Get a payment',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Register a payment/refund/chargeback received outside billwerk (bank transfer, cash...)',
				action: 'Create a payment',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
			},
		},
	},
	{
		displayName: 'Payment Transaction ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'get',
				],
			},
		},
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
		description: 'Pagination: ID of first payment to return',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Take',
		name: 'take',
		type: 'number',
		default: 20,
		description: 'Pagination: Limit returned items (500 max.)',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		description: 'Search payments by Transaction ID, Provider Transaction ID, Customer Name or Contract ID',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},



	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: '',
		options: [
			{
				name: '',
				value: '',
				description: 'All',
			},
			{
				name: 'Canceled',
				value: 'Canceled',
			},
			{
				name: 'Chargeback',
				value: 'Chargeback',
			},
			{
				name: 'Created',
				value: 'Created',
			},
			{
				name: 'Failed',
				value: 'Failed',
			},
			{
				name: 'Finalizing',
				value: 'Finalizing',
			},
			{
				name: 'InDispute',
				value: 'InDispute',
			},
			{
				name: 'InProgress',
				value: 'InProgress',
			},
			{
				name: 'OverPaid',
				value: 'OverPaid',
			},
			{
				name: 'PartialChargeback',
				value: 'PartialChargeback',
			},
			{
				name: 'PartiallyPaid',
				value: 'PartiallyPaid',
			},
			{
				name: 'PartiallyRefunded',
				value: 'PartiallyRefunded',
			},
			{
				name: 'Pending',
				value: 'Pending',
			},
			{
				name: 'PreliminarySucceeded',
				value: 'PreliminarySucceeded',
			},
			{
				name: 'Prepared',
				value: 'Prepared',
			},
			{
				name: 'RedirectUrlPrepared',
				value: 'RedirectUrlPrepared',
			},
			{
				name: 'Refunded',
				value: 'Refunded',
			},
			{
				name: 'Scheduled',
				value: 'Scheduled',
			},
			{
				name: 'Succeeded',
				value: 'Succeeded',
			},
			{
				name: 'SuccessfullyImported',
				value: 'SuccessfullyImported',
			},
			{
				name: 'ThreeDSecurePending',
				value: 'ThreeDSecurePending',
			},
			{
				name: 'Undefined',
				value: 'Undefined',
			},
			{
				name: 'Unmapped',
				value: 'Unmapped',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},

	{
		displayName: 'Date From',
		name: 'dateFrom',
		type: 'dateTime',
		default: '',
		description: 'Searches payment transactions with creation date equal or younger specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Date To',
		name: 'dateTo',
		type: 'dateTime',
		default: '',
		description: 'Searches payment transactions with creation date equal or older than specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'getAll',
				],
			},
		},
	},


	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create',
				],
			},
		},
	},


	{
		displayName: 'Amount',
		name: 'paymentAmount',
		type: 'number',
		default: '',
		required: true,
		description: 'Amount received (positive amount) or refund/chargeback amount (negative amount)',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Currency',
		name: 'paymentCurrency',
		type: 'string',
		default: 'EUR',
		required: true,
		description: 'Currency in ISO format (EUR, CHF, GBP...)',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'paymentDescription',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create',
				],
			},
		},
	},
	/*{
		displayName: 'Disable recurring payments',
		name: 'recurringPaymentsOff',
		type: 'string',
		default: '',
		description: '',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create'
				],
			},
		},
	},*/
	{
		displayName: 'Booking Date',
		name: 'paymentBookingDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'payment',
				],
				operation: [
					'create',
				],
			},
		},
	},
];



export async function executePaymentApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'get') {
		// *********************************************************
		//       payment : get
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/paymentTransactions/${id}`;
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});

	} else if (operation === 'getAll') {
		// *********************************************************
		//       payment : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.search = this.getNodeParameter('search', itemIndex) || null;
		qs.status = this.getNodeParameter('status', itemIndex);
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		qs.dateFrom = this.getNodeParameter('dateFrom', itemIndex);
		qs.dateTo = this.getNodeParameter('dateTo', itemIndex);
		const endpoint = '/api/v1/paymentTransactions';
		return await billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	} else if (operation === 'create') {
		// *********************************************************
		//       payment : create
		// *********************************************************
		const body = {} as IDataObject;
		body.amount = this.getNodeParameter('paymentAmount', itemIndex);
		body.currency = this.getNodeParameter('paymentCurrency', itemIndex);
		body.description = this.getNodeParameter('paymentDescription', itemIndex);
		//body.recurringPaymentsOff = false; //this.getNodeParameter('recurringPaymentsOff', itemIndex) || null;
		const bookingDateString = this.getNodeParameter('paymentBookingDate', itemIndex) as string;
		body.bookingDate = bookingDateString.substring(0,10); //we need only the date, not dateTime
		const contractId = this.getNodeParameter('contractId', itemIndex);
		const endpoint = `/api/v1/contracts/${contractId}/payment`;
		await billwerkApiRequest.call(this, 'POST', endpoint, {}, body);
		return { success: true };
	}
}
