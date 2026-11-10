// Machpadaco Property Trust - Frontend Logic - RC 8489988
function verifyPostcode(code) {
  const clean = code.replace(/\s+/g, '').toUpperCase();
  return MOCK_CODES[clean] || null;
}

function showResult(data, code) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  
  if (data && data.verified) {
    resultDiv.className = 'result success';
    resultDiv.innerHTML = `
      <strong>✅ VERIFIED - Building Found</strong><br><br>
      <strong>Code:</strong> ${code}<br>
      <strong>Address:</strong> ${data.address}<br>
      <strong>Type:</strong> ${data.type}<br>
      <strong>LGA:</strong> ${data.lga}, ${data.state || 'Abia'}<br>
      <strong>Accuracy:</strong> ${data.accuracy || '9m'}<br>
      ${data.owner ? `<strong>Owner:</strong> ${data.owner}<br>` : ''}
      <br>
      <strong style="color:#166534;">✓ Tenant can pay inspection fee - Building exists!</strong><br>
      <small>Source: NIPOST Lookup API (Mock → Real after KYB with RC 8489988)</small>
    `;
  } else {
    resultDiv.className = 'result error';
    resultDiv.innerHTML = `
      <strong>❌ NOT FOUND - "Nothing is registered"</strong><br><br>
      Code <strong>${code}</strong> not found.<br>
      Real NIPOST API says: "Network error + Code not in mock DB"<br><br>
      <strong>This is the problem we fix:</strong> Street names like "42 Warri Street" fail. Use GPS code AB16A55AK04.<br><br>
      <strong>Try:</strong> AB 16 A55 AK 04, AB16A55AK02, AB16A55AK23
    `;
  }
}

// Verify button handler
async function verifyBuilding() {
  const input = document.getElementById('postcodeInput');
  const code = input.value.trim();
  if (!code) {
    alert('Enter postcode e.g., AB 16 A55 AK 04');
    return;
  }
  const data = verifyPostcode(code);
  
  // Try backend API first, fallback to mock
  try {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcode: code })
    });
    const apiData = await res.json();
    if (apiData.success) {
      showResult(apiData, code);
      return;
    }
  } catch (e) {
    console.log('Backend not reachable, using mock');
  }
  
  showResult(data, code);
}

// Register form handler
function registerPropertyForm(e) {
  e.preventDefault();
  const postcode = document.getElementById('regPostcode').value;
  const owner = document.getElementById('regOwner').value;
  const data = verifyPostcode(postcode);
  
  if (data) {
    alert(`✅ Property ${postcode} registered for ${owner}!\nAddress: ${data.address}\nReady for NIPOST KYB with RC 8489988`);
  } else {
    alert(`Code ${postcode} not in mock. Add it to mockData.js or use AB16A55AK04`);
  }
  return false;
}

// Attach events when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('verifyBtn');
  if (btn) btn.addEventListener('click', verifyBuilding);
  
  const btn2 = document.getElementById('verifyBtn2');
  if (btn2) btn2.addEventListener('click', verifyBuilding);
  
  const input = document.getElementById('postcodeInput');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') verifyBuilding();
    });
  }
});