import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class BillwerkApi implements ICredentialType {
	name = 'billwerkApi';
	displayName = 'Billwerk API';
	properties: INodeProperties[] = [
		{
			displayName: 'Client Id',
			name: 'clientId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			default: 'sandbox',
			options: [
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Dedicated system',
					value: 'dedicated',
				},
			],
		},
		{
			displayName: 'Dedicated system domain name',
			name: 'dedicatedDomain',
			type: 'string',
			default: '',
			placeholder: 'custom.billwerk.com',
			displayOptions: {
				show: {
					environment: [
						'dedicated',
					],
				},
			},
		},
		{
			displayName: 'Entity Id (only required with Entity Hierarchy)',
			name: 'entityId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'hidden',
			default: '',
		},
	];
}
