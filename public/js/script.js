// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  })();

  document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = document.getElementById('recordTable').getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const domain = row.getElementsByTagName('td')[0].textContent;
        const type = row.getElementsByTagName('td')[1].textContent;
        const value = row.getElementsByTagName('td')[2].textContent;
        if (domain.toLowerCase().includes(filter) || type.toLowerCase().includes(filter) || value.toLowerCase().includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// function editRecord(id) {
//     // Implement edit record functionality
//     alert('Edit record functionality is not yet implemented');
// }
