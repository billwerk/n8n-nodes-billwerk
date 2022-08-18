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

import {
	customerDataOptions,
} from './Customer';


export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a pending order (only available with Order Approval feature)',
				action: 'Approve an order',
			},
			{
				name: 'Commit',
				value: 'commit',
				description: 'Process and finalize an order',
				action: 'Commit an order',
			},
			{
				name: 'Decline',
				value: 'decline',
				description: 'Decline a pending order (only available with Order Approval feature)',
				action: 'Decline an order',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an order',
				action: 'Delete an order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve information about a single order',
				action: 'Get an order',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve a list of orders',
				action: 'Get all orders',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'order',
				],
			},
		},
	},

	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		description: 'Search orders by First Name, Last Name, Company Name, Email Address, Customer ID, and Debtor Account',
		displayOptions: {
			show: {
				resource: [
					'order',
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
				name: 'Aborted',
				value: 'Aborted',
			},
			{
				name: 'ApprovalPending',
				value: 'ApprovalPending',
			},
			{
				name: 'Approved',
				value: 'Approved',
			},
			{
				name: 'Completed',
				value: 'Completed',
			},
			{
				name: 'Declined',
				value: 'Declined',
			},
			{
				name: 'Expired',
				value: 'Expired',
			},
			{
				name: 'Failed',
				value: 'Failed',
			},
			{
				name: 'Incomplete',
				value: 'Incomplete',
			},
			{
				name: 'InProgress',
				value: 'InProgress',
			},
			{
				name: 'PaymentPending',
				value: 'PaymentPending',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'order',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: '',
		options: [
			{
				name: '',
				value: '',
				description: 'All',
			},
			{
				name: 'Signup',
				value: 'Signup',
			},
			{
				name: 'Upgrade',
				value: 'Upgrade',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'order',
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
		description: 'Searches documents with creation date equal or younger specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'order',
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
		description: 'Searches documents with creation date equal or older than specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'order',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
		description: 'Pagination: ID of first orders to return',
		displayOptions: {
			show: {
				resource: [
					'order',
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
					'order',
				],
				operation: [
					'getAll',
				],
			},
		},
	},


	{
		displayName: 'Order ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'order',
				],
				operation: [
					'get', 'delete', 'approve', 'commit', 'decline',
				],
			},
		},
	},
];


export const orderDataFields: INodeProperties[] = [
	{
		displayName: 'Order Data',
		name: 'orderData',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		required: true,
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start date of the subscription',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End date of the subscription',
			},
			{
				displayName: 'Billed Until',
				name: 'billedUntil',
				type: 'string',
				default: '',
				description: 'Until when the subscription has been paid',
			},
			{
				displayName: 'Change Date',
				name: 'changeDate',
				type: 'string',
				default: '',
				description: 'Change date for the up-/downgrade',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'ID of the customer (billwerk ID)',
			},
			{
				displayName: 'Contract ID',
				name: 'contractID',
				type: 'string',
				default: '',
				description: 'ID of the contract',
			},

			{
				displayName: 'Customer',
				name: 'customer',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				required: true,
				options: customerDataOptions,
			},

			{
				displayName: 'Custom Fields',
				name: 'CustomFields',
				placeholder: 'Add Custom field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'CustomField',
						values: [
							{
								displayName: 'Field Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'API Name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					'order',
				],
				operation: [
					'create',
				],
			},
		},
	},
];

export async function executeOrderApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'get') {
		// *********************************************************
		//       order : get
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/orders/${id}`;
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});

	} else if (operation === 'getAll') {
		// *********************************************************
		//       order : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.search = this.getNodeParameter('search', itemIndex) || null;
		qs.status = this.getNodeParameter('status', itemIndex);
		qs.type = this.getNodeParameter('type', itemIndex);
		qs.dateFrom = this.getNodeParameter('dateFrom', itemIndex);
		qs.dateTo = this.getNodeParameter('dateTo', itemIndex);
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		const endpoint = '/api/v1/orders';
		return await billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	} else if (operation === 'delete') {
		// *********************************************************
		//       order : delete
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/orders/${id}`;
		await billwerkApiRequest.call(this, 'DELETE', endpoint, {}, {});
		return { success: true };

	} else if (operation === 'commit') {
		// *********************************************************
		//       order : commit
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/orders/${id}/commit`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});

	} else if (operation === 'approve') {
		// *********************************************************
		//       order : approve
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/orders/${id}/approve`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});

	} else if (operation === 'decline') {
		// *********************************************************
		//       order : decline
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/orders/${id}/decline`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});
	}

}
