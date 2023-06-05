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


export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a customer',
				action: 'Create a customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single customer',
				action: 'Get a customer',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve list of customers',
				action: 'Get all customers',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a customer',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
			},
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		description: 'Search customers by External ID, First Name, Last Name, Company Name, Email Address and Debitor Account',
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Status',
		name: 'statusFilter',
		type: 'options',
		default: '',
		options: [
			{
				name: '',
				value: '',
				description: 'All',
			},
			{
				name: 'Normal',
				value: 'Normal',
			},
			{
				name: 'Unconfirmed',
				value: 'Unconfirmed',
			},
			{
				name: 'Deleted',
				value: 'Deleted',
			},
		],
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'Search for a customer by External ID',
		displayOptions: {
			show: {
				resource: [
					'customer',
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
		description: 'Pagination: ID of first customer to return',
		displayOptions: {
			show: {
				resource: [
					'customer',
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
					'customer',
				],
				operation: [
					'getAll',
				],
			},
		},
	},

	{
		displayName: 'Customer ID',
		name: 'Id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'get', 'delete', 'update',
				],
			},
		},
	},
];

export const customerDataOptions: INodeProperties[] = [
	{
		displayName: 'Customer External ID',
		name: 'ExternalCustomerId',
		type: 'string',
		default: '',
		description: 'Unique external ID, e.g. foreign key',
	},
	{
		displayName: 'Company Name',
		name: 'CompanyName',
		type: 'string',
		default: '',
		description: 'Customer\'s company name',
	},
	{
		displayName: 'First Name',
		name: 'FirstName',
		type: 'string',
		default: '',
		description: 'Customer\'s first name',
	},
	{
		displayName: 'Last Name',
		name: 'LastName',
		type: 'string',
		default: '',
		description: 'Customer\'s last name',
	},
	{
		displayName: 'VAT ID',
		name: 'VatId',
		type: 'string',
		default: '',
		description: 'Company VAT-ID. Will be validated.',
	},
	{
		displayName: 'Email',
		name: 'EmailAddress',
		type: 'string',
		default: '',
		description: 'Customer\'s e-mail address',
	},
	{
		displayName: 'Phone Number',
		name: 'PhoneNumber',
		type: 'string',
		default: '',
		description: 'Customer\'s phone number',
	},
	{
		displayName: 'Notes',
		name: 'Notes',
		type: 'string',
		default: '',
		description: 'Free text notes about your customer',
	},
	{
		displayName: 'Address',
		name: 'Address',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		required: true,
		options: [
			{
				displayName: 'Street Name',
				name: 'Street',
				type: 'string',
				default: '',
			},
			{
				displayName: 'House Number',
				name: 'HouseNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Line 1',
				name: 'AddressLine1',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postal/ZIP Code',
				name: 'PostalCode',
				type: 'string',
				default: '',
			},
			{
				displayName: 'City',
				name: 'City',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'State',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country',
				name: 'Country',
				type: 'string',
				default: '',
				description: 'Country in ISO-3166 alpha-2 format',

			},
		],
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
];

export const customerDataFields: INodeProperties[] = [
	{
		displayName: 'Customer Data',
		name: 'customerData',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		required: true,
		options: customerDataOptions ,
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'update', 'create',
				],
			},
		},
	},
];

export interface CustomerDto {
	ExternalCustomerId: string;
	CompanyName: string;
	firstName: string;
	lastName: string;
	VatId: string;
	EmailAddress: string;
	PhoneNumber: string;
	Notes: string;
	Address: AddressDto;
	CustomFields: string;
}

export interface AddressDto {
	Street: string;
	HouseNumber: string;
	AddressLine1: string;
	PostalCode: string;
	City: string;
	State: string;
	Country: string;
}

export interface CustomField {
	name: string;
	value: string;
}


export async function executeCustomerApi(this: IExecuteFunctions, itemIndex: number, operation: string,): Promise<any> { // tslint:disable-line:no-any

	if (operation === 'get') {
		// *********************************************************
		//       customer : get
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/customers/${id}`;
		return await billwerkApiRequest.call(this, 'GET', endpoint, {}, {});

	} else if (operation === 'delete') {
		// *********************************************************
		//       customer : delete
		// *********************************************************
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/customers/${id}`;
		await billwerkApiRequest.call(this, 'DELETE', endpoint, {}, {});
		return { success: true };

	} else if (operation === 'getAll') {
		// *********************************************************
		//       customer : getAll
		// *********************************************************
		const qs = {} as IDataObject;
		qs.search = this.getNodeParameter('search', itemIndex) || null;
		qs.statusFilter = this.getNodeParameter('statusFilter', itemIndex);
		qs.externalId = this.getNodeParameter('externalId', itemIndex);
		qs.from = this.getNodeParameter('from', itemIndex);
		qs.take = this.getNodeParameter('take', itemIndex);
		const endpoint = '/api/v1/customers';
		return await billwerkApiRequest.call(this, 'GET', endpoint, qs, {});

	} else if (operation === 'update') {
		// *********************************************************
		//       customer : update
		// *********************************************************
		const body = {} as IDataObject;
		const customFields = {} as IDataObject;
		const customerData = this.getNodeParameter('customerData', itemIndex, {}) as IDataObject;
		for (const key of Object.keys(customerData)) {
			if (key === 'CustomFields' && (customerData.CustomFields as IDataObject).field !== undefined) {
				for (const customField of (customerData.CustomFields as IDataObject)!.field! as CustomField[]) {
					customFields[customField.name] = customField.value;
				}
			} else {
				body[key] = customerData[key];
			}
		}
		if (Object.keys(customFields).length >0) {
			body['CustomFields'] = customFields;
		}
		const id = this.getNodeParameter('Id', itemIndex);
		const endpoint = `/api/v1/customers/${id}`;
		return await billwerkApiRequest.call(this, 'PATCH', endpoint, {}, body);
	}

}
