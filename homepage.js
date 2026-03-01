  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  

    // Simple JavaScript for category filtering demonstration
    document.addEventListener('DOMContentLoaded', function() {
      // Search functionality
      const searchButton = document.querySelector('.search-container button');
      const searchInput = document.querySelector('.search-container input');
      
      if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
          alert('Searching for: ' + searchInput.value);
          // In a real implementation, this would filter or redirect to search results
        });
        
        searchInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            alert('Searching for: ' + searchInput.value);
          }
        });
      }
      
      // Category card click handler
      const categoryCards = document.querySelectorAll('.category-card');
      categoryCards.forEach(card => {
        card.addEventListener('click', function() {
          const categoryName = this.querySelector('h5').textContent;
          alert('Showing items in category: ' + categoryName);
          // In a real implementation, this would filter or redirect to category page
        });
      });
    });
