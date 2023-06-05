import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeProperties,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
} from '../GenericFunctions';


export const reportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'downloadLink',
		options: [
			{
				name: 'Get Download Link',
				value: 'downloadLink',
				description: 'Creates a file download token for the given report',
				action: 'Get download link a report',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'report',
				],
			},
		},
	},
	{
		displayName: 'Report ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'report',
				],
				operation: [
					'downloadLink',
				],
			},
		},
	},
];

export async function executeReportApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'downloadLink') {
		// *********************************************************
		//       report : downloadLink
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/reports/${id}/downloadLink`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});
	}

}
