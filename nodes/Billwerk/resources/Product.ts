import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeProperties,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
} from '../GenericFunctions';


export const productOperations: INodeProperties[] = [
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
				description: 'Retrieves all product info (plan groups, plans, components, discounts, coupons, tax policies)',
				action: 'Get all products',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'product',
				],
			},
		},
	},

];

export async function executeProductApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'getAll') {
		// *********************************************************
		//       product : getAll
		// *********************************************************
		const endpoint = '/api/v1/productInfo';
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});
	}

}
