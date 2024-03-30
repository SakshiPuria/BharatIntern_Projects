 let expenses = [];
        let totalAmount = 0;

        const categorySelect = document.getElementById('category-select');
        const otherCategoryInput = document.getElementById('other-category-input');
        const amountInput = document.getElementById('amount-input');
        const dateInput = document.getElementById('date-input');
        const addBtn = document.getElementById('add-btn');
        const expenseTableBody = document.getElementById('expense-table-body');
        const totalAmountCell = document.getElementById('total-amount');

        // Function to show/hide the input field for the custom category
        function toggleCustomCategoryInput() {
            if (categorySelect.value === 'Other') {
                otherCategoryInput.style.display = 'block';
            } else {
                otherCategoryInput.style.display = 'none';
            }
        }

        // Event listener for category selection change
        categorySelect.addEventListener('change', toggleCustomCategoryInput);

        addBtn.addEventListener('click', function() {
            let category;
            if (categorySelect.value === 'Other') {
                category = otherCategoryInput.value.trim(); // Use custom category if "Other" is selected
                if (category === '') {
                    alert('Please enter a custom category');
                    return;
                }
            } else {
                category = categorySelect.value; // Use selected category
            }

            const amount = Number(amountInput.value);
            const date = dateInput.value;

            if (category === '') {
                alert('Please select a category');
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid value');
                return;
            }
            if (date === '') {
                alert('Please enter date');
                return;
            }

            expenses.push({ category, amount, date });

            totalAmount += amount;
            totalAmountCell.textContent = totalAmount;

            const newRow = expenseTableBody.insertRow();

            const categoryCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                const index = expenses.findIndex(exp => exp.date === date && exp.amount === amount && exp.category === category);
                if (index !== -1) {
                    totalAmount -= expenses[index].amount;
                    totalAmountCell.textContent = totalAmount;
                    expenses.splice(index, 1);
                    expenseTableBody.removeChild(newRow);
                }
            });

            categoryCell.textContent = category;
            amountCell.textContent = amount;
            dateCell.textContent = date;
            deleteCell.appendChild(deleteBtn);
            toggleCustomCategoryInput(); // Hide custom category input after adding expense

            // Update the pie chart after adding an expense
            updatePieChart();
        });

        // Initial