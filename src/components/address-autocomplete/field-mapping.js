/**
 * Field mapping configuration for WooCommerce block checkout
 * This mirrors the functionality of addressFieldMapping.js for the classic checkout
 */

export const AddressFieldMappingConstants = {
	street: 'street',
	houseNumber: 'houseNumber',
	houseNumberAddition: 'houseNumberAddition',
	city: 'city',
	streetAndHouseNumber: 'streetAndHouseNumber',
	postcode: 'postcode',
	houseNumberAndAddition: 'houseNumberAndAddition',
	province: 'province',
};

/**
 * Default mapping from WooCommerce address fields to address parts
 * Change this mapping to accommodate your checkout forms address fields.
 * - Keys: WooCommerce address field names
 * - Values: address parts placed in them on selecting an address
 * - Use a value of null to skip the field
 */
export const DefaultFieldMapping = {
	address_1: AddressFieldMappingConstants.streetAndHouseNumber,
	address_2: null, // Address line 2 - not populated
	postcode: AddressFieldMappingConstants.postcode,
	city: AddressFieldMappingConstants.city,
	state: AddressFieldMappingConstants.province,
	// Custom fields (if you have them):
	street_name: AddressFieldMappingConstants.street,
	house_number: AddressFieldMappingConstants.houseNumber,
	house_number_suffix: AddressFieldMappingConstants.houseNumberAddition,
};

/**
 * Map address details to WooCommerce address fields based on configuration
 * @param {Object} addressDetails - The address details from the API
 * @param {Object} currentAddress - The current address object
 * @param {Object} fieldMapping - Field mapping configuration
 * @returns {Object} Updated address object
 */
export function mapAddressToFields(addressDetails, currentAddress, fieldMapping) {
	// Create a copy of the current address to avoid mutation
	const updatedAddress = { ...currentAddress };
	
	// Create a flat object with all available address parts for easy mapping
	const addressParts = {
		street: addressDetails.address?.street || '',
		houseNumber: addressDetails.address?.buildingNumber || '',
		houseNumberAddition: addressDetails.address?.buildingNumberAddition || '',
		city: addressDetails.address?.locality || '',
		postcode: addressDetails.address?.postcode || '',
		province: addressDetails.address?.province || null,
		streetAndHouseNumber: addressDetails.streetLine || '',
		houseNumberAndAddition: addressDetails.address ? 
			`${addressDetails.address.buildingNumber || ''} ${addressDetails.address.buildingNumberAddition || ''}`.trim() : '',
	};

	for (const [fieldName, addressPart] of Object.entries(fieldMapping)) {
		if (!addressPart || addressPart === '') {
			continue;
		}

		const value = addressParts[addressPart];
		if (value !== undefined && value !== null && value !== '') {
			updatedAddress[fieldName] = value; // Also set as direct property
		} 
	}


	return updatedAddress;
}

/**
 * Utility function to get field mapping from settings or use default
 * This allows for runtime configuration via WordPress settings
 */
export function getFieldMapping() {
	// Check WordPress settings for custom field mapping from admin panel
	if (typeof window !== 'undefined' && window.PostcodeEuSettings?.customFieldMapping) {
		return window.PostcodeEuSettings.customFieldMapping;
	}

	return DefaultFieldMapping;
} 