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
let contactCount = 1;
function createContact(){
    const clone = document.getElementById('template');
    const newContact = clone.cloneNode(true);
    newContact.id = `contactsCard${contactCount}`;
    contactCount++;
    // Add the new contact to the DOM
    clone.parentNode.appendChild(newContact);
}
