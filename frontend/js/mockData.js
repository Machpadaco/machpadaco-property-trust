// Machpadaco Property Trust Mock Data - RC 8489988 - AB16A55AK04 Real Code
const MOCK_CODES = {
  'AB16A55AK04': {
    address: 'Highway Talk, 42 Warri Street, Umuahia North, Abia State',
    type: 'Commercial Building - Phone Repairs Workshop',
    lga: 'Umuahia North',
    state: 'Abia',
    owner: 'Engr. Ejike Njuwa - Machpadaco Global Services RC 8489988',
    verified: true,
    accuracy: '9m',
    note: 'REAL CODE - Your cabin inside Highway Talk'
  },
  'AB16A55AK02': {
    address: 'Highway Talk Plaza, Warri Street, Umuahia',
    type: 'Commercial Complex',
    lga: 'Umuahia North',
    state: 'Abia',
    verified: true,
    accuracy: '12m'
  },
  'AB16A55AK23': {
    address: 'Warri Street, Umuahia North, Abia',
    type: 'Residential Building',
    lga: 'Umuahia North',
    state: 'Abia',
    verified: true,
    accuracy: '10m'
  },
  'AB16A55AR01': {
    address: 'Niger Street, Umuahia',
    type: 'Residential',
    lga: 'Umuahia North',
    state: 'Abia',
    verified: true,
    accuracy: '15m'
  },
  'AB16A55AP03': {
    address: 'Aba Road, Umuahia',
    type: 'Commercial',
    lga: 'Umuahia North',
    state: 'Abia',
    verified: true,
    accuracy: '11m'
  }
};

// For backend use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOCK_CODES;
}