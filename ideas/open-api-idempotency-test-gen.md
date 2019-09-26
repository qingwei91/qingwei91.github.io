# Generate test cases from OpenApi 

While generating useful test for api is hard if not impossible, generating test specifically for idempotency is more plausible and is actually useful, the key is to make it dumb easy to drive adoption.

It will need to allow user to setup state as api often depends on some state, then the test cases can just exercise api to make sure idempotency. 
