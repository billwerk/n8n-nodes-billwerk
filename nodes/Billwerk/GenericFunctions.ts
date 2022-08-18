import {
	IExecuteFunctions,
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	NodeApiError,

} from 'n8n-workflow';


/**
 * Make an authenticated API request to Billwerk.
 */
export async function billwerkApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: IDataObject,
	body: IDataObject,
): Promise<any> { // tslint:disable-line:no-any

	const credentials = await this.getCredentials('billwerkApi');
	const baseUrl = await getBaseUrl.call(this);
	const nodeData = this.getWorkflowStaticData('node');

	if(nodeData.token === undefined || nodeData.token === ""){
		nodeData.token = await getAccessToken.call(this);
	}


	const options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'n8n-billwerk',
			'Authorization': `Bearer ${nodeData.token}`,
			'X-SELECTED-LEGAL-ENTITY-ID':	`${credentials.entityId}`,
		},
		method,
		qs,
		body,
		url: `${baseUrl}${endpoint}`,
		json: true,
	};

	if (!Object.keys(body).length) {
		delete options.body;
	}

	if (!Object.keys(qs).length) {
		delete options.qs;
	}

	try {
		return await this.helpers.httpRequest!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Retrieve the access token needed for every API request to Bitwarden.
 */
export async function getAccessToken(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions,
): Promise<any> { // tslint:disable-line:no-any

	const credentials = await this.getCredentials('billwerkApi');

	const baseUrl = await getBaseUrl.call(this);

	const options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'n8n-billwerk',
		},
		auth: {
			username: credentials.clientId as string,
			password: credentials.clientSecret as string,
		},
		method: 'POST',
		body: {
			grant_type: 'client_credentials',
		},
		url: `${baseUrl}/oauth/token`,
		json: true,
		returnFullResponse: true,
	};

	try {
		const response = await this.helpers.httpRequest!(options);
		if(response && response.body && response.body.access_token){
			return response.body.access_token;
		}
		throw new NodeApiError(this.getNode(), response);

	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}


/**
 * Return the base API URL based on the user's environment.
 */
async function getBaseUrl(this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions) {
	const { environment, dedicatedDomain } = await this.getCredentials('billwerkApi');

	switch(environment) {
		case "sandbox": {
			return 'https://sandbox.billwerk.com';
		}
		case "production": {
			return 'https://app.billwerk.com';
		}
		default: {
			return `${dedicatedDomain}`;
		}
	}

}
