import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeProperties,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
} from '../GenericFunctions';


export const meteredUsageOperations: INodeProperties[] = [
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
				description: 'Retrieve list of metered usages of a contract',
				action: 'Get all metered usages',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Add new metered usage data to a contract',
				action: 'Create a metered usage',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Remove an unbilled metered usage',
				action: 'Delete a metered usage',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
			},
		},
	},
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'create', 'getAll', 'delete',
				],
			},
		},
	},
	{
		displayName: 'Usage ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'delete',
				],
			},
		},
	},


	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
		description: 'Pagination: ID of first usage to return',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
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
					'meteredUsage',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Date From',
		name: 'fromDateTime',
		type: 'dateTime',
		default: '',
		description: 'Searches metered usages with creation date equal or younger specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Date To',
		name: 'untilDateTime',
		type: 'dateTime',
		default: '',
		description: 'Searches metered usages with creation date equal or older than specified timestamp, optional',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'getAll',
				],
			},
		},
	},

	{
		displayName: 'Component ID',
		name: 'componentId',
		type: 'string',
		default: '',
		description: 'Billwerk ID of the metered usage component',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: '',
		description: 'Quantity to book',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Memo',
		name: 'memo',
		type: 'string',
		default: '',
		description: 'Optional short description associated with the usage',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		description: 'Date when the metered usage is due',
		displayOptions: {
			show: {
				resource: [
					'meteredUsage',
				],
				operation: [
					'create',
				],
			},
		},
	},
];



export async function executeMeteredUsageApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'getAll') {
		// *********************************************************
		//       meteredUsage : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		qs.fromDateTime = this.getNodeParameter('fromDateTime', itemIndex);
		qs.untilDateTime = this.getNodeParameter('untilDateTime', itemIndex);
		const contractId = this.getNodeParameter('contractId', itemIndex);
		const endpoint = `/api/v1/contracts/${contractId}/usage`;
		return billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	} else if (operation === 'create') {
		// *********************************************************
		//       meteredUsage : create
		// *********************************************************
		const body = {} as IDataObject;
		body.componentId = this.getNodeParameter('componentId', itemIndex);
		body.quantity = this.getNodeParameter('quantity', itemIndex);
		body.memo = this.getNodeParameter('memo', itemIndex);
		body.dueDate = this.getNodeParameter('dueDate', itemIndex) || null;
		const contractId = this.getNodeParameter('contractId', itemIndex);
		const endpoint = `/api/v1/contracts/${contractId}/usage`;
		await billwerkApiRequest.call(this, 'POST', endpoint, {}, body);
		return { success: true };

	} else if (operation === 'delete') {
		// *********************************************************
		//       meteredUsage : delete
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const contractId = this.getNodeParameter('contractId', itemIndex);
		const endpoint = `/api/v1/contracts/${contractId}/usage/${id}`;
		await billwerkApiRequest.call(this, 'DELETE', endpoint, {}, {});
		return { success: true };
	}
}
