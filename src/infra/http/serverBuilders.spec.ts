// @ts-nocheck
import test, { Test } from 'tape';
import sinon from 'sinon';

// Methods' internal dependencies
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Module to be tested
import * as serverBuilders from './serverBuilders';
// Methods to be tested
const {
	// Consts
	CERTS_DIRECTORY_NAME,

	// Methods
	createHttpServer,
	createHttpsServer,
} = serverBuilders;

let TEST_LOCATION:string;

// #region createHttpServer tests
TEST_LOCATION = 'infra.createHttpServer:';

test(`${TEST_LOCATION} should create a http server`, (t: Test) => {
	// Preparing parameters
	const dummyApp = { dummyApp: true };

	// Preparing expected data
	const expectedResult = { dummyHttpServer: true };

	// Preparing "http" dependency
	const createServerStub = sinon.stub(http, 'createServer');
	createServerStub.returns(expectedResult);

	// Executing the method
	const result = createHttpServer(dummyApp);

	// Getting "http" call's data
	const createServerArg = createServerStub.getCall(0).args[0];

	// Assertion for result
	t.equal(result, expectedResult, 'result is correct');

	// Assertion for "http"
	t.true(createServerStub.calledOnce, '"http.createServer" was called once');
	t.equal(createServerArg, dummyApp,
		'"http.createServer" was correctly called');

	// Finishing the test
	sinon.restore();
	t.end();
});
// #endregion createHttpServer tests

// #region createHttpsServer tests
TEST_LOCATION = 'infra.createHttpsServer:';

test(`${TEST_LOCATION} should create a https server`, (t: Test) => {
	// Preparing parameters
	const dummyHttpsConfig = {
		certFilename: 'dummyCertFilename',
		keyFilename: 'dummyKeyFilename',
		pemPassphrase: 'pemPassphrase',
	};
	const dummyRootDir = 'dummyRootDir';
	const dummyApp = { isDummyApp: true };

	// Preparing expected data
	const expectedResult = { isDummyHttpsServer: true };
	const expectedPathResolveCallCount = 2;
	const expectedReadFileSyncCallCount = 2;
	const expectedCertPathArgs = [dummyRootDir, CERTS_DIRECTORY_NAME, dummyHttpsConfig.certFilename];
	const expectedKeyPathArgs = [dummyRootDir, CERTS_DIRECTORY_NAME, dummyHttpsConfig.keyFilename];
	const expectedCertPath = 'dummyKeyPath';
	const expectedKeyPath = 'dummyCertPath';
	const expectedCert = 'dummyCert';
	const expectedKey = 'dummyCert';
	const expectedCreateServerArgs = [
		{
			key: expectedKey,
			cert: expectedCert,
			passphrase: dummyHttpsConfig.pemPassphrase,
		},
		dummyApp,
	];

	// Preparing "path.resolve" dependency
	const pathResolveStub = sinon.stub(path, 'resolve');
	pathResolveStub.withArgs(...expectedCertPathArgs).returns(expectedCertPath);
	pathResolveStub.withArgs(...expectedKeyPathArgs).returns(expectedKeyPath);

	// Preparing "fs.readFileSync" dependency
	const readFileSyncStub = sinon.stub(fs, 'readFileSync');
	readFileSyncStub.withArgs(expectedCertPath).returns(expectedCert);
	readFileSyncStub.withArgs(expectedKeyPath).returns(expectedKey);

	// Preparing "http" dependency
	const createServerStub = sinon.stub(https, 'createServer');
	createServerStub.returns(expectedResult);

	// Executing the method
	const result = createHttpsServer(dummyHttpsConfig, dummyRootDir)(dummyApp);

	// Getting "path.resolve" call's data
	const pathResolveCallCount = pathResolveStub.callCount;

	// Getting "fs.readFileSync" call's data
	const readFileSyncCallCount = readFileSyncStub.callCount;

	// Getting "https" call's data
	const createServerArgs = createServerStub.getCall(0).args;

	// Assertion for result
	t.equal(result, expectedResult, 'result is correct');

	// Assertion for "path.resolve"
	t.equal(pathResolveCallCount, expectedPathResolveCallCount,
		'"path.resolve" was called twice');

	// Assertion for "fs.readFileSync"
	t.equal(readFileSyncCallCount, expectedReadFileSyncCallCount,
		'"fs.readFileSync" was called twice');

	// Assertion for "https"
	t.true(createServerStub.calledOnce, '"http.createServer" was called once');
	t.deepEqual(createServerArgs, expectedCreateServerArgs,
		'"http.createServer" was correctly called');

	// Finishing the test
	t.end();
	sinon.restore();
});
// #endregion createHttpsServer tests
