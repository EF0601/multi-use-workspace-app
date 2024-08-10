//dropdowns
const dropdownLicense = {
    trigger: document.getElementById('licenseDropdown'),
    content: document.getElementById('licenseDropdownContent'),
};

dropdownLicense.trigger.addEventListener('click', () => {
    if (dropdownLicense.content.style.display === 'block') {
        dropdownLicense.content.style.display = 'none';
    }
    else {
        dropdownLicense.content.style.display = 'block';
    }
}
);

//contacts
let contactCount = 2;
function createContact(){
    const clone = document.getElementById('template');
    const newContact = clone.cloneNode(true);
    newContact.id = `contactCard${contactCount}`;
    // Update attributes
    newContact.querySelector(`#contactCardName0`).id = `contactCardName${contactCount}`;
    newContact.querySelector(`#contactCardEmail0`).id = `contactCardEmail${contactCount}`;
    newContact.querySelector(`#contactCardTelephone0`).id = `contactCardTelephone${contactCount}`;
    newContact.querySelector(`#contactCardAddress0`).id = `contactCardAddress${contactCount}`;

    newContact.querySelector('#editBtn').setAttribute('onclick', `editContact('${contactCount}')`);
    newContact.querySelector('#delBtn').setAttribute('onclick', `deleteContact('${contactCount}')`);

    newContact.querySelector('#editBtn').removeAttribute('id');
    newContact.querySelector('#delBtn').removeAttribute('id');

    // Update the values
    newContact.querySelector(`#contactCardName${contactCount}`).textContent = document.getElementById('nameInput').value;
    console.log(document.getElementById('nameInput').value);
    newContact.querySelector(`#contactCardEmail${contactCount}`).textContent = document.getElementById('emailInput').value;
    newContact.querySelector(`#contactCardTelephone${contactCount}`).textContent = document.getElementById('phoneInput').value;
    newContact.querySelector(`#contactCardAddress${contactCount}`).textContent = document.getElementById('addressInput').value;

    newContact.querySelector(`#contactCardEmail${contactCount}`).href = `mailto:${document.getElementById('emailInput').value}`;
    newContact.querySelector(`#contactCardTelephone${contactCount}`).href = `tel:${document.getElementById('phoneInput').value}`;

    contactCount++;
    // Add the new contact to the DOM
    clone.parentNode.appendChild(newContact);
}

function editContact(id){
    console.log(`Editing contact ${id}`);
}

function deleteContact(id){
    console.log(`Deleting contact ${id}`);
}
