# Reserve - by clear
## Code Challenge

### How to generate public and private keys
https://cloud.google.com/iot/docs/how-tos/credentials/keys

private: `openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048`
public: `openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem`

### Challenge setup
1. Generate public and private keys if you don't have others ones.
2. Install dependecies & setup: `npm install && npm run setup`.
3. Run the app: `npm start`.