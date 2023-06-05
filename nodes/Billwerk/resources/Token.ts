import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getAccessToken,
} from '../GenericFunctions';


export const tokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAccessToken',
		options: [
			{
				name: 'Get Access Token',
				value: 'getAccessToken',
				description: 'Returns only the authentication token, to be used with standard HTTP requests',
				action: 'Get the access token',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'token',
				],
			},
		},
	},
];

export async function executeTokenApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	const nodeData = this.getWorkflowStaticData('node');

	if(nodeData.token === undefined || nodeData.token === ""){
		nodeData.token = await getAccessToken.call(this);
	}

	return {access_token: nodeData.token};

}
