const axios = require('axios');

const mockDB = {
  "AB16A55AK04": { code: "AB 16 A55 AK 04", raw: "AB16A55AK04", location: "Umuahia North, Abia", building: "AK02 33", type: "Commercial - Workshop Highway Talk", verified: true, owner: "Engr. Ejike Njuwa (RC 8489988)", price: "Direct - No Agents", accuracy: "9 metres" },
  "AB16A55AK23": { code: "AB 16 A55 AK 23", raw: "AB16A55AK23", location: "Umuahia North, Abia", building: "AK23", type: "Residential", verified: true, owner: "Not yet registered" },
  "AB16A55AR01": { code: "AB 16 A55 AR 01", raw: "AB16A55AR01", location: "Umuahia North, Abia", building: "AR01", type: "Commercial", verified: true, owner: "Not yet registered" },
  "AB16A55AR02": { code: "AB 16 A55 AR 02", raw: "AB16A55AR02", location: "Umuahia North, Abia", building: "AR02", type: "Residential", verified: true, owner: "Not yet registered" },
  "AB16A55AP03": { code: "AB 16 A55 AP 03", raw: "AB16A55AP03", location: "Umuahia North, Abia", building: "AP03", type: "Residential", verified: true, owner: "Not yet registered" },
  "AB16A55AR04": { code: "AB 16 A55 AR 04", raw: "AB16A55AR04", location: "Umuahia North, Abia", building: "AR04", type: "Mixed Use", verified: true, owner: "Not yet registered" },
  "AB16A55AR11": { code: "AB 16 A55 AR 11", raw: "AB16A55AR11", location: "Umuahia North, Abia", building: "AR11", type: "Commercial", verified: true, owner: "Not yet registered" }
};

exports.lookupPostcode = async (code) => {
  const clean = code.replace(/[^A-Z0-9]/gi,'').toUpperCase();
  // Try real API first if key exists
  try {
    if(process.env.NIPOST_API_KEY && process.env.NIPOST_API_KEY !== 'free_dev_mock_key'){
      const res = await axios.get(`${process.env.NIPOST_BASE_URL}/lookup/${clean}`, {
        headers: { Authorization: `Bearer ${process.env.NIPOST_API_KEY}` }
      });
      return { verified: true, data: res.data, source: 'real' };
    }
  } catch(e){ console.log("Real API not ready, using mock"); }

  if(mockDB[clean]) return { verified: true, data: mockDB[clean], source: 'mock', mock: true };
  return { verified: false, error: "Nothing is registered under that code. Try its postcode instead.", source: 'mock' };
};

exports.validatePostcode = (code) => {
  const clean = code.replace(/[^A-Z0-9]/gi,'').toUpperCase();
  return clean.length === 11 && /^[A-Z0-9]{11}$/.test(clean);
};

exports.searchBuildings = async (q) => {
  return { message: "Street name search fails - Use GPS code AB16A55AK04. This is why Property Trust exists." };
};