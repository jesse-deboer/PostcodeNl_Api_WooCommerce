import { getSetting } from '@woocommerce/settings';
const settings = getSetting('postcode-eu-address-validation_data');

export { settings }
export * from './intl'
export * from './nl'
export { default as FormattedOutput } from './formatted-output';
export * from './field-mapping';

// Make field mapping constants available globally for easy testing
import { AddressFieldMappingConstants } from './field-mapping';

if (typeof window !== 'undefined') {
	window.PostcodeEuFieldMappingConstants = AddressFieldMappingConstants;
}
