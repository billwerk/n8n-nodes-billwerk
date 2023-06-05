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


export const contractOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		options: [
			{
				name: 'Annul',
				value: 'annul',
				description: 'Annul a specific contract (reverts all invoices previously created)',
				action: 'Annul a contract',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a contract',
			},
			{
				name: 'End',
				value: 'end',
				description: 'Set the end for the contract',
				action: 'End a contract',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single contract',
				action: 'Get a contract',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve list of contracts',
				action: 'Get all contracts',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'contract',
				],
			},
		},
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'Search for a contract by External ID',
		displayOptions: {
			show: {
				resource: [
					'contract',
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
		description: 'Pagination: ID of first contract to return',
		displayOptions: {
			show: {
				resource: [
					'contract',
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
					'contract',
				],
				operation: [
					'getAll',
				],
			},
		},
	},

	{
		displayName: 'Contract ID',
		name: 'Id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'contract',
				],
				operation: [
					'get', 'delete', 'annul', 'end',
				],
			},
		},
	},

	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		default: '',
		description: 'Date when contract should be cancelled',
		displayOptions: {
			show: {
				resource: [
					'contract',
				],
				operation: [
					'end',
				],
			},
		},
	},
];




export interface CustomField {
	name: string;
	value: string;
}


export async function executeContractApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'get') {
		// *********************************************************
		//       contract : get
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/contracts/${id}`;
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});

	} else if (operation === 'delete') {
		// *********************************************************
		//       contract : delete
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/contracts/${id}`;
		await billwerkApiRequest.call(this, 'DELETE', endpoint, {}, {});
		return { success: true };

	} else if (operation === 'getAll') {
		// *********************************************************
		//       contract : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.externalId = this.getNodeParameter('externalId', itemIndex);
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		const endpoint = '/api/v1/contracts';
		return await billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	}	else if (operation === 'end') {
		// *********************************************************
		//       contract : end
		// *********************************************************

		const body = {} as IDataObject;
		body.endDate = this.getNodeParameter('endDate', itemIndex);
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/contracts/${id}/end`;
		await billwerkApiRequest.call(this, 'POST', endpoint, {}, body);
		return { success: true };

	} else if (operation === 'annul') {
		// *********************************************************
		//       contract : annul
		// *********************************************************

		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/contracts/${id}/annulate`;
		await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});
		return { success: true };

	}
}
