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


export const invoiceOperations: INodeProperties[] = [
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
				description: 'Retrieve list of invoices',
				action: 'Get all invoices',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve information about a single invoice',
				action: 'Get an invoice',
			},
			{
				name: 'Get Download Link',
				value: 'downloadLink',
				description: 'Creates a file download token for the given invoice',
				action: 'Get download link an invoice',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
			},
		},
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'invoice',
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
		description: 'Search invoice by Document Number or by the customer’s last name, first name or company name',
		displayOptions: {
			show: {
				resource: [
					'invoice',
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
					'invoice',
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
					'invoice',
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
		description: 'Pagination: ID of first invoices to return',
		displayOptions: {
			show: {
				resource: [
					'invoice',
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
					'invoice',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Invoice ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
				operation: [
					'get', 'downloadLink',
				],
			},
		},
	},
];


export async function executeInvoiceApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'get') {
		// *********************************************************
		//       invoice : get
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/invoices/${id}`;
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});

	} else if (operation === 'getAll') {
		// *********************************************************
		//       invoice : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.search = this.getNodeParameter('search', itemIndex) || null;
		qs.customerId = this.getNodeParameter('customerId', itemIndex);
		qs.dateFrom = this.getNodeParameter('dateFrom', itemIndex);
		qs.dateTo = this.getNodeParameter('dateTo', itemIndex);
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		const endpoint = '/api/v1/invoices';
		return await billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	} else if (operation === 'downloadLink') {
		// *********************************************************
		//       invoice : downloadLink
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/invoices/${id}/downloadLink`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});
	}

}
