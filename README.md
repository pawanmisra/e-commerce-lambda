# E-Commerce Lambda

A lightweight, serverless e-commerce backend built using AWS Lambda, focusing on scalability and efficiency.
We can deploy Lambda code using AWS CodePipeline.

## Features

- **Modular Architecture**: Organized controllers, routes, and client modules for streamlined development.
- **Serverless Deployment**: Optimized for AWS Lambda for cost-effective scalability.
- **Comprehensive Testing**: Includes test suites for reliability.

## Getting Started

### Prerequisites

- Node.js 18
- AWS account for Lambda deployment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pawanmisra/e-commerce-lambda.git
   cd e-commerce-lambda
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

This is Lambda function, in order to run this locally you need Sam Local.
However, you can execute index.js using
```
node index.mjs
```

### Testing

Run the test suite:
```bash
npm test
```

## Deployment

In order to deploy lambda changes, the repository is already configured with AWS Codepipeline. 
For reference of how CodePipeline does the deployment, check **buildspec.yaml**

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
