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
