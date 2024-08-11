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

function clearInputs() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('addressInput').value = '';
}

function createContact(){
    if (editTrue){
        document.getElementById(`contactCardName${editId}`).textContent = document.getElementById('nameInput').value;
        document.getElementById(`contactCardEmail${editId}`).textContent = document.getElementById('emailInput').value;
        document.getElementById(`contactCardTelephone${editId}`).textContent = document.getElementById('phoneInput').value;
        document.getElementById(`contactCardAddress${editId}`).textContent = document.getElementById('addressInput').value;

        document.querySelector(`#contactCardEmail${editId}`).href = `mailto:${document.getElementById('emailInput').value}`;
        document.querySelector(`#contactCardTelephone${editId}`).href = `tel:${document.getElementById('phoneInput').value}`;

        editTrue = false;
    }
    else{
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
        newContact.querySelector(`#contactCardEmail${contactCount}`).textContent = document.getElementById('emailInput').value;
        newContact.querySelector(`#contactCardTelephone${contactCount}`).textContent = document.getElementById('phoneInput').value;
        newContact.querySelector(`#contactCardAddress${contactCount}`).textContent = document.getElementById('addressInput').value;

        newContact.querySelector(`#contactCardEmail${contactCount}`).href = `mailto:${document.getElementById('emailInput').value}`;
        newContact.querySelector(`#contactCardTelephone${contactCount}`).href = `tel:${document.getElementById('phoneInput').value}`;

        contactCount++;
        // Add the new contact to the DOM
        clone.parentNode.appendChild(newContact);
    }
    clearInputs();
}

// editing
let editTrue = false;
let editId = 0;

function editContact(id){
    editTrue = true;
    editId = id;
    document.getElementById('nameInput').value = document.getElementById(`contactCardName${id}`).textContent;
    document.getElementById('emailInput').value = document.getElementById(`contactCardEmail${id}`).textContent;
    document.getElementById('phoneInput').value = document.getElementById(`contactCardTelephone${id}`).textContent;
    document.getElementById('addressInput').value = document.getElementById(`contactCardAddress${id}`).textContent;
}

function deleteContact(id){
    if (id != 1) {
        document.getElementById(`contactCard${id}`).remove();
    }
    else{
        document.getElementById(`easterEgg`).style.display = 'block';
    }
}

function deleteFirstContact(){
    document.getElementById('contactCard1').remove();
    document.getElementById(`easterEgg`).style.display = 'none';
}
