import Ajv from 'ajv';

type ValidatorResult = {
	isValid: boolean | PromiseLike<any>;
	errors: Ajv.ErrorObject[] | null | undefined;
};
type ValidatorMethod = (schemaName: string, data: any) => ValidatorResult;

/**
 * Factory to the validate method
 * @param ajv Ajv instance with the schemas referenced
 * @returns Validator method
 */
const getValidator = (ajv: Ajv.Ajv) => (
	/**
	 * Validate any data based on the sent schema's name
	 * @param schemaName schema name to validate data against
	 * @param data data to be validated
	 * @returns
	 */
	(schemaName: string, data: any): ValidatorResult => {
		const doesSchemaExists = ajv.getKeyword(schemaName);
		if (doesSchemaExists) {
			throw new Error(`Schema ${schemaName} does not exist.`);
		}

		const valid = ajv.validate(schemaName, data);

		return {
			isValid: valid,
			errors: valid ? null : ajv.errors,
		};
	});

/**
 * Return a validator method based on the passed schemas
 * @param schemas An object where each key is a schema name which will be used to access the ajv schema related to it
 * @example { variableNameToValidate: { type: 'string', 'minlength': 50 } }
 * @returns Validator method
 */
export default (schemas: { [key: string]: object; }): ValidatorMethod => {
	const ajv = new Ajv({ allErrors: true });

	if (schemas && typeof schemas === 'object') {
		// eslint-disable-next-line
		for (const key in schemas) {
			ajv.addSchema(schemas[key], key);
		}
	} else {
		throw new Error('Schemas is not an object');
	}

	const validator = getValidator(ajv);
	return validator;
};
