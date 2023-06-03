import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";



export const handler = async(event) => {

console.log('event: ', event);
console.log('Request: ' + JSON.stringify(event));
console.log("headers:",event.headers);

const secret_name = "secretKeyTest";
const client = new SecretsManagerClient({
  region: "us-east-1",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
  const secret = response.SecretString;
  console.log("response:",response);
  console.log("secret:",secret);
  return JSON.parse(secret);
  
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

    
};