# n8n-nodes-billwerk



With the billwerk n8n integration, you can automate more business processes, integrate with more systems, and unleash the potential of your subscription business.




## How to install

### Community Nodes (Recommended)

For users on n8n v0.187+, your instance owner can install this node from [Community Nodes](https://docs.n8n.io/integrations/community-nodes/installation/).

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-sbillwerk` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

### Manual installation

To get started install the package in your n8n root directory:

`npm install n8n-nodes-billwerk`


For Docker-based deployments, add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):


`RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-billwerk`

## How to use

To use the billwerk n8n node, you need to have already a working billwerk account.

If you want to evaluate our product, or if you want to test the integration without affecting your real users, you can register on our sandbox environment.

### Credentials
To get your API credentials, go to billwerk UI, in Settings > My Apps.  
We recommend creating a dedicated set of credentials for each application.

Make sure to select Client Type: Confidential, as public clients are not supported for security reasons. In n8n credentials, also make sure to select the right environment.

### Actions

The Billwerk node supports the most commons operations of the billwerk API.
The following resources and operations are supported:
* Accounting exports [download]
* Customers [get, get all, create, update, delete]
* Contracts [get, get all, annul, end, delete]
* Invoices [get, get all, download]
* Metered usages [get all, create, delete]
* Orders [get, get all, delete, commit, approve, decline]
* Payments [get, get all, create]
* Products [get all]
* Reports [download]

Note: download actions provide URL only and file can be downloaded with additional HTTP Request node.

### Webhooks / Triggers
This package also include a BillwerkTrigger node, which can be used to start workflows from any of the webhooks that billwerk supports. It can be used to notify you about every new customer signing up, missed payment deadlines, and much more.

The webhooks are configured automatically by n8n when starting the workflow, so you don't need to do the configuration yourself.

## How to contribute
We are happy to receive your feedback about this node. If you want to share happy comments, feature requests or constructive criticism, please contact us at support@billwerk.com.

You can also contribute directly to the development of this node by opening a pull request.


## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
