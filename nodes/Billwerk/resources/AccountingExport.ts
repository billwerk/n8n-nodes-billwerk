import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeProperties,
} from 'n8n-workflow';

import {
	billwerkApiRequest,
} from '../GenericFunctions';


export const accountingExportOperations: INodeProperties[] = [
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
				description: 'Creates a file download token for the given accounting export',
				action: 'Get download link an accounting export',
			},

		],
		displayOptions: {
			show: {
				resource: [
					'accountingExport',
				],
			},
		},
	},
	{
		displayName: 'Accounting Export ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'accountingExport',
				],
				operation: [
					'downloadLink',
				],
			},
		},
	},
];

export async function executeAccountingExportApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'downloadLink') {
		// *********************************************************
		//       accountingExport : downloadLink
		// *********************************************************
		const id = this.getNodeParameter('id', itemIndex);
		const endpoint = `/api/v1/accountingExportFiles/${id}/downloadLink`;
		return await billwerkApiRequest.call(this, 'POST', endpoint, {}, {});
	}

}
