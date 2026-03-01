  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  

    document.addEventListener('DOMContentLoaded', function() {
      // Elements
      const tabs = document.querySelectorAll('.listing-tab');
      const listingsGrid = document.getElementById('listingsGrid');
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
      const editModal = new bootstrap.Modal(document.getElementById('editListingModal'));
      const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
      const saveChangesBtn = document.getElementById('saveChangesBtn');
      let currentListingId = null;
      
      // Initialize analytics chart
      const ctx = document.getElementById('analyticsChart').getContext('2d');
      const analyticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Views',
              data: [65, 79, 90, 81, 96, 112],
              backgroundColor: 'rgba(32, 201, 151, 0.5)',
              borderColor: '#20c997',
              borderWidth: 1
            },
            {
              label: 'Likes',
              data: [28, 35, 42, 38, 45, 52],
              backgroundColor: 'rgba(255, 107, 107, 0.5)',
              borderColor: '#ff6b6b',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
      // Tab functionality
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Update active tab
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Filter listings
          const status = this.getAttribute('data-tab');
          filterListings(status);
        });
      });
      
      function filterListings(status) {
        const listings = listingsGrid.querySelectorAll('.listing-card');
        let visibleCount = 0;
        
        listings.forEach(listing => {
          if (status === 'all' || listing.getAttribute('data-status') === status) {
            listing.style.display = 'block';
            visibleCount++;
            // Add animation
            listing.style.animation = 'slideIn 0.5s ease-out';
          } else {
            listing.style.display = 'none';
          }
        });
        
        // Show empty state if no listings
        showEmptyState(visibleCount === 0, status);
      }
      
      function showEmptyState(show, status) {
        // Remove existing empty state if any
        const existingEmptyState = document.getElementById('emptyState');
        if (existingEmptyState) {
          existingEmptyState.remove();
        }
        
        if (show) {
          const emptyState = document.createElement('div');
          emptyState.id = 'emptyState';
          emptyState.className = 'empty-state';
          
          let message = '';
          let icon = 'fas fa-inbox';
          
          switch(status) {
            case 'active':
              message = 'You don\'t have any active listings.';
              break;
            case 'sold':
              message = 'You haven\'t sold any items yet.';
              break;
            case 'draft':
              message = 'You don\'t have any drafts.';
              icon = 'fas fa-file';
              break;
            default:
              message = 'You don\'t have any listings.';
          }
          
          emptyState.innerHTML = `
            <i class="${icon}"></i>
            <h4>No ${status} listings</h4>
            <p class="text-muted">${message}</p>
            <button class="btn btn-eco mt-3">
              <i class="fas fa-plus me-2"></i>Create New Listing
            </button>
          `;
          
          listingsGrid.appendChild(emptyState);
        }
      }
      
      // Delete functionality
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentListingId = this.getAttribute('data-id');
          deleteModal.show();
        });
      });
      
      confirmDeleteBtn.addEventListener('click', function() {
        // In a real application, this would make an API call to delete the listing
        console.log('Deleting listing with ID:', currentListingId);
        
        // Find and remove the listing card
        const listingCard = document.querySelector(`.delete-btn[data-id="${currentListingId}"]`).closest('.listing-card');
        listingCard.style.animation = 'fadeOut 0.5s ease-out';
        
        setTimeout(() => {
          listingCard.remove();
          
          // Update counts
          updateListingCounts();
          
          // Show success message (in a real app)
          alert('Listing deleted successfully!');
        }, 500);
        
        deleteModal.hide();
      });
      
      // Edit functionality
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentListingId = this.getAttribute('data-id');
          
          // In a real application, this would load the listing data
          console.log('Editing listing with ID:', currentListingId);
          
          editModal.show();
        });
      });
      
      saveChangesBtn.addEventListener('click', function() {
        // In a real application, this would save the changes via API
        console.log('Saving changes for listing:', currentListingId);
        
        // Get form values
        const title = document.getElementById('editTitle').value;
        const price = document.getElementById('editPrice').value;
        
        // Update the listing card (in a real app, this would come from the server response)
        const listingCard = document.querySelector(`.edit-btn[data-id="${currentListingId}"]`).closest('.listing-card');
        listingCard.querySelector('.listing-title').textContent = title;
        listingCard.querySelector('.listing-price').textContent = `$${price}`;
        
        // Show success animation
        listingCard.style.animation = 'pulse 0.5s';
        setTimeout(() => {
          listingCard.style.animation = '';
        }, 500);
        
        editModal.hide();
        
        // Show success message (in a real app)
        alert('Listing updated successfully!');
      });
      
      // Helper function to update listing counts
      function updateListingCounts() {
        const activeCount = listingsGrid.querySelectorAll('.listing-card[data-status="active"]').length;
        const soldCount = listingsGrid.querySelectorAll('.listing-card[data-status="sold"]').length;
        
        document.querySelector('.listing-tab[data-tab="active"] .badge').textContent = activeCount;
        document.querySelector('.listing-tab[data-tab="sold"] .badge').textContent = soldCount;
      }
      
      // Pulse animation for highlighting changes
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(50px); }
        }
      `;
      document.head.appendChild(style);
    });
